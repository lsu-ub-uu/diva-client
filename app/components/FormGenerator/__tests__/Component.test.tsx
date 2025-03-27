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

import { Component } from '@/components/FormGenerator/Component';
import { render } from '@testing-library/react';
import type { FormComponentTextVar } from '@/components/FormGenerator/types';

describe('<Component />', () => {
  it('renders a headless component switcher when alternativePresentation but no title', () => {
    const component: FormComponentTextVar = {
      name: 'var1',
      value: 'value 1',
    };

    render(<Component component={component} path='somePath' idx={0} />);
  });

  it.todo(
    'renders a headless component switcher with presentationSize firstIsLarger',
  );

  it.todo(
    'renders a headless component switcher with presentationSize bothAreEqual',
  );

  it.todo(
    'renders an accordion component switcher when alternativePresentation with title',
    () => {},
  );

  it.todo(
    'renders an accordion component switcher with presentationSize firstIsLarger',
  );
  it.todo(
    'renders an accordion component switcher with presentationSize bothAreEqual',
  );

  it.todo(
    'renders single presentation accordion when title is set and no alternativePresentation',
  );

  it.todo('renders a single presentation accordion when singleInitiallyShown');

  it.todo('respects the titleHeadlineLevel field', () => {});
});
