import type {
  AttachmentsGroup,
  DivaOutputGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { PublishFileIcon, PublishIcon, UnpublishIcon } from '@/icons/icons';
import { getDataQualityIcon } from '@/routes/divaOutput/components/RecordDetails';
import type { BFFDataRecord } from '@/types/record';
import { getTitleFromTitleInfo } from '@/utils/getRecordTitle';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Attachments } from './Attachments/Attachments';
import styles from './DivaOutputSearchResult.module.css';
import { InfoBox } from './InfoBox/InfoBox';
import { Persons } from './Persons';
import { Related } from './Related/Related';
import { RelatedBook } from './RelatedBook/RelatedBook';

interface DivaOutputSearchResultProps {
  searchResult: BFFDataRecord;
}
export const DivaOutputSearchResult = ({
  searchResult,
}: DivaOutputSearchResultProps) => {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const language = currentLanguage === 'sv' ? 'sv' : 'en';
  const output = searchResult.data.output as DivaOutputGroup;

  return (
    <div className={styles['layout']}>
      <div className={styles['main-content']}>
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
      <div className={styles['pills-container']}>
        {output.recordInfo?.visibility && (
          <VisibilityPill output={output} language={language} />
        )}
        {output.dataQuality && (
          <DataQualityPill
            dataQuality={output.dataQuality}
            language={language}
          />
        )}
        {output.attachments?.attachment?.length && (
          <AttachmentsPill attachments={output.attachments} />
        )}
      </div>
      <Attachments attachments={output.attachments} />
    </div>
  );
};

interface PillProps {
  children: React.ReactNode;
  backgroundColor: string;
  border: string;
  iconColor?: string;
  color: string;
  icon?: React.ReactNode;
}

const Pill = ({
  backgroundColor,
  border,
  iconColor,
  color,
  children,
  icon,
}: PillProps) => {
  const style: React.CSSProperties & { '--pill-icon-color': string } = {
    backgroundColor: backgroundColor,
    border: `1px solid ${border}`,
    color: color,
    '--pill-icon-color': iconColor ?? color,
  };

  return (
    <span className={`${styles['pill']} icon-text`} style={style}>
      {icon}
      {children}
    </span>
  );
};

const VisibilityPill = ({
  output,
  language,
}: {
  output: DivaOutputGroup;
  language: 'sv' | 'en';
}) => {
  return (
    <Pill
      backgroundColor={
        output.recordInfo.visibility.value !== 'unpublished'
          ? 'rgb(200, 165, 231)'
          : 'var(--color-alert-info-bg)'
      }
      border={
        output.recordInfo.visibility.value !== 'unpublished'
          ? 'var(--color-diva-purple)'
          : 'var(--color-alert-info-border)'
      }
      color={
        output.recordInfo.visibility.value !== 'unpublished'
          ? 'var(--color-accent-dark)'
          : 'var(--color-alert-info-font)'
      }
      iconColor={
        output.recordInfo.visibility.value !== 'unpublished'
          ? 'var(--color-fab-primary-text)'
          : 'var(--color-alert-info-icon)'
      }
      icon={
        output.recordInfo.visibility.value !== 'unpublished' ? (
          <UnpublishIcon />
        ) : (
          <PublishIcon />
        )
      }
    >
      {output.recordInfo.visibility.__valueText?.[language]}
    </Pill>
  );
};

const DataQualityPill = ({
  dataQuality,
  language,
}: {
  dataQuality: NonNullable<DivaOutputGroup['dataQuality']>;
  language: 'sv' | 'en';
}) => {
  const is2026 = dataQuality.value === '2026';

  return (
    <Pill
      backgroundColor={
        is2026
          ? 'var(--color-alert-success-bg)'
          : 'var(--color-alert-warning-icon)'
      }
      border={
        is2026
          ? 'var(--color-alert-success-border)'
          : 'var(--color-alert-warning-border)'
      }
      iconColor={
        is2026
          ? 'var(--color-alert-success-icon)'
          : 'var(--color-alert-warning-icon)'
      }
      color={
        is2026
          ? 'var(--color-alert-success-font)'
          : 'var(--color-alert-warning-font)'
      }
      icon={getDataQualityIcon(dataQuality.value)}
    >
      {dataQuality.__valueText?.[language]}
    </Pill>
  );
};

const AttachmentsPill = ({
  attachments,
}: {
  attachments: AttachmentsGroup;
}) => {
  const attachmentList = attachments.attachment ?? [];
  const publishedCount = attachmentList.filter(
    (attachment) =>
      attachment.file?.linkedRecord.binary.recordInfo.visibility.value ===
      'published',
  ).length;

  return (
    <Pill
      backgroundColor='var(--color-card)'
      border='var(--color-thin-border)'
      color='var(--color-text)'
      iconColor='var(--color-text)'
      icon={<PublishFileIcon />}
    >
      {publishedCount} / {attachmentList.length}{' '}
      {attachmentList.length === 1 ? 'attachment' : 'attachments'}
    </Pill>
  );
};
