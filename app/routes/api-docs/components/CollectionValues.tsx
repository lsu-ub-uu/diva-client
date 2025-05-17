import { useState } from 'react';

export interface CollectionValuesProps {
  collectionValues: string[];
  max?: number;
}

export const CollectionValues = ({
  collectionValues,
  max = 8,
}: CollectionValuesProps) => {
  const [expanded, setExpanded] = useState(false);

  const valuesToShow = expanded
    ? collectionValues
    : collectionValues.slice(0, max);
  console.log('valuesToShow', valuesToShow);
  return (
    <span style={{ color: 'deepskyblue' }}>
      {collectionValues.length > max ? (
        <button
          onClick={() => setExpanded(!expanded)}
          className='collection-variable-expand'
        >
          {valuesToShow.join(' | ')}
          {!expanded && ' | ...'}
        </button>
      ) : (
        collectionValues.join(' | ')
      )}
    </span>
  );
};
