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
import type { Route } from './+types/cookies';

export const meta: Route.MetaFunction = () => [
  { title: 'Cookie Policy | DiVA' },
];

const EnglishContent = () => (
  <>
    <header>
      <h1>Cookie Policy</h1>
      <p>
        This cookie policy explains what cookies DiVA Portal uses, why we use
        them, and how they help improve your experience on our platform.
      </p>
    </header>

    <section>
      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files that are stored on your computer or device
        when you visit our website. They help us remember your information and
        preferences for future visits.
      </p>
    </section>

    <section>
      <h2>Cookies We Use</h2>
      <p>
        DiVA Portal uses the following cookies, all of which are classified as
        strictly necessary cookies:
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Purpose</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre>__session</pre>
            </td>
            <td>
              Used to remember your login status and maintain your session while
              you use the platform
            </td>
            <td>Strictly Necessary</td>
          </tr>
          <tr>
            <td>
              <pre>_shibsession_&lt;id&gt;</pre>
            </td>
            <td>Used to maintain your single sign-on login session</td>
            <td>Strictly Necessary</td>
          </tr>
          <tr>
            <td>
              <pre>userPreferences</pre>
            </td>
            <td>
              Used to remember your user preferences, including your selected
              language and color theme
            </td>
            <td>Strictly Necessary</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Why We Use These Cookies</h2>
      <p>
        These cookies are essential for the proper functioning of DiVA Portal.
        Without them, core features like logging in and maintaining your
        preferences would not work. We aim to use only strictly necessary
        cookies.
      </p>
    </section>

    <section>
      <h2>Managing Cookies</h2>
      <p>
        Since these cookies are strictly necessary for the platform to function,
        they cannot be disabled. However, you can configure your browser to
        block cookies, though this may prevent you from using certain features
        of DiVA Portal.
      </p>
    </section>

    <section>
      <h2>Updates to This Policy</h2>
      <p>
        We may update this cookie policy from time to time to reflect changes in
        our practices or for legal reasons. We encourage you to review this page
        periodically for the latest information on our cookie practices.
      </p>
    </section>

    <footer className='last-updated'>
      Last updated: <time dateTime='2026-06'>June 2026</time>
    </footer>
  </>
);

const SwedishContent = () => (
  <>
    <header>
      <h1>Kakpolicy</h1>
      <p>
        Denna kakpolicy beskriver vilka kakor DiVA Portal lagrar på din dator,
        varför vi använder dem och hur de hjälper till att förbättra din
        upplevelse på vår plattform.
      </p>
    </header>

    <section>
      <h2>Vad är kakor?</h2>
      <p>
        Kakor är små textfiler som lagras på din dator eller enhet när du
        besöker vår webbplats. De hjälper oss att komma ihåg din information och
        dina preferenser för framtida besök.
      </p>
    </section>

    <section>
      <h2>Kakor vi använder</h2>
      <p>
        DiVA Portal använder följande kakor, vilka alla klassificeras som strikt
        nödvändiga kakor:
      </p>
      <table>
        <thead>
          <tr>
            <th>Kakans namn</th>
            <th>Syfte</th>
            <th>Typ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <pre>__session</pre>
            </td>
            <td>
              Används för att komma ihåg din inloggning och upprätthålla din
              session medan du använder plattformen
            </td>
            <td>Strikt nödvändig</td>
          </tr>
          <tr>
            <td>
              <pre>_shibsession_&lt;id&gt;</pre>
            </td>
            <td>
              Används för att upprätthålla din &quot;Single sign-on&quot;
              session
            </td>
            <td>Strikt nödvändig</td>
          </tr>
          <tr>
            <td>
              <pre>userPreferences</pre>
            </td>
            <td>
              Används för att komma ihåg dina användarpreferenser, inklusive
              ditt valda språk och färgtema
            </td>
            <td>Strikt nödvändig</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Varför vi använder dessa kakor</h2>
      <p>
        Dessa kakor är essentiella för att DiVA Portal ska fungera korrekt. Utan
        dem skulle grundläggande funktioner som inloggning och att behålla dina
        preferenser inte fungera. Vi strävar efter att endast använda strikt
        nödvändiga kakor.
      </p>
    </section>

    <section>
      <h2>Hantera kakor</h2>
      <p>
        Eftersom dessa kakor är strikt nödvändiga för att plattformen ska
        fungera kan de inte inaktiveras. Du kan dock konfigurera din webbläsare
        för att blockera kakor, även om detta kan förhindra dig från att använda
        vissa funktioner i DiVA Portal.
      </p>
    </section>

    <section>
      <h2>Uppdateringar av denna policy</h2>
      <p>
        Vi kan uppdatera denna kakpolicy från tid till annan för att reflektera
        förändringar i våra praktiker eller av juridiska skäl. Vi uppmuntrar dig
        att granska denna sida periodiskt för den senaste informationen om våra
        kakpraktiker.
      </p>
    </section>

    <footer className='last-updated'>
      Senast uppdaterad: <time dateTime='2026-06'>juni 2026</time>
    </footer>
  </>
);

export default function CookiePolicy() {
  const language = useLanguage();

  return (
    <Article>
      {language === 'sv' ? <SwedishContent /> : <EnglishContent />}
    </Article>
  );
}
