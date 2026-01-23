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
import { data, Form, isRouteErrorResponse, redirect } from 'react-router';

import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import type { Route } from '../auth/+types/login';

import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { useLoginUnits } from '@/utils/rootLoaderDataUtils';
import { i18nContext } from 'server/i18n';
import css from './login.css?url';
import { PasswordLogin } from './PasswordLogin';
import { PasswordLoginOptions } from './PasswordLoginOptions';
import { WebRedirectLoginOptions } from './WebRedirectLoginOptions';

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
  const { t } = context.get(i18nContext);

  const auth = await authenticate(form);

  if (auth === null) {
    flashNotification({
      severity: 'error',
      summary: t('divaClient_loginInvalidCredentialsText'),
    });

    // Redirect back to the login page with errors.
    return;
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

  const passwordLoginUnits = loginUnits.filter(
    (unit: LoginDefinition) => unit.type === 'password',
  );
  const webRedirectLoginUnits = loginUnits.filter(
    (unit: LoginDefinition) => unit.type === 'webRedirect',
  );

  const selectedLoginUnit = loginUnit
    ? loginUnits.find((unit: LoginDefinition) => unit.id === loginUnit)
    : loginUnits.length === 1
      ? loginUnits[0]
      : undefined;

  if (selectedLoginUnit?.type === 'password') {
    return (
      <main>
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
      <form method='post'>
        <input name='loginType' value='webRedirect' />
        <input
          name='auth'
          value='{"authentication":{"data":{"children":[{"name":"token","value":"eab0d8cf-d6fb-4aa4-8dd8-4ca727fa4dff"},{"name":"validUntil","value":"1769085448657"},{"name":"renewUntil","value":"1769171248657"},{"name":"userId","value":"user:9091016887765767"},{"name":"loginId","value":"leoda622@user.uu.se"},{"name":"firstName","value":"Leo"},{"name":"lastName","value":"Danielsson"},{"repeatId":"1","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"uu"}],"name":"permissionUnit"},{"repeatId":"2","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"hh"}],"name":"permissionUnit"},{"repeatId":"3","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"miun"}],"name":"permissionUnit"},{"repeatId":"4","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"hig"}],"name":"permissionUnit"},{"repeatId":"5","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"naturvardsverket"}],"name":"permissionUnit"},{"repeatId":"6","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"kkh"}],"name":"permissionUnit"},{"repeatId":"7","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"hv"}],"name":"permissionUnit"},{"repeatId":"8","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"fmv"}],"name":"permissionUnit"},{"repeatId":"9","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"du"}],"name":"permissionUnit"},{"repeatId":"10","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"skh"}],"name":"permissionUnit"},{"repeatId":"11","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"mchs"}],"name":"permissionUnit"},{"repeatId":"12","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"his"}],"name":"permissionUnit"},{"repeatId":"13","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"raa"}],"name":"permissionUnit"},{"repeatId":"14","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"liu"}],"name":"permissionUnit"},{"repeatId":"15","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"norden"}],"name":"permissionUnit"},{"repeatId":"16","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"kth"}],"name":"permissionUnit"},{"repeatId":"17","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"riksarkivet"}],"name":"permissionUnit"},{"repeatId":"18","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"nrm"}],"name":"permissionUnit"},{"repeatId":"19","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"isof"}],"name":"permissionUnit"},{"repeatId":"20","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"ehs"}],"name":"permissionUnit"},{"repeatId":"21","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"lnu"}],"name":"permissionUnit"},{"repeatId":"22","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"shh"}],"name":"permissionUnit"},{"repeatId":"23","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"konstfack"}],"name":"permissionUnit"},{"repeatId":"24","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"nai"}],"name":"permissionUnit"},{"repeatId":"25","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"havochvatten"}],"name":"permissionUnit"},{"repeatId":"26","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"ri"}],"name":"permissionUnit"},{"repeatId":"27","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"trafikverket"}],"name":"permissionUnit"},{"repeatId":"28","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"mdu"}],"name":"permissionUnit"},{"repeatId":"29","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"gih"}],"name":"permissionUnit"},{"repeatId":"30","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"kmh"}],"name":"permissionUnit"},{"repeatId":"31","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"ju"}],"name":"permissionUnit"},{"repeatId":"32","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"rkh"}],"name":"permissionUnit"},{"repeatId":"33","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"nationalmuseum"}],"name":"permissionUnit"},{"repeatId":"34","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"sh"}],"name":"permissionUnit"},{"repeatId":"35","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"swedgeo"}],"name":"permissionUnit"},{"repeatId":"36","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"bth"}],"name":"permissionUnit"},{"repeatId":"37","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"umu"}],"name":"permissionUnit"},{"repeatId":"38","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"kau"}],"name":"permissionUnit"},{"repeatId":"39","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"ivl"}],"name":"permissionUnit"},{"repeatId":"40","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"polar"}],"name":"permissionUnit"},{"repeatId":"41","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"mau"}],"name":"permissionUnit"},{"repeatId":"42","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"su"}],"name":"permissionUnit"},{"repeatId":"43","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"vti"}],"name":"permissionUnit"},{"repeatId":"44","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"ltu"}],"name":"permissionUnit"},{"repeatId":"45","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"smhi"}],"name":"permissionUnit"},{"repeatId":"46","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"fhs"}],"name":"permissionUnit"},{"repeatId":"47","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"nordiskamuseet"}],"name":"permissionUnit"},{"repeatId":"48","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"oru"}],"name":"permissionUnit"},{"repeatId":"49","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"hb"}],"name":"permissionUnit"},{"repeatId":"50","children":[{"name":"linkedRecordType","value":"permissionUnit"},{"name":"linkedRecordId","value":"diva"}],"name":"permissionUnit"}],"name":"authToken"},"actionLinks":{"renew":{"requestMethod":"POST","rel":"renew","url":"https://pre.diva-portal.org/login/rest/authToken/d45d28c1-b9c3-47d6-bb2a-6c0872dab08e","accept":"application/vnd.cora.authentication+json"},"delete":{"requestMethod":"DELETE","rel":"delete","url":"https://pre.diva-portal.org/login/rest/authToken/d45d28c1-b9c3-47d6-bb2a-6c0872dab08e"}}}}'
        />
        <input name='returnTo' value='%2Flogin' />
        <button type='submit'>KÖR</button>
      </form>

      <h1>{t('divaClient_LoginText')}</h1>
      <div className='login-options'>
        {passwordLoginUnits.length > 0 && (
          <PasswordLoginOptions
            passwordLoginUnits={passwordLoginUnits}
            returnTo={returnTo}
          />
        )}
        {webRedirectLoginUnits.length > 0 && (
          <WebRedirectLoginOptions
            webRedirectLoginUnits={webRedirectLoginUnits}
          />
        )}
      </div>
    </main>
  );
}
