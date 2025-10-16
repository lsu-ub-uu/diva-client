import type { TitleInfoGroup } from '@/generatedTypes/divaTypes';

export const createTitle = (titleInfo: TitleInfoGroup | undefined) => {
  if (!titleInfo) return undefined;

  return [titleInfo?.title?.value, titleInfo?.subtitle?.value]
    .filter(Boolean)
    .join(': ');
};
