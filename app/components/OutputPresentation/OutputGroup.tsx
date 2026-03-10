import { useTranslation } from 'react-i18next';
import type { FormComponent, FormComponentGroup } from '../FormGenerator/types';
import { OutputComponent } from './OutputComponent';
import { addAttributesToName } from '../FormGenerator/defaultValues/defaultValues';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { hasValuableData } from '@/utils/cleanFormData';

interface OutputGroupProps {
  component: FormComponentGroup;
  data: Record<string, any>;
}

export const OutputGroup = ({ component, data }: OutputGroupProps) => {
  const { t } = useTranslation();
  if (!hasValuableData(data)) {
    return null;
  }
  return (
    <div
      className='form-component-container'
      data-text-style={component.textStyle}
    >
      <h3>{component.showLabel && t(component.label)}</h3>
      {component.components?.map((childComponent) => {
        const childName = addAttributesToName(
          childComponent,
          childComponent.name,
        );

        const childData = findChildData(childComponent, data);
        if (childData === undefined) {
          return null;
        }
        return (
          <OutputComponent
            key={`${component.presentationId}-${childName}`}
            component={childComponent}
            data={childData}
          />
        );
      })}
    </div>
  );
};

const findChildData = (
  component: FormComponent,
  data: Record<string, any>,
): any => {
  if (!isComponentWithData(component)) {
    return undefined;
  }
  const candidates = Object.entries(data).filter(
    ([key]) => key.split('_')[0] === component.name,
  );

  if (candidates.length === 0) {
    return undefined;
  }

  if (candidates.length === 1) {
    const [, value] = candidates[0];
    return value;
  }

  const finalValueAttributes =
    component.attributes?.filter((attr) => attr.finalValue !== undefined) ?? [];
  let bestCandidate = candidates[0];
  let maxMatches = -1;

  for (const candidate of candidates) {
    const [, value] = candidate;
    if (!value) continue;

    const candidateAttrs = Object.fromEntries(
      Object.entries(value).filter(([key]) => key.startsWith('_')),
    );
    const numberOfMatchingAttributes = finalValueAttributes.reduce(
      (acc, attr) => {
        if (candidateAttrs[`_${attr.name}`] === attr.finalValue) {
          return acc + 1;
        }
        return acc;
      },
      0,
    );
    if (numberOfMatchingAttributes > maxMatches) {
      maxMatches = numberOfMatchingAttributes;
      bestCandidate = candidate;
    }
  }

  console.log(
    `best candidate for component ${component.name} with ${maxMatches} matching attributes:`,
    { bestCandidate, component, candidates, maxMatches },
  );
  return bestCandidate[1];
};
