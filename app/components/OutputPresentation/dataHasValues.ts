import type { CoraData } from '@/cora/cora-data/types.server';

export const dataHasValues = (data: CoraData) => {
  if ('value' in data && data.value) {
    return true;
  }

  if ('children' in data && data.children.length > 0) {
    return data.children.some(dataHasValues);
  }

  return false;
};
