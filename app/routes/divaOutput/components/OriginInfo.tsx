import type { OriginInfoGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { DateDisplay } from '@/routes/divaOutput/components/DateDisplay';
import { useTranslation } from 'react-i18next';
import { Term } from './Term';

interface OriginInfoProps {
  originInfo?: OriginInfoGroup;
}

export const OriginInfo = ({ originInfo }: OriginInfoProps) => {
  const language = useLanguage();
  const { t } = useTranslation();

  return (
    <section aria-labelledby='origin-info'>
      <h2 id='origin-info'>{originInfo?.__text?.[language]}</h2>
      <dl className='inline-definitions'>
        <Term
          label={originInfo?.place?.[0]?.__text?.[language]}
          value={originInfo?.place
            ?.map((place) => place?.placeTerm?.value)
            .join(', ')}
        />

        <Term
          label={originInfo?.dateIssued?.__text?.[language]}
          value={<DateDisplay date={originInfo?.dateIssued} />}
        />

        <Term
          label={originInfo?.copyrightDate?.__text?.[language]}
          value={<DateDisplay date={originInfo?.copyrightDate} />}
        />

        <Term
          label={originInfo?.dateOther_type_online?.__text?.[language]} //'Online'
          value={<DateDisplay date={originInfo?.dateOther_type_online} />}
        />

        <Term
          label={t('agentGroupText')}
          value={getPublisherNames(originInfo)}
        />

        <Term
          label={originInfo?.edition?.__text?.[language]}
          value={originInfo?.edition?.value}
        />
      </dl>
    </section>
  );
};

const getPublisherNames = (originInfo?: OriginInfoGroup) => {
  return originInfo?.agent?.map((agent) => {
    const textName = agent.namePart?.value;
    const linkedName =
      agent?.publisher?.linkedRecord?.publisher?.name_type_corporate?.namePart
        ?.value;
    return linkedName || textName;
  });
};
