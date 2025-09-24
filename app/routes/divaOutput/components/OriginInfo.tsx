import type { OriginInfoGroup } from '@/generatedTypes/divaTypes';
import { Term } from './Term';
import { useLanguage } from '@/i18n/useLanguage';
import { Date } from '@/routes/divaOutput/components/Date';

interface OriginInfoProps {
  originInfo: OriginInfoGroup;
}

export const OriginInfo = ({ originInfo }: OriginInfoProps) => {
  const language = useLanguage();

  return (
    <section aria-labelledby='origin-info'>
      <h2 id='origin-info'>{originInfo.__text[language]}</h2>
      <dl className='inline-definitions'>
        <Term
          label={originInfo.place?.[0]?.__text[language]}
          value={originInfo.place
            ?.map((place) => place?.placeTerm.value)
            .join(', ')}
        />

        <Term
          label={originInfo?.dateIssued?.__text[language]}
          value={<Date date={originInfo.dateIssued} />}
        />

        <Term
          label={originInfo?.copyrightDate?.__text[language]}
          value={<Date date={originInfo.copyrightDate} />}
        />

        <Term
          label={originInfo.dateOther_type_online?.__text[language]} //'Online'
          value={<Date date={originInfo.dateOther_type_online} />}
        />

        <Term
          label={originInfo.agent?.__text[language]}
          value={getPublisherNames(originInfo)}
        />

        <Term
          label={originInfo.edition?.__text[language]}
          value={originInfo.edition?.value}
        />
      </dl>
    </section>
  );
};

const getPublisherNames = (originInfo: OriginInfoGroup) => {
  const uncontrolledAgents =
    originInfo.agent?.namePart?.map((namePart) => namePart.value) ?? [];

  const linkedPublishers =
    originInfo.agent?.publisher?.map(
      (publisher) =>
        publisher.linkedRecord?.publisher.name_type_corporate.namePart.value,
    ) ?? [];
  return [...linkedPublishers, ...uncontrolledAgents].filter(Boolean);
};
