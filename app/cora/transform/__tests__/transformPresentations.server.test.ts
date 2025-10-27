/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import presentationPGroupModeOutput from '@/__mocks__/bff/coraPresentationGroupWithModeOutput.json';
import presentationListWithPCollVarsModeOutput from '@/__mocks__/bff/coraPresentationWithOneCollectionVariableWithModeOutput.json';
import presentationListWithPVarsModeOutput from '@/__mocks__/bff/coraPresentationWithTextVariableModeOutput.json';
import presentationListWithTwoPVars from '@/__mocks__/bff/coraPresentationWithTwoTextVariables.json';
import emptyDataList from '@/__mocks__/bff/emptyDataList.json';
import { transformCoraPresentations } from '../transformPresentations.server';

import coraPresentationGroup from '@/__mocks__/bff/coraPresentationGroup.json';
import coraPresentationGroupAltPresentation from '@/__mocks__/bff/coraPresentationGroupAltPresentation.json';
import coraPresentationGroupSpecifiedHeadlineLevel from '@/__mocks__/bff/coraPresentationGroupSpecifiedHeadlineLevel.json';
import coraPresentationGroupSpecifiedHeadlineText from '@/__mocks__/bff/coraPresentationGroupSpecifiedHeadlineText.json';
import coraPresentationGroupWithMinNumberOfRepeatingToShow from '@/__mocks__/bff/coraPresentationGroupWithMinNumberOfRepeatingToShow.json';
import coraPresentationGroupWithMissingEmptyTextId from '@/__mocks__/bff/coraPresentationGroupWithMissingEmptyTextId.json';
import coraPresentationGroupWithPresentAs from '@/__mocks__/bff/coraPresentationGroupWithPresentAs.json';
import coraPresentationGroupWithShowLabel from '@/__mocks__/bff/coraPresentationGroupWithShowLabel.json';
import coraPresentationWithGuiElementLink from '@/__mocks__/bff/coraPresentationGuiElement.json';
import coraPresentationWithRecordLink from '@/__mocks__/bff/coraPresentationRecordLink.json';
import coraPresentationWithRecordLinkWithPresentAs from '@/__mocks__/bff/coraPresentationRecordLinkWithPresentAs.json';
import coraPresentationWithRecordLinkWithSearch from '@/__mocks__/bff/coraPresentationRecordLinkWithSearch.json';
import coraPresentationRepeatingContainer from '@/__mocks__/bff/coraPresentationRepeatingContainer.json';
import coraPresentationResourceLinkMasterImage from '@/__mocks__/bff/coraPresentationResourceLinkMasterImage.json';
import coraPresentationResourceLinkThumbnail from '@/__mocks__/bff/coraPresentationResourceLinkThumbnail.json';
import coraPresentationSurroundingContainer from '@/__mocks__/bff/coraPresentationSurroundingContainer.json';
import coraPresentationSurroundingContainerWithTwoVarPresentationsOf from '@/__mocks__/bff/coraPresentationSurroundingContainerWithTwoVarsPresentationsOf.json';
import coraPresentationWithMiscTypes from '@/__mocks__/bff/coraPresentationWithMiscTypes.json';
import coraPresentationWithOneCollectionVariable from '@/__mocks__/bff/coraPresentationWithOneCollectionVariable.json';
import coraPresentationWithOneTextVariableHavingShowLabelFalse from '@/__mocks__/bff/coraPresentationWithOneTextVariableHavingShowLabelFalse.json';
import coraPresentationWithOneTextVariableHavingSpecifiedLabel from '@/__mocks__/bff/coraPresentationWithOneTextVariableHavingSpecifiedLabel.json';
import coraPresentationWithTextVariableInputFormat from '@/__mocks__/bff/coraPresentationWithTextVariableInputFormat.json';
import coraPresentationWithAttributesToShow from '@/__mocks__/bff/coraPresentationWithThreeTextVariablesWithAttributesToShow.json';
import coraPresentationGroupWithAddText from '@/__mocks__/bff/coraPresentationGroupWithAddText.json';
import presentationListWithTwoPNumVar from '@/__mocks__/bff/coraPresentationWithTwoNumberVariables.json';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { describe, expect, it } from 'vitest';
import type { BFFPresentationGroup } from '../bffTypes.server';

describe('transformCoraPresentations', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraPresentations(emptyDataList);
    expect(transformData).toStrictEqual([]);
  });

  describe('pVar', () => {
    it('Returns two BFFPresentation of type pVar', () => {
      const transformData = transformCoraPresentations(
        presentationListWithTwoPVars,
      );
      expect(transformData).toHaveLength(2);
    });

    it('Returns one BFFPresentation for one pVar entry', () => {
      const transformData = transformCoraPresentations(
        presentationListWithTwoPVars,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
      });
    });

    describe('attributesToShow', () => {
      it('Returns one BFFPresentation for one pVar entry with attributesToShow none', () => {
        const transformData = transformCoraPresentations(
          coraPresentationWithAttributesToShow,
        );
        expect(transformData[0]).toStrictEqual({
          id: 'someTextVarPVar',
          type: 'pVar',
          presentationOf: 'someTextVar',
          mode: 'input',
          attributesToShow: 'none',
          inputType: 'someInputType',
          emptyTextId: 'somePlaceholderText',
        });
      });
      it('Returns one BFFPresentation for one pVar entry with attributesToShow 2', () => {
        const transformData = transformCoraPresentations(
          coraPresentationWithAttributesToShow,
        );
        expect(transformData[1]).toStrictEqual({
          id: 'someTextVarPVar',
          type: 'pVar',
          presentationOf: 'someTextVar2',
          mode: 'input',
          attributesToShow: 'selectable',
          inputType: 'textarea',
          emptyTextId: 'someTextareaPlaceholderText',
        });
      });
      it('Returns one BFFPresentation for one pVar entry with attributesToShow 3', () => {
        const transformData = transformCoraPresentations(
          coraPresentationWithAttributesToShow,
        );
        expect(transformData[2]).toStrictEqual({
          id: 'someTextVarPVar',
          type: 'pVar',
          presentationOf: 'someTextVar2',
          mode: 'input',
          attributesToShow: 'all',
          inputType: 'textarea',
          emptyTextId: 'someTextareaPlaceholderText',
        });
      });
    });

    it('Returns one BFFPresentation for one pVar entry with specified label', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithOneTextVariableHavingSpecifiedLabel,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
        specifiedLabelTextId: 'someSpecifiedTextVarText',
      });
    });

    it('Returns one BFFPresentation for one pVar entry with label hidden/disabled', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithOneTextVariableHavingShowLabelFalse,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
        showLabel: 'false',
      });
    });
    it('Returns one BFFPresentation for one pVar entry with label inputFormat', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithTextVariableInputFormat,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
        inputFormat: 'password',
      });
    });

    it('Returns one BFFPresentation for one pVar with missing emptyTextId', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupWithMissingEmptyTextId,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'input',
        inputType: 'someInputType',
      });
    });
  });

  describe('pNumVar', () => {
    it('Returns one BFFPresentation for one pNumVar entry', () => {
      const transformData = transformCoraPresentations(
        presentationListWithTwoPNumVar,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPNumVar',
        type: 'pNumVar',
        presentationOf: 'someNumberVar',
        mode: 'input',
        emptyTextId: 'somePlaceholderText',
      });
    });

    it('Returns one BFFPresentation for one pNumVar with missing emptyTextId', () => {
      const transformData = transformCoraPresentations(
        presentationListWithTwoPNumVar,
      );
      expect(transformData[1]).toStrictEqual({
        id: 'someTextVarPNumVar2',
        type: 'pNumVar',
        presentationOf: 'someNumberVar2',
        mode: 'input',
      });
    });
  });

  // Groups testing
  describe('pGroup', () => {
    it('Should return one BFFPresentationGroup entry', () => {
      const transformData = transformCoraPresentations(coraPresentationGroup);
      expect(transformData).toHaveLength(1);
    });

    it('Returns one BFFPresentationGroup for one entry', () => {
      const transformData = transformCoraPresentations(coraPresentationGroup);
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        presentationStyle: 'inline',
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'demoText',
                type: 'text',
              },
            ],
            textStyle: 'h1TextStyle',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'recordInfoNewPGroup',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarText',
                type: 'text',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarPVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
            title: 'bookTitleChildRefTitleText',
            titleHeadlineLevel: 'h3',
          },
        ],
      });
    });

    it('Returns one BFFPresentationGroup for one entry with alternative presentation', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupAltPresentation,
      );
      expect(transformData[0]).toStrictEqual({
        children: [
          {
            refGroups: [
              {
                childId: 'updatesMinimizedSContainer',
                type: 'presentation',
              },
              {
                childId: 'updatesSContainer',
                type: 'presentation',
              },
            ],
            childStyle: ['oneChildStyle'],
            minNumberOfRepeatingToShow: '1',
          },
        ],
        id: 'recordInfoOutputUpdateOutputPGroup',
        mode: 'output',
        presentationOf: 'recordInfoOutputUpdateGroup',

        type: 'pGroup',
      });
    });

    it('Returns one BFFPresentationGroup for one entry with specified headline', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupSpecifiedHeadlineText,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'input',
        specifiedHeadlineTextId: 'someSpecifiedTextVarText',
        children: [
          {
            refGroups: [
              {
                childId: 'demoText',
                type: 'text',
              },
            ],
            textStyle: 'h1TextStyle',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'recordInfoNewPGroup',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarText',
                type: 'text',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarPVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
        ],
      });
    });

    it('Returns one BFFPresentationGroup for one entry with show headline', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupWithShowLabel,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'input',
        showHeadline: 'false',
        children: [
          {
            refGroups: [
              {
                childId: 'demoText',
                type: 'text',
              },
            ],
            textStyle: 'h1TextStyle',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'recordInfoNewPGroup',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarText',
                type: 'text',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarPVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
        ],
      });
    });

    it('Returns one BFFPresentationGroup for one entry with specifiedHeadlineLevel', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupSpecifiedHeadlineLevel,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'input',
        specifiedHeadlineLevel: 'h3',
        children: [
          {
            refGroups: [
              {
                childId: 'demoText',
                type: 'text',
              },
            ],
            textStyle: 'h1TextStyle',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'recordInfoNewPGroup',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarText',
                type: 'text',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarPVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
        ],
      });
    });

    it('Returns one BFFPresentationGroup for one entry with minNumberOfRepeatingToShow', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupWithMinNumberOfRepeatingToShow,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'demoText',
                type: 'text',
              },
            ],
            textStyle: 'h1TextStyle',
            presentationSize: 'firstSmaller',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'recordInfoNewPGroup',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarText',
                type: 'text',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarPVar',
                type: 'presentation',
              },
            ],
            minNumberOfRepeatingToShow: '99',
            textStyle: 'h5TextStyle',
            childStyle: ['5', '3'],
          },
        ],
      });
    });

    it('Returns only BFFPresentationGroup and BFFPresentation (pGroup, pRecordLink, pNumVar, pVar and pCollVar) entries and skips other types', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithMiscTypes as unknown as DataListWrapper,
      );
      expect(transformData).toHaveLength(6);
    });

    it('Transforms a pGroup with presentAs', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupWithPresentAs,
      );

      const pGroup = transformData[0] as BFFPresentationGroup;

      expect(pGroup.presentAs).toEqual('onlyTranslatedText');
    });

    it('Transforms a child reference with addText', () => {
      const transformData = transformCoraPresentations(
        coraPresentationGroupWithAddText,
      );
      const pGroup = transformData[0] as BFFPresentationGroup;
      expect(pGroup.children[0].addText).toEqual('specialAddText');
    });
  });

  describe('pCollVar', () => {
    it('Returns one BFFPresentation for one pCollVar entry', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithOneCollectionVariable,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'examplePCollVar',
        type: 'pCollVar',
        presentationOf: 'exampleCollectionVar',
        mode: 'input',
        emptyTextId: 'initialEmptyValueText',
      });
    });
  });

  describe('pRecordLink', () => {
    it('Returns one BFFPresentation for one pRecordLink entry', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithRecordLink,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'input',
        linkedRecordPresentations: [
          {
            presentedRecordType: 'nationalSubjectCategory',
            presentationId: 'nationalSubjectCategoryWhenLinkedPGroup',
          },
        ],
      });
    });
    it('Returns one BFFPresentation for one pRecordLink entry with search', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithRecordLinkWithSearch,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'input',
        linkedRecordPresentations: [
          {
            presentedRecordType: 'nationalSubjectCategory',
            presentationId: 'nationalSubjectCategoryWhenLinkedPGroup',
          },
        ],
        search: 'nationalSubjectCategorySearch',
      });
    });

    it('Returns one BFFPresentation for one pRecordLink entry with presentAs', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithRecordLinkWithPresentAs,
      );

      expect(transformData[0]).toStrictEqual({
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'input',
        linkedRecordPresentations: [
          {
            presentedRecordType: 'nationalSubjectCategory',
            presentationId: 'nationalSubjectCategoryWhenLinkedPGroup',
          },
        ],
        presentAs: 'permissionUnit',
      });
    });
  });

  describe('Surrounding Container', () => {
    it('Returns one BFFPresentation for one SContainer', () => {
      const transformData = transformCoraPresentations(
        coraPresentationSurroundingContainer,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'labelInputSContainer',
        type: 'container',
        presentationsOf: ['showLabelCollectionVar'],
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'labelHeadlineText',
                type: 'text',
              },
            ],
            textStyle: 'h2TextStyle',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'showLabelPCollVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
        ],
        repeat: 'children',
      });
    });
    it('Returns one BFFPresentation for one SContainer with two vars in presentationsOf', () => {
      const transformData = transformCoraPresentations(
        coraPresentationSurroundingContainerWithTwoVarPresentationsOf,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'labelInputSContainer',
        type: 'container',
        presentationStyle: 'card',
        presentationsOf: ['showLabelCollectionVar', 'specifiedLabelTextLink'],
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'labelHeadlineText',
                type: 'text',
              },
            ],
            minNumberOfRepeatingToShow: '99',
            childStyle: ['5'],
            textStyle: 'h2TextStyle',
          },
          {
            refGroups: [
              {
                childId: 'showLabelPCollVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'specifiedLabelTextPLink',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
        ],
        repeat: 'children',
      });
    });
  });

  describe('Repeating Container', () => {
    it('Returns one BFFPresentation for one RContainer', () => {
      const transformData = transformCoraPresentations(
        coraPresentationRepeatingContainer,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'exampleCoordinatesRContainer',
        type: 'container',
        presentationOf: 'exampleCoordinatesGroup',
        mode: 'input',
        children: [
          {
            refGroups: [
              {
                childId: 'exampleCoordinatesPGroup',
                type: 'presentation',
              },
            ],
            minNumberOfRepeatingToShow: '1',
            childStyle: [],
          },
          {
            refGroups: [
              {
                childId: 'exampleCoordinatesAsMapPGroup',
                type: 'presentation',
              },
            ],
            minNumberOfRepeatingToShow: '1',
            childStyle: [],
          },
        ],
        repeat: 'this',
      });
    });
  });

  describe('guiElement', () => {
    it('Returns one BFFPresentation for one guiElementLink entry', () => {
      const transformData = transformCoraPresentations(
        coraPresentationWithGuiElementLink,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'demoTestLinkGuiElement',
        url: 'http://www.google.se',
        elementText: 'demoTestLinkGuiElementText',
        presentAs: 'link',
        type: 'guiElementLink',
      });
    });
  });

  describe('mode: output', () => {
    it('Returns one BFFPresentation for one pVar entry with mode output', () => {
      const transformData = transformCoraPresentations(
        presentationListWithPVarsModeOutput,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someTextVarPVar',
        type: 'pVar',
        presentationOf: 'someTextVar',
        mode: 'output',
        inputType: 'someInputType',
        emptyTextId: 'somePlaceholderText',
      });
    });

    it('Returns one BFFPresentation for one pCollVar entry  with mode output', () => {
      const transformData = transformCoraPresentations(
        presentationListWithPCollVarsModeOutput,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'examplePCollVar',
        type: 'pCollVar',
        presentationOf: 'exampleCollectionVar',
        mode: 'output',
        emptyTextId: 'initialEmptyValueText',
      });
    });

    it('Returns one BFFPresentationGroup for one entry with mode output', () => {
      const transformData = transformCoraPresentations(
        presentationPGroupModeOutput,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'someNewPGroup',
        type: 'pGroup',
        presentationOf: 'someNewGroup',
        mode: 'output',
        children: [
          {
            refGroups: [
              {
                childId: 'demoText',
                type: 'text',
              },
            ],
            textStyle: 'h1TextStyle',
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'recordInfoNewPGroup',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarText',
                type: 'text',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
          {
            refGroups: [
              {
                childId: 'bookTitleTextVarPVar',
                type: 'presentation',
              },
            ],
            childStyle: [],
            minNumberOfRepeatingToShow: '1',
          },
        ],
      });
    });
  });

  describe('pResourceLink', () => {
    it('Returns one BFFPresentation for one pResourceLink entry with outputFormat download', () => {
      const transformData = transformCoraPresentations(
        coraPresentationResourceLinkMasterImage,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'masterImagePResLink',
        type: 'pResourceLink',
        presentationOf: 'masterResLink',
        outputFormat: 'download',
        showLabel: 'false',
      });
    });
    it('Returns one BFFPresentation for one pResourceLink entry with outputFormat image', () => {
      const transformData = transformCoraPresentations(
        coraPresentationResourceLinkThumbnail,
      );
      expect(transformData[0]).toStrictEqual({
        id: 'thumbnailImagePResLink',
        type: 'pResourceLink',
        presentationOf: 'thumbnailResLink',
        outputFormat: 'image',
        showLabel: 'false',
      });
    });
  });
});
