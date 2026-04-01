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
import { InputContainer } from './InputContainer';
import type { ReactNode } from 'react';
import type { PresentationStyle } from '@/cora/bffTypes.server';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { OutputComponent } from '../OutputPresentation/OutputComponent';
import {
  InputAlternativePresentationSwitcher,
  InputSinglePresentationSwitcher,
  type FormComponentWithTitle,
} from './InputPresentationSwitcher';
import { OutputPresentationSwitcher } from '../OutputPresentation/OutputPresentationSwitcher';
import { InputPresentation } from './InputPresentation';

interface InputComponentProps {
  path: string;
  component: FormComponent;
  data?: CoraData;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputComponent = ({
  path,
  component,
  data,
  actionButtonGroup,
  parentPresentationStyle,
}: InputComponentProps) => {
  if (!isComponentWithData(component) || component.mode === 'output') {
    return (
      <OutputComponent
        component={component}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (component.alternativePresentation) {
    return (
      <InputAlternativePresentationSwitcher
        path={path}
        component={component}
        data={data}
        actionButtonGroup={actionButtonGroup}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentWithTitle(component)) {
    return (
      <InputSinglePresentationSwitcher
        path={path}
        component={component}
        data={data}
        actionButtonGroup={actionButtonGroup}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

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
          actionButtonGroup={actionButtonGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'textVariable':
      return (
        <InputVariable
          component={component as FormComponentTextVar}
          path={path}
          data={data as DataAtomic}
          actionButtonGroup={actionButtonGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'collectionVariable':
      return (
        <InputCollectionVariable
          component={component as FormComponentCollVar}
          path={path}
          data={data as DataAtomic}
          actionButtonGroup={actionButtonGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'numberVariable':
      return (
        <InputNumberVariable
          component={component as FormComponentNumVar}
          path={path}
          data={data as DataAtomic}
          actionButtonGroup={actionButtonGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'recordLink':
      return (
        <InputRecordLink
          path={path}
          component={component as FormComponentRecordLink}
          data={data as DataRecordLink}
          actionButtonGroup={actionButtonGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    case 'container':
      return (
        <InputContainer
          path={path}
          component={component as FormComponentGroup}
          data={data as DataGroup}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    default:
      return null;
  }
};

const isComponentWithTitle = (
  component: FormComponent,
): component is FormComponentWithTitle => {
  return 'title' in component && typeof component.title === 'string';
};
