import type {
  RelatedOutputConstituentGroup,
  RelatedOutputGroup,
  RelatedOutputRetractedGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { href, Link } from 'react-router';
import { getFullTitleForOutput } from '@/utils/getRecordTitle';

interface RelatedOutputProps {
  relatedOutput:
    | RelatedOutputGroup
    | RelatedOutputConstituentGroup
    | RelatedOutputRetractedGroup
    | undefined;
}

export const RelatedOutput = ({ relatedOutput }: RelatedOutputProps) => {
  const language = useLanguage();
  if (!relatedOutput?.output) return null;

  return (
    <Term
      label={relatedOutput.__text?.[language]}
      value={
        <Link
          to={href('/diva-output/:recordId', {
            recordId: relatedOutput.output?.value,
          })}
        >
          {getFullTitleForOutput(relatedOutput.output?.linkedRecord)}
        </Link>
      }
    />
  );
};
