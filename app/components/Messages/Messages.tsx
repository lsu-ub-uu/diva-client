import { useTranslation } from 'react-i18next';
import { Alert } from '../Alert/Alert';
import { Message } from './Message';
import styles from './Messages.module.css';

export const Messages = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['wrapper']}>
      <Alert severity='warning'>{t('divaClient_metadataWarningText')}</Alert>
      <Message
        severity='info'
        message={{
          sv: 'Vid registrering i DiVA ska du ange den institution/avdelning som författaren/redaktören tillhörde vid tiden för publicering, dvs. den organisatoriska tillhörighet som anges i publikationen.\nFältet Lokalt användarid används för att koppla poster i DiVA till publikationslistor på profilsidor och på webbsidor vid Uppsala universitet (UU). För författare/redaktör vid UU kan du koppla personpost som innehåller personens lokala användar-ID, organisationstillhörighet mm.',
          en: "Always start by searching in DiVA for the publication that you want to register – perhaps it is already registered.\nSelect the institution/department that the author/editor belonged to at the time of publication, i.e. the organisational affiliation listed in the publication.\nThe field Local User Id is used to connect DiVA-records to publication lists on personal profile pages and on web pages at Uppsala University (UU). For authors/editors at UU, you can connect their Authority Record which contains information about the person's affiliation and local user id.",
        }}
        title={{
          sv: 'Viktigt meddelande!',
          en: 'Important message!',
        }}
        createdBy='Egil Swenning'
        createdAt='2025-04-30T06:42:45.277429Z'
      />
    </div>
  );
};
