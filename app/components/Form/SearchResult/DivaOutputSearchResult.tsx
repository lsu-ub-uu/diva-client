import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import { Link } from 'react-router';
import { Attachments } from './Attachments/Attachments';
import styles from './DivaOutputSearchResult.module.css';
import { Persons } from './Persons';
import { Related } from './Related/Related';
import { RelatedBook } from './RelatedBook/RelatedBook';
import { InfoBox } from './InfoBox/InfoBox';
import { createTitle } from '@/routes/divaOutput/utils/createTitle';
import { useTranslation } from 'react-i18next';

interface DivaOutputSearchResultProps {
  searchResult: BFFDataRecord;
}
export const DivaOutputSearchResult = ({
  searchResult,
}: DivaOutputSearchResultProps) => {
  const { t } = useTranslation();
  const output = searchResult.data.output as DivaOutputGroup;
  return (
    <div className={styles['layout']}>
      <div>
        <h2>
          <Link
            to={`/${searchResult.recordType}/${searchResult.id}`}
            prefetch='intent'
          >
            {createTitle(output?.titleInfo) || t('divaClient_missingTitleText')}
          </Link>
        </h2>
        <span>
          <Persons persons={output.name_type_personal} />
        </span>
        <InfoBox output={output} />
        <RelatedBook relatedBook={output.relatedItem_type_book} />
        <Related related={output.related} />
      </div>
      <Attachments attachments={output.attachment} />
    </div>
  );
};
