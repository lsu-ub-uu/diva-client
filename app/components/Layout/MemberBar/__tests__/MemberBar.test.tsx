import { render, screen } from '@testing-library/react';
import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import { useLanguage } from '@/i18n/useLanguage';

vi.mock('@/i18n/useLanguage');

const temp = {
  id: 'uu-theme',
  pageTitle: {
    sv: 'Uppsala Universitet',
    en: 'Uppsala University',
  },
  backgroundColor: '#CCCCCC',
  textColor: '#990000',
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
  adminLinks: [
    {
      sv: {
        url: 'https://www.uu.se/support',
        displayLabel: 'Kontakta support',
      },
      en: {
        url: 'https://www.uu.se/en/support',
        displayLabel: 'Contact support',
      },
    },
  ],
  logo: {
    svg: '<svg></svg>',
  },
  hostnames: ['uu.localhost', 'uu.cora.epc.ub.uu.se', 'uu.pre.diva-portal.org'],
};

describe('<MemberBar />', () => {
  it('sets background and text color from theme', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const theme = {
      id: 'uu-theme',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      publicLinks: [],
      logo: {},
    };

    render(<MemberBar theme={theme} loggedIn={false} />);

    expect(screen.getByLabelText('Uppsala universitet')).toHaveStyle({
      backgroundColor: '#111111',
      color: '#FFFFFF',
    });
  });

  it('shows svg logo if present in theme', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const theme = {
      id: 'uu-theme',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      logo: {
        svg: '<svg><title>Uppsala universitet svg</title></svg>',
      },
      publicLinks: [],
    };

    render(<MemberBar theme={theme} loggedIn={false} />);

    expect(
      screen.getByRole('img', { name: 'Uppsala universitet logo' }).innerHTML,
    ).toEqual(theme.logo.svg);
  });

  it('shows image logo if present and svg not present in theme', () => {
    vi.mocked(useLanguage).mockReturnValue('sv');

    const theme = {
      id: 'uu-theme',
      hostnames: ['uu.diva-portal.org'],
      pageTitle: { sv: 'Uppsala universitet', en: 'Uppsala University' },
      backgroundColor: '#111111',
      textColor: '#FFFFFF',
      logo: {
        url: 'https://www.uu.se/logo.png',
      },
    };

    render(<MemberBar theme={theme} loggedIn={false} />);

    expect(
      screen.getByRole('img', { name: 'Uppsala universitet logo' }),
    ).toHaveAttribute('src', theme.logo.url);
  });

  it('shows english links when language is english', () => {
    vi.mocked(useLanguage).mockReturnValue('en');

    const theme = {
      id: 'uu-theme',
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
    };

    render(<MemberBar theme={theme} loggedIn={false} />);

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

    const theme = {
      id: 'uu-theme',
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
    };

    render(<MemberBar theme={theme} loggedIn={false} />);

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

    const theme = {
      id: 'uu-theme',
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
    };

    render(<MemberBar theme={theme} loggedIn={true} />);

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

    const theme = {
      id: 'uu-theme',
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
    };

    render(<MemberBar theme={theme} loggedIn={false} />);

    expect(
      screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
    ).toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    expect(
      screen.queryByRole('link', { name: 'Kontakta DiVA support' }),
    ).not.toBeInTheDocument();
  });
});
