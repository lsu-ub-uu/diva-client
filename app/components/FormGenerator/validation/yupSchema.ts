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

import type {
  AnyObject,
  ObjectSchema,
  ObjectShape,
  TestConfig,
  TestContext,
} from 'yup';
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
  checkForExistingSiblings,
  getNameInData,
  isComponentContainer,
  isComponentGroup,
  isComponentGroupAndOptional,
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
  parentGroupOptional: boolean = false,
  parentGroupRepeating: boolean = false,
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
        parentGroupOptional,
      );
    } else {
      validationRule[currentNameInData] = createSchemaForRepeatingVariable(
        component as FormComponentWithData,
        parentGroupOptional,
      );
    }
  } else {
    if (isComponentGroup(component)) {
      validationRule[currentNameInData] = createSchemaForNonRepeatingGroup(
        component,
        parentGroupOptional,
        parentGroupRepeating,
      );
    } else {
      validationRule[currentNameInData] = createSchemaForNonRepeatingVariable(
        component as FormComponentWithData,
        parentGroupOptional,
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
  parentGroupOptional: boolean,
) {
  const innerObjectSchema = generateYupSchema(
    component.components,
    isComponentGroupAndOptional(component) || parentGroupOptional,
    isComponentRepeating(component),
  );

  // Create a new schema by merging the existing schema and attribute fields
  const extendedSchema = yup.object().shape({
    ...innerObjectSchema.fields,
    ...createValidationForAttributesFromComponent(component),
  }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

  return createYupArrayFromSchema(extendedSchema, component.repeat);
}

function createSchemaForRepeatingVariable(
  component: FormComponentWithData,
  parentGroupOptional: boolean,
) {
  const attributesValidationRules = createValidationForAttributesFromComponent(
    component,
    false,
    isComponentRequired(component),
    isComponentGroupAndOptional(component),
  );

  const extendedSchema = yup.object().shape({
    value: createValidationFromComponentType(component, parentGroupOptional),
    ...attributesValidationRules,
  }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

  return createYupArrayFromSchema(extendedSchema, component.repeat);
}

function createSchemaForNonRepeatingGroup(
  component: FormComponentGroup,
  parentGroupOptional: boolean,
  parentGroupRepeating: boolean,
) {
  const innerSchema = generateYupSchema(
    component.components,
    parentGroupOptional,
    false,
  );
  return yup.object().shape({
    ...innerSchema.fields,
    ...createValidationForAttributesFromComponent(
      component,
      parentGroupOptional,
      false,
      parentGroupRepeating,
    ),
  }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
}

function createSchemaForNonRepeatingVariable(
  component: FormComponentWithData,
  parentGroupOptional: boolean,
) {
  return yup.object().shape({
    value: createValidationFromComponentType(
      component,
      parentGroupOptional,
      isComponentRequired(component),
    ),
    ...createValidationForAttributesFromComponent(
      component,
      isComponentRepeating(component),
      isComponentRequired(component),
    ),
  }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
}

export const generateYupSchema = (
  components: FormComponent[] | undefined,
  parentGroupOptional: boolean,
  parentGroupRepeating: boolean,
) => {
  const validationsRules = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => {
      return createYupValidationsFromComponent(
        formComponent,
        parentGroupOptional,
        parentGroupRepeating,
      );
    });

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const createValidationForAttributesFromComponent = (
  component: FormComponentWithData,
  siblingRepeat?: boolean,
  siblingRequired?: boolean,
  parentGroupRequired?: boolean,
) => {
  const attributeValidation =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: createYupAttributeSchema(
          attributeCollection,
          isComponentRequired(component),
          siblingRepeat,
          siblingRequired,
          parentGroupRequired,
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
) => {
  return yup
    .array()
    .of(schema)
    .min(repeat?.repeatMin ?? 1)
    .max(repeat?.repeatMax ?? 1);
};

export const createValidationFromComponentType = (
  component: FormComponent | FormAttributeCollection,
  parentGroupOptional?: boolean,
  siblingRequired?: boolean,
) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(
        component as FormComponentTextVar,
        parentGroupOptional,
        siblingRequired,
      );
    case 'numberVariable':
      return createYupNumberSchema(
        component as FormComponentNumVar,
        parentGroupOptional,
        siblingRequired,
      );
    default:
      return createYupStringSchema(
        component as FormComponent,
        parentGroupOptional,
        siblingRequired,
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
  isParentGroupOptional: boolean = false,
  isSiblingRequired: boolean = false,
) => {
  const regexpValidation = component.validation as FormRegexValidation;
  if (
    isParentGroupOptional &&
    isSiblingRequired &&
    isComponentRequired(component)
  ) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      )
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (!isParentGroupOptional && isComponentRequired(component)) {
    return yup
      .string()
      .required(REQUIRED_TEXT_ID)
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      );
  }

  if (isParentGroupOptional) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        INVALID_FORMAT_TEXT_ID,
      );
  }

  if (isComponentRepeating(component)) {
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
  isParentGroupOptional: boolean = false,
  isSiblingRequired: boolean = false,
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

  if (
    isParentGroupOptional &&
    isSiblingRequired &&
    isComponentRequired(component)
  ) {
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

  if (isParentGroupOptional) {
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
  isParentGroupOptional: boolean = false,
  siblingComponentRequired: boolean = false,
) => {
  if (
    isParentGroupOptional &&
    siblingComponentRequired &&
    isComponentRequired(component)
  ) {
    return yup
      .string()
      .nullable()
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (!isParentGroupOptional && isComponentRequired(component)) {
    return yup.string().required(REQUIRED_TEXT_ID);
  }

  if (isComponentRepeating(component) || isParentGroupOptional) {
    return generateYupSchemaForCollections();
  }

  return yup.string().required(REQUIRED_TEXT_ID);
};

const createYupAttributeSchema = (
  component: FormComponent,
  siblingRequired: boolean = false,
  siblingRepeat: boolean = false,
  siblingComponentRequired: boolean = false,
  parentGroupOptional: boolean = false,
) => {
  if (parentGroupOptional) {
    return yup
      .string()
      .nullable()
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (
    siblingRequired &&
    siblingComponentRequired &&
    isComponentRequired(component)
  ) {
    return yup
      .string()
      .nullable()
      .test(testOptionalParentAndRequiredSiblingWithValue);
  }

  if (siblingRequired && siblingComponentRequired) {
    return yup.string().when('value', ([value]) => {
      if (value === null || value === '') {
        return yup.string().nullable();
      }
      return yup.string().required(REQUIRED_TEXT_ID);
    });
  }

  if (siblingRequired && !siblingRepeat) {
    return yup.string().required(REQUIRED_TEXT_ID);
  }

  if (!siblingRequired) {
    return yup.string().when('value', ([value]) => {
      return value !== null || value !== ''
        ? yup.string().nullable().test(testAttributeHasVariableWithValue)
        : yup.string().required(REQUIRED_TEXT_ID);
    });
  }

  if (!siblingRequired && isComponentRequired(component)) {
    return yup.string().required(REQUIRED_TEXT_ID);
  }

  if (isComponentRepeating(component) || siblingRequired) {
    return generateYupSchemaForCollections();
  }

  return yup.string().required(REQUIRED_TEXT_ID);
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
      !checkForExistingSiblings(
        context.from && context.from[context.from.length - 2].value,
      )
    ) {
      return true;
    }
    if (
      !value &&
      checkForExistingSiblings(
        context.from && context.from[context.from.length - 2].value,
      )
    ) {
      return false;
    }

    return true;
  },
};

const testOptionalParentAndRequiredSiblingWithValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'checkIfStringVariableHasSiblingsWithValues',
  message: REQUIRED_TEXT_ID,
  test: (value, context) => {
    if (
      !value &&
      !checkForExistingSiblings(context.from && context.from[1].value)
    ) {
      return true;
    }
    if (
      !value &&
      checkForExistingSiblings(context.from && context.from[1].value)
    ) {
      return false;
    }

    return true;
  },
};

const testAttributeHasVariableWithValue: TestConfig<
  string | null | undefined,
  AnyObject
> = {
  name: 'checkIfVariableHasSiblingsWithValues',
  message: REQUIRED_TEXT_ID,
  test: (value, context) => {
    return (checkForExistingSiblings(value) ||
      testSiblingValueAndValueExistingValue(context, value) ||
      testSiblingValueAndValueForNotExistingValue(context, value)) as boolean;
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

const testSiblingValueAndValueForNotExistingValue = (
  context: TestContext<AnyObject>,
  value: string | undefined | null,
): boolean => {
  return (
    !checkForExistingSiblings(context.from && context.from[0].value) && !value
  );
};

const testSiblingValueAndValueExistingValue = (
  context: TestContext<AnyObject>,
  value: string | undefined | null,
) => {
  return (
    checkForExistingSiblings(context.from && context.from[0].value) && value
  );
};
