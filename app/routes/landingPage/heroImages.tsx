import bgImage from '@/images/A_Cold_September_Day_in_Medelpad__Carl_Johansson__-_Nationalmuseum_-_18620.tif_hero.webp';
import bgImageNordiska from '@/images/Stockholm_August_2020_-_Kastellet__Vasa_Museum__and_Nordic_Museum_hero.webp';
import type { ImageAttributionProps } from './ImageAttribution';

export const heroImages: Record<
  string,
  { url: string; attribution: ImageAttributionProps }
> = {
  nordiskamuseet: {
    url: bgImageNordiska,
    attribution: {
      author: 'Martin Falbisoner',
      source: {
        text: 'Wikimedia Commons',
        link: 'https://commons.wikimedia.org/wiki/File:Stockholm_August_2020_-_Kastellet,_Vasa_Museum,_and_Nordic_Museum.jpg',
      },
      license: {
        text: 'CC BY-SA 4.0',
        link: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    },
  },
  default: {
    url: bgImage,
    attribution: {
      title: 'Carl Johansson: A Cold September Day in Medelpad',
      author: 'Nationalmuseum (Foto: Rickard Karlsson)',
      source: {
        text: 'Wikimedia Commons',
        link: 'https://commons.wikimedia.org/wiki/File:A_Cold_September_Day_in_Medelpad_(Carl_Johansson)_-_Nationalmuseum_-_18620.tif',
      },
      license: {
        text: 'Public Domain',
      },
    },
  },
};
