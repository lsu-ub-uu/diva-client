import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';
import { Form } from 'react-router';
import { InputComponent } from './InputComponent';
import { FloatingActionButtonContainer } from '../FloatingActionButton/FloatingActionButtonContainer';
import { FloatingActionButton } from '../FloatingActionButton/FloatingActionButton';
import { SaveIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ValidationError } from './validateFormData';
import { createContext } from 'react';
import { Alert, AlertTitle } from '../Alert/Alert';

interface InputPresentationProps {
  formSchema: FormSchema;
  data?: DataGroup;
  validationErrors?: Record<string, ValidationError>;
}

export const InputPresentation = ({
  formSchema,
  data,
  validationErrors = {},
}: InputPresentationProps) => {
  const { t } = useTranslation();
  return (
    <Form method='post'>
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
        <InputComponent
          component={formSchema.form}
          data={data}
          path={`${formSchema.form.name}[0]`}
        />
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
