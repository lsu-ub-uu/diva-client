import type { RecordFormSchema } from '@/components/FormGenerator/types';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { parseFormData } from '@/utils/parseFormData';
import { ValidationError } from 'yup';
import type { BFFDataRecordData } from '@/types/record';

export const parseAndValidateFormData = (
  formDefinition: RecordFormSchema,
  formData: FormData,
) => {
  const yupSchema = generateYupSchemaFromFormSchema(formDefinition);
  const parsedFormData: BFFDataRecordData = parseFormData(formData);
  try {
    yupSchema.validateSync(parsedFormData, { abortEarly: false });
    return { parsedFormData };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        errors: transformYupErrorsToMap(error),
        parsedFormData,
      };
    }

    throw error;
  }
};

const transformYupErrorsToMap = (error: ValidationError) => {
  const errorMap: Record<string, string[]> = {};
  error.inner.forEach((err) => {
    if (err.path) {
      errorMap[err.path] = err.errors;
    }
  });
  return errorMap;
};
