import type { Auth } from '@/auth/Auth';
import { commitSession, getSession } from '@/auth/sessions.server';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';
import { loginWithAppToken } from '@/data/loginWithAppToken.server';
import { loginWithUsernameAndPassword } from '@/data/loginWithUsernameAndPassword.server';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form, isRouteErrorResponse, redirect, useSubmit } from 'react-router';

import { Alert } from '@/components/Alert/Alert';
import { Button } from '@/components/Button/Button';
import { Snackbar } from '@/components/Snackbar/Snackbar';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { useState } from 'react';
import type { Route } from '../auth/+types/login';

import { authContext } from '@/auth/authMiddleware.server';
import { notificationContext } from '@/notification/notificationMiddleware.server';
import css from './login.css?url';

export async function loader({ request, context }: Route.LoaderArgs) {
  const { t } = context.i18n;
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('returnTo');
  const presentation = parsePresentation(url.searchParams.get('presentation'));
  const { notification } = context.get(notificationContext);
  const auth = context.get(authContext);

  if (auth) {
    return redirect(returnTo ?? '/');
  }

  return {
    breadcrumb: t('divaClient_LoginText'),
    presentation,
    notification,
    returnTo,
  };
}

export const meta = ({ loaderData }: Route.MetaArgs) => {
  return [
    {
      title: ['DiVA', `${loaderData?.breadcrumb}`].filter(Boolean).join(' | '),
    },
  ];
};

export const links: Route.LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: css,
  },
];

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

const authenticate = async (form: FormData): Promise<Auth | null> => {
  const loginType = form.get('loginType');
  switch (loginType) {
    case 'appToken': {
      const account = form.get('account');
      return loginWithAppToken(JSON.parse(account!.toString()));
    }
    case 'webRedirect': {
      try {
        const authFromWebRedirect = JSON.parse(form.get('auth') as string);
        return transformCoraAuth(authFromWebRedirect);
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

export const action = async ({ request, context }: Route.ActionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();
  const returnToEncoded = form.get('returnTo');
  const returnTo =
    returnToEncoded && decodeURIComponent(returnToEncoded.toString());
  const { flashNotification } = context.get(notificationContext);
  const presentationString = form.get('presentation');

  const auth = await authenticate(form);

  if (auth === null) {
    flashNotification({
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

  session.set('auth', auth);

  return redirect(returnTo ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();

  if (isRouteErrorResponse(error)) {
    const { status } = error;
    return (
      <ErrorPage
        icon={getIconByHTTPStatus(status)}
        titleText={t(`divaClient_error${status}TitleText`)}
        bodyText={t(`divaClient_error${status}BodyText`)}
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};

export default function Login({ loaderData }: Route.ComponentProps) {
  const { notification, presentation, returnTo } = loaderData;
  const submit = useSubmit();
  const { t } = useTranslation();
  const [validationErrorShown, setValidationErrorShown] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(presentation),
    resolver: yupResolver(generateYupSchemaFromFormSchema(presentation)),
  });
  const { handleSubmit } = methods;

  return (
    <main>
      <Snackbar
        open={validationErrorShown}
        onClose={() => setValidationErrorShown(false)}
        severity='error'
        text={t('divaClient_validationErrorsText')}
      />
      {notification && notification.severity === 'error' ? (
        <Alert severity='error'>{notification.summary}</Alert>
      ) : null}
      <Form
        method='POST'
        onSubmit={handleSubmit(
          (_values, event) => {
            submit(event!.target);
          },
          () => setValidationErrorShown(true),
        )}
      >
        <input type='hidden' name='loginType' value='password' />
        {returnTo && <input type='hidden' name='returnTo' value={returnTo} />}
        <input
          type='hidden'
          name='presentation'
          value={JSON.stringify(presentation)}
        />
        <div>
          {presentation !== null ? (
            <FormProvider {...methods}>
              <FormGenerator formSchema={presentation} showTooltips={false} />
            </FormProvider>
          ) : (
            <span />
          )}
        </div>
        <Button
          type='submit'
          variant='primary'
          size='large'
          className='login-button'
        >
          {t('divaClient_LoginText')}
        </Button>
      </Form>
    </main>
  );
}
