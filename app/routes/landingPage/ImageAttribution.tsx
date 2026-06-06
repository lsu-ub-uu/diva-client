import type { BFFImageAttribution } from '@/cora/bffTypes.server';
import { useLanguage } from '@/i18n/useLanguage';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface ImageAttributionProps {
  attribution: BFFImageAttribution;
}

export const ImageAttribution = ({ attribution }: ImageAttributionProps) => {
  const { t } = useTranslation();
  const language = useLanguage();

  const fragments = [
    attribution.title && attribution.title[language],
    attribution.author,
    <>
      <a
        href={attribution.source.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {attribution.source.displayLabel}
      </a>
    </>,
    attribution.license.url ? (
      <a
        href={attribution.license.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {attribution.license.displayLabel}
      </a>
    ) : (
      attribution.license.displayLabel
    ),
  ];
  return (
    <div className='image-attribution'>
      {fragments.filter(Boolean).reduce<ReactNode[]>((prev, curr, index) => {
        if (index === 0) {
          return [<span key={index}>{curr}</span>];
        } else {
          return [
            ...prev,
            <span key={`comma-${index}`}>{', '}</span>,
            <span key={index}>{curr}</span>,
          ];
        }
      }, [])}
      <span> ({t('divaClient_imageAttributionModifiedText')})</span>
    </div>
  );
};
