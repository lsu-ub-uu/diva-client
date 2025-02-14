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
import { EditDocumentIcon, SentimentNeutralIcon } from '@/icons';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { Field } from '@/components/Input/Field';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Input/Select';
import { Card } from '@/components/Card/Card';
import { CardTitle } from '@/components/Card/CardTitle';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardContent } from '@/components/Card/CardContent';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/Input/Textarea';
import { Alert, AlertTitle } from '@/components/Alert/Alert';

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
              <div className='color-name'>Background</div>
              <div className='color-rgb'>rgb(255 255 255)</div>
              <div className='color-hex'>#ffffff</div>
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <div className='color-name'>Primary</div>
              <div className='color-rgb'>rgb(51 51 51)</div>
              <div className='color-hex'>#333333</div>
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <div className='color-name'>Accent</div>
              <div className='color-rgb'>rgb(117 89 142)</div>
              <div className='color-hex'>#75598E</div>
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-error-main)' }}
            >
              <div className='color-name'>Error Main</div>
              <div className='color-rgb'>rgb(153 0 0)</div>
              <div className='color-hex'>#990000</div>
            </div>
            <div
              className='color-swatch'
              style={{ backgroundColor: 'var(--color-success-main)' }}
            >
              <div className='color-name'>Success Main</div>
              <div className='color-rgb'>rgb(0 112 15)</div>
              <div className='color-hex'>#00700F</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-warning-main)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Warning Main</div>
              <div className='color-rgb'>rgb(246 194 68)</div>
              <div className='color-hex'>#F6C244</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-gray-main)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Gray Main</div>
              <div className='color-rgb'>rgb(231 227 222)</div>
              <div className='color-hex'>#E7E3DE</div>
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
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap-s)' }}
            >
              Gap (0.25rem)
            </div>
            <div className='spacing-box' style={{ marginBottom: 'var(--gap)' }}>
              Gap (0.5rem)
            </div>
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap-l)' }}
            >
              Gap L (1rem)
            </div>
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap-xl)' }}
            >
              Gap XL (2rem)
            </div>
            <div
              className='spacing-box'
              style={{ marginBottom: 'var(--gap-xxl)' }}
            >
              Gap XXL (4rem)
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
              <EditDocumentIcon />
            </Button>
            <Button variant='icon' disabled>
              <EditDocumentIcon />
            </Button>
            <FloatingActionButton
              text='FAB button'
              icon={<EditDocumentIcon />}
            />
            <FloatingActionButton
              text='FAB primary'
              variant='primary'
              icon={<EditDocumentIcon />}
            />
            <Button variant='primary' fullWidth>
              Full Width
            </Button>
            <Button variant='secondary' fullWidth>
              Full Width
            </Button>
            <Button variant='tertiary' fullWidth>
              Full Width
            </Button>
          </div>
        </section>

        <section>
          <h2>Inputs</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Field label='Input'>
              <Input />
            </Field>
            <Field label='Input small' size='small'>
              <Input />
            </Field>
            <Field label='Inline input' variant='inline'>
              <Input />
            </Field>
            <Field
              label='Input with error'
              errorMessage='This field is required'
            >
              <Input invalid />
            </Field>
            <Field
              label='Input small with error'
              errorMessage='This field is required'
              size='small'
            >
              <Input invalid />
            </Field>
            <Field label='Textarea'>
              <Textarea />
            </Field>
            <Field label='Textarea with error'>
              <Textarea invalid />
            </Field>
            <Field label='Select'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Field>

            <Field label='Select small' size='small'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Field>
            <Field label='Inline select' variant='inline'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Field>
            <Field label='Inline select small' variant='inline' size='small'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Field>
            <Field
              label='Select with error'
              errorMessage='This field is required'
            >
              <Select invalid>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Field>
            <Field
              label='Inline select with error'
              variant='inline'
              errorMessage='This field is required'
            >
              <Select invalid>
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
        <section>
          <h2>Alerts</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Alert severity='success'>
              <AlertTitle>Success title</AlertTitle>Text
            </Alert>
            <Alert severity='info'>
              <AlertTitle>Info title</AlertTitle>Text
            </Alert>
            <Alert severity='warning'>
              <AlertTitle>Warning title</AlertTitle>Text
            </Alert>
            <Alert severity='error'>
              <AlertTitle>Error title</AlertTitle>Text
            </Alert>
            <Alert severity='info' icon={<SentimentNeutralIcon />}>
              <AlertTitle>Custom Icon title</AlertTitle>
              Text
            </Alert>

            <Alert severity='success'>Text</Alert>
            <Alert severity='info'>Text</Alert>
            <Alert severity='warning'>Text</Alert>
            <Alert severity='error'>Text</Alert>
            <Alert severity='info' icon={<SentimentNeutralIcon />}>
              Custom Icon Text
            </Alert>
          </div>
        </section>
      </main>
    </div>
  );
}
