import { data, Form, redirect } from 'react-router';
import {
  commitSession,
  getNotification,
  getSession,
} from '@/auth/sessions.server';
import { useTranslation } from 'react-i18next';
import { loginWithAppToken } from '@/data/loginWithAppToken.server';
import { loginWithUsernameAndPassword } from '@/data/loginWithUsernameAndPassword.server';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import type { Auth } from '@/auth/Auth';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';
import type { Route } from './+types/login';
import { Alert } from '@/components/Alert/Alert';
import { Button } from '@/components/Button/Button';
import { Snackbar } from '@/components/Snackbar/Snackbar';
import { useState } from 'react';
import styles from './login.module.css';
import clsx from 'clsx';

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('returnTo');
  const presentation = parsePresentation(url.searchParams.get('presentation'));
  const { t } = context.i18n;

  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    return redirect(returnTo ?? '/');
  }

  return data(
    {
      presentation,
      notification: getNotification(session),
      returnTo,
      breadcrumb: t('divaClient_LoginText'),
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

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

export const action = async ({ request }: Route.ActionArgs) => {
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
  session.set('auth', auth);

  return redirect(returnTo ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const ErrorBoundary = RouteErrorBoundary;

export default function Login({ loaderData }: Route.ComponentProps) {
  const { notification, presentation, returnTo } = loaderData;
  const { t } = useTranslation();
  const [validationErrorShown, setValidationErrorShown] = useState(false);

  return (
    <div>
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
        className={clsx('container-s', styles['form-wrapper'])}
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
            <FormGenerator formSchema={presentation} />
          ) : (
            <span />
          )}
        </div>
        <Button type='submit' variant='primary'>
          {t('divaClient_LoginText')}
        </Button>
      </Form>
    </div>
  );
}
