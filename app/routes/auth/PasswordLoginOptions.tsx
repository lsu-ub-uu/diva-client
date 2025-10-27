import { Button } from '@/components/Button/Button';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router';

interface PasswordLoginOptionsProps {
  passwordLoginUnits: LoginDefinition[];
  returnTo: string | null;
}

export const PasswordLoginOptions = ({
  passwordLoginUnits,
  returnTo,
}: PasswordLoginOptionsProps) => {
  const { t } = useTranslation();

  return (
    <div className='login-option'>
      <h2>{t('divaClient_LoginPasswordText')}</h2>
      <Form
        method='GET'
        style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
      >
        {returnTo && <input type='hidden' name='returnTo' value={returnTo} />}
        <ul>
          {passwordLoginUnits.map((unit: LoginDefinition) => (
            <li key={unit.id}>
              <Button type='submit' name='loginUnit' value={unit.id}>
                {t(unit.loginDescription)}
              </Button>
            </li>
          ))}
        </ul>
      </Form>
    </div>
  );
};
