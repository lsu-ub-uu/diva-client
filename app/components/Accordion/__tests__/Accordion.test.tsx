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
 */

import { Accordion } from '@/components/Accordion/Accordion';
import { AccordionContent } from '@/components/Accordion/AccordionContent';
import { AccordionExpandButton } from '@/components/Accordion/AccordionExpandButton';
import { AccordionTitle } from '@/components/Accordion/AccordionTitle';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Accordion', () => {
  it('renders accordion with accessible html', async () => {
    const accordionExpanded = false;
    render(
      <Accordion expanded={accordionExpanded} onChange={vi.fn()}>
        <AccordionTitle headlineLevel='h3'>Accordion title</AccordionTitle>
        <AccordionContent>
          <p>Rerum quia aliquam pariatur explicabo sint minima eos.</p>
          <p>
            Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.
          </p>
        </AccordionContent>
      </Accordion>,
    );

    const title = screen.getByRole('heading', {
      name: `Accordion title`,
    });

    const titleButton = within(title).getByRole('button', {
      name: 'Accordion title',
    });
    expect(titleButton).toHaveAttribute('aria-expanded', 'false');

    const content = screen.getByRole('region', { name: 'Accordion title' });
    const contentId = content.id;
    expect(titleButton).toHaveAttribute('aria-controls', contentId);
  });

  it('accordion respects headlineLevel prop', () => {
    const accordionExpanded = false;
    const onChangeSpy = vi.fn();
    render(
      <Accordion expanded={accordionExpanded} onChange={onChangeSpy}>
        <AccordionTitle headlineLevel='h3'>Accordion title</AccordionTitle>
        <AccordionContent>
          <p>Rerum quia aliquam pariatur explicabo sint minima eos.</p>
          <p>
            Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.
          </p>
        </AccordionContent>
      </Accordion>,
    );

    screen.getByRole('heading', {
      name: `Accordion title`,
      level: 3,
    });
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();
    render(
      <Accordion expanded={false} onChange={onChangeSpy}>
        <AccordionTitle headlineLevel='h3'>Accordion title</AccordionTitle>
        <AccordionContent>
          <p>Rerum quia aliquam pariatur explicabo sint minima eos.</p>
          <p>
            Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.
          </p>
        </AccordionContent>
      </Accordion>,
    );

    const titleButton = screen.getByRole('button', {
      name: 'Accordion title',
    });

    await user.click(titleButton);
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });

  it('Renders an accordion without title', async () => {
    const accordionExpanded = false;
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    render(
      <Accordion expanded={accordionExpanded} onChange={onChangeSpy}>
        <AccordionContent>
          {accordionExpanded ? (
            <>
              <p>Rerum quia aliquam pariatur explicabo sint minima eos.</p>
              <p>
                Voluptatem repellat consequatur deleniti qui quibusdam harum
                cumque.
              </p>
            </>
          ) : (
            <p>Consectetur velit eligendi animi nostrum veritatis.</p>
          )}
        </AccordionContent>
        <AccordionExpandButton />
      </Accordion>,
    );

    const expandButton = screen.getByRole('button', {
      name: 'divaClient_showMoreText',
    });
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(expandButton);
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });

  it('Renders an accordion with both equal', async () => {
    const accordionExpanded = false;
    const user = userEvent.setup();
    const onChangeSpy = vi.fn();

    render(
      <Accordion
        expanded={accordionExpanded}
        onChange={onChangeSpy}
        presentationSize='bothEqual'
      >
        <AccordionContent>
          {accordionExpanded ? (
            <>
              <p>Rerum quia aliquam pariatur explicabo sint minima eos.</p>
              <p>
                Voluptatem repellat consequatur deleniti qui quibusdam harum
                cumque.
              </p>
            </>
          ) : (
            <p>Consectetur velit eligendi animi nostrum veritatis.</p>
          )}
        </AccordionContent>
        <AccordionExpandButton />
      </Accordion>,
    );

    const expandButton = screen.getByRole('button', {
      name: 'divaClient_swapPresentationText',
    });

    await user.click(expandButton);
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });
});
