import { Button } from '@/components/Button/Button';
import bgIMage from '@/images/A_Cold_September_Day_in_Medelpad__Carl_Johansson__-_Nationalmuseum_-_18620.tif_hero.webp';
import bgIMageNordiska from '@/images/Stockholm_August_2020_-_Kastellet__Vasa_Museum__and_Nordic_Museum_hero.webp';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpenIcon,
  ChartGanttIcon,
  SearchIcon,
  UsersIcon,
} from 'lucide-react';
import { Form, Link, href, type LoaderFunctionArgs } from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/landingPage';
import css from './landingPage.css?url';

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
    image: member?.id === 'nordiskamuseet' ? bgIMageNordiska : bgIMage,
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
  const { title, image } = loaderData;

  return (
    <main className='landing-main'>
      <div className='hero-container'>
        <figure className='hero-background'>
          <img src={image} alt='' className='hero-image' />
          <figcaption className='image-credit'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://commons.wikimedia.org/wiki/File:A_Cold_September_Day_in_Medelpad_(Carl_Johansson)_-_Nationalmuseum_-_18620.tif#'
            >
              Bild: Wikimedia Commons
            </a>
          </figcaption>
        </figure>

        <h1 className='hero-title'>{title}</h1>
        <div className='hero-subtitle'>Digitala vetenskapliga arkivet</div>

        <Form
          action={href('/:recordType', { recordType: 'diva-output' })}
          className='search-form'
          method='GET'
        >
          <input type='hidden' name='search.rows.value' value='10' />
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
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

function NavigationCard({
  to,
  icon: Icon,
  iconColor,
  title,
  description,
}: NavigationCardProps) {
  return (
    <Link to={to} className='navigation-link' viewTransition>
      <div className='navigation-card'>
        <Icon className={`card-icon ${iconColor}`} />
        <h3 className='card-title'>{title}</h3>
        <p className='card-description'>{description}</p>
      </div>
    </Link>
  );
}
