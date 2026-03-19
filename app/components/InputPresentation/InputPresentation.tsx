import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';
import { Form } from 'react-router';
import { InputComponent } from './InputComponent';
import { FloatingActionButtonContainer } from '../FloatingActionButton/FloatingActionButtonContainer';
import { FloatingActionButton } from '../FloatingActionButton/FloatingActionButton';
import { SaveIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InputPresentationProps {
  formSchema: FormSchema;
  data?: DataGroup;
}

export const InputPresentation = ({
  formSchema,
  data,
}: InputPresentationProps) => {
  const { t } = useTranslation();
  return (
    <Form method='post'>
      <InputComponent
        component={formSchema.form}
        data={data}
        path={`${formSchema.form.name}[0]`}
      />

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
