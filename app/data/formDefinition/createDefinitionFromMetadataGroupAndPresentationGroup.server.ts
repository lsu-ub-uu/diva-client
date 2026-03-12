import type {
  FormAttributeCollection,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import type {
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  BFFPresentationResourceLink,
  BFFPresentationTextVar,
  BFFResourceLink,
  Dependencies,
} from '@/cora/bffTypes.server';
import { convertChildStylesToGridColSpan } from '@/cora/cora-data/CoraDataUtilsPresentations.server';
import { createBFFMetadataReference } from '@/data/formDefinition/formMetadata.server';
import { createBFFPresentationReference } from '@/data/formDefinition/formPresentation.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';
import {
  createCommonParameters,
  type CommonParameters,
} from './createCommonParameters.server';
import { createAttributes } from './createPresentation/createAttributes';
import {
  createNumberVariableValidation,
  createTextVariableValidation,
} from './formValidation.server';
import { createText } from './createPresentation/createText.server';
import { createGuiElement } from './createPresentation/createGuiElement.server';
import { Presentation } from 'lucide-react';
import { findMetadataChildReferenceByNameInDataAndAttributes } from './findMetadataChildReferenceByNameInDataAndAttributes.server';
import { createRepeat } from './createPresentation/createRepeat.server';
import { createCollectionVariableOptions } from './createPresentation/createGroupOrComponent';
import { createRecordLinkSearchPresentation } from './createPresentation/createRecordLinkSearchPresentation.server';

export interface Repeat {
  repeatMin: number;
  repeatMax: number;
  minNumberOfRepeatingToShow?: number;
}

type PresentationChildReferenceData = Omit<
  BFFPresentationChildReference,
  'refGroups'
>;

export const createDefinitionFromMetadataGroupAndPresentationGroup = (
  dependencies: Dependencies,
  metadataGroup: BFFMetadataGroup,
  presentationGroup: BFFPresentationGroup,
): FormComponentGroup => {
  const formRootReference = createBFFMetadataReference(metadataGroup.id);
  const formRootPresentationReference = createBFFPresentationReference(
    presentationGroup.id,
  );
  const formRootRepeat = {
    repeatMin: 1,
    repeatMax: 1,
  };

  // const form = createGroupOrComponent(
  //   dependencies,
  //   [formRootReference],
  //   formRootPresentationReference,
  //   false,
  //   metadataGroup.id,
  // ) as FormComponentGroup;

  const form = createComponent(
    dependencies,
    metadataGroup.id,
    presentationGroup.id,
    {},
    formRootRepeat,
  ) as FormComponentGroup;

  if (!form) {
    throw new Error('Failed to create form definition');
  }

  return form;
};

const createComponent = (
  dependencies: Dependencies,
  metadataId: string,
  presentationId: string,
  presentationChildReferenceData: PresentationChildReferenceData,
  repeat: Repeat,
) => {
  const { metadataPool, presentationPool } = dependencies;
  const presentation = presentationPool.get(presentationId);
  const metadata = metadataPool.get(metadataId);

  const attributes = createAttributes(
    metadata,
    metadataPool,
    undefined,
    presentation,
  );

  const commonParameters = createCommonParameters(metadata, presentation);

  switch (presentation?.type) {
    case 'pVar':
      return createTextVar(
        metadata as BFFMetadataTextVariable,
        presentation as BFFPresentationTextVar,
        attributes,
        repeat,
        presentationChildReferenceData,
        commonParameters,
      );
    case 'pNumVar':
      return createNumVar(
        metadata as BFFMetadataNumberVariable,
        presentation as BFFPresentationBase,
        attributes,
        repeat,
        presentationChildReferenceData,
        commonParameters,
      );

    case 'pCollVar':
      return createCollVar(
        dependencies,
        metadata as BFFMetadataCollectionVariable,
        presentation as BFFPresentationBase,
        attributes,
        repeat,
        presentationChildReferenceData,
        commonParameters,
      );
    case 'pRecordLink':
      return createRecordLink(
        dependencies,
        metadata as BFFMetadataRecordLink,
        presentation as BFFPresentationBase,
        attributes,
        repeat,
        presentationChildReferenceData,
        commonParameters,
      );
    case 'pGroup':
      return createGroup(
        dependencies,
        metadata as BFFMetadataGroup,
        presentation as BFFPresentationGroup,
        attributes,
        repeat,
        presentationChildReferenceData,
        commonParameters,
      );
    case 'pResourceLink':
      return createResourceLink(
        metadata as BFFResourceLink,
        presentation as BFFPresentationResourceLink,
        attributes,
        repeat,
        presentationChildReferenceData,
        commonParameters,
      );
  }
};

const createTextVar = (
  metadata: BFFMetadataTextVariable,
  presentation: BFFPresentationTextVar,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
) => {
  const validation = createTextVariableValidation(metadata);
  const finalValue = metadata.finalValue;
  const inputFormat = presentation.inputFormat;
  const type = metadata.type;

  const inputType = presentation.inputType;
  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    validation,
    finalValue,
    inputFormat,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    inputType,
    // alternativePresentation,
    addText,
  });
};

const createNumVar = (
  metadata: BFFMetadataNumberVariable,
  presentation: BFFPresentationBase,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
) => {
  const validation = createNumberVariableValidation(metadata);
  const finalValue = metadata.finalValue;
  const type = metadata.type;

  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    validation,
    finalValue,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    // alternativePresentation,
    addText,
  });
};

const createCollVar = (
  dependencies: Dependencies,
  metadata: BFFMetadataCollectionVariable,
  presentation: BFFPresentationBase,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
) => {
  const finalValue = metadata.finalValue;
  const inputFormat = presentation.inputFormat;
  const type = metadata.type;
  const options = createCollectionVariableOptions(
    dependencies.metadataPool,
    metadata,
  );

  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    options,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    finalValue,
    inputFormat,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    // alternativePresentation,
    addText,
  });
};

const createRecordLink = (
  dependencies: Dependencies,
  metadata: BFFMetadataRecordLink,
  presentation: BFFPresentationRecordLink,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
) => {
  const finalValue = metadata.finalValue;
  const recordLinkType = metadata.linkedRecordType;
  const type = metadata.type;
  let searchPresentation;
  if (presentation.search !== undefined) {
    searchPresentation = createRecordLinkSearchPresentation(
      dependencies,
      presentation.search,
    );
  }
  let linkedRecordPresentation;
  if (presentation.linkedRecordPresentations !== undefined) {
    linkedRecordPresentation = presentation.linkedRecordPresentations[0];
  }
  const presentationRecordLinkId = presentation.id;

  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    recordLinkType,
    searchPresentation,
    linkedRecordPresentation,
    presentationRecordLinkId,
    presentAs: presentation.presentAs,
    finalValue,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    //alternativePresentation,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  });
};

const createGroup = (
  dependencies: Dependencies,
  metadata: BFFMetadataGroup,
  presentation: BFFPresentationGroup,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
): FormComponentGroup => {
  const type = metadata.type;
  const presentationStyle = presentation.presentationStyle;
  const presentAs = presentation.presentAs;

  const components = createChildComponents(
    dependencies,
    metadata.children,
    presentation.children,
  );

  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    type,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    presentationStyle,
    attributes,
    components,
    repeat,
    childStyle,
    gridColSpan,
    textStyle,
    // alternativePresentation,
    presentationSize,
    title,
    titleHeadlineLevel,
    presentAs,
    addText,
  });
};

const createResourceLink = (
  metadata: BFFResourceLink,
  presentation: BFFPresentationResourceLink,
  attributes: FormAttributeCollection[] | undefined,
  repeat: Repeat,
  presentationChildReferenceData: PresentationChildReferenceData,
  commonParameters: CommonParameters,
) => {
  const inputFormat = presentation.inputFormat;
  const type = metadata.type;
  const outputFormat = presentation.outputFormat;

  const {
    childStyle,
    textStyle,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  } = presentationChildReferenceData;

  const gridColSpan = convertChildStylesToGridColSpan(childStyle ?? []);

  const {
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  } = commonParameters;

  return removeEmpty({
    presentationId: presentation.id,
    name,
    placeholder,
    mode,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
    type,
    outputFormat,
    inputFormat,
    attributes,
    repeat,
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    // alternativePresentation,
    addText,
  });
};

const createChildComponents = (
  dependencies: Dependencies,
  metadataChildReferences: BFFMetadataChildReference[],
  presentationChildReferences: BFFPresentationChildReference[],
) => {
  return presentationChildReferences.map((presentationChildReference) => {
    const refGroup = presentationChildReference.refGroups[0]; // TODO alternative

    if (refGroup.type === 'text') {
      return createText(
        presentationChildReference,
        false, //alternative,
      );
    }

    if (refGroup.type === 'guiElement') {
      return createGuiElement(
        presentationChildReference,
        dependencies.presentationPool,
        false, //alternative,
      );
    }

    if (refGroup.type === 'presentation') {
      const presentation = dependencies.presentationPool.get(refGroup.childId);

      if (presentation.type === 'container') {
        return undefined; //createContainer();
      }

      const metadataFromPresentation = dependencies.metadataPool.get(
        presentation.presentationOf,
      );

      const matchingChildRef = findMatchingMetadataChildRef(
        dependencies,
        presentation,
        metadataChildReferences,
      );

      if (!matchingChildRef) {
        // Presentation child does not have matching metadata and is ignored.
        return undefined;
      }

      return createComponent(
        dependencies,
        metadataFromPresentation.id,
        presentation.id,
        presentationChildReference,
        createRepeat(presentationChildReference, matchingChildRef),
      );
    }
  });
};

const findMatchingMetadataChildRef = (
  dependencies: Dependencies,
  presentation: BFFPresentation,
  metadataChildReferences: BFFMetadataChildReference[],
) => {
  if ('presentationOf' in presentation) {
    const metadataMatchingById = metadataChildReferences.find(
      (metadataChildReference) =>
        metadataChildReference.childId === presentation.presentationOf,
    );
    if (metadataMatchingById) {
      return metadataMatchingById;
    }

    const metadataFromPresentation = dependencies.metadataPool.get(
      presentation.presentationOf,
    );

    return findMetadataChildReferenceByNameInDataAndAttributes(
      dependencies.metadataPool,
      metadataChildReferences,
      metadataFromPresentation,
    );
  }
};

export const createPresentationChildReferenceParameters = (
  presentationChildReference: PresentationChildReferenceData,
) => {
  const childStyle = presentationChildReference.childStyle;
  const textStyle = presentationChildReference.textStyle;
  const gridColSpan = convertChildStylesToGridColSpan(
    presentationChildReference.childStyle ?? [],
  );
  const presentationSize = presentationChildReference.presentationSize;
  const title = presentationChildReference.title;
  const titleHeadlineLevel = presentationChildReference.titleHeadlineLevel;
  const addText = presentationChildReference.addText;

  return {
    childStyle,
    textStyle,
    gridColSpan,
    presentationSize,
    title,
    titleHeadlineLevel,
    addText,
  };
};
