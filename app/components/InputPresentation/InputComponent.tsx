import type { DataGroup } from '@/cora/cora-data/types.server';
import type {
  FormComponent,
  FormComponentGroup,
  FormComponentTextVar,
} from '../FormGenerator/types';
import { InputGroup } from './InputGroup';
import { InputVariable } from './InputVariable';

interface InputComponentProps {
  path: string;
  component: FormComponent;
  data?: DataGroup;
}

export const InputComponent = ({ path, component }: InputComponentProps) => {
  switch (component.type) {
    case 'group':
      return (
        <InputGroup component={component as FormComponentGroup} path={path} />
      );
    case 'textVariable':
      return (
        <InputVariable
          component={component as FormComponentTextVar}
          path={path}
        />
      );
    default:
      return null;
  }
};
