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
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { CardContent } from '@/components/Card/CardContent';
import { CardExpandButton } from '@/components/Card/CardExpandButton';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Input/Select';
import { Textarea } from '@/components/Input/Textarea';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { LinearLoader } from '@/components/Loader/LinearLoader';
import { SkeletonLoader } from '@/components/Loader/SkeletonLoader';
import { Progress } from '@/components/Progress/Progress';
import { Snackbar } from '@/components/Snackbar/Snackbar';
import { Typography } from '@/components/Typography/Typography';
import * as icons from '@/icons';
import { EditDocumentIcon, SentimentNeutralIcon } from '@/icons';
import { useState } from 'react';
import css from './design-system.css?url';

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DesignSystem() {
  const [snacbkarOpen, setSnacbkarOpen] = useState(false);
  const [progress, setProgress] = useState(50);

  return (
    <div>
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
              style={{
                backgroundColor: 'var(--color-background-inverted)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Background Inverted</div>
              <div className='color-rgb'>rgb(33 33 33)</div>
              <div className='color-hex'>#212121</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-text)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Text</div>
              <div className='color-rgb'>rgb(33 33 33)</div>
              <div className='color-hex'>#212121</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-text-inverted)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Text Inverted</div>
              <div className='color-rgb'>rgb(255 255 255)</div>
              <div className='color-hex'>#ffffff</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Primary</div>
              <div className='color-rgb'>rgb(51 51 51)</div>
              <div className='color-hex'>#333333</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Secondary</div>
              <div className='color-rgb'>rgb(1 1 1)</div>
              <div className='color-hex'>#010101</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-accent-light)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Accent Light</div>
              <div className='color-rgb'>rgb(150 136 162)</div>
              <div className='color-hex'>#9688A2</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Accent</div>
              <div className='color-rgb'>rgb(117 89 142)</div>
              <div className='color-hex'>#75598E</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-accent-dark)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Accent Dark</div>
              <div className='color-rgb'>rgb(97 57 133)</div>
              <div className='color-hex'>#613985</div>
            </div>

            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-error-light)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Error Light</div>
              <div className='color-rgb'>rgb(238 220 219)</div>
              <div className='color-hex'>#EEDCDB</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-error-main)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Error Main</div>
              <div className='color-rgb'>rgb(153 0 0)</div>
              <div className='color-hex'>#990000</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-error-dark)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Error Dark</div>
              <div className='color-rgb'>rgb(115 0 0)</div>
              <div className='color-hex'>#730000</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Success Light</div>
              <div className='color-rgb'>rgb(217 234 219)</div>
              <div className='color-hex'>#D9EADB</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-success-main)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Success Main</div>
              <div className='color-rgb'>rgb(0 112 15)</div>
              <div className='color-hex'>#00700F</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-warning-light)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Warning Light</div>
              <div className='color-rgb'>rgb(253 243 209)</div>
              <div className='color-hex'>#FDF3D1</div>
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
                backgroundColor: 'var(--color-gray-light)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Gray Light</div>
              <div className='color-rgb'>rgb(250 249 248)</div>
              <div className='color-hex'>#FAF9F8</div>
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
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-gray-dark)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Gray Dark</div>
              <div className='color-rgb'>rgb(155 138 122)</div>
              <div className='color-hex'>#9B8A7A</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-thin-border)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Thin Border</div>
              <div className='color-rgb'>rgb(238 238 238)</div>
              <div className='color-hex'>#EEEEEE</div>
            </div>

            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-link)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Link</div>
              <div className='color-rgb'>rgb(5 85 164)</div>
              <div className='color-hex'>#0555A4</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-link-selected)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Link Selected</div>
              <div className='color-rgb'>rgb(13 110 253)</div>
              <div className='color-hex'>#0D6EFD</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-link-visited)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Link Visited</div>
              <div className='color-rgb'>rgb(117 89 142)</div>
              <div className='color-hex'>#75598E</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-input-border)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Input Border</div>
              <div className='color-rgb'>rgb(153 153 153)</div>
              <div className='color-hex'>#999999</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-label)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>Label</div>
              <div className='color-rgb'>rgb(0 0 0 / 66%)</div>
              <div className='color-hex'>rgba(0,0,0,0.66)</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-nav-rail)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>Nav Rail</div>
              <div className='color-rgb'>rgb(250 249 248)</div>
              <div className='color-hex'>#FAF9F8</div>
            </div>

            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-fab-primary-bg)',
                color: 'var(--color-fab-primary-text)',
              }}
            >
              <div className='color-name'>FAB Primary Background</div>
              <div className='color-rgb'>rgb(117 89 142)</div>
              <div className='color-hex'>#75598E</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-fab-primary-text)',
                color: 'var(--color-text)',
              }}
            >
              <div className='color-name'>FAB Primary Text</div>
              <div className='color-rgb'>rgb(255 255 255)</div>
              <div className='color-hex'>#FFFFFF</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-fab-secondary-bg)',
                color: 'var(--color-fab-secondary-text)',
              }}
            >
              <div className='color-name'>FAB Secondary Background</div>
              <div className='color-rgb'>rgb(255 255 255)</div>
              <div className='color-hex'>#FFFFFF</div>
            </div>
            <div
              className='color-swatch'
              style={{
                backgroundColor: 'var(--color-fab-secondary-text)',
                color: 'var(--color-text-inverted)',
              }}
            >
              <div className='color-name'>FAB Secondary Text</div>
              <div className='color-rgb'>rgb(0 0 0)</div>
              <div className='color-hex'>#000000</div>
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
            <hr />
            <Typography variant='bodyTextStyle' text='bodyTextStyle' />
            <Typography variant='boldTextStyle' text='boldTextStyle' />
            <Typography variant='italicTextStyle' text='italicTextStyle' />
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
            <Button
              variant='icon'
              aria-label='Tooltip left'
              tooltipPosition='left'
            >
              <EditDocumentIcon />
            </Button>
            <Button
              variant='icon'
              aria-label='Tooltip top'
              tooltipPosition='top'
            >
              <EditDocumentIcon />
            </Button>
            <Button
              variant='icon'
              aria-label='Tooltip bottom'
              tooltipPosition='bottom'
            >
              <EditDocumentIcon />
            </Button>
            <Button
              variant='icon'
              aria-label='Tooltip right'
              tooltipPosition='right'
            >
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
            <Fieldset label='Input'>
              <Input />
            </Fieldset>
            <Fieldset label='Input small' size='small'>
              <Input />
            </Fieldset>
            <Fieldset label='Inline input' variant='inline'>
              <Input />
            </Fieldset>
            <Fieldset
              label='Input with error'
              errorMessage='This field is required'
            >
              <Input aria-invalid />
            </Fieldset>
            <Fieldset
              label='Input small with error'
              errorMessage='This field is required'
              size='small'
            >
              <Input aria-invalid />
            </Fieldset>
            <Fieldset label='Textarea'>
              <Textarea />
            </Fieldset>
            <Fieldset label='Textarea with error'>
              <Textarea aria-invalid />
            </Fieldset>
            <Fieldset label='Select'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Fieldset>

            <Fieldset label='Select small' size='small'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Fieldset>
            <Fieldset label='Inline select' variant='inline'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Fieldset>
            <Fieldset label='Inline select small' variant='inline' size='small'>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Fieldset>
            <Fieldset
              label='Select with error'
              errorMessage='This field is required'
            >
              <Select aria-invalid>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Fieldset>
            <Fieldset
              label='Inline select with error'
              variant='inline'
              errorMessage='This field is required'
            >
              <Select aria-invalid>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </Select>
            </Fieldset>
          </div>
        </section>
        <section>
          <h2>Cards</h2>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            }}
          >
            <div>
              <h3>Unboxed card</h3>
              <Card boxed={false}>
                <CardHeader>
                  <CardTitle
                    level='h3'
                    info={
                      <Button variant='icon' size='small'>
                        <icons.InfoIcon />
                      </Button>
                    }
                  >
                    I&#39;m a card that&#39;s not boxed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span>Card content</span>
                  <Card boxed={false}>
                    <CardHeader>
                      <CardTitle level='h4'>I&#39;m nested card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span>Card content</span>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3>Boxed card</h3>

              <Card boxed={true}>
                <CardHeader>
                  <CardTitle
                    level='h3'
                    info={
                      <Button variant='icon' size='small'>
                        <icons.InfoIcon />
                      </Button>
                    }
                  >
                    I&#39;m a card that&#39;s boxed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span>Card content</span>
                  <Card boxed={true}>
                    <CardHeader>
                      <CardTitle level='h4'>I&#39;m nested card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span>Card content</span>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3>Card with action button and attributes</h3>
              <Card boxed>
                <CardHeader
                  attributes={
                    <Fieldset size='small'>
                      <Select value='option1'>
                        <option value='option1'>Option 1</option>
                      </Select>
                    </Fieldset>
                  }
                  actionButtonGroup={
                    <Button variant='icon'>
                      <icons.CloseIcon />
                    </Button>
                  }
                >
                  <CardTitle
                    level='h3'
                    info={
                      <Button variant='icon' size='small'>
                        <icons.InfoIcon />
                      </Button>
                    }
                  >
                    I&#39;m a card with an action button
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span>Card content</span>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3>Card with clickable title</h3>

              <ClickableCardDemo />
            </div>
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
        <section>
          <h2>Loaders</h2>
          CircularLoader
          <CircularLoader />
          LinearLoader Indeterminate
          <LinearLoader label='Loading infinitely' />
          Progress Value{' '}
          <input
            type='number'
            defaultValue={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <Progress
            id='progress'
            value={progress}
            label={`Uploaded ${progress}%`}
          />
          <div>
            SkeletonLoader
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <SkeletonLoader width='20ch' height='1.5rem' />
              <SkeletonLoader width='45ch' height='1rem' />
              <SkeletonLoader width='35ch' height='1rem' />
            </div>
          </div>
        </section>
        <section>
          <h2>Snackbar</h2>
          <Button onClick={() => setSnacbkarOpen(true)}>Show snackbar</Button>
          <Snackbar
            open={snacbkarOpen}
            onClose={() => setSnacbkarOpen(false)}
            severity={'success'}
            text='I am a snack!'
          />
        </section>
        <section>
          <h2>Icons</h2>
          <div className='icons'>
            {Object.entries(icons).map(([iconName, IconComponent]) => (
              <div key={iconName} className={'icon'}>
                <IconComponent />
                <span>&lt;{iconName} /&gt;</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const ClickableCardDemo = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card boxed>
      <CardHeader
        attributes={
          expanded && (
            <Fieldset size='small'>
              <Select value='option1'>
                <option value='option1'>Option 1</option>
              </Select>
            </Fieldset>
          )
        }
        actionButtonGroup={
          <Button variant='icon'>
            <icons.CloseIcon />
          </Button>
        }
      >
        <CardTitle
          level='h3'
          info={
            <Button variant='icon' size='small'>
              <icons.InfoIcon />
            </Button>
          }
        >
          <CardExpandButton
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            Click me
          </CardExpandButton>
        </CardTitle>
      </CardHeader>
      {expanded && <CardContent>This is the expanded content!</CardContent>}
    </Card>
  );
};
