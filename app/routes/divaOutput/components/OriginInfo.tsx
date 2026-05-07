import type { OriginInfoGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { DateDisplay } from '@/routes/divaOutput/components/DateDisplay';
import { Publishers } from './Publishers';
import { Term } from './Term';

interface OriginInfoProps {
  originInfo?: OriginInfoGroup;
}

export const OriginInfo = ({ originInfo }: OriginInfoProps) => {
  const language = useLanguage();

  return (
    <>
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

      <Publishers
        publishers={originInfo?.name_otherType_publisher_type_corporate}
      />
    </>
  );
};
