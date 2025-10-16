import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
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
      publicLinks: [],
      logo: {},
      loginUnitIds: [],
    };

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
      publicLinks: [],
      logo: {},
      loginUnitIds: [],
    };

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
      publicLinks: [],
      loginUnitIds: [],
    };

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('img', { name: 'Uppsala universitet logo' }).innerHTML,
    ).toEqual(member.logo.svg);
  });

  it('shows image logo if present and svg not present in member', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      logo: {
        url: 'https://www.uu.se/logo.png',
      },
      loginUnitIds: [],
    };

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('img', { name: 'Uppsala universitet logo' }),
    ).toHaveAttribute('src', member.logo.url);
  });

  it('shows english links when language is english', () => {
    vi.mocked(useLanguage).mockReturnValue('en');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      publicLinks: [
        {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
        {
          sv: {
            url: 'http://libanswers.ub.uu.se',
            displayLabel: 'Fråga biblioteket',
          },
          en: {
            url: 'http://libanswers.ub.uu.se/en',
            displayLabel: 'Ask the Library',
          },
        },
      ],
      logo: {},
      loginUnitIds: [],
    };

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala University Library' }),
    ).toHaveAttribute('href', 'https://www.uu.se/en/library');

    expect(
      screen.getByRole('link', { name: 'Ask the Library' }),
    ).toHaveAttribute('href', 'http://libanswers.ub.uu.se/en');

    expect(
      screen.queryByRole('link', { name: 'Uppsala universitetsbibliotek' }),
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
      publicLinks: [
        {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
        {
          sv: {
            url: 'http://libanswers.ub.uu.se',
            displayLabel: 'Fråga biblioteket',
          },
          en: {
            url: 'http://libanswers.ub.uu.se/en',
            displayLabel: 'Ask the Library',
          },
        },
      ],
      logo: {},
      loginUnitIds: [],
    };

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    expect(
      screen.getByRole('link', { name: 'Fråga biblioteket' }),
    ).toHaveAttribute('href', 'http://libanswers.ub.uu.se');

    expect(
      screen.queryByRole('link', { name: 'Uppsala University Library' }),
    ).not.toBeInTheDocument();
  });

  it('shows admin link when logged in', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      publicLinks: [
        {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
      ],
      adminLinks: [
        {
          sv: {
            url: 'https://www.diva-portal.org/support',
            displayLabel: 'Kontakta DiVA support',
          },
          en: {
            url: 'https://www.diva-portal.org/support',
            displayLabel: 'Contect DiVA support',
          },
        },
        {
          sv: {
            url: 'https://www.uu.se/en/faq',
            displayLabel: 'Vanliga frågor',
          },
          en: {
            url: 'https://www.uu.se/en/faq',
            displayLabel: 'FAQ',
          },
        },
      ],
      logo: {},
      loginUnitIds: [],
    };

    render(<MemberBar member={member} loggedIn={true} />);

    expect(
      screen.getByRole('link', { name: 'Kontakta DiVA support' }),
    ).toHaveAttribute('href', 'https://www.diva-portal.org/support');

    expect(
      screen.getByRole('link', { name: 'Vanliga frågor' }),
    ).toHaveAttribute('href', 'https://www.uu.se/en/faq');

    expect(
      screen.queryByRole('link', { name: 'Uppsala University Library' }),
    ).not.toBeInTheDocument();
  });

  it('shows public link when not logged in', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const member = {
      id: 'uu-member',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      publicLinks: [
        {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
      ],
      adminLinks: [
        {
          sv: {
            url: 'https://www.diva-portal.org/support',
            displayLabel: 'Kontakta DiVA support',
          },
          en: {
            url: 'https://www.diva-portal.org/support',
            displayLabel: 'Contect DiVA support',
          },
        },
        {
          sv: {
            url: 'https://www.uu.se/en/faq',
            displayLabel: 'Vanliga frågor',
          },
          en: {
            url: 'https://www.uu.se/en/faq',
            displayLabel: 'FAQ',
          },
        },
      ],
      logo: {},
      loginUnitIds: [],
    };

    render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    expect(
      screen.queryByRole('link', { name: 'Kontakta DiVA support' }),
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
      publicLinks: [
        {
          sv: {
            url: 'https://www.uu.se/bibliotek',
            displayLabel: 'Uppsala universitetsbibliotek',
          },
          en: {
            url: 'https://www.uu.se/en/library',
            displayLabel: 'Uppsala University Library',
          },
        },
      ],
      adminLinks: [
        {
          sv: {
            url: 'https://www.diva-portal.org/support',
            displayLabel: 'Kontakta DiVA support',
          },
          en: {
            url: 'https://www.diva-portal.org/support',
            displayLabel: 'Contect DiVA support',
          },
        },
        {
          sv: {
            url: 'https://www.uu.se/en/faq',
            displayLabel: 'Vanliga frågor',
          },
          en: {
            url: 'https://www.uu.se/en/faq',
            displayLabel: 'FAQ',
          },
        },
      ],
      logo: {},
      loginUnitIds: [],
    };

    render(
      <MemberBar member={member} loggedIn={false}>
        <p>Some children</p>
      </MemberBar>,
    );

    expect(screen.getByText('Some children')).toBeInTheDocument();
  });
});
