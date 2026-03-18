import type {
  DivaFunder,
  RelatedItemFunderGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { getTitleForFunder } from '@/utils/getRecordTitle';
import { useId } from 'react';
import { href, Link } from 'react-router';
import { Term } from './Term';

interface FunderProps {
  funder: RelatedItemFunderGroup | undefined;
}

export const Funder = ({ funder }: FunderProps) => {
  const id = useId();
  const language = useLanguage();
  if (!funder) {
    return null;
  }

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{funder.__text?.[language]}</h2>
      <dl>
        {funder.funder && (
          <Term
            label={funder.funder?.__text?.[language]}
            value={
              <Link
                to={href('/:recordType/:recordId', {
                  recordType:
                    funder.funder.linkedRecord.funder.recordInfo.type.value,
                  recordId: funder.funder.value,
                })}
              >
                {formatFunderName(funder.funder.linkedRecord, language)}
              </Link>
            }
          />
        )}
        <Term
          label={funder.identifier_type_project?.__text?.[language]}
          value={funder.identifier_type_project?.value}
        />
      </dl>
    </section>
  );
};

const formatFunderName = (funder: DivaFunder, language: 'sv' | 'en') => {
  if (!funder) return undefined;
  return getTitleForFunder(funder, language);
};
