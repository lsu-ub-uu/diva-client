import type { BFFMemberHero } from '@/cora/bffTypes.server';
import { useTranslation } from 'react-i18next';
import { ImageAttribution } from './ImageAttribution';
import { useLanguage } from '@/i18n/useLanguage';

interface HeroProps {
  hero: BFFMemberHero;
  children?: React.ReactNode;
}

export const Hero = ({ hero, children }: HeroProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  return (
    <div className='hero-container'>
      <figure className='hero-background'>
        <img src={hero.imageUrl} alt='' className='hero-image' />
        <figcaption className='image-credit'>
          <details>
            <summary>{t('divaClient_heroImageSourceText')}</summary>
            <ImageAttribution attribution={hero.imageAttribution} />
          </details>
        </figcaption>
      </figure>

      <h1 className='hero-title'>{hero.title[language]}</h1>
      {hero.subTitle && (
        <div className='hero-subtitle'>{hero.subTitle[language]}</div>
      )}
      {children}
    </div>
  );
};
