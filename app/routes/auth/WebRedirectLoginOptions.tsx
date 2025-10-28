import { logInWithWebRedirect } from '@/auth/useWebRedirectLogin';
import { Button } from '@/components/Button/Button';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useTranslation } from 'react-i18next';

interface WebRedirectLoginProps {
  webRedirectLoginUnits: LoginDefinition[];
}

export const WebRedirectLoginOptions = ({
  webRedirectLoginUnits,
}: WebRedirectLoginProps) => {
  const { t } = useTranslation();
  return (
    <div className='login-option'>
      <h2>{t('divaClient_LoginWebRedirectText')}</h2>
      <ul>
        {webRedirectLoginUnits
          .sort((a, b) => a.loginDescription.localeCompare(b.loginDescription))
          .map((unit: LoginDefinition) => (
            <li key={unit.id}>
              <Button
                name='loginUnit'
                type='submit'
                variant='secondary'
                key={unit.id}
                value={unit.loginDescription}
                onClick={() => logInWithWebRedirect(unit.url!)}
              >
                {t(unit.loginDescription)}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};
