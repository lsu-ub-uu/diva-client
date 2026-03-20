import type { FormComponentHidden } from '../FormGenerator/types';

interface HiddenInputComponentProps {
  component: FormComponentHidden;
  path: string;
}

export const HiddenInputComponent = ({
  component,
  path,
}: HiddenInputComponentProps) => {
  if (component.linkedRecordType) {
    return (
      <>
        <input
          type='hidden'
          name={`${path}.linkedRecordType`}
          value={component.linkedRecordType}
        />
        <input
          type='hidden'
          name={`${path}.linkedRecordId`}
          value={component.finalValue}
        />
      </>
    );
  }

  return <input type='hidden' name={path} value={component.finalValue} />;
};
