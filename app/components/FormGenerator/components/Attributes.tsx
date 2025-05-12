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

import { AttributeSelect } from '@/components/FormGenerator/components/AttributeSelect';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import { use } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { useTranslation } from 'react-i18next';

interface AttributesProps {
  component: FormComponentWithData;
  path: string;
}

export const Attributes = ({ component, path }: AttributesProps) => {
  const { t } = useTranslation();
  const { showTooltips } = use(FormGeneratorContext);

  return component.attributes?.map((attribute, index) => {
    const options = [
      {
        value: '',
        label: t(attribute.placeholder ?? 'divaClient_optionNoneText'),
      },
      ...attribute.options,
    ];
    return (
      <AttributeSelect
        key={`${attribute.name}_${index}`}
        name={`${path}._${attribute.name}`}
        label={attribute.label ?? ''}
        options={options}
        showLabel={attribute.showLabel}
        placeholder={attribute.placeholder}
        tooltip={showTooltips ? attribute.tooltip : undefined}
        finalValue={attribute.finalValue}
        displayMode={attribute.mode}
        attributesToShow={component.attributesToShow}
      />
    );
  });
};
