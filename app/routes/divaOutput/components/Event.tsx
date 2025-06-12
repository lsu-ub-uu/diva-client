import type {
  DefenceGroup,
  PresentationDivaGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Date } from './Date';
import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { getLanguageTextId } from '../utils/translateLanguage';

interface EventProps {
  event?: PresentationDivaGroup | DefenceGroup;
}

export const Event = ({ event }: EventProps) => {
  const language = useLanguage();
  const { t } = useTranslation();

  if (!event) {
    return null;
  }

  const eventLocation = event.location?.value;
  const eventAddress = event.address?.value;
  const eventLanguage =
    event.language?.['languageTerm_authority_iso639-2b_type_code']?.value;

  const address = (eventLocation || eventAddress) && (
    <address>
      {[eventLocation, eventAddress].filter(Boolean).join(', ')}
    </address>
  );

  const eventParts = [
    event.dateOther_type_presentation && (
      <Date date={event.dateOther_type_presentation} />
    ),
    address,
    eventLanguage ? `(${t(getLanguageTextId(eventLanguage))})` : '',
  ];

  return (
    <>
      <dt>{event.__text[language]}</dt>
      <dd>
        {eventParts.map((part, index) => (
          <Fragment key={index}>
            {part}
            {index < eventParts.length - 1 && ', '}
          </Fragment>
        ))}
      </dd>
    </>
  );
};
