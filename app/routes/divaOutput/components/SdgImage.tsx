import sdg1 from '@/images/sdg/sdg1.png';
import sdg2 from '@/images/sdg/sdg2.png';
import sdg3 from '@/images/sdg/sdg3.png';
import sdg4 from '@/images/sdg/sdg4.png';
import sdg5 from '@/images/sdg/sdg5.png';
import sdg6 from '@/images/sdg/sdg6.png';
import sdg7 from '@/images/sdg/sdg7.png';
import sdg8 from '@/images/sdg/sdg8.png';
import sdg9 from '@/images/sdg/sdg9.png';
import sdg10 from '@/images/sdg/sdg10.png';
import sdg11 from '@/images/sdg/sdg11.png';
import sdg12 from '@/images/sdg/sdg12.png';
import sdg13 from '@/images/sdg/sdg13.png';
import sdg14 from '@/images/sdg/sdg14.png';
import sdg15 from '@/images/sdg/sdg15.png';
import sdg16 from '@/images/sdg/sdg16.png';
import sdg17 from '@/images/sdg/sdg17.png';

import type { SubjectSdgGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';

interface SdgImageProps {
  topic: SubjectSdgGroup['topic'][number];
}

export const SdgImage = ({ topic }: SdgImageProps) => {
  const language = useLanguage();
  return (
    <img
      src={sdgImage(topic.value)}
      alt={topic.__valueText[language]}
      title={topic.__valueText[language]}
      className='sdg-image'
    />
  );
};

const sdgImage = (value: string) => {
  switch (value) {
    case 'sdg1':
      return sdg1;
    case 'sdg2':
      return sdg2;
    case 'sdg3':
      return sdg3;
    case 'sdg4':
      return sdg4;
    case 'sdg5':
      return sdg5;
    case 'sdg6':
      return sdg6;
    case 'sdg7':
      return sdg7;
    case 'sdg8':
      return sdg8;
    case 'sdg9':
      return sdg9;
    case 'sdg10':
      return sdg10;
    case 'sdg11':
      return sdg11;
    case 'sdg12':
      return sdg12;
    case 'sdg13':
      return sdg13;
    case 'sdg14':
      return sdg14;
    case 'sdg15':
      return sdg15;
    case 'sdg16':
      return sdg16;
    case 'sdg17':
      return sdg17;
  }
};
