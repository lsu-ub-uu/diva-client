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
import css from './design-system.css?url';
import { Button } from '@/components/Button/Button';
import { EditDocument } from '@/icons';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { Field } from '@/components/Input/Field';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Input/Select';
import { Card } from '@/components/Card/Card';
import { CardTitle } from '@/components/Card/CardTitle';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardContent } from '@/components/Card/CardContent';
import { useEffect, useState } from 'react';

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DesignSystem() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.querySelector('body')!.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}> Toggle dark mode</button>
      <header className='header'>
        <h1>Design System Demo</h1>
      </header>

      <main className='container'>
        {/* Colors Section */}
        <section>
          <h2>Colors</h2>
          <div className='color-palette'>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
            >
              Background
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Primary
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              Accent
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-error-main)' }}
            >
              Error Main
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-success-main)' }}
            >
              Success Main
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-warning-main)' }}
            >
              Warning Main
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-gray-main)',
                color: 'var(--color-text)',
              }}
            >
              Gray Main
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2>Typography</h2>
          <div className='typography-demo'>
            <h1>Heading 1 - H1</h1>
            <h2>Heading 2 - H2</h2>
            <h3>Heading 3 - H3</h3>
            <h4>Heading 4 - H4</h4>
            <h5>Heading 5 - H5</h5>
            <h6>Heading 6 - H6</h6>
            <p>Body text with base font size and line height.</p>
            <p>
              <strong>Bold text example.</strong>
            </p>
          </div>
        </section>

        {/* Spacing Section */}
        <section>
          <h2>Spacing (Gaps)</h2>
          <div className='spacing-demo'>
            <div className='spacing-box' style={{ marginBottom: 'var(--gap)' }}>
              Gap (0.5rem)
            </div>
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap2)' }}
            >
              Gap 2 (1rem)
            </div>
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap3)' }}
            >
              Gap 3 (2rem)
            </div>
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap4)' }}
            >
              Gap 4 (4rem)
            </div>
          </div>
        </section>

        <section>
          <h2>Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Button variant='primary'>Primary</Button>
            <Button variant='primary' disabled>
              Primary disabled
            </Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='secondary' disabled>
              Secondary disabled
            </Button>
            <Button variant='tertiary'>Tertiary</Button>
            <Button variant='tertiary' disabled>
              Tertiary disabled
            </Button>
            <Button variant='icon'>
              <EditDocument />
            </Button>
            <Button variant='icon' disabled>
              <EditDocument />
            </Button>
            <FloatingActionButton text='FAB button' icon={<EditDocument />} />
            <FloatingActionButton
              text='FAB primary'
              variant='primary'
              icon={<EditDocument />}
            />
          </div>
        </section>

        <section>
          <h2>Inputs</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Field label='Input'>
              <Input />
            </Field>
            <Field label='Select'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Field>
          </div>
        </section>
        <section>
          <h2>Cards</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Card boxed={false}>
              <CardHeader>
                <CardTitle>
                  <h3>I&#39;m a card that&#39;s not boxed</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span>Card content</span>
                <Card boxed={false}>
                  <CardHeader>
                    <CardTitle>
                      <h4>I&#39;m nested card</h4>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span>Card content</span>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            <Card boxed={true}>
              <CardHeader>
                <CardTitle>
                  <h3>I&#39;m a card that&#39;s boxed</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span>Card content</span>
                <Card boxed={true}>
                  <CardHeader>
                    <CardTitle>
                      <h4>I&#39;m nested card</h4>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span>Card content</span>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
