import type { CoraData } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';

export interface ValidationError {
  message: string;
}

export const validateFormData = (
  formSchema: FormSchema,
  data: CoraData,
): { valid: boolean; errors: Record<string, ValidationError> } => {
  return { valid: true, errors: {} };
};
