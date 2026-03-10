import type {
  CoraData,
  DataAtomic,
  DataGroup,
  RecordLink,
} from '@/cora/cora-data/types.server';
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
  data: CoraData;
}

export const OutputComponent = ({ component, data }: OutputComponentProps) => {
  switch (component.type) {
    case 'group':
      return (
        <OutputGroup
          component={component as FormComponentGroup}
          data={data as DataGroup}
        />
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
    case 'resourceLink': // TODO
    case 'container': // TODO
    case 'anyTypeRecordLink': // TODO
    case 'guiElementLink': // TODO
    case 'text': // TODO
    default:
      return (
        <div>
          Unhandled component: {component.name} - {component.type}
        </div>
      );
  }
};
