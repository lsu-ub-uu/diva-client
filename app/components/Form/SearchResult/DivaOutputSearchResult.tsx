import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { href, Link } from 'react-router';
import { Persons } from './Persons';
import styles from './DivaOutputSearchResult.module.css';
import { CircleCheckBig, TriangleAlert } from 'lucide-react';
import { Term } from '@/routes/divaOutput/components/Term';
import { createTitle } from '@/routes/divaOutput/utils/createTitle';
import clsx from 'clsx';

interface DivaOutputSearchResultProps {
  searchResult: BFFDataRecord;
}
export const DivaOutputSearchResult = ({
  searchResult,
}: DivaOutputSearchResultProps) => {
  const language = useLanguage();
  const output = searchResult.data.output as DivaOutputGroup;
  return (
    <div className={styles['layout']}>
      <div>
        <h2>
          <Link to={`/${searchResult.recordType}/${searchResult.id}`}>
            {output?.titleInfo?.title?.value}
          </Link>
        </h2>
        <span>
          <Persons persons={output.name_type_personal} />
        </span>
        <span className={styles['info-box']}>
          <p className={styles['item']}>
            <time dateTime={output?.originInfo?.dateIssued?.year?.value}>
              {output?.originInfo?.dateIssued?.year?.value}
            </time>
          </p>
          <p className={styles['item']}>
            {output?.genre_type_outputType?.__valueText?.[language]}
          </p>
          <span className={clsx(styles['data-quality'], styles['item'])}>
            {output.dataQuality?.value === '2026' ? (
              <CircleCheckBig className={styles['data-quality-2026']} />
            ) : (
              <TriangleAlert className={styles['data-quality-classic']} />
            )}
            {output.dataQuality?.value}
          </span>
        </span>
        {output.relatedItem_type_book?.book && (
          <div className={styles['related-book']}>
            <Term
              label={`${output.relatedItem_type_book?.__text?.[language]}:`}
              value={createTitle(
                output.relatedItem_type_book?.book?.linkedRecord.output
                  .titleInfo,
              )}
            />
          </div>
        )}
        {output.related &&
          output.related.map((related, i) => {
            return (
              <div key={i} className={styles['related-book']}>
                <Term
                  label={`${related.__text?.[language]}:`}
                  value={createTitle(
                    related.output?.linkedRecord?.output?.titleInfo,
                  )}
                />
              </div>
            );
          })}
      </div>
      <ul className={styles['attachments']}>
        {output.attachment &&
          output.attachment.map((attachment, i) => {
            if (!attachment.attachmentFile?.linkedRecord?.binary.master) {
              return null;
            }
            return (
              <li key={i}>
                {attachment?.attachmentFile?.linkedRecord.binary.thumbnail
                  ?.thumbnail && (
                  <img
                    className={styles['attachment-thumbnail']}
                    src={createDownloadLinkFromResourceLink(
                      attachment?.attachmentFile?.linkedRecord.binary.thumbnail
                        .thumbnail,
                    )}
                    alt={attachment.__text?.[language]}
                  />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
