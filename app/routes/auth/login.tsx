import type { Auth } from '@/auth/Auth';
import {
  commitSession,
  getNotification,
  getSession,
} from '@/auth/sessions.server';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';
import { loginWithAppToken } from '@/data/loginWithAppToken.server';
import { loginWithUsernameAndPassword } from '@/data/loginWithUsernameAndPassword.server';
import { useTranslation } from 'react-i18next';
import {
  data,
  Form,
  href,
  isRouteErrorResponse,
  redirect,
  useSubmit,
} from 'react-router';

import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import type { Route } from '../auth/+types/login';

import { Button } from '@/components/Button/Button';
import {
  devAccounts,
  type Account,
} from '@/components/Layout/Header/Login/devAccounts';
import { getLoginUnits } from '@/data/getLoginUnits.server';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import css from './login.css?url';
import { PasswordLogin } from './PasswordLogin';
import { WebRedirectLogin } from './webRedirectLogin';

export async function loader({ request, context }: Route.LoaderArgs) {
  const { t } = context.i18n;
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('returnTo');
  const loginUnit = url.searchParams.get('loginUnit');
  const loginUnits = getLoginUnits(await context.dependencies);

  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    return redirect(returnTo || '/');
  }

  return data(
    {
      breadcrumb: t('divaClient_LoginText'),
      loginUnits,
      notification: getNotification(session),
      returnTo,
      loginUnit,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
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

  const returnTo = returnToEncoded
    ? decodeURIComponent(returnToEncoded.toString())
    : '/';

  const auth = await authenticate(form);

  if (auth === null) {
    session.flash('notification', {
      severity: 'error',
      summary: 'Invalid credentials',
    });

    // Redirect back to the login page with errors.
    return redirect(href('/login'), {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  session.set('auth', auth);

  return redirect(returnTo || '/', {
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
  const { notification, loginUnits, returnTo, loginUnit } = loaderData;
  const { t } = useTranslation();

  const submit = useSubmit();

  const passwordLoginUnits = loginUnits.filter(
    (unit: LoginDefinition) => unit.type === 'password',
  );
  const webRedirectLoginUnits = loginUnits.filter(
    (unit: LoginDefinition) => unit.type === 'webRedirect',
  );

  const selectedLoginUnit = loginUnit
    ? loginUnits.find(
        (unit: LoginDefinition) => unit.loginDescription === loginUnit,
      )
    : undefined;

  if (selectedLoginUnit?.type === 'password') {
    return (
      <main>
        <h1>Logga in</h1>
        <PasswordLogin
          presentation={selectedLoginUnit.presentation}
          notification={notification}
          returnTo={returnTo}
        />
      </main>
    );
  }

  return (
    <main>
      <h1>Logga in</h1>
      <div className='login-options'>
        <div className='login-option'>
          <div
            className='login-option'
            style={{ marginBottom: 'var(--gap-xl)' }}
          >
            <h2>Testkonto</h2>
            <Form method='POST' action='/login'>
              <input type='hidden' name='loginType' value='appToken' />
              {returnTo && (
                <input type='hidden' name='returnTo' value={returnTo} />
              )}
              <ul
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {devAccounts.map((account: Account) => (
                  <li key={account.userId}>
                    <Button
                      type='submit'
                      name='account'
                      value={JSON.stringify(account)}
                    >
                      {account.lastName} {account.firstName}
                    </Button>
                  </li>
                ))}
              </ul>
            </Form>
          </div>
          <h2>DiVA-konto</h2>
          {passwordLoginUnits.length === 1 ? (
            <PasswordLogin
              presentation={passwordLoginUnits[0].presentation}
              notification={notification}
              returnTo={returnTo}
            />
          ) : (
            <Form
              method='GET'
              style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              onChange={(e) => submit(e.currentTarget)}
            >
              <ul>
                {loginUnits
                  .filter((unit) => unit.type === 'password')
                  .map((unit: LoginDefinition) => (
                    <li key={unit.id}>
                      <Button
                        type='submit'
                        name='loginUnit'
                        value={unit.loginDescription}
                      >
                        {t(unit.loginDescription)}
                      </Button>
                    </li>
                  ))}
              </ul>
            </Form>
          )}
        </div>
        <WebRedirectLogin
          webRedirectLoginUnits={webRedirectLoginUnits}
          returnTo={returnTo}
        />
      </div>
    </main>
  );
}
