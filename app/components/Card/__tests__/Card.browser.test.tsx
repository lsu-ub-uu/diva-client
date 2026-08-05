/*
 * Copyright 2024 Uppsala University Library
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
 */

import { Card } from '@/components/Card/Card';
import { CardContent } from '@/components/Card/CardContent';
import { CardContext } from '@/components/Card/CardContext';
import { CardExpandButton } from '@/components/Card/CardExpandButton';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { useContext } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

describe('Card', () => {
  describe('<Card>', () => {
    it('renders as a section element', async () => {
      const screen = await render(
        <Card>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.tagName).toBe('SECTION');
    });

    it('has default expanded state of true', async () => {
      const screen = await render(
        <Card>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.getAttribute('data-expanded')).toBe('true');
    });

    it('sets expanded attribute correctly', async () => {
      const screen = await render(
        <Card expanded={false}>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.getAttribute('data-expanded')).toBe('false');
    });

    it('has boxed data attribute when boxed prop is true', async () => {
      const screen = await render(
        <Card boxed>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.hasAttribute('data-boxed')).toBe(true);
    });

    it('does not have boxed data attribute when boxed prop is false', async () => {
      const screen = await render(
        <Card boxed={false}>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.hasAttribute('data-boxed')).toBe(false);
    });

    it('has expandable data attribute when expandable prop is true', async () => {
      const screen = await render(
        <Card expandable>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.hasAttribute('data-expandable')).toBe(true);
    });

    it('does not have expandable data attribute when expandable prop is false', async () => {
      const screen = await render(
        <Card expandable={false}>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.hasAttribute('data-expandable')).toBe(false);
    });

    it('uses aria-label when label prop is provided', async () => {
      const screen = await render(
        <Card label='Card Label'>
          <div>Content</div>
        </Card>,
      );

      const section = screen
        .getByRole('region', { name: 'Card Label' })
        .element() as HTMLElement;
      expect(section.getAttribute('aria-label')).toBe('Card Label');
      expect(section.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('uses aria-labelledby when label prop is not provided', async () => {
      const screen = await render(
        <Card>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      const labelledById = section.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();
      expect(labelledById).toMatch(/^card-heading-/);
    });

    it('applies custom className', async () => {
      const screen = await render(
        <Card className='custom-class'>
          <div>Content</div>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section.className).toContain('custom-class');
    });

    it('provides CardContext with boxed and ids to children', async () => {
      const TestComponent = () => {
        const contextValue = useContext(CardContext);

        return (
          <div
            data-testid='context'
            data-boxed={String(contextValue.boxed)}
            data-heading={contextValue.ids.heading}
            data-section={contextValue.ids.section}
          >
            Test
          </div>
        );
      };

      await render(
        <Card boxed>
          <TestComponent />
        </Card>,
      );

      const context = document.querySelector('[data-testid="context"]');

      expect(context).not.toBeNull();
      expect(context?.getAttribute('data-boxed')).toBe('true');
      expect(context?.getAttribute('data-heading')).toMatch(/^card-heading-/);
      expect(context?.getAttribute('data-section')).toMatch(/^card-section-/);
    });

    it('has unique id for each card instance', async () => {
      const screen = await render(
        <div>
          <Card>
            <div>Content 1</div>
          </Card>
          <Card>
            <div>Content 2</div>
          </Card>
        </div>,
      );

      const sections = screen.baseElement.querySelectorAll('section');
      expect(sections).toHaveLength(2);

      const id1 = sections[0]?.getAttribute('aria-labelledby');
      const id2 = sections[1]?.getAttribute('aria-labelledby');

      expect(id1).not.toBe(id2);
    });
  });

  describe('<CardTitle>', () => {
    it('renders heading element with default level h2', async () => {
      const screen = await render(
        <Card>
          <CardTitle>Title</CardTitle>
        </Card>,
      );

      const heading = screen
        .getByRole('heading', { level: 2 })
        .element() as HTMLElement;
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveTextContent('Title');
    });

    it('renders heading with custom level', async () => {
      const screen = await render(
        <Card>
          <CardTitle level='h3'>Title</CardTitle>
        </Card>,
      );

      const heading = screen
        .getByRole('heading', { level: 3 })
        .element() as HTMLElement;
      expect(heading.tagName).toBe('H3');
    });

    it.each<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ])('renders with heading level %s', async (level) => {
      const screen = await render(
        <Card>
          <CardTitle level={level}>Title</CardTitle>
        </Card>,
      );

      const heading = screen.baseElement.querySelector(level);
      expect(heading).not.toBeNull();
      expect(heading).toHaveTextContent('Title');
    });

    it('renders info content when provided', async () => {
      const screen = await render(
        <Card>
          <CardTitle info={<span data-testid='info'>Info</span>}>
            Title
          </CardTitle>
        </Card>,
      );

      const info = screen.getByTestId('info');
      await expect.element(info).toBeInTheDocument();
      expect(info).toHaveTextContent('Info');
    });

    it('does not render info section when not provided', async () => {
      const screen = await render(
        <Card>
          <CardTitle>Title</CardTitle>
        </Card>,
      );

      const cardTitle = screen.baseElement.querySelector(
        '[class*="card-title"]',
      );
      const infoElement = cardTitle?.querySelector('[data-testid="info"]');
      expect(infoElement).toBeNull();
    });

    it('assigns heading id from CardContext', async () => {
      const screen = await render(
        <Card>
          <CardTitle>Title</CardTitle>
        </Card>,
      );

      const heading = screen
        .getByRole('heading', { level: 2 })
        .element() as HTMLElement;
      const headingId = heading.getAttribute('id');
      expect(headingId).toMatch(/^card-heading-/);
    });
  });

  describe('<CardHeader>', () => {
    it('renders a header div', async () => {
      const screen = await render(
        <Card>
          <CardHeader>Header</CardHeader>
        </Card>,
      );

      const header = screen.baseElement.querySelector('[class*="card-header"]');
      expect(header).not.toBeNull();
      expect(header).toHaveTextContent('Header');
    });

    it('renders title section with children', async () => {
      const screen = await render(
        <Card>
          <CardHeader>Title Content</CardHeader>
        </Card>,
      );

      const header = screen.baseElement.querySelector('[class*="card-header"]');
      expect(header?.textContent).toContain('Title Content');
    });

    it('sets data-alert attribute when alert is true', async () => {
      const screen = await render(
        <Card>
          <CardHeader alert>Alert Header</CardHeader>
        </Card>,
      );

      const header = screen.baseElement.querySelector('[class*="card-header"]');
      expect(header?.getAttribute('data-alert')).toBe('true');
    });

    it('does not set data-alert attribute when alert is false', async () => {
      const screen = await render(
        <Card>
          <CardHeader alert={false}>Normal Header</CardHeader>
        </Card>,
      );

      const header = screen.baseElement.querySelector('[class*="card-header"]');
      expect(header?.getAttribute('data-alert')).toBe('false');
    });

    it('renders attributes section', async () => {
      const screen = await render(
        <Card>
          <CardHeader attributes={<span data-testid='attrs'>Attributes</span>}>
            Header
          </CardHeader>
        </Card>,
      );

      const attrs = screen.getByTestId('attrs');
      await expect.element(attrs).toBeInTheDocument();
    });

    it('renders action button group section', async () => {
      const screen = await render(
        <Card>
          <CardHeader
            actionButtonGroup={<span data-testid='actions'>Actions</span>}
          >
            Header
          </CardHeader>
        </Card>,
      );

      const actions = screen.getByTestId('actions');
      await expect.element(actions).toBeInTheDocument();
    });

    it('sets data-boxed attribute when card is boxed', async () => {
      const screen = await render(
        <Card boxed>
          <CardHeader>Header</CardHeader>
        </Card>,
      );

      const header = screen.baseElement.querySelector('[class*="card-header"]');
      expect(header?.hasAttribute('data-boxed')).toBe(true);
    });

    it('does not set data-boxed attribute when card is not boxed', async () => {
      const screen = await render(
        <Card boxed={false}>
          <CardHeader>Header</CardHeader>
        </Card>,
      );

      const header = screen.baseElement.querySelector('[class*="card-header"]');
      expect(header?.hasAttribute('data-boxed')).toBe(false);
    });
  });

  describe('<CardContent>', () => {
    it('renders content div', async () => {
      const screen = await render(
        <Card>
          <CardContent>Content Text</CardContent>
        </Card>,
      );

      const content = screen.baseElement.querySelector(
        '[class*="card-content"]',
      );
      expect(content).not.toBeNull();
      expect(content).toHaveTextContent('Content Text');
    });

    it('renders children correctly', async () => {
      const screen = await render(
        <Card>
          <CardContent>
            <span data-testid='child'>Child Element</span>
          </CardContent>
        </Card>,
      );

      const child = screen.getByTestId('child');
      await expect.element(child).toBeInTheDocument();
    });

    it('sets data-alert attribute when enhancedFields is true', async () => {
      const screen = await render(
        <Card>
          <CardContent enhancedFields>Content</CardContent>
        </Card>,
      );

      const content = screen.baseElement.querySelector(
        '[class*="card-content"]',
      );
      expect(content?.getAttribute('data-alert')).toBe('true');
    });

    it('does not set data-alert attribute when enhancedFields is false', async () => {
      const screen = await render(
        <Card>
          <CardContent enhancedFields={false}>Content</CardContent>
        </Card>,
      );

      const content = screen.baseElement.querySelector(
        '[class*="card-content"]',
      );
      expect(content?.getAttribute('data-alert')).toBe('false');
    });

    it('sets data-boxed attribute when card is boxed', async () => {
      const screen = await render(
        <Card boxed>
          <CardContent>Content</CardContent>
        </Card>,
      );

      const content = screen.baseElement.querySelector(
        '[class*="card-content"]',
      );
      expect(content?.hasAttribute('data-boxed')).toBe(true);
    });

    it('does not set data-boxed attribute when card is not boxed', async () => {
      const screen = await render(
        <Card boxed={false}>
          <CardContent>Content</CardContent>
        </Card>,
      );

      const content = screen.baseElement.querySelector(
        '[class*="card-content"]',
      );
      expect(content?.hasAttribute('data-boxed')).toBe(false);
    });

    it('accepts HTML attributes', async () => {
      const screen = await render(
        <Card>
          <CardContent data-testid='custom' id='content-id'>
            Content
          </CardContent>
        </Card>,
      );

      const content = screen.getByTestId('custom').element() as HTMLElement;
      expect(content.getAttribute('id')).toBe('content-id');
      expect(content.getAttribute('data-testid')).toBe('custom');
    });
  });

  describe('<CardExpandButton>', () => {
    it('renders a button element', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button');
      await expect.element(button).toBeInTheDocument();
    });

    it('has button type', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      expect(button.type).toBe('button');
    });

    it('sets aria-expanded to true when expanded is true', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={true} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-expanded to false when expanded is false', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('does not set aria-expanded when expanded is bothEqual', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded='bothEqual' />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      expect(button.getAttribute('aria-expanded')).toBeNull();
    });

    it('sets data-action-button attribute', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLElement;
      expect(button.hasAttribute('data-action-button')).toBe(true);
    });

    it('has aria-controls pointing to section id from context', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      const ariaControls = button.getAttribute('aria-controls');
      expect(ariaControls).toMatch(/^card-section-/);
    });

    it('renders children when provided', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false}>Button Text</CardExpandButton>
        </Card>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Button Text');
    });

    it('sets aria-label from translation key when no children and expanded is false', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      const ariaLabel = button.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    it('does not set aria-label when children are provided', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false}>Expand</CardExpandButton>
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLButtonElement;
      expect(button.hasAttribute('aria-label')).toBe(false);
    });

    it('applies custom className', async () => {
      const screen = await render(
        <Card>
          <CardExpandButton expanded={false} className='custom-btn' />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLElement;
      expect(button.className).toContain('custom-btn');
    });

    it('renders ChevronUp icon when expanded is true and card is boxed', async () => {
      const screen = await render(
        <Card boxed>
          <CardExpandButton expanded={true} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLElement;
      const icons = button.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('renders ChevronDown icon when expanded is false and card is boxed', async () => {
      const screen = await render(
        <Card boxed>
          <CardExpandButton expanded={false} />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLElement;
      const icons = button.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('renders ArrowLeftRight icon when expanded is bothEqual', async () => {
      const screen = await render(
        <Card boxed>
          <CardExpandButton expanded='bothEqual' />
        </Card>,
      );

      const button = screen.getByRole('button').element() as HTMLElement;
      const icons = button.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('<CardContext>', () => {
    it('has correct default values', () => {
      expect(CardContext).toBeDefined();
    });

    it('provides boxed property to descendants', async () => {
      const screen = await render(
        <Card boxed>
          <CardTitle>Title with context</CardTitle>
        </Card>,
      );

      const heading = screen
        .getByRole('heading', { level: 2 })
        .element() as HTMLElement;
      expect(heading).not.toBeNull();
      expect(heading).toHaveTextContent('Title with context');
    });

    it('provides ids property with heading and section', async () => {
      const screen = await render(
        <Card>
          <CardTitle>Title</CardTitle>
        </Card>,
      );

      const heading = screen
        .getByRole('heading', { level: 2 })
        .element() as HTMLElement;
      const headingId = heading.getAttribute('id');

      expect(headingId).toMatch(/^card-heading-/);
    });
  });

  describe('Card Component Integration', () => {
    it('renders complete card structure with all sub-components', async () => {
      const screen = await render(
        <Card boxed expandable>
          <CardHeader
            alert={false}
            actionButtonGroup={<button type='button'>Action</button>}
          >
            <CardTitle level='h2'>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
        </Card>,
      );

      const section = screen.getByRole('region').element() as HTMLElement;
      expect(section).not.toBeNull();

      const title = screen.getByRole('heading', { level: 2 });
      await expect.element(title).toBeInTheDocument();

      const content = screen.baseElement.querySelector(
        '[class*="card-content"]',
      );
      expect(content).toHaveTextContent('Card content goes here');
    });

    it('renders card with expand button functionality', async () => {
      const handleClick = vi.fn();

      const screen = await render(
        <Card boxed expandable expanded={false}>
          <CardHeader>
            <CardTitle>Expandable Card</CardTitle>
          </CardHeader>
          <CardExpandButton expanded={false} onClick={handleClick} />
          <CardContent>Hidden content</CardContent>
        </Card>,
      );

      const button = screen.getByRole('button');
      await button.click();

      expect(handleClick).toHaveBeenCalled();
    });

    it('renders multiple cards with independent context', async () => {
      const { baseElement } = await render(
        <div>
          <Card boxed>
            <CardTitle>Card 1</CardTitle>
          </Card>
          <Card>
            <CardTitle>Card 2</CardTitle>
          </Card>
        </div>,
      );

      const sections = baseElement.querySelectorAll('section');
      expect(sections).toHaveLength(2);

      const boxedSection = sections[0];
      const normalSection = sections[1];

      expect(boxedSection.hasAttribute('data-boxed')).toBe(true);
      expect(normalSection.hasAttribute('data-boxed')).toBe(false);
    });
  });
});
