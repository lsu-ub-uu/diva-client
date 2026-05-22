import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import type { BFFMember, BFFMemberHero } from '@/cora/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/i18n/useLanguage');

describe('<MemberBar />', () => {
  it('sets background and text color from member', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      links: [],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={false} />);

    expect(screen.getByLabelText('Uppsala universitet')).toHaveStyle({
      '--member-background-color': '#111111',
      '--member-text-color': '#FFFFFF',
      '--member-background-color-dark-mode': '#111111',
      '--member-text-color-dark-mode': '#FFFFFF',
    });
  });

  it('sets dark mode background and text color from member', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      backgroundColorDarkMode: '#222222',
      textColorDarkMode: '#EEEEEE',
      links: [],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={false} />);

    expect(screen.getByLabelText('Uppsala universitet')).toHaveStyle({
      '--member-background-color': '#111111',
      '--member-text-color': '#FFFFFF',
      '--member-background-color-dark-mode': '#222222',
      '--member-text-color-dark-mode': '#EEEEEE',
    });
  });
  it('shows svg logo if present in member', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      logo: {
        svg: '<svg><title>Uppsala universitet svg</title></svg>',
      },
      links: [],
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('img', { name: 'Uppsala universitet logo' }).innerHTML,
    ).toEqual(member.logo.svg);
  });

  it('shows english links when language is english', () => {
    vi.mocked(useLanguage).mockReturnValue('en');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      links: [
        {
          lang: 'swe',
          visibility: 'public',
          url: 'https://www.uu.se/bibliotek',
          displayLabel: 'Uppsala universitetsbibliotek',
        },
        {
          lang: 'swe',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se',
          displayLabel: 'Fråga biblioteket',
        },
        {
          lang: 'swe',
          visibility: 'all',
          url: 'http://someUrlForAll.se',
          displayLabel: 'Url för alla',
        },
        {
          lang: 'eng',
          visibility: 'public',
          url: 'https://www.uu.se/en/library',
          displayLabel: 'Uppsala University Library',
        },
        {
          lang: 'eng',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se/en',
          displayLabel: 'Ask the Library',
        },
        {
          lang: 'eng',
          visibility: 'all',
          url: 'http://someUrlForAll.com/en',
          displayLabel: 'Url for everyone',
        },
      ],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala University Library' }),
    ).toHaveAttribute('href', 'https://www.uu.se/en/library');

    expect(
      screen.getByRole('link', { name: 'Url for everyone' }),
    ).toHaveAttribute('href', 'http://someUrlForAll.com/en');

    expect(
      screen.queryByRole('link', { name: 'Ask the Library' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'Fråga biblioteket' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'Url för alla' }),
    ).not.toBeInTheDocument();
  });

  it('shows swedish links when language is swedish', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      links: [
        {
          lang: 'swe',
          visibility: 'public',
          url: 'https://www.uu.se/bibliotek',
          displayLabel: 'Uppsala universitetsbibliotek',
        },
        {
          lang: 'swe',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se',
          displayLabel: 'Fråga biblioteket',
        },
        {
          lang: 'swe',
          visibility: 'all',
          url: 'http://someUrlForAll.se',
          displayLabel: 'Url för alla',
        },
        {
          lang: 'eng',
          visibility: 'public',
          url: 'https://www.uu.se/en/library',
          displayLabel: 'Uppsala University Library',
        },
        {
          lang: 'eng',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se/en',
          displayLabel: 'Ask the Library',
        },
        {
          lang: 'eng',
          visibility: 'all',
          url: 'http://someUrlForAll.com/en',
          displayLabel: 'Url for everyone',
        },
      ],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    expect(screen.getByRole('link', { name: 'Url för alla' })).toHaveAttribute(
      'href',
      'http://someUrlForAll.se',
    );

    expect(
      screen.queryByRole('link', { name: 'Fråga biblioteket' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Uppsala University Library' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Ask the Library' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Url for everyone' }),
    ).not.toBeInTheDocument();
  });

  it('shows admin and all links when logged in in swedish', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      links: [
        {
          lang: 'swe',
          visibility: 'public',
          url: 'https://www.uu.se/bibliotek',
          displayLabel: 'Uppsala universitetsbibliotek',
        },
        {
          lang: 'swe',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se',
          displayLabel: 'Fråga biblioteket',
        },
        {
          lang: 'swe',
          visibility: 'all',
          url: 'http://someUrlForAll.se',
          displayLabel: 'Url för alla',
        },
        {
          lang: 'eng',
          visibility: 'public',
          url: 'https://www.uu.se/en/library',
          displayLabel: 'Uppsala University Library',
        },
        {
          lang: 'eng',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se/en',
          displayLabel: 'Ask the Library',
        },
        {
          lang: 'eng',
          visibility: 'all',
          url: 'http://someUrlForAll.com/en',
          displayLabel: 'Url for everyone',
        },
      ],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={true} />);

    expect(
      screen.getByRole('link', { name: 'Fråga biblioteket' }),
    ).toHaveAttribute('href', 'http://libanswers.ub.uu.se');

    expect(screen.getByRole('link', { name: 'Url för alla' })).toHaveAttribute(
      'href',
      'http://someUrlForAll.se',
    );

    expect(
      screen.queryByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'Uppsala University Library' }),
    ).not.toBeInTheDocument();
  });

  it('shows public and all links when not logged in in swedish', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      links: [
        {
          lang: 'swe',
          visibility: 'public',
          url: 'https://www.uu.se/bibliotek',
          displayLabel: 'Uppsala universitetsbibliotek',
        },
        {
          lang: 'swe',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se',
          displayLabel: 'Fråga biblioteket',
        },
        {
          lang: 'swe',
          visibility: 'all',
          url: 'http://someUrlForAll.se',
          displayLabel: 'Url för alla',
        },
        {
          lang: 'eng',
          visibility: 'public',
          url: 'https://www.uu.se/en/library',
          displayLabel: 'Uppsala University Library',
        },
        {
          lang: 'eng',
          visibility: 'admin',
          url: 'http://libanswers.ub.uu.se/en',
          displayLabel: 'Ask the Library',
        },
        {
          lang: 'eng',
          visibility: 'all',
          url: 'http://someUrlForAll.com/en',
          displayLabel: 'Url for everyone',
        },
      ],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    expect(screen.getByRole('link', { name: 'Url för alla' })).toHaveAttribute(
      'href',
      'http://someUrlForAll.se',
    );

    expect(
      screen.queryByRole('link', { name: 'Fråga biblioteket' }),
    ).not.toBeInTheDocument();
  });

  it('renders children', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    render(
      <MemberBar member={member} loggedIn={false}>
        <p>Some children</p>
      </MemberBar>,
    );

    expect(screen.getByText('Some children')).toBeInTheDocument();
  });
});
