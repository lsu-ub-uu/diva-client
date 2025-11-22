import bgIMage from '@/images/A_Cold_September_Day_in_Medelpad_(Carl_Johansson)_-_Nationalmuseum_-_18620.tif.jpg';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpenIcon,
  ChartGanttIcon,
  SearchIcon,
  UsersIcon,
} from 'lucide-react';
import { Form, Link, href } from 'react-router';
import css from './landingPage.css?url';
import type { Route } from '../+types/root';

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
    <Link to={to} className='navigation-link'>
      <div className='navigation-card'>
        <Icon className={`card-icon ${iconColor}`} />
        <h3 className='card-title'>{title}</h3>
        <p className='card-description'>{description}</p>
      </div>
    </Link>
  );
}

export const loader = () => {};

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: css },
];

export default function LandingPage() {
  return (
    <main className='landing-main'>
      <div className='hero-container'>
        <div
          className='hero-background'
          style={{
            background: `url('${bgIMage}')`,
          }}
        />

        <h1 className='hero-title'>DiVA</h1>
        <div className='hero-subtitle'>Digitala vetenskapliga arkivet</div>

        <Form
          action={href('/:recordType', { recordType: 'diva-output' })}
          className='search-form'
          method='GET'
        >
          <input type='hidden' name='search.rows.value' value='10' />
          <div className='search-container'>
            <input
              type='search'
              placeholder='Sök bland publikationer'
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
          iconColor='card-icon--publications'
          title='Publikationer'
          description='Sök bland publikationer och annan output'
        />
        <NavigationCard
          to={href('/:recordType', { recordType: 'diva-person' })}
          icon={UsersIcon}
          iconColor='card-icon--people'
          title='Personer'
          description='Hitta forskare och författare'
        />
        <NavigationCard
          to={href('/:recordType', { recordType: 'diva-project' })}
          icon={ChartGanttIcon}
          iconColor='card-icon--projects'
          title='Projekt'
          description='Utforska forskningsprojekt'
        />
      </div>

      <footer className='landing-footer'>
        <div className='footer-links'>
          <a
            href='https://www.info.diva-portal.org/w/diva/om-diva/diva-portalernas-tillganglighetsredogorelse'
            className='footer-link'
          >
            Tillgänglighet
          </a>
          <a
            href='https://www.info.diva-portal.org/w/diva/om-diva'
            className='footer-link'
          >
            Om DiVA
          </a>
          <a href='/rest' className='footer-link'>
            REST API
          </a>
        </div>
      </footer>
    </main>
  );
}
