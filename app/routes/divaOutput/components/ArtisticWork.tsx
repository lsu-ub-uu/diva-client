import type {
  DurationGroup,
  OutputUpdateGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';

interface ArtisticWorkFieldsProps {
  output: OutputUpdateGroup;
}

export const ArtisticWorkFields = ({ output }: ArtisticWorkFieldsProps) => {
  const language = useLanguage();
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
