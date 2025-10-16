import type { RelatedItemConferencePublicationGroup } from '@/generatedTypes/divaTypes';
import { Term } from './Term';
import { useLanguage } from '@/i18n/useLanguage';
import { href, Link } from 'react-router';
import { createTitle } from '../utils/createTitle';
import { formatIsbnIsmnLabel } from '../utils/format';
import { Series } from './Series';
import { useId } from 'react';
import { TitleInfo } from './TitleInfo';

export interface ConferencePublicationProps {
  conferencePublication: RelatedItemConferencePublicationGroup | undefined;
}

export const ConferencePublication = ({
  conferencePublication,
}: ConferencePublicationProps) => {
  const language = useLanguage();
  const id = useId();
  if (!conferencePublication) {
    return null;
  }

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{conferencePublication.__text?.[language]}</h2>
      <dl className='inline-definitions'>
        {conferencePublication.proceeding && (
          <Term
            label={conferencePublication.proceeding?.__text[language]}
            value={
              <Link
                to={href('/diva-output/:recordId', {
                  recordId: conferencePublication.proceeding.value,
                })}
              >
                {createTitle(
                  conferencePublication.proceeding?.linkedRecord.output
                    .titleInfo,
                )}
              </Link>
            }
          />
        )}
        <TitleInfo titleInfo={conferencePublication.titleInfo} />
        <Term
          label={
            conferencePublication.note_type_statementOfResponsibility?.__text[
              language
            ]
          }
          value={
            conferencePublication.note_type_statementOfResponsibility?.value
          }
        />
        {conferencePublication.identifier_type_isbn?.map((identifier) => (
          <Term
            key={identifier._displayLabel}
            label={formatIsbnIsmnLabel(identifier, language)}
            value={identifier.value}
          />
        ))}
        <Term
          label={conferencePublication.identifier_type_doi?.__text[language]}
          value={conferencePublication.identifier_type_doi?.value}
        />
        <Term
          label={
            conferencePublication.part?.detail_type_volume?.__text[language]
          }
          value={conferencePublication.part?.detail_type_volume?.number?.value}
        />
        <Term
          label={
            conferencePublication.part?.detail_type_issue?.__text[language]
          }
          value={conferencePublication.part?.detail_type_issue?.number?.value}
        />
        <Term
          label={
            conferencePublication.part?.detail_type_artNo?.__text[language]
          }
          value={conferencePublication.part?.detail_type_artNo?.number?.value}
        />
        <Term
          label={conferencePublication.part?.extent?.start?.__text[language]}
          value={conferencePublication.part?.extent?.start?.value}
        />
        <Term
          label={conferencePublication.part?.extent?.end?.__text[language]}
          value={conferencePublication.part?.extent?.end?.value}
        />
      </dl>
      {conferencePublication.relatedItem_type_series?.map((series, index) => (
        <Series key={index} series={series} headlineLevel='h3' />
      ))}
    </section>
  );
};
