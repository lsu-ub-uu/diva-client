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
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { AnyObject, ObjectSchema, ObjectShape, TestConfig } from 'yup';
import * as yup from 'yup';
import type {
  FormAttributeCollection,
  FormComponent,
  FormComponentContainer,
  FormComponentGroup,
  FormComponentNumVar,
  FormComponentRepeat,
  FormComponentTextVar,
  FormComponentWithData,
  FormNumberValidation,
  FormRegexValidation,
  FormSchema,
} from '../types';
import {
  getNameInData,
  hasValuableData,
  isComponentContainer,
  isComponentGroup,
  isComponentOptional,
  isComponentRepeating,
  isComponentRequired,
  isComponentSingularAndOptional,
  isComponentValidForDataCarrying,
} from '../formGeneratorUtils/formGeneratorUtils';

const REQUIRED_TEXT_ID = 'divaClient_fieldRequiredText';
const INVALID_FORMAT_TEXT_ID = 'divaClient_fieldInvalidFormatText';
const INVALID_RANGE_MIN_TEXT_ID = 'divaClient_invalidRangeMinText';
const INVALID_RANGE_MAX_TEXT_ID = 'divaClient_invalidRangeMaxText';

export const generateYupSchemaFromFormSchema = (formSchema: FormSchema) => {
  const rule = createYupValidationsFromComponent(formSchema.form);
  const obj = Object.assign({}, ...[rule]) as ObjectShape;

  return yup.object().shape(obj);
};

export const createYupValidationsFromComponent = (
  component: FormComponent,
  hasOptionalAncestor: boolean = false,
) => {
  const validationRule: {
    [x: string]: any;
  } = {};

  if (isComponentContainer(component)) {
    return removeSurroundingContainer(component, validationRule);
  }

  const currentNameInData = getNameInData(component);

  if (isComponentRepeating(component)) {
    if (isComponentGroup(component)) {
      validationRule[currentNameInData] = createSchemaForRepeatingGroup(
        component,
        hasOptionalAncestor,
      );
    } else {
      validationRule[currentNameInData] = createSchemaForRepeatingVariable(
        component as FormComponentWithData,
        hasOptionalAncestor,
      );
    }
  } else {
    if (isComponentGroup(component)) {
      validationRule[currentNameInData] = createSchemaForNonRepeatingGroup(
        component,
        hasOptionalAncestor,
      );
    } else {
      validationRule[currentNameInData] = createSchemaForNonRepeatingVariable(
        component as FormComponentWithData,
        hasOptionalAncestor,
      );
    }
  }

  return validationRule;
};

function removeSurroundingContainer(
  component: FormComponentContainer,
  validationRule: { [p: string]: any },
) {
  const validationsRules = (component.components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => createYupValidationsFromComponent(formComponent));
  validationRule = Object.assign({}, ...validationsRules);

  return validationRule;
}

function createSchemaForRepeatingGroup(
  component: FormComponentGroup,
  hasOptionalAncestor: boolean,
) {
  const optional = isComponentOptional(component);

  const innerObjectSchema = generateYupSchema(
    component.components,
    optional || hasOptionalAncestor,
  );

  const object = optional ? yup.object().nullable() : yup.object();

  // Create a new schema by merging the existing schema and attribute fields
  const extendedSchema = object.shape({
    ...innerObjectSchema.fields,
    ...createValidationForAttributesFromComponent(
      component,
      !hasOptionalAncestor && isComponentRequired(component),
    ),
  }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

  return createYupArrayFromSchema(
    extendedSchema,
    component.repeat,
    hasOptionalAncestor,
  );
}

function createSchemaForRepeatingVariable(
  component: FormComponentWithData,
  hasOptionalAncestor: boolean,
) {
  const attributesValidationRules = createValidationForAttributesFromComponent(
    component,
    !hasOptionalAncestor && isComponentRequired(component),
  );

  const extendedSchema = yup
    .object()
    .nullable()
    .shape({
      value: createValidationFromComponentType(component, hasOptionalAncestor),
      ...attributesValidationRules,
    }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

  return createYupArrayFromSchema(
    extendedSchema,
    component.repeat,
    hasOptionalAncestor,
  );
}

function createSchemaForNonRepeatingGroup(
  component: FormComponentGroup,
  hasOptionalAncestor: boolean,
) {
  const optional = isComponentOptional(component);

  const innerSchema = generateYupSchema(
    component.components,
    optional || hasOptionalAncestor,
  );

  const object = optional ? yup.object().nullable() : yup.object();
  return object.shape({
    ...innerSchema.fields,
    ...createValidationForAttributesFromComponent(
      component,
      !hasOptionalAncestor && isComponentRequired(component),
    ),
  }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
}

function createSchemaForNonRepeatingVariable(
  component: FormComponentWithData,
  hasOptionalAncestor: boolean,
) {
  return yup
    .object()
    .nullable()
    .shape({
      value: createValidationFromComponentType(component, hasOptionalAncestor),
      ...createValidationForAttributesFromComponent(
        component,
        !hasOptionalAncestor && isComponentRequired(component),
      ),
    }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
}

export const generateYupSchema = (
  components: FormComponent[] | undefined,
  hasOptionalAncestor: boolean,
) => {
  const validationsRules = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => {
      return createYupValidationsFromComponent(
        formComponent,
        hasOptionalAncestor,
      );
    });

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const createValidationForAttributesFromComponent = (
  hostComponent: FormComponentWithData,
  hostComponentRequired: boolean,
) => {
  const attributeValidation =
    hostComponent.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: createAttributeSchema(
          hostComponentRequired,
        ),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValidation),
  };
};

export const createYupArrayFromSchema = (
  schema:
    | ObjectSchema<
        { [x: string]: unknown },
        AnyObject,
        Record<string, never>,
        'd'
      >
    | ObjectSchema<{ [x: string]: unknown }, AnyObject>,
  repeat: FormComponentRepeat | undefined,
  hasOptionalAncestor: boolean,
) => {
  return yup
    .array()
    .of(schema)
    .min(hasOptionalAncestor ? 0 : (repeat?.repeatMin ?? 1))
    .max(repeat?.repeatMax ?? 1);
};

export const createValidationFromComponentType = (
  component: FormComponent | FormAttributeCollection,
  hasOptionalAncestor?: boolean,
) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(
        component as FormComponentTextVar,
        hasOptionalAncestor,
      );
    case 'numberVariable':
      return createYupNumberSchema(
        component as FormComponentNumVar,
        hasOptionalAncestor,
      );
    default:
      return createYupStringSchema(
        component as FormComponent,
        hasOptionalAncestor,
      );
  }
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
const createYupStringRegexpSchema = (
  component: FormComponentTextVar,
  hasOptionalAncestor: boolean = false,
) => {
  const regexpValidation = component.validation as FormRegexValidation;
  if (hasOptionalAncestor && isComponentRequired(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      )
      .test(testRequiredIfOptionalAncestorHasValue);
  }

  if (!hasOptionalAncestor && isComponentRequired(component)) {
    return yup
      .string()
      .required(REQUIRED_TEXT_ID)
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      );
  }

  if (hasOptionalAncestor) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      );
  }

  if (isComponentOptional(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      );
  }

  return yup
    .string()
    .nullable()
    .matches(
      new RegExp(regexpValidation.pattern ?? '.+'),
      INVALID_FORMAT_TEXT_ID,
    );
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
export const createYupNumberSchema = (
  component: FormComponentNumVar,
  hasOptionalAncestor: boolean = false,
) => {
  const numberValidation = component.validation as FormNumberValidation;
  const { numberOfDecimals, min, max } = numberValidation;
  const testDecimals: TestConfig<string | null | undefined, AnyObject> = {
    name: 'decimal-places',
    message: 'Invalid number of decimals', // todo translation
    params: { numberOfDecimals },
    test: (value) => {
      if (!value) return true;
      const decimalPlaces = (value.split('.')[1] || []).length;
      return decimalPlaces === numberOfDecimals;
    },
  };

  const testMin: TestConfig<string | null | undefined, AnyObject> = {
    name: 'min',
    message: INVALID_RANGE_MIN_TEXT_ID,
    params: { min },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return min <= numValue;
    },
  };

  const testMax: TestConfig<string | null | undefined, AnyObject> = {
    name: 'max',
    message: INVALID_RANGE_MAX_TEXT_ID,
    params: { max },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return max >= numValue;
    },
  };

  if (hasOptionalAncestor && isComponentRequired(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull
          ? field
              .matches(/^[1-9]\d*(\.\d+)?$/, {
                message: INVALID_FORMAT_TEXT_ID,
              })
              .test(testDecimals)
              .test(testMax)
              .test(testMin)
          : field,
      )
      .test(testOptionalParentAndRequiredSiblingFormWholeContextWithValue);
  }

  if (hasOptionalAncestor) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull
          ? field
              .matches(/^[1-9]\d*(\.\d+)?$/, {
                message: INVALID_FORMAT_TEXT_ID,
              })
              .test(testDecimals)
              .test(testMax)
              .test(testMin)
          : field,
      );
  }

  if (isComponentSingularAndOptional(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(/^[1-9]\d*(\.\d+)?$/, { message: INVALID_FORMAT_TEXT_ID })
      .test(testDecimals)
      .test(testMin)
      .test(testMax);
  }

  return yup
    .string()
    .matches(/^[1-9]\d*(\.\d+)?$/, { message: INVALID_FORMAT_TEXT_ID })
    .test(testDecimals)
    .test(testMin)
    .test(testMax);
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
const createYupStringSchema = (
  component: FormComponent,
  hasOptionalAncestor: boolean = false,
) => {
  if (hasOptionalAncestor && isComponentRequired(component)) {
    return yup.string().nullable().test(testRequiredIfOptionalAncestorHasValue);
  }

  if (!hasOptionalAncestor && isComponentRequired(component)) {
    return yup.string().required(REQUIRED_TEXT_ID);
  }

  if (isComponentOptional(component) || hasOptionalAncestor) {
    return generateYupSchemaForCollections();
  }

  return yup.string().required(REQUIRED_TEXT_ID);
};

const createAttributeSchema = (hostRequired: boolean) => {
  if (hostRequired) {
    return yup.string().required(REQUIRED_TEXT_ID);
  }

  return yup
    .string()
    .nullable()
    .test({
      name: 'attributeRequiredIfHostHasValue',
      message: REQUIRED_TEXT_ID,
      test: (value, context) => {
        const hostHasValue = hasValuableData(context.parent);
        if (hostHasValue) {
          return !!value;
        }
        return true;
      },
    });
};

const testOptionalParentAndRequiredSiblingFormWholeContextWithValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'checkIfStringVariableHasSiblingsWithValuesInContext',
  message: REQUIRED_TEXT_ID,
  test: (value, context) => {
    if (
      !value &&
      !hasValuableData(
        context.from && context.from[context.from.length - 2].value,
      )
    ) {
      return true;
    }
    if (
      !value &&
      hasValuableData(
        context.from && context.from[context.from.length - 2].value,
      )
    ) {
      return false;
    }

    return true;
  },
};

const testRequiredIfOptionalAncestorHasValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'requiredIfOptionalAncestorContainsValue',
  message: REQUIRED_TEXT_ID,
  test: (value, context) => {
    if (value) {
      return true;
    }

    const closestOptionalAncestor = context.from
      ?.slice(1)
      .find((item) => (item.schema as any).spec.nullable === true);

    if (!closestOptionalAncestor) {
      return false;
    }

    return !hasValuableData(closestOptionalAncestor.value);
  },
};

const generateYupSchemaForCollections = () => {
  return yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .when('$isNotNull', (isNotNull, field) =>
      isNotNull[0] ? field.required('not valid') : field,
    );
};
