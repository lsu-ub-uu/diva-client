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
  FormComponentGuiElement,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentText,
  FormComponentTextVar,
  PresentationStyle,
} from '../FormGenerator/types';
import { OutputCollectionVariable } from './OutputCollectionVariable';
import { OutputGroup } from './OutputGroup';
import { OutputVariable } from './OutputVariable';
import { OutputRecordLink } from './OutputRecordLink';
import { OutputContainer } from './OutputContainer';
import { GuiElementLink } from '../FormGenerator/components/GuiElementLink';
import { Text } from '../FormGenerator/components/Text';

interface OutputComponentProps {
  component: FormComponent;
  data?: CoraData;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputComponent = ({
  component,
  data,
  parentPresentationStyle,
}: OutputComponentProps) => {
  switch (component.type) {
    case 'group':
      return (
        <OutputGroup
          component={component as FormComponentGroup}
          data={data as DataGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'textVariable':
      return (
        <OutputVariable
          component={component as FormComponentTextVar}
          data={data as DataAtomic}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'numberVariable':
      return (
        <OutputVariable
          component={component as FormComponentNumVar}
          data={data as DataAtomic}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'collectionVariable':
      return (
        <OutputCollectionVariable
          component={component as FormComponentCollVar}
          data={data as DataAtomic}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'recordLink':
      return (
        <OutputRecordLink
          component={component as FormComponentRecordLink}
          data={data as RecordLink}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'container':
      return (
        <OutputContainer
          component={component}
          data={data as DataGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'text':
      return <Text component={component as FormComponentText} />;
    case 'resourceLink': // TODO
    case 'anyTypeRecordLink': // TODO
    case 'guiElementLink':
      return (
        <GuiElementLink component={component as FormComponentGuiElement} />
      );
    default:
      return (
        <div>
          Unhandled component: {component.name} - {component.type}
        </div>
      );
  }
};
