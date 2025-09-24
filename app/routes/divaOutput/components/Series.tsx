import type { RelatedItemSeriesGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { createTitle } from '../utils/createTitle';
import { Term } from './Term';
import { href, Link } from 'react-router';
import type { HeadlineLevel } from '@/cora/transform/bffTypes.server';
import { useId } from 'react';

interface SeriesProps {
  series: RelatedItemSeriesGroup | undefined;
  headlineLevel?: HeadlineLevel;
}

export const Series = ({ series, headlineLevel = 'h2' }: SeriesProps) => {
  const language = useLanguage();
  const id = useId();

  if (!series) {
    return null;
  }

  const HeadlineComponent = headlineLevel;

  return (
    <section aria-labelledby={id}>
      <HeadlineComponent id={id}>{series.__text?.[language]}</HeadlineComponent>
      <dl className='inline-definitions'>
        {series.series && (
          <Term
            label={series.series.__text?.[language]}
            value={
              <Link
                to={href('/:recordType/:recordId', {
                  recordType:
                    series.series.linkedRecord.series.recordInfo.type.value,
                  recordId: series.series.value,
                })}
              >
                {createTitle(series.series.linkedRecord.series.titleInfo)}
              </Link>
            }
          />
        )}
        <Term
          label={series.titleInfo?.__text?.[language]}
          value={createTitle(series.titleInfo)}
        />
        <Term
          label={
            series.identifier_displayLabel_eissn_type_issn?.__text?.[language]
          }
          value={series.identifier_displayLabel_eissn_type_issn?.value}
        />
        <Term
          label={
            series.identifier_displayLabel_pissn_type_issn?.__text?.[language]
          }
          value={series.identifier_displayLabel_pissn_type_issn?.value}
        />
        <Term
          label={series.partNumber?.__text?.[language]}
          value={series.partNumber?.value}
        />
      </dl>
    </section>
  );
};
