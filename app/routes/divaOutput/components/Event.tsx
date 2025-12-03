import type {
  DefenceGroup,
  PresentationDivaGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { DateDisplay } from './DateDisplay';
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

  const eventLocation = event.address?.location?.value;
  const eventStreet = event.address?.street?.value;
  const eventCity = event.address?.city?.value;

  const eventLanguage =
    event.language?.['languageTerm_authority_iso639-2b_type_code']?.value;

  const address = (eventLocation || eventStreet) && (
    <address>
      {[eventLocation, eventStreet, eventCity].filter(Boolean).join(', ')}
    </address>
  );

  const eventParts = [
    'dateOther_type_presentation' in event &&
      event.dateOther_type_presentation && (
        <DateDisplay date={event.dateOther_type_presentation} />
      ),
    'dateOther_type_defence' in event && event.dateOther_type_defence && (
      <DateDisplay date={event.dateOther_type_defence} />
    ),
    address,
    eventLanguage ? `(${t(getLanguageTextId(eventLanguage))})` : '',
  ];

  return (
    <>
      <dt>{event.__text?.[language]}</dt>
      <dd>
        {eventParts.filter(Boolean).map((part, index) => (
          <Fragment key={index}>
            {part}
            {index < eventParts.length - 1 && ', '}
          </Fragment>
        ))}
      </dd>
    </>
  );
};
