import type {
  CoraData,
  DataAtomic,
  DataGroup,
  DataRecordLink,
} from '@/cora/cora-data/types.server';
import type {
  FormComponent,
  FormComponentCollVar,
  FormComponentGroup,
  FormComponentHidden,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentTextVar,
} from '../FormGenerator/types';
import { HiddenInputComponent } from './HiddenInputComponent';
import { InputCollectionVariable } from './InputCollectionVariable';
import { InputGroup } from './InputGroup';
import { InputNumberVariable } from './InputNumberVariable';
import { InputRecordLink } from './InputRecordLink';
import { InputVariable } from './InputVariable';

interface InputComponentProps {
  path: string;
  component: FormComponent;
  data?: CoraData;
}

export const InputComponent = ({
  path,
  component,
  data,
}: InputComponentProps) => {
  switch (component.type) {
    case 'hidden':
      return (
        <HiddenInputComponent
          component={component as FormComponentHidden}
          path={path}
        />
      );
    case 'group':
      return (
        <InputGroup
          path={path}
          component={component as FormComponentGroup}
          data={data as DataGroup}
        />
      );
    case 'textVariable':
      return (
        <InputVariable
          component={component as FormComponentTextVar}
          path={path}
          data={data as DataAtomic}
        />
      );
    case 'collectionVariable':
      return (
        <InputCollectionVariable
          component={component as FormComponentCollVar}
          path={path}
          data={data as DataAtomic}
        />
      );
    case 'numberVariable':
      return (
        <InputNumberVariable
          component={component as FormComponentNumVar}
          path={path}
          data={data as DataAtomic}
        />
      );
    case 'recordLink':
      return (
        <InputRecordLink
          path={path}
          component={component as FormComponentRecordLink}
          data={data as DataRecordLink}
        />
      );
    case 'container':
      return <InputContainer component={component} data={data as DataGroup} />;
    default:
      return null;
  }
};
