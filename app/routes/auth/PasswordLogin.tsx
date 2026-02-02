import type { Notification } from '@/auth/sessions.server';
import { Alert } from '@/components/Alert/Alert';
import { Button } from '@/components/Button/Button';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import type { FormSchema } from '@/components/FormGenerator/types';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { Snackbar } from '@/components/Snackbar/Snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form, useSubmit } from 'react-router';

interface PasswordLoginProps {
  notification: Notification | undefined;
  presentation: FormSchema;
  returnTo: string | null;
}

export const PasswordLogin = ({
  notification,
  presentation,
  returnTo,
}: PasswordLoginProps) => {
  const submit = useSubmit();
  const { t } = useTranslation();
  const [validationErrorShown, setValidationErrorShown] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(presentation),
    resolver: yupResolver(generateYupSchemaFromFormSchema(presentation)),
  });
  const { handleSubmit } = methods;
  return (
    <div className='password-login'>
      <Snackbar
        open={validationErrorShown}
        onClose={() => setValidationErrorShown(false)}
        severity='error'
        text={t('divaClient_formValidationErrorsText')}
      />
      {notification && notification.severity === 'error' ? (
        <Alert severity='error'>{notification.summary}</Alert>
      ) : null}
      <Form
        method='POST'
        onSubmit={handleSubmit(
          (_values, event) => {
            submit(event!.target);
          },
          () => setValidationErrorShown(true),
        )}
      >
        <input type='hidden' name='loginType' value='password' />
        {returnTo && <input type='hidden' name='returnTo' value={returnTo} />}
        <input
          type='hidden'
          name='presentation'
          value={JSON.stringify(presentation)}
        />
        <div>
          {presentation !== null ? (
            <FormProvider {...methods}>
              <FormGenerator formSchema={presentation} showTooltips={false} />
            </FormProvider>
          ) : (
            <span />
          )}
        </div>
        <Button
          type='submit'
          variant='primary'
          size='large'
          className='login-button'
        >
          {t('divaClient_LoginText')}
        </Button>
      </Form>
    </div>
  );
};
