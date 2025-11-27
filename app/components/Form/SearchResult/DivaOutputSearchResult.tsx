import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { Link } from 'react-router';
import { Persons } from './Persons';
import styles from './DivaOutputSearchResult.module.css';
import { CircleCheckBig, TriangleAlert } from 'lucide-react';

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
        <span style={{ display: 'flex', gap: '8px' }}>
          <p>
            <time dateTime={output?.originInfo?.dateIssued?.year?.value}>
              {output?.originInfo?.dateIssued?.year?.value}
            </time>
          </p>
          <span>&#124;</span>
          <p>{output?.genre_type_outputType?.__valueText?.en}</p>
          <span>&#124;</span>
          <span className={styles['data-quality']}>
            {output.dataQuality?.value === '2026' ? (
              <CircleCheckBig className={styles['data-quality-2026']} />
            ) : (
              <TriangleAlert className={styles['data-quality-classic']} />
            )}
            {output.dataQuality?.value}
          </span>
        </span>
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
