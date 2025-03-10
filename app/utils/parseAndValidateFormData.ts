import type { RecordFormSchema } from '@/components/FormGenerator/types';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { parseFormData } from '@/utils/parseFormData';
import { ValidationError } from 'yup';
import type { BFFDataRecordData } from '@/types/record';

export const parseAndValidateFormData = async (
  formDefinition: RecordFormSchema,
  request: Request,
) => {
  const yupSchema = generateYupSchemaFromFormSchema(formDefinition);
  const parsedFormData: BFFDataRecordData = parseFormData(
    await request.formData(),
  );
  try {
    await yupSchema.validate(parsedFormData, { abortEarly: false });
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
