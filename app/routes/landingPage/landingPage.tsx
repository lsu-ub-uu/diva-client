import { sessionContext } from '@/auth/sessionMiddleware.server';
import { icons } from '@/components/Layout/Header/TopNavigation/TopNavigation';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { useLanguage } from '@/i18n/useLanguage';
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
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import { loader as rootLoader } from '../../root';
import type { Route } from './+types/landingPage';
import { heroImages } from './heroImages';
import { ImageAttribution } from './ImageAttribution';
import css from './landingPage.css?url';
import { NavigationCard } from './NavigationCard';

export const loader = ({ request, context }: LoaderFunctionArgs) => {
  const auth = context.get(sessionContext);

  if (auth?.auth?.data.token) {
    return redirect(href('/:recordType', { recordType: 'diva-output' }));
  }

  const { dependencies } = context.get(dependenciesContext);
  const i18n = context.get(i18nContext);
  const language = i18n.language as 'sv' | 'en';
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
    heroImage: heroImages[member?.id ?? 'default'] ?? heroImages['default'],
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
  const { title, member, heroImage } = loaderData;
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>('root');
  const navigation = rootLoaderData?.navigation;
  const { t } = useTranslation();
  const language = useLanguage();

  return (
    <div className='landing-main'>
      <main>
        <div className='hero-container'>
          <figure className='hero-background'>
            <img src={heroImage.url} alt='' className='hero-image' />
            <figcaption className='image-credit'>
              <details>
                <summary>{t('divaClient_heroImageSourceText')}</summary>
                <ImageAttribution attribution={heroImage.attribution} />
              </details>
            </figcaption>
          </figure>

          <h1 className='hero-title'>{title}</h1>
          {member?.pageTitle[language] && (
            <div className='hero-subtitle'>
              {t('divaClient_heroSubtitleText', {
                member: member?.pageTitle[language],
              })}
            </div>
          )}

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
        </div>
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
