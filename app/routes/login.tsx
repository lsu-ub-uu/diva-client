import {
  type ActionFunction,
  data,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'; // or cloudflare/deno // or cloudflare/deno
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { commitSession, getSession } from '@/.server/sessions';
import { Alert, Button, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { useTranslation } from 'react-i18next';
import { loginWithAppToken } from '@/.server/data/loginWithAppToken';
import { loginWithUsernameAndPassword } from '@/.server/data/loginWithUsernameAndPassword';
import type { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { useSnackbar } from 'notistack';
import { authYupSchema } from '@/.server/cora/yupSchema/authYupSchema';
import type { Auth } from '@/types/Auth';

const parsePresentation = (searchParam: string | null) => {
  if (searchParam === null) {
    return null;
  }
  try {
    return JSON.parse(decodeURIComponent(searchParam));
  } catch {
    console.error('Failed to parse presentation search param', searchParam);
    return null;
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('returnTo');
  const presentation = parsePresentation(url.searchParams.get('presentation'));

  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    return redirect(returnTo ?? '/');
  }

  return data(
    {
      presentation,
      notification: session.get('notification'),
      returnTo,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

const authenticate = async (form: FormData): Promise<Auth | null> => {
  const loginType = form.get('loginType');
  console.log('authenticating with loginType', loginType);
  switch (loginType) {
    case 'appToken': {
      const account = form.get('account');
      return loginWithAppToken(JSON.parse(account!.toString()));
    }
    case 'webRedirect': {
      try {
        return await authYupSchema.validate(
          JSON.parse(form.get('auth') as string),
        );
      } catch (e) {
        console.error('Failed to parse webRedirect auth', e);
        return null;
      }
    }
    case 'password':
      return await loginWithUsernameAndPassword(
        form.get('password.loginId.value')!.toString(),
        form.get('password.password.value')!.toString(),
      );
    default:
      return null;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();
  const returnToEncoded = form.get('returnTo');
  const returnTo =
    returnToEncoded && decodeURIComponent(returnToEncoded.toString());

  const presentationString = form.get('presentation');

  const auth = await authenticate(form);

  if (auth === null) {
    session.flash('notification', {
      severity: 'error',
      summary: 'Invalid credentials',
    });

    // Redirect back to the login page with errors.
    return redirect(
      presentationString
        ? `/login?presentation=${encodeURIComponent(presentationString.toString())}`
        : (returnTo ?? '/'),
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      },
    );
  }
  console.log('setting session to cookie', auth);
  session.set('auth', auth);
  return redirect(returnTo ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Login() {
  const { notification, presentation, returnTo } =
    useLoaderData<typeof loader>();
  const submit = useSubmit();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(presentation),
    resolver: yupResolver(generateYupSchemaFromFormSchema(presentation)),
  });
  const { handleSubmit } = methods;

  return (
    <div>
      {notification && notification.severity === 'error' ? (
        <Alert severity='error'>{notification.summary}</Alert>
      ) : null}
      <Form
        method='POST'
        onSubmit={handleSubmit(
          (_values, event) => {
            submit(event!.target);
          },
          () =>
            enqueueSnackbar(t('divaClient_validationErrorsText'), {
              variant: 'error',
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            }),
        )}
      >
        <input
          type='hidden'
          name='loginType'
          value='password'
        />
        {returnTo && (
          <input
            type='hidden'
            name='returnTo'
            value={returnTo}
          />
        )}
        <input
          type='hidden'
          name='presentation'
          value={JSON.stringify(presentation)}
        />
        <Stack spacing={2}>
          {presentation !== null ? (
            <FormProvider {...methods}>
              <FormGenerator formSchema={presentation} />
            </FormProvider>
          ) : (
            <span />
          )}
        </Stack>
        <Button
          type='submit'
          variant='contained'
        >
          Logga in
        </Button>
      </Form>
    </div>
  );
}
