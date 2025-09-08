import { Button } from '@/components/Button/Button';
import { messageIsFromWindowOpenedFromHere } from '@/components/Layout/Header/Login/utils/utils';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import { useTranslation } from 'react-i18next';
import { useSubmit } from 'react-router';

interface WebRedirectLoginProps {
  webRedirectLoginUnits: LoginDefinition[];
  returnTo: string | null;
}

export const WebRedirectLogin = ({
  webRedirectLoginUnits,
  returnTo,
}: WebRedirectLoginProps) => {
  const submit = useSubmit();
  const { t } = useTranslation();

  const receiveMessage = (event: MessageEvent<any>) => {
    if (messageIsFromWindowOpenedFromHere(event) && event.data.authentication) {
      window.removeEventListener('message', receiveMessage);
      submit({
        loginType: 'webRedirect',
        auth: JSON.stringify(event.data),
        returnTo: returnTo || '/',
      });
    }
  };

  const handleWebRedirectSelection = (url: string) => {
    try {
      window.open(import.meta.env.MODE === 'development' ? '/devLogin' : url);
      window.addEventListener('message', receiveMessage);
    } catch (e: any) {
      console.error(e.message());
    }
  };

  return (
    <div className='login-option'>
      <h2>Gemensam inloggning</h2>
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
                onClick={() => handleWebRedirectSelection(unit.url!)}
              >
                {t(unit.loginDescription)}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};
