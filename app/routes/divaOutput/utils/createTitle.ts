import type { TitleInfoGroup } from '@/generatedTypes/divaTypes';

export const createTitle = (titleInfo: TitleInfoGroup) => {
  return [titleInfo.title.value, titleInfo.subtitle?.value]
    .filter(Boolean)
    .join(': ');
};
