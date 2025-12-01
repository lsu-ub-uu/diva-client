import type { ReactNode } from 'react';

export interface ImageAttributionProps {
  title?: string;
  author?: string;
  source: {
    text: string;
    link: string;
  };
  license: {
    text: string;
    link?: string;
  };
}

export const ImageAttribution = ({
  attribution,
}: {
  attribution: ImageAttributionProps;
}) => {
  const fragments = [
    attribution.title,
    attribution.author,
    <>
      <a
        href={attribution.source.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        {attribution.source.text}
      </a>
    </>,
    attribution.license.link ? (
      <a
        href={attribution.license.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        {attribution.license.text}
      </a>
    ) : (
      attribution.license.text
    ),
  ];
  return (
    <div className='image-attribution'>
      {fragments.filter(Boolean).reduce<ReactNode[]>((prev, curr, index) => {
        if (index === 0) {
          return [curr];
        } else {
          return [...prev, ', ', curr];
        }
      }, [])}
    </div>
  );
};
