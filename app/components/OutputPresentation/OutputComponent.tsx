import type {
  CoraData,
  DataAtomic,
  DataGroup,
  RecordLink,
  ResourceLink,
} from '@/cora/cora-data/types.server';
import type {
  FormComponent,
  FormComponentAnyTypeRecordLink,
  FormComponentCollVar,
  FormComponentGroup,
  FormComponentGuiElement,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentResourceLink,
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
import { OutputResourceLink } from './OutputResourceLink';

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
  if (component.presentationId === 'attachmentsOutputPGroup') {
    console.log('rendering attachments group:', component, data);
  }
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
    case 'anyTypeRecordLink':
      return (
        <OutputRecordLink
          component={component as FormComponentAnyTypeRecordLink}
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
    case 'resourceLink':
      return (
        <OutputResourceLink
          component={component as FormComponentResourceLink}
          data={data as ResourceLink}
        />
      );
    case 'guiElementLink':
      return (
        <GuiElementLink component={component as FormComponentGuiElement} />
      );
    default:
      return null;
  }
};

/* 
 - Skriva intergrationstester på OutputPresentation
 - Skriv enhetstester på komponenterna
 - Komponenter ska ha fullt stöd för headlineLevel, attributesToShow, etc...
 - Dubbla presentationer
 - Avgränsning: Endast outputpanelen?

*/
