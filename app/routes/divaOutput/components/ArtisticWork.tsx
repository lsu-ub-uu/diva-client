import type {
  DurationGroup,
  DivaOutputGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { getLanguageTextId } from '../utils/translateLanguage';
import { useTranslation } from 'react-i18next';

interface ArtisticWorkFieldsProps {
  output: DivaOutputGroup;
}

export const ArtisticWorkFields = ({ output }: ArtisticWorkFieldsProps) => {
  const language = useLanguage();
  const { t } = useTranslation();
  return (
    <>
      <Term
        label={output.typeOfResource?.__text[language]}
        value={output.typeOfResource?.__valueText[language]}
      />
      {output.type && (
        <>
          <dt>{output.type[0].__text[language]}</dt>
          {output.type.map((type) => (
            <dd
              key={type.value}
              lang={mapISO639_2b_to_ISO639_1(type._lang)}
              dir='auto'
            >
              {type.value}
            </dd>
          ))}
        </>
      )}
      {output.material && (
        <>
          <dt>{output.material[0].__text[language]}</dt>
          {output.material.map((material) => (
            <dd
              key={material.value}
              lang={mapISO639_2b_to_ISO639_1(material._lang)}
              dir='auto'
            >
              {material.value}
            </dd>
          ))}
        </>
      )}
      {output.technique && (
        <>
          <dt>{output.technique[0].__text[language]}</dt>
          {output.technique.map((technique) => (
            <dd
              key={technique.value}
              lang={mapISO639_2b_to_ISO639_1(technique._lang)}
              dir='auto'
            >
              {technique.value}
            </dd>
          ))}
        </>
      )}
      <Term label={output.size?.__text[language]} value={output.size?.value} />
      <Term
        label={output.duration?.__text[language]}
        value={
          output.duration && (
            <time dateTime={createDurationString(output.duration)}>
              {createDurationString(output.duration)}
            </time>
          )
        }
      />
      <Term
        label={output.physicalDescription?.__text[language]}
        value={output.physicalDescription?.extent.value}
      />
      {output.note_type_context?.map((note, index) => (
        <Term
          key={index}
          label={`${note.__text[language]} (${t(getLanguageTextId(note._lang))})`}
          value={note.value}
          lang={note._lang}
        />
      ))}
    </>
  );
};

function createDurationString(duration: DurationGroup) {
  const hours = duration.hh?.value;
  const minutes = duration.mm?.value;
  const seconds = duration.ss?.value;

  return [
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter(Boolean)
    .join(' ');
}
