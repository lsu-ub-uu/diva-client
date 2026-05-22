import { useIsDevMode } from '@/utils/useIsDevMode';
import type { FormComponent } from '../FormGenerator/types';
import type { CoraData } from '@/cora/cora-data/types.server';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface OutputDevInfoProps {
  component: FormComponent;
  data?: CoraData;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputDevInfo = ({
  component,
  data,
  parentPresentationStyle,
}: OutputDevInfoProps) => {
  const isDevMode = useIsDevMode();

  if (!isDevMode) {
    return null;
  }

  return (
    <details
      style={{
        background: '#222',
        color: '#fff',
        border: '1px solid #444',
        borderRadius: '4px',
        padding: '2px 10px',
        overflowWrap: 'break-word',
        maxWidth: '800px',
        fontFamily: 'monospace',
        fontSize: '.8rem',
      }}
      className='form-component-item'
      data-colspan={12}
    >
      <summary>{component.presentationId}</summary>
      <div style={{ paddingLeft: '10px' }}>
        parentPresentationStyle: {parentPresentationStyle}
        <details>
          <summary>Form schema</summary>
          <pre>{JSON.stringify(component, null, 2)}</pre>
        </details>
        <details>
          <summary>Data</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    </details>
  );
};
