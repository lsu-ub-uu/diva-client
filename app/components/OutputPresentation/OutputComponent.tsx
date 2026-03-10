import type { DataAtomic, RecordLink } from '@/cora/cora-data/types.server';
import type {
  FormComponent,
  FormComponentCollVar,
  FormComponentGroup,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentTextVar,
} from '../FormGenerator/types';
import { OutputCollectionVariable } from './OutputCollectionVariable';
import { OutputGroup } from './OutputGroup';
import { OutputVariable } from './OutputVariable';
import { OutputRecordLink } from './OutputRecordLink';

interface OutputComponentProps {
  component: FormComponent;
  data: Record<string, any>;
}

export const OutputComponent = ({ component, data }: OutputComponentProps) => {
  switch (component.type) {
    case 'group':
      return (
        <OutputGroup component={component as FormComponentGroup} data={data} />
      );
    case 'textVariable':
      return (
        <OutputVariable
          component={component as FormComponentTextVar}
          data={data as DataAtomic}
        />
      );
    case 'numberVariable':
      return (
        <OutputVariable
          component={component as FormComponentNumVar}
          data={data as DataAtomic}
        />
      );
    case 'collectionVariable':
      return (
        <OutputCollectionVariable
          component={component as FormComponentCollVar}
          data={data as DataAtomic}
        />
      );
    case 'recordLink':
      return (
        <OutputRecordLink
          component={component as FormComponentRecordLink}
          data={data as RecordLink}
        />
      );
    default:
      return (
        <div>
          Unhandled component: {component.name} - {component.type}
        </div>
      );
  }
};
