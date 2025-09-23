import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router';
import type { Route } from './+types/apiDocsValidationType';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';

export async function loader({ params, context }: Route.LoaderArgs) {
  const { dependencies } = context.get(dependenciesContext);
  const validationType = dependencies.validationTypePool.get(
    params.validationType,
  );
  const { t } = context.get(i18nContext);

  return {
    validationType,
    breadcrumb: t(validationType.nameTextId),
  };
}

export default function ValidationTypeRoute({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const { validationType } = loaderData;
  return (
    <div>
      <h2>{t(validationType.nameTextId)}</h2>
      <nav className='api-docs-nav method-nav'>
        <ul>
          <li>
            <NavLink to='read' preventScrollReset>
              Read
            </NavLink>
          </li>
          <li>
            <NavLink to='update' preventScrollReset>
              Update
            </NavLink>
          </li>
          <li>
            <NavLink to='create' preventScrollReset>
              Create
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
