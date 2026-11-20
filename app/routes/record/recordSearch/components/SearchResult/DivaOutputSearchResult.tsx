import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import { Link } from 'react-router';
import { Attachments } from './Attachments/Attachments';
import styles from './DivaOutputSearchResult.module.css';
import { Persons } from './Persons';
import { Related } from './Related/Related';
import { RelatedBook } from './RelatedBook/RelatedBook';
import { InfoBox } from './InfoBox/InfoBox';
import { useTranslation } from 'react-i18next';
import { getTitleFromTitleInfo } from '@/utils/getRecordTitle';
import { getDataQualityIcon } from '@/routes/divaOutput/components/RecordDetails';
import { useLanguage } from '@/i18n/useLanguage';
import { clsx } from 'clsx';

interface DivaOutputSearchResultProps {
  searchResult: BFFDataRecord;
}
export const DivaOutputSearchResult = ({
  searchResult,
}: DivaOutputSearchResultProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const output = searchResult.data.output as DivaOutputGroup;

  return (
    <div className={styles['layout']}>
      <div>
        <h2 className={styles['title']}>
          <Link
            to={`/${searchResult.recordType}/${searchResult.id}`}
            prefetch='intent'
          >
            {getTitleFromTitleInfo(output?.titleInfo) ||
              t('divaClient_missingTitleText')}
          </Link>
        </h2>
        <span>
          <Persons persons={output.name_type_personal} />
        </span>
        <InfoBox output={output} />
        <RelatedBook relatedBook={output.relatedItem_type_book} />
        <Related related={output.related} />
      </div>
      <div className={styles['data-quality-container']}>
        <span className={clsx('icon-text', styles['data-quality'])}>
          {getDataQualityIcon(output.dataQuality?.value)}{' '}
          {output.dataQuality?.__valueText?.[language]}
        </span>
      </div>
      <Attachments attachments={output.attachments} />
    </div>
  );
};
