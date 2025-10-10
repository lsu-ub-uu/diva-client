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
  useRouteLoaderData,
  useSubmit,
} from 'react-router';

import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import type { Route } from '../auth/+types/login';

import { Button } from '@/components/Button/Button';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { i18nContext } from 'server/i18n';
import css from './login.css?url';
import { PasswordLogin } from './PasswordLogin';
import { WebRedirectLogin } from './WebRedirectLogin';
import { useLoginUnits } from '@/utils/rootLoaderDataUtils';

export async function loader({ request, context }: Route.LoaderArgs) {
  const { t } = context.get(i18nContext);
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('returnTo');
  const loginUnit = url.searchParams.get('loginUnit');

  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    return redirect(returnTo || '/');
  }

  return data(
    {
      breadcrumb: t('divaClient_LoginText'),
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
      const loginId = form.get('loginId');
      const appToken = form.get('appToken');
      if (typeof loginId !== 'string' || typeof appToken !== 'string') {
        return null;
      }
      return loginWithAppToken(loginId, appToken);
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
  const form = await request.formData();
  const returnToEncoded = form.get('returnTo');
  const returnTo =
    returnToEncoded && decodeURIComponent(returnToEncoded.toString());
  const { flashNotification, setAuth } = context.get(sessionContext);

  const auth = await authenticate(form);

  if (auth === null) {
    flashNotification({
      severity: 'error',
      summary: 'Invalid credentials',
    });

    // Redirect back to the login page with errors.
    return redirect(href('/login'));
  }

  setAuth(auth);

  return redirect(returnTo ?? '/');
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
  const loginUnits = useLoginUnits() || [];
  const { notification, returnTo, loginUnit } = loaderData;
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
      <h1>{t('divaClient_LoginText')}</h1>
      <div className='login-options'>
        <div className='login-option'>
          <h2>{t('divaClient_LoginPasswordText')}</h2>
          <Form
            method='GET'
            style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
            onChange={(e) => submit(e.currentTarget)}
          >
            <ul>
              {passwordLoginUnits.map((unit: LoginDefinition) => (
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
        </div>
        <WebRedirectLogin
          webRedirectLoginUnits={webRedirectLoginUnits}
          returnTo={returnTo}
        />
      </div>
    </main>
  );
}
