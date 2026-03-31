import type {
  CoraData,
  DataAtomic,
  DataGroup,
  DataRecordLink,
} from '@/cora/cora-data/types.server';
import type {
  FormAttributeCollection,
  FormComponent,
  FormComponentCollVar,
  FormComponentGroup,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentTextVar,
  FormSchema,
} from '../FormGenerator/types';
import {
  isComponentCollVar,
  isComponentContainer,
  isComponentGroup,
  isComponentNumVar,
  isComponentRecordLink,
  isComponentTextVariable,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';

export interface ValidationError {
  message: string;
  label: string;
  type: 'required' | 'invalidFormat';
}

export const validateFormData = (
  formSchema: FormSchema,
  data: CoraData,
): { valid: boolean; errors: Record<string, ValidationError> } => {
  const rootGroup = formSchema.form;
  const parentData = data as DataGroup;
  const path = `${parentData.name}[0]`;

  const errors = rootGroup.components
    ? validateComponentList(rootGroup.components, parentData, path)
    : {};

  return { valid: Object.keys(errors).length === 0, errors };
};

const validateComponentList = (
  components: FormComponent[],
  parentData: DataGroup,
  parentPath: string,
): Record<string, ValidationError> => {
  const nameCount: Record<string, number> = {};
  return components.reduce<Record<string, ValidationError>>(
    (acc, component) => {
      const offset = nameCount[component.name] ?? 0;
      nameCount[component.name] = offset + 1;
      return {
        ...acc,
        ...validateComponent(component, parentData, parentPath, offset),
      };
    },
    {},
  );
};

const validateComponent = (
  component: FormComponent,
  parentData: DataGroup,
  parentPath: string,
  indexOffset: number = 0,
): Record<string, ValidationError> => {
  if (isComponentTextVariable(component)) {
    return validateTextVariable(component, parentData, parentPath, indexOffset);
  }

  if (isComponentNumVar(component)) {
    return validateNumVar(component, parentData, parentPath, indexOffset);
  }

  if (isComponentRecordLink(component)) {
    return validateRecordLink(component, parentData, parentPath, indexOffset);
  }

  if (isComponentCollVar(component)) {
    return validateCollVar(component, parentData, parentPath, indexOffset);
  }

  if (isComponentGroup(component)) {
    return validateGroup(component, parentData, parentPath, indexOffset);
  }

  if (isComponentContainer(component) && component.components) {
    return validateComponentList(component.components, parentData, parentPath);
  }

  return {};
};

const validateAttributes = (
  componentAttributes: FormAttributeCollection[],
  dataAttributes: Record<string, string> | undefined,
  fieldPath: string,
  label: string,
): Record<string, ValidationError> =>
  Object.fromEntries(
    componentAttributes
      .filter((attr) => !dataAttributes?.[attr.name])
      .map((attr) => [
        `${fieldPath}._${attr.name}`,
        { message: 'divaClient_fieldRequiredText', label, type: 'required' },
      ]),
  );

const validateTextVariable = (
  component: FormComponentTextVar,
  parentData: DataGroup,
  parentPath: string,
  indexOffset: number = 0,
): Record<string, ValidationError> => {
  const allByName = parentData.children.filter(
    (c) => c.name === component.name,
  ) as DataAtomic[];

  const children = component.attributes
    ? allByName.filter((c) =>
        matchesComponentFinalValues(c.attributes, component.attributes),
      )
    : allByName;

  const label = component.label ?? '';

  if (children.length === 0) {
    if (component.repeat && component.repeat.repeatMin >= 1) {
      return {
        [`${parentPath}.${component.name}[${indexOffset}]`]: {
          message: 'divaClient_fieldRequiredText',
          label,
          type: 'required',
        },
      };
    }
    return {};
  }

  return children.reduce<Record<string, ValidationError>>(
    (errors, child, index) => {
      const dataIndex = component.attributes ? allByName.indexOf(child) : index;
      const fieldPath = `${parentPath}.${component.name}[${dataIndex}]`;
      const value = child?.value ?? '';

      if (component.repeat && component.repeat.repeatMin >= 1) {
        if (value === '') {
          errors[fieldPath] = {
            message: 'divaClient_fieldRequiredText',
            label,
            type: 'required',
          };
        }
      }

      if (value !== '' && component.validation?.type === 'regex') {
        const regex = new RegExp(component.validation.pattern);
        if (!regex.test(value)) {
          errors[fieldPath] = {
            message: 'divaClient_fieldInvalidFormatText',
            label,
            type: 'invalidFormat',
          };
        }
      }

      if (component.attributes && value !== '') {
        Object.assign(
          errors,
          validateAttributes(
            component.attributes,
            child.attributes,
            fieldPath,
            label,
          ),
        );
      }

      return errors;
    },
    {},
  );
};

const validateNumVar = (
  component: FormComponentNumVar,
  parentData: DataGroup,
  parentPath: string,
  indexOffset: number = 0,
): Record<string, ValidationError> => {
  const allByName = parentData.children.filter(
    (c) => c.name === component.name,
  ) as DataAtomic[];

  const children = component.attributes
    ? allByName.filter((c) =>
        matchesComponentFinalValues(c.attributes, component.attributes),
      )
    : allByName;

  const label = component.label ?? '';

  if (children.length === 0) {
    if ((component.repeat?.repeatMin ?? 0) >= 1) {
      return {
        [`${parentPath}.${component.name}[${indexOffset}]`]: {
          message: 'divaClient_fieldRequiredText',
          label,
          type: 'required',
        },
      };
    }
    return {};
  }

  return children.reduce<Record<string, ValidationError>>(
    (errors, child, index) => {
      const fieldPath = `${parentPath}.${component.name}[${index}]`;
      const hasValue = child.value !== '';
      const hasAttributes =
        child.attributes && Object.keys(child.attributes).length > 0;

      if (hasValue && component.validation?.type === 'number') {
        const num = Number(child.value);

        if (Number.isNaN(num)) {
          errors[fieldPath] = {
            message: 'divaClient_fieldInvalidFormatText',
            label,
            type: 'invalidFormat',
          };
        } else if (num < component.validation.min) {
          errors[fieldPath] = {
            message: 'divaClient_invalidRangeMinText',
            label,
            type: 'invalidFormat',
          };
        } else if (num > component.validation.max) {
          errors[fieldPath] = {
            message: 'divaClient_invalidRangeMaxText',
            label,
            type: 'invalidFormat',
          };
        } else {
          const decimalPart = child.value.split('.')[1];
          const actualDecimals = decimalPart ? decimalPart.length : 0;
          if (actualDecimals > component.validation.numberOfDecimals) {
            errors[fieldPath] = {
              message: 'divaClient_inalidNumberOfDecimalsText',
              label,
              type: 'invalidFormat',
            };
          }
        }
      } else if (
        child.value === '' &&
        (component.repeat?.repeatMin ?? 0) >= 1 &&
        !hasAttributes
      ) {
        errors[fieldPath] = {
          message: 'divaClient_fieldRequiredText',
          label,
          type: 'required',
        };
      }

      if (
        !child.value &&
        hasAttributes &&
        (component.repeat?.repeatMin ?? 0) >= 1
      ) {
        errors[fieldPath] = {
          message: 'divaClient_fieldRequiredText',
          label,
          type: 'required',
        };
      }

      if (component.attributes && (hasValue || hasAttributes)) {
        Object.assign(
          errors,
          validateAttributes(
            component.attributes,
            child.attributes,
            fieldPath,
            label,
          ),
        );
      }

      return errors;
    },
    {},
  );
};

const validateRecordLink = (
  component: FormComponentRecordLink,
  parentData: DataGroup,
  parentPath: string,
  indexOffset: number = 0,
): Record<string, ValidationError> => {
  const allByName = parentData.children.filter(
    (c) => c.name === component.name,
  ) as DataRecordLink[];

  const children = component.attributes
    ? allByName.filter((c) =>
        matchesComponentFinalValues(c.attributes, component.attributes),
      )
    : allByName;

  const label = component.label ?? '';

  if (children.length === 0) {
    if (component.repeat && component.repeat.repeatMin >= 1) {
      return {
        [`${parentPath}.${component.name}[${indexOffset}].linkedRecordId`]: {
          message: 'divaClient_fieldRequiredText',
          label,
          type: 'required',
        },
      };
    }
    return {};
  }

  return children.reduce<Record<string, ValidationError>>(
    (errors, child, index) => {
      const fieldPath = `${parentPath}.${component.name}[${index}]`;

      const linkedRecordId = child.children.find(
        (c) => c.name === 'linkedRecordId',
      );

      if (component.repeat && component.repeat.repeatMin >= 1) {
        if (!linkedRecordId || linkedRecordId.value === '') {
          errors[`${fieldPath}.linkedRecordId`] = {
            message: 'divaClient_fieldRequiredText',
            label,
            type: 'required',
          };
        }
      }

      const hasValue = linkedRecordId && linkedRecordId.value !== '';

      if (component.attributes && hasValue) {
        Object.assign(
          errors,
          validateAttributes(
            component.attributes,
            child.attributes,
            fieldPath,
            label,
          ),
        );
      }

      return errors;
    },
    {},
  );
};

const validateCollVar = (
  component: FormComponentCollVar,
  parentData: DataGroup,
  parentPath: string,
  indexOffset: number = 0,
): Record<string, ValidationError> => {
  const allByName = parentData.children.filter(
    (c) => c.name === component.name,
  ) as DataAtomic[];

  const children = component.attributes
    ? allByName.filter((c) =>
        matchesComponentFinalValues(c.attributes, component.attributes),
      )
    : allByName;

  const label = component.label ?? '';

  if (children.length === 0) {
    if (component.repeat && component.repeat.repeatMin >= 1) {
      return {
        [`${parentPath}.${component.name}[${indexOffset}]`]: {
          message: 'divaClient_fieldRequiredText',
          label,
          type: 'required',
        },
      };
    }
    return {};
  }

  return children.reduce<Record<string, ValidationError>>(
    (errors, child, index) => {
      const fieldPath = `${parentPath}.${component.name}[${index}]`;

      if (component.repeat && component.repeat.repeatMin >= 1) {
        if (child.value === '') {
          errors[fieldPath] = {
            message: 'divaClient_fieldRequiredText',
            label,
            type: 'required',
          };
        }
      }

      if (component.attributes && child.value !== '') {
        Object.assign(
          errors,
          validateAttributes(
            component.attributes,
            child.attributes,
            fieldPath,
            label,
          ),
        );
      }

      return errors;
    },
    {},
  );
};

const hasChildData = (group: DataGroup, components: FormComponent[]): boolean =>
  group.children.some((child) => {
    const matchingComponent = components.find((c) => c.name === child.name);
    if ('children' in child) {
      if (matchingComponent && isComponentGroup(matchingComponent)) {
        return hasChildData(
          child as DataGroup,
          matchingComponent.components ?? [],
        );
      }
      const linkedRecordId = (child as DataRecordLink).children.find(
        (c) => c.name === 'linkedRecordId',
      );
      return linkedRecordId !== undefined && linkedRecordId.value !== '';
    }
    if ('value' in child && (child as DataAtomic).value !== '') {
      const finalValue = (matchingComponent as { finalValue?: string })
        ?.finalValue;
      return (child as DataAtomic).value !== finalValue;
    }
    return false;
  });

const matchesComponentFinalValues = (
  dataAttributes: Record<string, string> | undefined,
  componentAttributes: FormAttributeCollection[] | undefined,
): boolean => {
  const attrsWithFinalValue = (componentAttributes ?? []).filter(
    (a) => 'finalValue' in a && a.finalValue !== undefined,
  );
  if (attrsWithFinalValue.length === 0) {
    return true;
  }
  return attrsWithFinalValue.every(
    (attr) =>
      dataAttributes?.[attr.name] ===
      (attr as { finalValue: string }).finalValue,
  );
};

const matchesComponentAttributes = (
  dataAttributes: Record<string, string> | undefined,
  componentAttributes: FormAttributeCollection[] | undefined,
): boolean => {
  const dataAttrKeys = Object.keys(dataAttributes ?? {}).sort();
  const componentAttrKeys = (componentAttributes ?? [])
    .map((a) => a.name)
    .sort();
  return (
    dataAttrKeys.length === componentAttrKeys.length &&
    dataAttrKeys.every((key, i) => key === componentAttrKeys[i])
  );
};

const validateGroup = (
  component: FormComponentGroup,
  parentData: DataGroup,
  parentPath: string,
  indexOffset: number = 0,
): Record<string, ValidationError> => {
  const children = (
    parentData.children.filter((c) => c.name === component.name) as DataGroup[]
  ).filter((c) =>
    matchesComponentAttributes(c.attributes, component.attributes),
  );

  if (!component.components) {
    return {};
  }

  if (children.length === 0) {
    const isOptional = (component.repeat?.repeatMin ?? 0) === 0;
    if (isOptional) {
      return {};
    }
    const fieldPath = `${parentPath}.${component.name}[${indexOffset}]`;
    const emptyGroup: DataGroup = { name: component.name, children: [] };
    return validateComponentList(component.components, emptyGroup, fieldPath);
  }

  const isOptional = (component.repeat?.repeatMin ?? 0) === 0;

  return children.reduce<Record<string, ValidationError>>(
    (errors, child, index) => {
      const fieldPath = `${parentPath}.${component.name}[${index}]`;

      const childErrors = validateComponentList(
        component.components!,
        child,
        fieldPath,
      );

      if (
        isOptional &&
        Object.keys(childErrors).length > 0 &&
        !hasChildData(child, component.components!)
      ) {
        return errors;
      }

      return { ...errors, ...childErrors };
    },
    {},
  );
};
