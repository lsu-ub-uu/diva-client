import type {
  BFFMetadata,
  BFFMetadataChildReference,
} from '@/cora/transform/bffTypes.server';
import { useState, type ReactNode } from 'react';
import { NameInData } from './NameInData';
import { AttributesDoc } from './AttributesDoc';

interface ElementProps {
  children?: ReactNode;
  metadata: BFFMetadata;
  childRef: BFFMetadataChildReference;
}

export const Element = ({ children, metadata, childRef }: ElementProps) => {
  const [expanded, setExpanded] = useState(true);

  const finalValue = 'finalValue' in metadata ? metadata.finalValue : undefined;

  if (!expanded) {
    return (
      <div className='element'>
        <button
          onClick={() => setExpanded(true)}
          className='element-expand-button'
        >
          +
        </button>
        &lt;{metadata.nameInData}
        {'attributeReferences' in metadata && (
          <AttributesDoc attributeReferences={metadata.attributeReferences} />
        )}{' '}
        ... /&gt;&nbsp;
        <span className='multiplicity'>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
      </div>
    );
  }

  if (finalValue) {
    return (
      <div className='element'>
        <button
          onClick={() => setExpanded(false)}
          className='element-expand-button'
        >
          -
        </button>
        &lt;
        <NameInData metadata={metadata} />
        &gt;
        <span className='final-value'>{finalValue}</span>
        &lt;/{metadata.nameInData}&gt;
      </div>
    );
  }

  return (
    <div className='element'>
      <div>
        <button
          onClick={() => setExpanded(false)}
          className='element-expand-button'
        >
          -
        </button>
        &lt;
        <NameInData metadata={metadata} />
        {'attributeReferences' in metadata && (
          <AttributesDoc attributeReferences={metadata.attributeReferences} />
        )}
        &gt;&nbsp;
        <span className='multiplicity'>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
      </div>
      <div className='element-children'>
        {finalValue ? (
          <span className='final-value'>{finalValue}</span>
        ) : (
          children
        )}
      </div>
      <div>&lt;/{metadata.nameInData}&gt;</div>
    </div>
  );
};
