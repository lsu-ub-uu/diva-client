import type {
  FormComponent,
  FormComponentGroup,
  FormComponentWithData,
} from '@/components/FormGenerator/types';

export const transformToOutputData = (
  data: any,
  formComponent: FormComponent,
) => {
  // { value: '' }
  if (typeof data !== 'object' || data === null || 'value' in data) {
    return data;
  }

  // { someName: { value: '' }, someOtherName_someAttr_someFinal: { value: '' } }
  return Object.entries(data).reduce((acc, curr) => {
    const [key, value] = curr;

    // Try to match the full key (including attribute and final value) to a component
    let matchingFormComponent = undefined;
    if (formComponent.components) {
      matchingFormComponent = formComponent.components.find((component) => {
        // Build the expected key for this component
        const expectedKey = createKeyFromComponent(component as any);
        return expectedKey === key;
      });
      // Fallback: match by base name if no exact match
      if (!matchingFormComponent) {
        const nameInData = !key.startsWith('_') ? key.split('_')[0] : key;
        matchingFormComponent = formComponent.components.find(
          (component) => component.name === nameInData,
        );
      }
    }

    const newKey = matchingFormComponent
      ? createKeyFromComponent(matchingFormComponent as any)
      : key;

    acc[newKey] = transformToOutputData(
      value,
      matchingFormComponent || formComponent,
    );
    return acc;
  }, {});
};

const createKeyFromComponent = (formComponent: FormComponentWithData) => {
  const finalValueAttributes = formComponent.attributes?.filter(
    (attr) => attr.finalValue !== undefined,
  );
  let key = formComponent.name;

  if (finalValueAttributes) {
    finalValueAttributes.forEach((attr) => {
      key += `_${attr.name}_${attr.finalValue}`;
    });
  }
  return key;
};
