import type { PersonUpdateGroup } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import { Link } from 'react-router';
import styles from './DivaPersonSearchResult.module.css';
import { useTranslation } from 'react-i18next';
import { getTitleForPerson } from '@/utils/getRecordTitle';

interface DivaPersonSearchResultProps {
  searchResult: BFFDataRecord;
}
export const DivaPersonSearchResult = ({
  searchResult,
}: DivaPersonSearchResultProps) => {
  const { t } = useTranslation();
  const person = searchResult.data.person as PersonUpdateGroup;
  return (
    <div className={styles['layout']}>
      <div className={styles['name']}>
        <h2 className={styles['title']}>
          <Link
            to={`/${searchResult.recordType}/${searchResult.id}`}
            prefetch='intent'
          >
            {
              person.authority?.name_type_personal?.namePart_type_termsOfAddress
                ?.value
            }{' '}
            {getTitleForPerson(person.authority) ||
              t('divaClient_missingTitleText')}
          </Link>
        </h2>
        {person.variant && person.variant.length > 0 && (
          <div>
            (
            {person.variant.map((variant, index) => (
              <span key={index}>
                {index > 0 && ', '}
                {getTitleForPerson(variant)}
              </span>
            ))}
            )
          </div>
        )}
      </div>
      <div className={styles['orcid']}>
        {person?.nameIdentifier_type_orcid?.map((orcid, index) => (
          <span key={index}>
            {index > 0 && ', '}
            {orcid.value}
          </span>
        ))}
      </div>
    </div>
  );
};
