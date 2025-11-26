import { Button } from '@/components/Button/Button';
import bgImage from '@/images/A_Cold_September_Day_in_Medelpad__Carl_Johansson__-_Nationalmuseum_-_18620.tif_hero.webp';
import bgImageNordiska from '@/images/Stockholm_August_2020_-_Kastellet__Vasa_Museum__and_Nordic_Museum_hero.webp';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpenIcon,
  ChartGanttIcon,
  SearchIcon,
  UsersIcon,
} from 'lucide-react';
import {
  Form,
  Link,
  NavLink,
  href,
  type LoaderFunctionArgs,
} from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/landingPage';
import css from './landingPage.css?url';
import type { ReactNode } from 'react';
import { loader as rootLoader } from '../root';
import { useRouteLoaderData } from 'react-router';
import { icons } from '@/components/Layout/TopNavigation/TopNavigation';
import { useTranslation } from 'react-i18next';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { CircularLoader } from '@/components/Loader/CircularLoader';

export const loader = ({ request, context }: LoaderFunctionArgs) => {
  const { dependencies } = context.get(dependenciesContext);
  const i18n = context.get(i18nContext);
  const language = i18n.language as 'sv' | 'en';
  const member = getMemberFromHostname(request, dependencies);
  const title = member
    ? member.id !== 'diva'
      ? `DiVA – ${member.pageTitle[language]}`
      : 'DiVA'
    : 'DiVA';
  return {
    title,
    heroImage: heroImages[member?.id ?? 'default'] ?? heroImages['default'],
  };
};

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: loaderData.title },
  {
    description:
      'DiVA är en gemensam plattform för att publicera, lagra och söka forskningsinformation och studentuppsatser från ett stort antal svenska lärosäten och forskningsinstitut.',
  },
];

export default function LandingPage({ loaderData }: Route.ComponentProps) {
  const { title, heroImage } = loaderData;
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>('root');
  const recordTypes = rootLoaderData?.recordTypes ?? [];
  const { t } = useTranslation();
  return (
    <main className='landing-main'>
      <div className='hero-container'>
        <figure className='hero-background'>
          <img src={heroImage.url} alt='' className='hero-image' />
          <figcaption className='image-credit'>
            <details>
              <summary>Bildkälla</summary>
              <ImageAttribution attribution={heroImage.attribution} />
            </details>
          </figcaption>
        </figure>

        <h1 className='hero-title'>{title}</h1>
        <div className='hero-subtitle'>
          Sök bland Nordiska museets publikationer
        </div>

        <Form
          action={href('/:recordType', { recordType: 'diva-output' })}
          className='search-form'
          method='GET'
          viewTransition
        >
          <input type='hidden' name='search.rows.value' value='10' />
          <input
            type='hidden'
            name='search.include.includePart.permissionUnitSearchTerm.value'
            value='permissionUnit_nordiskamuseet'
          />
          <div className='search-container'>
            <label className='search-label' htmlFor='landing-search'>
              Sök efter publikationer
            </label>
            <input
              placeholder='Sök efter publikationer'
              id='landing-search'
              type='search'
              className='search-input'
              name='search.include.includePart.genericSearchTerm.value'
            />
            <button type='submit' className='search-button'>
              <SearchIcon fontSize='1.5rem' />
            </button>
          </div>
        </Form>
      </div>
      <div className='navigation-grid'>
        <NavigationCard
          to={href('/:recordType', { recordType: 'diva-output' })}
          icon={BookOpenIcon}
          iconColor='card-icon-publications'
          title='Publikationer'
          description='Sök bland publikationer och annan output'
        />
        <NavigationCard
          to={href('/:recordType', { recordType: 'diva-person' })}
          icon={UsersIcon}
          iconColor='card-icon-people'
          title='Personer'
          description='Hitta forskare och författare'
        />
        <NavigationCard
          to={href('/:recordType', { recordType: 'diva-project' })}
          icon={ChartGanttIcon}
          iconColor='card-icon-projects'
          title='Projekt'
          description='Utforska forskningsprojekt'
        />
      </div>
      <section className='other-record-types'>
        <h2>Alla posttyper</h2>
        <nav>
          <ul>
            {recordTypes.map((recordType) => (
              <li key={recordType.id}>
                <NavLink
                  className='other-record-type-link'
                  to={href('/:recordType', { recordType: recordType.id })}
                >
                  {({ isPending }) => (
                    <>
                      {isPending ? <CircularLoader /> : icons[recordType.id]}
                      <h3>{t(recordType.textId)}</h3>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <footer className='landing-footer'>
        <div className='footer-links'>
          <Button
            variant='tertiary'
            as='a'
            href='https://www.info.diva-portal.org/w/diva/om-diva/diva-portalernas-tillganglighetsredogorelse'
            className='footer-link'
          >
            Tillgänglighet
          </Button>
          <Button
            variant='tertiary'
            as='a'
            href='https://www.info.diva-portal.org/w/diva/om-diva'
            className='footer-link'
          >
            Om DiVA
          </Button>
          <Button
            variant='tertiary'
            as='a'
            href='/rest'
            className='footer-link'
          >
            REST API
          </Button>
        </div>
      </footer>
    </main>
  );
}

interface NavigationCardProps {
  to: string;
  icon?: LucideIcon;
  iconNode?: ReactNode;
  iconColor: string;
  title: string;
  description?: string;
}

function NavigationCard({
  to,
  icon: Icon,
  iconNode,
  iconColor,
  title,
  description,
}: NavigationCardProps) {
  return (
    <Link to={to} className='navigation-link' viewTransition>
      <div className='navigation-card'>
        {Icon ? <Icon className={`card-icon ${iconColor}`} /> : iconNode}
        <h2 className='card-title'>{title}</h2>
        <p className='card-description'>{description}</p>
      </div>
    </Link>
  );
}

const heroImages: Record<
  string,
  { url: string; attribution: ImageAttribution }
> = {
  nordiskamuseet: {
    url: bgImageNordiska,
    attribution: {
      author: 'Martin Falbisoner',
      source: {
        text: 'Wikimedia Commons',
        link: 'https://commons.wikimedia.org/wiki/File:Stockholm_August_2020_-_Kastellet,_Vasa_Museum,_and_Nordic_Museum.jpg',
      },
      license: {
        text: 'CC BY-SA 4.0',
        link: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    },
  },
  default: {
    url: bgImage,
    attribution: {
      title: 'Carl Johansson: A Cold September Day in Medelpad',
      author: 'Nationalmuseum (Foto: Rickard Karlsson)',
      source: {
        text: 'Wikimedia Commons',
        link: 'https://commons.wikimedia.org/wiki/File:A_Cold_September_Day_in_Medelpad_(Carl_Johansson)_-_Nationalmuseum_-_18620.tif',
      },
      license: {
        text: 'Public Domain',
      },
    },
  },
};

interface ImageAttribution {
  title?: string;
  author?: string;
  source: {
    text: string;
    link: string;
  };
  license: {
    text: string;
    link?: string;
  };
}

const ImageAttribution = ({
  attribution,
}: {
  attribution: ImageAttribution;
}) => {
  const fragments = [
    attribution.title,
    attribution.author,
    <>
      <a
        href={attribution.source.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        {attribution.source.text}
      </a>
    </>,
    attribution.license.link ? (
      <a
        href={attribution.license.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        {attribution.license.text}
      </a>
    ) : (
      attribution.license.text
    ),
  ];
  return (
    <div className='image-attribution'>
      {fragments.filter(Boolean).reduce<ReactNode[]>((prev, curr, index) => {
        if (index === 0) {
          return [curr];
        } else {
          return [...prev, ', ', curr];
        }
      }, [])}
    </div>
  );
};
