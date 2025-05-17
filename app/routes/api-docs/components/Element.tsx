import type {
  BFFMetadata,
  BFFMetadataChildReference,
} from '@/cora/transform/bffTypes.server';
import { useState, type ReactNode } from 'react';
import { AttributesDoc } from './AttributesDoc';
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@/icons';
import { NameInData } from './ NameInData';

interface ElementProps {
  children?: ReactNode;
  metadata: BFFMetadata;
  childRef: BFFMetadataChildReference;
}

export const Element = ({ children, metadata, childRef }: ElementProps) => {
  const [expanded, setExpanded] = useState(true);
  const { t } = useTranslation();

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
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
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
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
      </div>
      <div style={{ paddingLeft: '1.5rem' }}>
        {finalValue ? (
          <span style={{ color: 'darkorange' }}>{finalValue}</span>
        ) : (
          children
        )}
      </div>
      <div>&lt;/{metadata.nameInData}&gt;</div>
    </div>
  );
};
