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
          label={originInfo?.dateIssued?.__text?.[language]}
          value={<DateDisplay date={originInfo?.dateIssued} />}
        />

        <Term
          label={originInfo?.copyrightDate?.__text?.[language]}
          value={<DateDisplay date={originInfo?.copyrightDate} />}
        />

        {originInfo?.dateOther?.map((dateOther, index) => (
          <Term
            key={index}
            label={`${dateOther.__text?.[language]} (${dateOther._type})`}
            value={<DateDisplay date={dateOther} />}
          />
        ))}

        <Term
          label={t('agentGroupText')}
          value={getPublisherNames(originInfo)}
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
