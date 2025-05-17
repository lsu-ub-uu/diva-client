import { Link, NavLink, Outlet } from 'react-router';
import type { Route } from './+types/apiDocs';
import { useTranslation } from 'react-i18next';
import css from './apiDocs.css?url';
import { useState } from 'react';
import { ChevronDownIcon } from '@/icons';

export const links = () => [{ rel: 'stylesheet', href: css }];

export async function loader({ context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const recordTypes = Array.from(dependencies.recordTypePool.values())
    .filter((recordType) => recordType.id.indexOf('diva-') >= 0)
    .map((recordType) => ({
      ...recordType,
      validationTypes: Array.from(
        dependencies.validationTypePool.values(),
      ).filter(
        (validationType) =>
          validationType.validatesRecordTypeId === recordType.id,
      ),
    }));

  const metadataPool = Object.fromEntries(dependencies.metadataPool.entries());

  return {
    recordTypes,
    metadataPool,
    breadcrumb: 'API Documentation',
  };
}

export default function ApiDocs({ loaderData }: Route.ComponentProps) {
  const { recordTypes } = loaderData;
  const { t } = useTranslation();
  return (
    <div>
      <h1>API Documentation</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <h2>Record types</h2>
          <nav className='api-docs-nav'>
            <ul>
              {recordTypes.map((recordType) => (
                <li key={recordType.id}>
                  {recordType.validationTypes.length === 1 ? (
                    <NavLink
                      to={`/api-docs/${recordType.id}/${recordType.validationTypes[0].id}`}
                    >
                      {t(recordType.textId)}
                    </NavLink>
                  ) : (
                    <ExpandableRecordTypeNavItem recordType={recordType} />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

const ExpandableRecordTypeNavItem = ({ recordType }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <span
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer' }}
      >
        {t(recordType.textId)}{' '}
        <ChevronDownIcon
          style={{
            display: 'inline',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </span>
      {expanded && (
        <ul style={{ paddingLeft: '1rem' }}>
          {recordType.validationTypes.map((type) => (
            <li key={type.id}>
              <NavLink to={`/api-docs/${recordType.id}/${type.id}`}>
                {t(type.nameTextId)}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
