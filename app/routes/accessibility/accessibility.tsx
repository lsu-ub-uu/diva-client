/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useLanguage } from '@/i18n/useLanguage';
import { Article } from '@/components/Article/Article';
import type { Route } from './+types/accessibility';
import { i18nContext } from 'server/i18n';

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { t } = context.get(i18nContext);
  return { breadcrumb: t('divaClient_footerAccessibilityLinkText') };
};

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: `${loaderData.breadcrumb} | DiVA` },
];

const EnglishContent = () => (
  <>
    <header>
      <h1>Accessibility report</h1>
      <p>
        This document describes how the DiVA portal and the DiVA members&apos;
        individual portals meets the requirements of the Act on the
        Accessibility of Digital Public Services, any known accessibility
        problems and how you can report deficiencies to us so that we can remedy
        them. The DiVA consortium, which is managed by Uppsala University
        Library, is responsible for the website{' '}
        <a href='https://www.diva-portal.org/'>https://www.diva-portal.org/</a>{' '}
        while the individual members are responsible for their respective
        portals (https://www.[Domain].diva-portal.org/).
      </p>
      <p>
        The DiVA-portal and the individual members&apos; portals share the same
        underlying structure. Each members&apos; portal has certain layout
        elements, such as colour schemes, and logos that differentiate them.
      </p>
    </header>

    <section>
      <h2>How accessible is the website?</h2>
      <p>
        This website is compatible with the Act on the Accessibility of Digital
        Public Services.
      </p>
    </section>

    <section>
      <h2>What can you do if you can not use parts of the site?</h2>
      <p>
        If you need information from diva-portal.org in any other format, such
        as accessible PDF, large text, easy-to-read, audio recording or Braille,
        you can notify us via e-mail:{' '}
        <a href='mailto:diva-support@ub.uu.se'>diva-support@ub.uu.se</a>. Each
        DiVA member is responsible for their own files and content. If you want
        to share an opinion or report a problem, please contact{' '}
        <a href='mailto:diva-support@ub.uu.se'>diva-support@ub.uu.se</a> and we
        will forward your e-mail to the correct recipient.
      </p>
    </section>

    <section>
      <h2>Report deficiencies in website accessibility</h2>
      <p>
        We constantly strive to improve the website&apos;s accessibility. If you
        come across problems that are not described on this page, or if you
        believe we are not complying with the requirements of the law, please
        let us know so that we are aware of the problem&apos;s existence.
      </p>
    </section>

    <section>
      <h2>Supervision</h2>
      <p>
        The Agency for Digital Government is responsible for supervision of the
        Act on the Accessibility of Digital Public Services. If you are not
        satisfied with our response to your comments, you can contact the Agency
        for Digital Government and complain.
      </p>
    </section>

    <section>
      <h2>Technical information about the accessibility of the website</h2>
      <p>
        This website is compatible with Web Content Accessibility Guidelines
        (WCAG) version 2.1, level AA.
      </p>
      <p>The contents that are not accessible are described below.</p>
    </section>

    <section>
      <h2>The shortcomings of the website</h2>
      <p>
        Contents on diva-portal.org and local DiVA portals not available under
        WCAG A or AA is described below:
      </p>
      <ul>
        <li>
          Documents in PDF format and other document formats on the website may
          lack parts of the accessibility aspects specified in the directive as
          it has been deemed an unreasonably burdensome adaptation. [WCAG]
        </li>
      </ul>
    </section>

    <section>
      <h2>How we tested the site</h2>
      <p>
        We have conducted a self-assessment (internal evaluation) of the
        website. The most recent assessment was made on{' '}
        <time dateTime='2026-06-02'>2026-06-02</time>.
      </p>
      <p>
        The review was performed by system developers, support and local domain
        administrators as well as via tests using web-based accessibility tools.
      </p>
    </section>

    <footer className='last-updated'>
      Last updated: <time dateTime='2026-06'>June 2026</time>.
    </footer>
  </>
);

const SwedishContent = () => (
  <>
    <header>
      <h1>Tillgänglighetsredogörelse</h1>
      <p>
        Det här dokumentet beskriver hur den gemensamma DiVA-portalen och
        DiVA-medlemmarnas enskilda portaler uppfyller lagen om tillgänglighet
        till digital offentlig service, eventuella kända tillgänglighetsproblem
        och hur du kan rapportera brister till oss, så att vi kan åtgärda dem.
        DiVA-konsortiet, som förvaltas av Uppsala universitetsbibliotek,
        ansvarar för webbplatsen{' '}
        <a href='https://www.diva-portal.org/'>https://www.diva-portal.org/</a>{' '}
        medan de enskilda medlemmarna ansvarar för sina respektive portaler
        (https://www.[domän].diva-portal.org/).
      </p>
      <p>
        Den gemensamma sökportalen och de enskilda medlemmarnas portaler har
        samma struktur och uppbyggnad. Däremot finns layoutelement, som
        färgscheman och logotyper, som skiljer portalerna åt.
      </p>
    </header>

    <section>
      <h2>Hur tillgänglig är webbplatsen?</h2>
      <p>
        Den här webbplatsen är förenlig med lagen om tillgänglighet till digital
        offentlig service.
      </p>
    </section>

    <section>
      <h2>Vad kan du göra om du inte kan använda delar av webbplatsen?</h2>
      <p>
        Om du behöver information från diva-portal.org i något annat format,
        till exempel tillgänglig PDF, stor text, lättläst, ljudinspelning eller
        punktskrift kan du meddela oss via e-post:{' '}
        <a href='mailto:diva-support@ub.uu.se'>diva-support@ub.uu.se</a>.
        Eftersom DiVA-medlemmarna själva ansvarar för fulltexter och andra
        uppladdade filer är det främst till dessa Du ska höra av dig för
        information eller synpunkter. Du kan också kontakta{' '}
        <a href='mailto:diva-support@ub.uu.se'>diva-support@ub.uu.se</a> så
        vidarebefordrar vi din e-post till rätt mottagare.
      </p>
    </section>

    <section>
      <h2>Rapportera brister i webbplatsens tillgänglighet</h2>
      <p>
        Vi strävar hela tiden efter att förbättra webbplatsens tillgänglighet.
        Om du upptäcker problem som inte är beskrivna på den här sidan, eller om
        du anser att vi inte uppfyller lagens krav, så meddela oss så att vi får
        veta att problemet finns.
      </p>
    </section>

    <section>
      <h2>Tillsyn</h2>
      <p>
        Myndigheten för digital förvaltning (DIGG) har ansvaret för tillsyn för
        lagen om tillgänglighet till digital offentlig service. Om du inte är
        nöjd med hur vi hanterar dina synpunkter kan du kontakta DIGG och påtala
        det.
      </p>
    </section>

    <section>
      <h2>Teknisk information om webbplatsens tillgänglighet</h2>
      <p>
        Den här webbplatsen är förenlig med nivå AA i standarden Web Content
        Accessibility Guidelines version 2.1.
      </p>
    </section>

    <section>
      <h2>Webbplatsens brister</h2>
      <p>
        Innehåll på diva-portal.org och/eller lokala DiVA-portaler som inte är
        tillgängligt enligt WCAG A eller AA beskrivs nedan:
      </p>
      <ul>
        <li>
          Dokument i formatet PDF och andra dokumentformat på webbplatsen kan
          sakna delar av de tillgänglighetsaspekter som anges i direktivet
          eftersom det bedömts som en oskäligt betungande anpassning att göra
          dessa. [WCAG]
        </li>
      </ul>
    </section>

    <section>
      <h2>Hur vi testat webbplatsen</h2>
      <p>
        Vi har gjort en självskattning (intern testning) av webbplatsen. Senaste
        bedömningen gjordes <time dateTime='2026-06-02'>2026-06-02</time>.
      </p>
      <p>
        Granskningen är utförd av systemutvecklare, support och lokala
        domänadministratörer samt via tester med hjälp av webbaserade
        tillgänglighetsverktyg.
      </p>
    </section>

    <footer className='last-updated'>
      Senast uppdaterad: <time dateTime='2026-06'>juni 2026</time>.
    </footer>
  </>
);

export default function Accessibility() {
  const language = useLanguage();

  return (
    <Article>
      {language === 'sv' ? <SwedishContent /> : <EnglishContent />}
    </Article>
  );
}
