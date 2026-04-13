import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';
import { Form } from 'react-router';
import { InputComponent } from './InputComponent';
import { FloatingActionButtonContainer } from '../FloatingActionButton/FloatingActionButtonContainer';
import { FloatingActionButton } from '../FloatingActionButton/FloatingActionButton';
import { SaveIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ValidationError } from './validateFormData';
import { createContext, useMemo } from 'react';
import { Alert, AlertTitle } from '../Alert/Alert';
import { transformFormDataToCora } from '@/routes/record/transformFormDataToCora';
import { NameIndexContext, type NameIndexMap } from './NameIndexContext';

interface InputPresentationProps {
  formSchema: FormSchema;
  data?: DataGroup;
  validationErrors?: Record<string, ValidationError>;
  onDataChange?: (data: DataGroup) => void;
}

export const InputPresentation = ({
  formSchema,
  data,
  validationErrors = {},
  onDataChange,
}: InputPresentationProps) => {
  console.log({ formSchema });
  const { t } = useTranslation();
  const nameIndexMap: NameIndexMap = new Map();
  return (
    <Form
      method='post'
      onChange={(e) => {
        if (onDataChange) {
          const formData = new FormData(e.currentTarget);
          const coraData = transformFormDataToCora(formData);
          onDataChange(coraData);
        }
      }}
    >
      {Object.keys(validationErrors).length > 0 && (
        <Alert severity='error'>
          <AlertTitle>{t('divaClient_formValidationErrorsText')}</AlertTitle>
          <ul>
            {Object.entries(validationErrors).map(([field, error]) => (
              <li key={field}>
                <strong>{t(error.label)}:</strong> {t(error.message)}
              </li>
            ))}
          </ul>
        </Alert>
      )}
      <ValidationErrorContext value={validationErrors}>
        <NameIndexContext value={nameIndexMap}>
          <InputComponent
            component={formSchema.form}
            data={data}
            path={`${formSchema.form.name}[0]`}
          />
        </NameIndexContext>
      </ValidationErrorContext>
      <FloatingActionButtonContainer>
        <FloatingActionButton
          variant='primary'
          type='submit'
          icon={<SaveIcon />}
          text={t('divaClient_SubmitButtonText')}
        />
      </FloatingActionButtonContainer>
    </Form>
  );
};

export const ValidationErrorContext = createContext<
  Record<string, ValidationError>
>({});
