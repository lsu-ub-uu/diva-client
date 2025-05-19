import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import { Fragment, useState } from 'react';
import { NameInData } from './ NameInData';

export interface CollectionValuesProps {
  collectionItems: BFFMetadata[];
  max?: number;
}

export const CollectionValues = ({
  collectionItems,
  max = 8,
}: CollectionValuesProps) => {
  const [expanded, setExpanded] = useState(false);

  const itemsToShow = expanded
    ? collectionItems
    : collectionItems.slice(0, max);
  return (
    <span style={{ color: 'deepskyblue' }}>
      <span>
        {itemsToShow.map((item, index) => (
          <Fragment key={item.id}>
            <NameInData metadata={item} />
            {index < collectionItems.length - 1 && ' | '}
          </Fragment>
        ))}
        {collectionItems.length > max && (
          <button
            onClick={() => setExpanded(!expanded)}
            className='collection-variable-expand'
          >
            {expanded ? ' [-]' : '...'}
          </button>
        )}
      </span>
    </span>
  );
};
