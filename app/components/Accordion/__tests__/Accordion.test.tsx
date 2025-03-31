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

import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { Accordion } from '@/components/Accordion/Accordion';
import { AccordionTitle } from '@/components/Accordion/AccordionTitle';
import { AccordionContent } from '@/components/Accordion/AccordionContent';
import { AccordionExpandButton } from '@/components/Accordion/AccordionExpandButton';

describe('Accordion', () => {
  it('accordion with a title', () => {
    const accordionExpanded = false
    render(
      <Accordion expanded={accordionExpanded} onChange={() => {}}>
        <AccordionTitle>Accordion title</AccordionTitle>
        {accordionExpanded && (
          <AccordionContent>
            <p>Rerum quia aliquam pariatur explicabo sint minima eos.</p>
            <p>Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.</p>
          </AccordionContent>
        )}
      </Accordion>,
    );
    screen.debug()
    const title = screen.getByRole('button', { name: 'Accordion title'})
    expect(title).toBeInTheDocument()
  });

  it('Accordion with title and collapsed content', () => {
    render(
      <Accordion expanded={accordionExpanded} onChange={setAccordionExpanded}>
        <AccordionTitle>Accordion title</AccordionTitle>
        <AccordionContent>
          {accordionExpanded ? (
            <>
              <p>{faker.lorem.paragraph()}</p>
              <p>{faker.lorem.paragraph()}</p>
              <p>{faker.lorem.paragraph()}</p>
            </>
          ) : (
            <p>{faker.lorem.paragraph()}</p>
          )}
        </AccordionContent>
      </Accordion>,
    );
  });

  it('Accordion without title', () => {
    render(
      <Accordion expanded={accordionExpanded} onChange={setAccordionExpanded}>
        <AccordionContent>
          {accordionExpanded ? (
            <>
              <p>{faker.lorem.paragraph()}</p>
              <p>{faker.lorem.paragraph()}</p>
              <p>{faker.lorem.paragraph()}</p>
            </>
          ) : (
            <p>{faker.lorem.paragraph()}</p>
          )}
        </AccordionContent>
        <AccordionExpandButton />
      </Accordion>,
    );
  });
});
