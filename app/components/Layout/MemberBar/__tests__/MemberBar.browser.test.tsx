import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import type { BFFMember, BFFMemberHero } from '@/cora/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';

vi.mock('@/i18n/useLanguage');

describe('<MemberBar />', () => {
  it('sets background and text color from member', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

    const memberBarEl = screen.getByLabelText('Uppsala universitet').element();
    expect(
      memberBarEl.style.getPropertyValue('--member-background-color'),
    ).toBe('#111111');
    expect(memberBarEl.style.getPropertyValue('--member-text-color')).toBe(
      '#FFFFFF',
    );
    expect(
      memberBarEl.style.getPropertyValue('--member-background-color-dark-mode'),
    ).toBe('#111111');
    expect(
      memberBarEl.style.getPropertyValue('--member-text-color-dark-mode'),
    ).toBe('#FFFFFF');
  });

  it('sets dark mode background and text color from member', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

    const memberBarEl = screen.getByLabelText('Uppsala universitet').element();
    expect(
      memberBarEl.style.getPropertyValue('--member-background-color'),
    ).toBe('#111111');
    expect(memberBarEl.style.getPropertyValue('--member-text-color')).toBe(
      '#FFFFFF',
    );
    expect(
      memberBarEl.style.getPropertyValue('--member-background-color-dark-mode'),
    ).toBe('#222222');
    expect(
      memberBarEl.style.getPropertyValue('--member-text-color-dark-mode'),
    ).toBe('#EEEEEE');
  });

  it('shows svg logo if present in member', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

    expect(
      screen.getByRole('img', { name: 'Uppsala universitet logo' }).element()
        .innerHTML,
    ).toEqual(member.logo.svg);
  });

  it('shows english links when language is english', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

    await expect
      .element(
        screen
          .getByRole('link', { name: 'Uppsala University Library' })
          .first(),
      )
      .toHaveAttribute('href', 'https://www.uu.se/en/library');

    await expect
      .element(screen.getByRole('link', { name: 'Url for everyone' }).first())
      .toHaveAttribute('href', 'http://someUrlForAll.com/en');

    await expect
      .element(screen.getByRole('link', { name: 'Ask the Library' }))
      .not.toBeInTheDocument();

    await expect
      .element(
        screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
      )
      .not.toBeInTheDocument();

    await expect
      .element(screen.getByRole('link', { name: 'Fråga biblioteket' }))
      .not.toBeInTheDocument();

    await expect
      .element(screen.getByRole('link', { name: 'Url för alla' }))
      .not.toBeInTheDocument();
  });

  it('shows swedish links when language is swedish', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

    await expect
      .element(
        screen
          .getByRole('link', { name: 'Uppsala universitetsbibliotek' })
          .first(),
      )
      .toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    await expect
      .element(screen.getByRole('link', { name: 'Url för alla' }).first())
      .toHaveAttribute('href', 'http://someUrlForAll.se');

    await expect
      .element(screen.getByRole('link', { name: 'Fråga biblioteket' }))
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByRole('link', { name: 'Uppsala University Library' }))
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByRole('link', { name: 'Ask the Library' }))
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByRole('link', { name: 'Url for everyone' }))
      .not.toBeInTheDocument();
  });

  it('shows admin and all links when logged in in swedish', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={true} />);

    await expect
      .element(screen.getByRole('link', { name: 'Fråga biblioteket' }).first())
      .toHaveAttribute('href', 'http://libanswers.ub.uu.se');

    await expect
      .element(screen.getByRole('link', { name: 'Url för alla' }).first())
      .toHaveAttribute('href', 'http://someUrlForAll.se');

    await expect
      .element(
        screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }),
      )
      .not.toBeInTheDocument();

    await expect
      .element(screen.getByRole('link', { name: 'Uppsala University Library' }))
      .not.toBeInTheDocument();
  });

  it('shows public and all links when not logged in in swedish', async () => {
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

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

    await expect
      .element(
        screen
          .getByRole('link', { name: 'Uppsala universitetsbibliotek' })
          .first(),
      )
      .toHaveAttribute('href', 'https://www.uu.se/bibliotek');

    await expect
      .element(screen.getByRole('link', { name: 'Url för alla' }).first())
      .toHaveAttribute('href', 'http://someUrlForAll.se');

    await expect
      .element(screen.getByRole('link', { name: 'Fråga biblioteket' }))
      .not.toBeInTheDocument();
  });

  it('renders children', async () => {
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

    const screen = await render(
      <MemberBar member={member} loggedIn={false}>
        <p>Some children</p>
      </MemberBar>,
    );

    await expect.element(screen.getByText('Some children')).toBeVisible();
  });

  it('shows memberbar popover menu on small screens', async () => {
    await page.viewport(375, 800);
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
      ],
      logo: {},
      loginUnitIds: [],
      hero: {} as BFFMemberHero,
    } as BFFMember;

    const screen = await render(<MemberBar member={member} loggedIn={false} />);

      const triggerButton = screen.getByRole('button', { name: 'divaClient_memberBarLinksText' });
    await triggerButton.click();


    await expect
      .element(screen.getByRole('link', { name: 'Uppsala universitetsbibliotek' }))
      .toHaveAttribute('href', 'https://www.uu.se/bibliotek');
  });
});
