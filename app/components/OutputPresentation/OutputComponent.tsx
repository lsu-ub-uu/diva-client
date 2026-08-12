import type { PresentationStyle } from '@/cora/bffTypes.server';
import type {
  CoraData,
  DataAtomic,
  DataGroup,
  DataRecordLink,
  DataResourceLink,
} from '@/cora/cora-data/types.server';
import { GuiElementLink } from '../FormGenerator/components/GuiElementLink';
import { Text } from '../FormGenerator/components/Text';
import {
  isComponentHidden,
  isComponentWithData,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
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
} from '../FormGenerator/types';
import { dataHasValues } from './dataHasValues';
import { OutputCollectionVariable } from './OutputCollectionVariable';
import { OutputContainer } from './OutputContainer';
import { OutputGroup } from './OutputGroup';
import {
  OutputPresentationSwitcher,
  OutputSinglePresentationSwitcher,
} from './OutputPresentationSwitcher';
import { OutputRecordLink } from './OutputRecordLink';
import { OutputResourceLink } from './OutputResourceLink';
import { OutputVariable } from './OutputVariable';

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
  if (isComponentHidden(component)) {
    return null;
  }

  if (!shouldRender(component, data)) {
    return null;
  }

  if (component.alternativePresentation) {
    return (
      <OutputPresentationSwitcher
        component={component}
        data={data}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if ('title' in component && component.title) {
    return (
      <OutputSinglePresentationSwitcher
        component={component}
        data={data}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
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
          data={data as DataRecordLink}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'anyTypeRecordLink':
      return (
        <OutputRecordLink
          component={component as FormComponentAnyTypeRecordLink}
          data={data as DataRecordLink}
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
          data={data as DataResourceLink}
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

const shouldRender = (component: FormComponent, data?: CoraData) => {
  if (!isComponentWithData(component)) {
    return true;
  }

  return data && dataHasValues(data);
};
