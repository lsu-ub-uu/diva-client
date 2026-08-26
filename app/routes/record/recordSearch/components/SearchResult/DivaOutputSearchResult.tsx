import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import type { loader as rootLoader } from '@/root';
import { Link, useRouteLoaderData } from 'react-router';
import { Attachments } from './Attachments/Attachments';
import styles from './DivaOutputSearchResult.module.css';
import { Persons } from './Persons';
import { Related } from './Related/Related';
import { RelatedBook } from './RelatedBook/RelatedBook';
import { InfoBox } from './InfoBox/InfoBox';
import { useTranslation } from 'react-i18next';
import { getTitleFromTitleInfo } from '@/utils/getRecordTitle';

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
      <Attachments attachments={output.attachments} />
      <SvgFromMember output={output} />
    </div>
  );
};

const SvgFromMember = ({ output }: { output: DivaOutputGroup }) => {
  const permissionUnit = output.recordInfo.permissionUnit?.value;
  const members = useRouteLoaderData<typeof rootLoader>('root')?.members;
  const member = members?.find((member) => member.id === permissionUnit);
  return member?.logo.svg ? (
    <div
      className={styles['member-logo']}
      aria-label={`${member.id} logo`}
      dangerouslySetInnerHTML={{
        __html: member.logo.svg,
      }}
    />
  ) : (
    permissionUnit
  );
};
