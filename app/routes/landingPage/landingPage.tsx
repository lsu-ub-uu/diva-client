import { sessionContext } from '@/auth/sessionMiddleware.server';
import { icons } from '@/components/Layout/Header/TopNavigation/TopNavigation';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Form,
  href,
  NavLink,
  redirect,
  useRouteLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
import { getDependencies } from 'server/dependencies/depencencies';
import { i18nContext } from 'server/i18n';
import { loader as rootLoader } from '../../root';
import type { Route } from './+types/landingPage';
import { Hero } from './Hero';
import css from './landingPage.css?url';
import { NavigationCard } from './NavigationCard';

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const auth = context.get(sessionContext);

  if (auth?.auth?.data.token) {
    return redirect(href('/:recordType', { recordType: 'diva-output' }));
  }

  const i18n = context.get(i18nContext);
  const language = i18n.language as 'sv' | 'en';
  const dependencies = await getDependencies();
  const member = getMemberFromHostname(request, dependencies);
  const title = member
    ? member.id !== 'diva'
      ? `${i18n.t('divaClient_heroTitleText', { member: member.pageTitle[language] })}`
      : i18n.t('divaText')
    : i18n.t('divaText');

  const decription = i18n.t('divaClient_landingPageDescriptionText');
  return {
    title,
    decription,
    member,
  };
};

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: loaderData.title },
  {
    description: loaderData.decription,
  },
];

const navigationCardDescriptions: Record<string, string> = {
  'diva-output': 'divaClient_navigationCardPublicationDescriptionText',
  'diva-person': 'divaClient_navigationCardPersonDescriptionText',
  'diva-project': 'divaClient_navigationCardProjectDescriptionText',
};

export default function LandingPage({ loaderData }: Route.ComponentProps) {
  const { member } = loaderData;
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>('root');
  const navigation = rootLoaderData?.navigation;
  const { t } = useTranslation();

  return (
    <div className='landing-main'>
      <main>
        <Hero hero={member.hero}>
          <Form
            action={href('/:recordType', { recordType: 'diva-output' })}
            className='search-form'
            method='GET'
          >
            <div className='search-container'>
              <label className='search-label' htmlFor='landing-search'>
                {t('divaClient_heroLabelText')}
              </label>
              <input
                placeholder={t('divaClient_heroLabelText')}
                id='landing-search'
                type='search'
                className='search-input'
                name='q'
              />
              <button
                type='submit'
                className='search-button'
                aria-label={t('divaClient_SearchButtonText')}
              >
                <SearchIcon fontSize='1.5rem' />
              </button>
            </div>
          </Form>
        </Hero>
        {navigation && (
          <div className='navigation-grid'>
            {navigation.mainNavigationItems.map((navItem) => (
              <NavigationCard
                key={navItem.id}
                to={navItem.link}
                icon={icons[navItem.id]}
                title={t(navItem.textId)}
                iconColor={`card-icon-${navItem.id}`}
                description={t(navigationCardDescriptions[navItem.id])}
              />
            ))}
          </div>
        )}
        {navigation && navigation.otherNavigationItems.length > 0 && (
          <section className='other-record-types'>
            <h2>{t('divaClient_allRecordTypesText')}</h2>
            <nav>
              <ul>
                {navigation?.otherNavigationItems.map((navItem) => (
                  <li key={navItem.id}>
                    <NavLink
                      className='other-record-type-link'
                      to={href('/:recordType', { recordType: navItem.id })}
                    >
                      {({ isPending }) => (
                        <>
                          {isPending ? <CircularLoader /> : icons[navItem.id]}
                          <h3>{t(navItem.textId)}</h3>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        )}
      </main>
    </div>
  );
}
