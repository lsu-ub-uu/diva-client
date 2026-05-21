import type { BFFMember } from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';

const defaultMember: BFFMember = {
  id: 'diva',
  backgroundColor: '#75598E',
  textColor: '#FFFFFF',
  pageTitle: {
    sv: 'DiVA',
    en: 'DiVA',
  },
  hostnames: [],
  logo: { svg: '<svg></svg>' },
  loginUnitIds: [],
  hero: {
    title: {
      sv: 'DiVA',
      en: 'DiVA',
    },
    imageUrl: '/divaclient/public/images/hero/diva.webp',
    imageAttribution: {
      title: {
        sv: 'Carl Johansson: Kall septemberdag i Medelpad',
        en: 'Carl Johansson: A Cold September Day in Medelpad',
      },
      author: 'Nationalmuseum (Foto: Rickard Karlsson)',
      source: {
        url: 'Wikimedia Commons',
        displayLabel:
          'https://commons.wikimedia.org/wiki/File:A_Cold_September_Day_in_Medelpad_(Carl_Johansson)_-_Nationalmuseum_-_18620.tif',
      },
      license: {
        displayLabel: 'Public Domain',
      },
    },
  },
};

export const getMemberFromHostname = (
  request: Request,
  dependencies: Dependencies,
): BFFMember => {
  const { hostname } = new URL(request.url);
  return (
    Array.from(dependencies.memberPool.values()).find((member) =>
      member.hostnames?.includes(hostname),
    ) ?? defaultMember
  );
};
