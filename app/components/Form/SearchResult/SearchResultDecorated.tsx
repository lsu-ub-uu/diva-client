import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import { Link } from 'react-router';
import { Persons } from './Persons';
import styles from './SearchResultDecorated.module.css';

interface SearchResultDecoratedProps {
  searchResult: BFFDataRecord;
}
export const SearchResultDecorated = ({
  searchResult,
}: SearchResultDecoratedProps) => {
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
          <p>{output?.originInfo?.dateIssued?.year?.value}</p> &#124;
          <p>{output?.genre_type_outputType?.__valueText?.en}</p>
        </span>
      </div>
      <ul className={styles['attachments']}>
        {output.attachment &&
          output.attachment.map((attachment, i) => {
            return (
              <li key={i}>
                {attachment?.attachmentFile?.linkedRecord.binary.thumbnail
                  ?.thumbnail && (
                  <img
                    className='attachment-thumbnail'
                    src={createDownloadLinkFromResourceLink(
                      attachment.attachmentFile.linkedRecord.binary.thumbnail
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
