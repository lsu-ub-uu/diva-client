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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { FormComponentTextVar } from '@/components/FormGenerator/types';
import type {
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFPresentationOfSingleMetadata,
  BFFPresentationRecordLink,
  BFFPresentationResourceLink,
  BFFPresentationSurroundingContainer,
  BFFPresentationTextVar,
  BFFRecordType,
  BFFResourceLink,
  BFFValidationType,
  Dependencies
} from '@/cora/bffTypes.server';
import {
  createFormDefinition,
  createLinkedRecordDefinition,
} from '@/data/formDefinition/createFormDefinition.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { describe, expect, it } from 'vitest';
import {
  createBasicDependencies,
  createCollVar,
  createGroup,
  createPresentationGroup,
  createPresentationRecordLink,
  createPresentationSContainer,
  createPresentationVar,
  createRecordLink,
  createTextVar
} from './utils';

describe('formDefinition', () => {
  const FORM_MODE_NEW = 'create';
  const FORM_MODE_EDIT = 'update';
  const FORM_MODE_VIEW = 'view'; // used to present the record

  describe('createFormDefinition', () => {
    it('should throw Error on invalid ValidationType', () => {
      const invalidValidationType = 'someInvalidValidationType';

      const mockDependencies = {
        validationTypePool: listToPool([{} as BFFValidationType]),
      } as Dependencies;
      expect(() => {
        createFormDefinition(
          mockDependencies,
          invalidValidationType,
          FORM_MODE_NEW,
        );
      }).toThrow(Error);

      try {
        createFormDefinition(
          mockDependencies,
          invalidValidationType,
          FORM_MODE_NEW,
        );
      } catch (error: unknown) {
        const createFormDefinitionError: Error = <Error>error;
        expect(createFormDefinitionError.message).toStrictEqual(
          '[someInvalidValidationType] does not exist in Lookup pool',
        );
      }
    });

    describe('form definition for a new metadata group', () => {
      it('creates a formDef for a rootGroup with a textVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, textVariable]),
          presentationPool: listToPool([rootPGroup, metadataPVariable]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_NEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                inputType: 'input',
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'textVariable',
                validation: {
                  pattern: 'someRegex',
                  type: 'regex',
                },
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a numVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, numberVariable]),
          presentationPool: listToPool([
            rootPGroup,
            numberPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_NEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'numberVariable',
                validation: {
                  max: 20,
                  min: 0,
                  numberOfDecimals: 0,
                  type: 'number',
                  warningMax: 10,
                  warningMin: 2,
                },
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a collVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([
            rootGroup,
            collectionVariable,
            itemCollection,
            itemBlue,
          ]),
          presentationPool: listToPool([
            rootPGroup,
            collectionPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_NEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                options: [
                  {
                    label: 'exampleBlueItemText',
                    value: 'blue',
                  },
                ],

                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'collectionVariable',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a recordLink', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, recordLink]),
          presentationPool: listToPool([
            rootPGroup,
            recordPLink,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_NEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                linkedRecordPresentation: {
                  presentationId: 'somePresentationIdPresentation',
                  presentedRecordType: 'somePresentedRecordType',
                },

                mode: 'input',
                name: 'someNameInData',
                presentationId: 'pSomeMetadataVariableId',
                presentationRecordLinkId: 'pSomeMetadataVariableId',
                recordLinkType: 'someLinkedRecordType',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'recordLink',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a resourceLink', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, resourceLink]),
          presentationPool: listToPool([rootPGroup, resourcePLink]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_NEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                name: 'someNameInData',
                outputFormat: 'image',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'resourceLink',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a childGroup with a textVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([
            otherRootGroup,
            childGroup,
            textVariable,
          ]),
          presentationPool: listToPool([
            rootPGroup,
            childPGroup,
            metadataPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_NEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                components: [
                  {
                    childStyle: ['twelveChildStyle'],
                    gridColSpan: 12,
                    inputType: 'input',
                    label: 'someTextId',
                    mode: 'input',
                    name: 'someNameInData',
                    placeholder: 'someEmptyTextId',
                    presentationId: 'pSomeMetadataVariableId',
                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    type: 'textVariable',
                    validation: {
                      pattern: 'someRegex',
                      type: 'regex',
                    },
                  },
                ],
                gridColSpan: 12,
                label: 'textId345',
                mode: 'input',
                name: 'childGroupNameInData',
                presentationId: 'childPGroupId',
                repeat: {
                  repeatMax: 1,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'defTextId678',
                  title: 'textId345',
                },
                type: 'group',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });
    });

    describe('form definition for an edit metadata group', () => {
      it('creates a formDef for a rootGroup with a textVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, textVariable]),
          presentationPool: listToPool([rootPGroup, metadataPVariable]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_EDIT,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                inputType: 'input',
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'textVariable',
                validation: {
                  pattern: 'someRegex',
                  type: 'regex',
                },
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a numVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, numberVariable]),
          presentationPool: listToPool([
            rootPGroup,
            numberPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_EDIT,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'numberVariable',
                validation: {
                  max: 20,
                  min: 0,
                  numberOfDecimals: 0,
                  type: 'number',
                  warningMax: 10,
                  warningMin: 2,
                },
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a collVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([
            rootGroup,
            collectionVariable,
            itemCollection,
            itemBlue,
          ]),
          presentationPool: listToPool([
            rootPGroup,
            collectionPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_EDIT,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                options: [
                  {
                    label: 'exampleBlueItemText',
                    value: 'blue',
                  },
                ],

                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'collectionVariable',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a recordLink', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, recordLink]),
          presentationPool: listToPool([
            rootPGroup,
            recordPLink,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_EDIT,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                linkedRecordPresentation: {
                  presentationId: 'somePresentationIdPresentation',
                  presentedRecordType: 'somePresentedRecordType',
                },

                mode: 'input',
                name: 'someNameInData',
                presentationId: 'pSomeMetadataVariableId',
                presentationRecordLinkId: 'pSomeMetadataVariableId',
                recordLinkType: 'someLinkedRecordType',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'recordLink',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a resourceLink', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, resourceLink]),
          presentationPool: listToPool([rootPGroup, resourcePLink]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_EDIT,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                name: 'someNameInData',
                outputFormat: 'image',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'resourceLink',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a childGroup with a textVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([
            otherRootGroup,
            childGroup,
            textVariable,
          ]),
          presentationPool: listToPool([
            rootPGroup,
            childPGroup,
            metadataPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_EDIT,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                components: [
                  {
                    childStyle: ['twelveChildStyle'],
                    gridColSpan: 12,
                    inputType: 'input',
                    label: 'someTextId',
                    mode: 'input',
                    name: 'someNameInData',
                    placeholder: 'someEmptyTextId',
                    presentationId: 'pSomeMetadataVariableId',
                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    type: 'textVariable',
                    validation: {
                      pattern: 'someRegex',
                      type: 'regex',
                    },
                  },
                ],
                gridColSpan: 12,
                label: 'textId345',
                mode: 'input',
                name: 'childGroupNameInData',
                presentationId: 'childPGroupId',
                repeat: {
                  repeatMax: 1,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'defTextId678',
                  title: 'textId345',
                },
                type: 'group',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });
    });

    it('should return a form definition with group that has only hidden components', () => {
      const validationTypeId = 'someValidationTypeForMissingChildIdTypeId';
      const formDefinition = createFormDefinition(
        createBasicDependencies(),
        validationTypeId,
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        validationTypeId,
        form: {
          type: 'group',
          gridColSpan: 12,
          name: 'divaOutput',
          presentationId: 'pSomeNewMetadataGroupForMissingChildIdId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: '',
            body: '',
          },
          label: '',
          showLabel: true,
          components: [
            {
              type: 'collectionVariable',
              name: 'colour',
              label: 'exampleCollectionVarText',
              showLabel: true,
              childStyle: ['twelveChildStyle'],
              gridColSpan: 12,
              finalValue: 'pink',
              placeholder: 'someEmptyTextId',
              presentationId:
                'pSomeOtherMetadataCollectionVariableWithMissingChildIdId',
              repeat: {
                repeatMin: 0,
                repeatMax: 1,
              },
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },

              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
            {
              components: [
                {
                  attributesToShow: 'none',
                  finalValue: 'divaData',
                  name: 'dataDivider',
                  type: 'hidden',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  attributesToShow: 'none',
                  finalValue: 'diva-output',
                  name: 'type',
                  type: 'hidden',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  attributesToShow: 'none',
                  finalValue: 'diva-output',
                  name: 'validationType',
                  type: 'hidden',
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
              ],
              mode: 'input',
              name: 'recordInfo',
              type: 'group',
              hidden: true,
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
          ],
          mode: 'input',
        },
      });
    });

    describe('form definition for (output) view presentation', () => {
      it('creates a formDef for a rootGroup with a textVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, textVariable]),
          presentationPool: listToPool([rootPGroup, metadataPVariable]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_VIEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                inputType: 'input',
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'textVariable',
                validation: {
                  pattern: 'someRegex',
                  type: 'regex',
                },
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a numVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, numberVariable]),
          presentationPool: listToPool([
            rootPGroup,
            numberPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_VIEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'numberVariable',
                validation: {
                  max: 20,
                  min: 0,
                  numberOfDecimals: 0,
                  type: 'number',
                  warningMax: 10,
                  warningMin: 2,
                },
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a collVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([
            rootGroup,
            collectionVariable,
            itemCollection,
            itemBlue,
          ]),
          presentationPool: listToPool([
            rootPGroup,
            collectionPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_VIEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                mode: 'input',
                name: 'someNameInData',
                options: [
                  {
                    label: 'exampleBlueItemText',
                    value: 'blue',
                  },
                ],

                placeholder: 'someEmptyTextId',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'collectionVariable',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a recordLink', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, recordLink]),
          presentationPool: listToPool([
            rootPGroup,
            recordPLink,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_VIEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                linkedRecordPresentation: {
                  presentationId: 'somePresentationIdPresentation',
                  presentedRecordType: 'somePresentedRecordType',
                },

                mode: 'input',
                name: 'someNameInData',
                presentationId: 'pSomeMetadataVariableId',
                presentationRecordLinkId: 'pSomeMetadataVariableId',
                recordLinkType: 'someLinkedRecordType',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'recordLink',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a resourceLink', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([rootGroup, resourceLink]),
          presentationPool: listToPool([rootPGroup, resourcePLink]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_VIEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                gridColSpan: 12,
                label: 'someTextId',
                name: 'someNameInData',
                outputFormat: 'image',
                presentationId: 'pSomeMetadataVariableId',
                repeat: {
                  repeatMax: 3,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                type: 'resourceLink',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });

      it('creates a formDef for a rootGroup with a childGroup with a textVar', () => {
        const validationTypeId = 'someValidationTypeId';

        const mockDependencies = {
          validationTypePool: listToPool([testValidationTypeData]),
          recordTypePool: listToPool([someTestRecordType as BFFRecordType]),
          metadataPool: listToPool([
            otherRootGroup,
            childGroup,
            textVariable,
          ]),
          presentationPool: listToPool([
            rootPGroup,
            childPGroup,
            metadataPVariable,
          ]),
        } as Dependencies;

        const formDefinition = createFormDefinition(
          mockDependencies,
          validationTypeId,
          FORM_MODE_VIEW,
        );
        expect(formDefinition).toStrictEqual({
          form: {
            components: [
              {
                childStyle: ['twelveChildStyle'],
                components: [
                  {
                    childStyle: ['twelveChildStyle'],
                    gridColSpan: 12,
                    inputType: 'input',
                    label: 'someTextId',
                    mode: 'input',
                    name: 'someNameInData',
                    placeholder: 'someEmptyTextId',
                    presentationId: 'pSomeMetadataVariableId',
                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    type: 'textVariable',
                    validation: {
                      pattern: 'someRegex',
                      type: 'regex',
                    },
                  },
                ],
                gridColSpan: 12,
                label: 'textId345',
                mode: 'input',
                name: 'childGroupNameInData',
                presentationId: 'childPGroupId',
                repeat: {
                  repeatMax: 1,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'defTextId678',
                  title: 'textId345',
                },
                type: 'group',
              },
            ],
            gridColSpan: 12,
            label: 'textId345',
            mode: 'input',
            name: 'rootGroupNameInData',
            presentationId: 'rootPGroupId',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            showLabel: true,
            tooltip: {
              body: 'defTextId678',
              title: 'textId345',
            },
            type: 'group',
          },
          validationTypeId: 'someValidationTypeId',
        });
      });
    });

    it('should return a alternative presentation for a child group', () => {
      const mockDependencies = {
        validationTypePool: listToPool([
          {
            id: 'person',
            validatesRecordTypeId: 'person',
            newMetadataGroupId: 'personNewGroup',
            newPresentationGroupId: 'personUpdatePGroup',
            metadataGroupId: 'personUpdateGroup',
            presentationGroupId: 'personUpdatePGroup',
            nameTextId: 'someTextId',
            defTextId: 'someDefTextId',
          },
        ]),
        metadataPool: listToPool([
          {
            id: 'personUpdateGroup',
            nameInData: 'person',
            type: 'group',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            children: [
              {
                childId: 'personNameGroup',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          },
          {
            id: 'personNameGroup',
            nameInData: 'name',
            type: 'group',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            children: [
              {
                childId: 'firstNameVar',
                repeatMin: '1',
                repeatMax: '1',
              },
              {
                childId: 'lastNameVar',
                repeatMin: '1',
                repeatMax: '1',
              },
              {
                childId: 'titleVar',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          },
          {
            id: 'firstNameVar',
            nameInData: 'firstName',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
          {
            id: 'lastNameVar',
            nameInData: 'lastName',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
          {
            id: 'titleVar',
            nameInData: 'title',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
        ]),
        recordTypePool: listToPool([
          {
            id: 'person',
            metadataId: 'personUpdateGroup',
            presentationViewId: 'personUpdatePGroup',
            listPresentationViewId: '',
            textId: 'someTextId',
            pluralTextId: 'somePluralText',
            defTextId: 'someDefTextId',
            groupOfRecordType: [],
            recordTypeCategory: [],
            useTrashBin: false,
          } as BFFRecordType,
        ]),
        presentationPool: listToPool([
          {
            id: 'personUpdatePGroup',
            type: 'pGroup',
            presentationOf: 'personUpdateGroup',
            mode: 'input',
            children: [
              {
                title: 'personRefTitle',
                titleHeadlineLevel: 'h3',
                presentationSize: 'firstSmaller',
                refGroups: [
                  {
                    childId: 'personNameMinimizedPGroup',
                    type: 'presentation',
                  },
                  { childId: 'personNamePGroup', type: 'presentation' },
                ],
              },
            ],
          },
          {
            id: 'personNameMinimizedPGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'personNamePGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'titlePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'firstNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'firstNameVar',
          },
          {
            id: 'lastNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'lastNameVar',
          },
          {
            id: 'titlePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'titleVar',
          },
          {
            id: 'personUpdatePGroup',
            type: 'pGroup',
            presentationOf: 'personUpdateGroup',
            mode: 'input',
            children: [
              {
                title: 'personRefTitle',
                titleHeadlineLevel: 'h3',
                presentationSize: 'firstSmaller',
                refGroups: [
                  {
                    childId: 'personNameMinimizedPGroup',
                    type: 'presentation',
                  },
                  { childId: 'personNamePGroup', type: 'presentation' },
                ],
              },
            ],
          },
          {
            id: 'personNameMinimizedPGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'personNamePGroup',
            type: 'pGroup',
            presentationOf: 'personNameGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'firstNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'lastNamePVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'titlePVar', type: 'presentation' }],
              },
            ],
          },
          {
            id: 'firstNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'firstNameVar',
          },
          {
            id: 'lastNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'lastNameVar',
          },
          {
            id: 'titlePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'titleVar',
          },
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        'person',
        'update',
      );

      expect(formDefinition).toStrictEqual({
        form: {
          components: [
            {
              name: 'name',
              gridColSpan: 12,
              presentationId: 'personNameMinimizedPGroup',
              type: 'group',
              mode: 'input',
              label: 'someTextId',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              title: 'personRefTitle',
              titleHeadlineLevel: 'h3',
              presentationSize: 'firstSmaller',
              components: [
                {
                  name: 'firstName',
                  presentationId: 'firstNamePVar',
                  type: 'textVariable',
                  gridColSpan: 12,
                  label: 'someTextId',
                  mode: 'input',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
                {
                  name: 'lastName',
                  type: 'textVariable',
                  label: 'someTextId',
                  mode: 'input',
                  gridColSpan: 12,
                  presentationId: 'lastNamePVar',

                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
              ],
              alternativePresentation: {
                name: 'name',
                presentationId: 'personNamePGroup',

                gridColSpan: 12,
                type: 'group',
                mode: 'input',
                label: 'someTextId',

                repeat: {
                  repeatMax: 1,
                  repeatMin: 1,
                },
                showLabel: true,
                tooltip: {
                  body: 'someDefTextId',
                  title: 'someTextId',
                },
                title: 'personRefTitle',
                titleHeadlineLevel: 'h3',
                presentationSize: 'firstSmaller',
                components: [
                  {
                    name: 'firstName',
                    type: 'textVariable',
                    label: 'someTextId',
                    mode: 'input',
                    gridColSpan: 12,
                    presentationId: 'firstNamePVar',

                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    validation: {
                      pattern: '.*',
                      type: 'regex',
                    },
                  },
                  {
                    name: 'lastName',
                    type: 'textVariable',
                    label: 'someTextId',
                    mode: 'input',
                    gridColSpan: 12,
                    presentationId: 'lastNamePVar',

                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    validation: {
                      pattern: '.*',
                      type: 'regex',
                    },
                  },
                  {
                    name: 'title',
                    type: 'textVariable',
                    label: 'someTextId',
                    mode: 'input',
                    gridColSpan: 12,
                    presentationId: 'titlePVar',
                    repeat: {
                      repeatMax: 1,
                      repeatMin: 1,
                    },
                    showLabel: true,
                    tooltip: {
                      body: 'someDefTextId',
                      title: 'someTextId',
                    },
                    validation: {
                      pattern: '.*',
                      type: 'regex',
                    },
                  },
                ],
              },
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'input',
          name: 'person',
          presentationId: 'personUpdatePGroup',

          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
        validationTypeId: 'person',
      });
    });

    it('should include presentationChildReference addText', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'person',
            metadataId: 'personUpdateGroup',
            presentationViewId: 'personUpdatePGroup',
            listPresentationViewId: '',
            textId: 'someTextId',
            pluralTextId: 'somePluralText',
            defTextId: 'someDefTextId',
            groupOfRecordType: [],
            recordTypeCategory: [],
            useTrashBin: false,
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'person',
            validatesRecordTypeId: 'person',
            newMetadataGroupId: 'personNewGroup',
            newPresentationGroupId: 'personUpdatePGroup',
            metadataGroupId: 'personUpdateGroup',
            presentationGroupId: 'personUpdatePGroup',
            nameTextId: 'someTextId',
            defTextId: 'someDefTextId',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'personNewGroup',
            nameInData: 'person',
            type: 'group',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            children: [
              {
                childId: 'firstNameVar',
                repeatMin: '0',
                repeatMax: '1',
              },
            ],
          },
          {
            id: 'firstNameVar',
            nameInData: 'firstName',
            type: 'textVariable',
            textId: 'someTextId',
            defTextId: 'someDefTextId',
            regEx: '.*',
          },
        ]),
        presentationPool: listToPool([
          {
            id: 'personUpdatePGroup',
            type: 'pGroup',
            presentationOf: 'personUpdateGroup',
            mode: 'input',
            children: [
              {
                addText: 'addAnotherPersonTextId',
                refGroups: [
                  {
                    childId: 'firstNamePVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
          },
          {
            id: 'firstNamePVar',
            type: 'pVar',
            mode: 'input',
            presentationOf: 'firstNameVar',
          },
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        'person',
        'create',
      );

      expect(
        (formDefinition.form.components![0] as FormComponentTextVar).addText,
      ).toEqual('addAnotherPersonTextId');
    });

    it('should not include sContainer that does not match metadata', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'someRecordTypeId',
          },
        ]),
        textPool: listToPool([
          {
            id: 'someTextId',
            sv: 'Någon text',
            en: 'Some text',
          },
        ]),
        presentationPool: listToPool([
          {
            id: 'someSContainer',
            type: 'container',
            repeat: 'children',
            presentationsOf: ['someNonMatchingMetadata'],
            children: [
              { refGroups: [{ type: 'text', childId: 'someTextId' }] },
            ],
          } as BFFPresentationSurroundingContainer,
          {
            id: 'someNewPresentationGroupId',
            presentationOf: 'someNewMetadataGroupId',
            type: 'pGroup',
            mode: 'input',
            children: [
              {
                refGroups: [
                  { type: 'presentation', childId: 'someSContainer' },
                ],
              },
            ],
          } as BFFPresentationGroup,
        ]),
        metadataPool: listToPool([
          {
            id: 'someNewMetadataGroupId',
            nameInData: 'someName',
            children: [
              {
                childId: 'someTextVar',
              },
            ],
          } as BFFMetadataGroup,
          { id: 'someNonMatchingMetadata', nameInData: 'myNonMatching' },
          { id: 'someTextVar', nameInData: 'myText' },
        ]),
        validationTypePool: listToPool([
          {
            id: 'someValidationTypeId',
            validatesRecordTypeId: 'someRecordTypeId',
            newMetadataGroupId: 'someNewMetadataGroupId',
            newPresentationGroupId: 'someNewPresentationGroupId',
          },
        ]),
      } as Dependencies;

      const formDef = createFormDefinition(
        mockDependencies,
        'someValidationTypeId',
        'create',
      );

      expect(formDef.form.components?.length === 0);
      expect(
        formDef.form.components?.find(
          (c) => c.presentationId === 'someSContainer',
        ),
      ).toBeUndefined();
    });

    it('reusing divaOutputPGroup for thesisManuscriptNewGroup', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'divaOutput',
            metadataId: 'divaOutputGroup',
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'thesisManuscript',
            validatesRecordTypeId: 'divaOutput',
            newMetadataGroupId: 'thesisManuscriptNewGroup',
            newPresentationGroupId: 'outputNewPGroup',
          } as BFFValidationType,
          {
            id: 'divaOutput',
            validatesRecordTypeId: 'divaOutput',
            newMetadataGroupId: 'divaOutputNewGroup',
            newPresentationGroupId: 'outputNewPGroup',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'thesisManuscriptNewGroup',
            type: 'group',
            nameInData: 'output',
            children: [
              { childId: 'abstractTextVar', repeatMin: '1', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'divaOutputNewGroup',
            nameInData: 'output',
            type: 'group',
            children: [
              { childId: 'abstractTextVar', repeatMin: '1', repeatMax: '1' },
              { childId: 'abstract2TextVar', repeatMin: '1', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'abstractTextVar',
            nameInData: 'abstract',
            type: 'textVariable',
            regEx: '.*',
          } as BFFMetadataTextVariable,
          {
            id: 'abstract2TextVar',
            nameInData: 'abstract2',
            type: 'textVariable',
            regEx: '.*',
          } as BFFMetadataTextVariable,
        ]),
        presentationPool: listToPool([
          {
            id: 'outputNewPGroup',
            presentationOf: 'divaOutputNewGroup',
            mode: 'input',
            type: 'pGroup',
            children: [
              {
                refGroups: [{ childId: 'abstractPVar', type: 'presentation' }],
              },
              {
                refGroups: [{ childId: 'abstract2PVar', type: 'presentation' }],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'abstractPVar',
            presentationOf: 'abstractTextVar',
            mode: 'input',
            type: 'pVar',
          } as BFFPresentationTextVar,
          {
            id: 'abstract2PVar',
            presentationOf: 'abstract2TextVar',
            mode: 'input',
            type: 'pVar',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;

      const formDefinition = createFormDefinition(
        mockDependencies,
        'thesisManuscript',
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        form: {
          components: [
            {
              gridColSpan: 12,

              mode: 'input',
              name: 'abstract',
              presentationId: 'abstractPVar',

              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                pattern: '.*',
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          mode: 'input',
          name: 'output',
          presentationId: 'outputNewPGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {},
          type: 'group',
        },
        validationTypeId: 'thesisManuscript',
      });
    });

    it('reusing journalUpdatePGroup for journalNewGroup', () => {
      const dependencies = {
        recordTypePool: listToPool([{} as BFFRecordType]),
        validationTypePool: listToPool([
          {
            id: 'journalNew',
            validatesRecordTypeId: 'journal',
            newMetadataGroupId: 'journalNewGroup',
            newPresentationGroupId: 'journalUpdatePGroup',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'journalNewGroup',
            type: 'group',
            nameInData: 'journal',
            children: [
              { childId: 'titleTextVar', repeatMin: '1', repeatMax: '1' },
              {
                childId: 'recordInfoJournalNewGroup',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          } as BFFMetadataGroup,
          {
            id: 'titleTextVar',
            type: 'textVariable',
            nameInData: 'title',
          } as BFFMetadataTextVariable,
          {
            id: 'recordInfoJournalNewGroup',
            type: 'group',
            nameInData: 'recordInfo',
            children: [
              { childId: 'trashBinTextVar', repeatMin: '0', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'journalUpdateGroup',
            type: 'group',
            nameInData: 'journal',
            children: [
              { childId: 'titleTextVar', repeatMin: '1', repeatMax: '1' },
              {
                childId: 'recordInfoJournalUpdateGroup',
                repeatMin: '1',
                repeatMax: '1',
              },
            ],
          } as BFFMetadataGroup,
          {
            id: 'recordInfoJournalUpdateGroup',
            type: 'group',
            nameInData: 'recordInfo',
            children: [
              { childId: 'trashBinTextVar', repeatMin: '1', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'trashBinTextVar',
            type: 'textVariable',
            nameInData: 'trashBin',
          } as BFFMetadataTextVariable,
        ]),
        presentationPool: listToPool([
          {
            id: 'journalUpdatePGroup',
            presentationOf: 'journalUpdateGroup',
            type: 'pGroup',
            mode: 'input',
            children: [
              { refGroups: [{ childId: 'titlePVar', type: 'presentation' }] },
              {
                refGroups: [
                  {
                    childId: 'recordInfoJournalUpdatePGroup',
                    type: 'presentation',
                  },
                ],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'titlePVar',
            presentationOf: 'titleTextVar',
            type: 'pVar',
            mode: 'input',
          } as BFFPresentationTextVar,
          {
            id: 'recordInfoJournalUpdatePGroup',
            presentationOf: 'recordInfoJournalUpdateGroup',
            type: 'pGroup',
            mode: 'input',
            children: [
              {
                refGroups: [{ childId: 'trashBinPVar', type: 'presentation' }],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'trashBinPVar',
            presentationOf: 'trashBinTextVar',
            type: 'pVar',
            mode: 'input',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;
      const formDefinition = createFormDefinition(
        dependencies,
        'journalNew',
        FORM_MODE_NEW,
      );
      expect(formDefinition).toStrictEqual({
        form: {
          components: [
            {
              gridColSpan: 12,
              mode: 'input',
              name: 'title',
              presentationId: 'titlePVar',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
            {
              components: [
                {
                  gridColSpan: 12,
                  mode: 'input',
                  name: 'trashBin',
                  presentationId: 'trashBinPVar',
                  repeat: {
                    repeatMin: 0,
                    repeatMax: 1,
                  },
                  showLabel: true,
                  tooltip: {},
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                  },
                },
              ],
              gridColSpan: 12,
              mode: 'input',
              name: 'recordInfo',
              presentationId: 'recordInfoJournalUpdatePGroup',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {},
              type: 'group',
            },
          ],
          gridColSpan: 12,
          mode: 'input',
          name: 'journal',
          presentationId: 'journalUpdatePGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {},
          type: 'group',
        },
        validationTypeId: 'journalNew',
      });
    });

    it('creates multiple components for presentation that matches multiple metadata children', () => {
      const mockDependencies = {
        recordTypePool: listToPool([
          {
            id: 'someRecordTypeId',
            presentationViewId: 'rootPGroup',
          } as BFFRecordType,
        ]),
        validationTypePool: listToPool([
          {
            id: 'someValidationTypeId',
            validatesRecordTypeId: 'someRecordTypeId',
            metadataGroupId: 'rootGroup',
          } as BFFValidationType,
        ]),
        metadataPool: listToPool([
          {
            id: 'rootGroup',
            type: 'group',
            nameInData: 'rootGroup',
            children: [
              { childId: 'redChild', repeatMin: '0', repeatMax: '1' },
              { childId: 'blueChild', repeatMin: '0', repeatMax: '1' },
            ],
          } as BFFMetadataGroup,
          {
            id: 'redChild',
            nameInData: 'child',
            type: 'textVariable',
            attributeReferences: [{ refCollectionVarId: 'redCollection' }],
          } as BFFMetadataTextVariable,
          {
            id: 'blueChild',
            nameInData: 'child',
            type: 'textVariable',
            attributeReferences: [{ refCollectionVarId: 'blueCollection' }],
          } as BFFMetadataTextVariable,
          {
            id: 'redOrBlueChild',
            nameInData: 'child',
            type: 'textVariable',
            attributeReferences: [
              { refCollectionVarId: 'redOrBlueCollection' },
            ],
          } as BFFMetadataTextVariable,
          {
            id: 'redCollection',
            nameInData: 'color',
            finalValue: 'red',
            refCollection: 'colorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'blueCollection',
            nameInData: 'color',
            finalValue: 'blue',
            refCollection: 'colorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'redOrBlueCollection',
            nameInData: 'color',
            refCollection: 'colorCollection',
          } as BFFMetadataCollectionVariable,
          {
            id: 'colorCollection',
            nameInData: 'color',
            type: 'itemCollection',
            collectionItemReferences: [
              { refCollectionItemId: 'redItem' },
              { refCollectionItemId: 'blueItem' },
            ],
          } as BFFMetadataItemCollection,
          {
            id: 'redItem',
            nameInData: 'red',
          } as BFFMetadataBase,
          {
            id: 'blueItem',
            nameInData: 'blue',
          } as BFFMetadataBase,
        ]),
        presentationPool: listToPool([
          {
            id: 'rootPGroup',
            presentationOf: 'rootGroup',
            type: 'pGroup',
            mode: 'output',
            children: [
              {
                refGroups: [{ childId: 'redOrBluePVar', type: 'presentation' }],
              },
            ],
          } as BFFPresentationGroup,
          {
            id: 'redOrBluePVar',
            presentationOf: 'redOrBlueChild',
            type: 'pVar',
            mode: 'output',
          } as BFFPresentationTextVar,
        ]),
      } as Dependencies;
      const formSchema = createFormDefinition(
        mockDependencies,
        'someValidationTypeId',
        'view',
      );
      expect(formSchema).toStrictEqual({
        form: {
          components: [
            {
              attributes: [
                {
                  finalValue: 'red',
                  mode: 'output',
                  name: 'color',
                  options: [
                    {
                      value: 'red',
                    },
                    {
                      value: 'blue',
                    },
                  ],
                  placeholder: 'initialEmptyValueText',
                  showLabel: true,
                  tooltip: {},
                },
              ],
              gridColSpan: 12,
              mode: 'output',
              name: 'child',
              presentationId: 'redOrBluePVar',
              repeat: {
                repeatMax: 1,
                repeatMin: 0,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
            {
              attributes: [
                {
                  finalValue: 'blue',
                  mode: 'output',
                  name: 'color',
                  options: [
                    {
                      value: 'red',
                    },
                    {
                      value: 'blue',
                    },
                  ],
                  placeholder: 'initialEmptyValueText',
                  showLabel: true,
                  tooltip: {},
                },
              ],
              gridColSpan: 12,
              mode: 'output',
              name: 'child',
              presentationId: 'redOrBluePVar',
              repeat: {
                repeatMax: 1,
                repeatMin: 0,
              },
              showLabel: true,
              tooltip: {},
              type: 'textVariable',
              validation: {
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          mode: 'output',
          name: 'rootGroup',
          presentationId: 'rootPGroup',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {},
          type: 'group',
        },
        validationTypeId: 'someValidationTypeId',
      });
    });
  });

  describe('createLinkedRecordDefinition', () => {
    it('should return a linked record definition for a divaPersonOutputPLink', () => {
      const mockDependencies = {
        recordTypePool: listToPool([{}]),
        validationTypePool: listToPool([{}]),
        metadataPool: listToPool([
          createRecordLink(
            'divaPersonOutputPLink',
            'personWhenLinkedOutputPGroup',
          ) as BFFMetadataRecordLink,
          createGroup('personGroup', 'personGroup', ['personNameGroup']),
          createGroup('personNameGroup', 'personNameGroup', [
            'lastNameTextVar',
            'firstNameTextVar',
          ]),
          createTextVar('lastNameTextVar', 'familyName', []),
          createTextVar('firstNameTextVar', 'givenName', []),
        ]),
        presentationPool: listToPool([
          createPresentationRecordLink(
            'divaPersonOutputPLink',
            'divaPersonLink',
            'personWhenLinkedOutputPGroup',
          ) as BFFPresentationRecordLink,
          createPresentationGroup(
            'personWhenLinkedOutputPGroup',
            'personGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'personNameLinkOutputPGroup',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationGroup(
            'personNameLinkOutputPGroup',
            'personNameGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'personLastNameOutputPVar',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'personNameLinkSContainer',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationSContainer(
            'personNameLinkSContainer',
            ['firstNameTextVar'],
            [
              {
                refGroups: [
                  {
                    childId: 'commaText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'spaceText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'personFirstNameOutputPVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationVar(
            'personFirstNameOutputPVar',
            'firstNameTextVar',
            'pVar',
            'output',
          ),
          createPresentationVar(
            'personLastNameOutputPVar',
            'lastNameTextVar',
            'pVar',
            'output',
          ),
        ]),
      } as Dependencies;

      const metadataGroup = mockDependencies.metadataPool.get('personGroup');
      const presentationGroup = mockDependencies.presentationPool.get(
        'personWhenLinkedOutputPGroup',
      ) as BFFPresentationGroup;

      const linkedRecordDefinition = createLinkedRecordDefinition(
        mockDependencies,
        metadataGroup as BFFMetadataGroup,
        presentationGroup as BFFPresentationGroup,
      );

      expect(linkedRecordDefinition.form!.components).toHaveLength(1);
      expect(linkedRecordDefinition).toStrictEqual({
        form: {
          components: [
            {
              components: [
                {
                  gridColSpan: 12,
                  label: 'someTextId',
                  mode: 'output',
                  presentationId: 'personLastNameOutputPVar',

                  name: 'familyName',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  type: 'textVariable',
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
                {
                  components: [
                    {
                      gridColSpan: 12,
                      name: 'commaText',
                      type: 'text',
                    },
                    {
                      gridColSpan: 12,
                      name: 'spaceText',
                      type: 'text',
                    },
                    {
                      gridColSpan: 12,
                      label: 'someTextId',
                      mode: 'output',
                      presentationId: 'personFirstNameOutputPVar',

                      name: 'givenName',
                      repeat: {
                        repeatMax: 1,
                        repeatMin: 1,
                      },
                      showLabel: true,
                      tooltip: {
                        body: 'someDefTextId',
                        title: 'someTextId',
                      },
                      type: 'textVariable',
                      validation: {
                        pattern: '.*',
                        type: 'regex',
                      },
                    },
                  ],
                  containerType: 'surrounding',
                  gridColSpan: 12,
                  mode: 'output',
                  name: 'personNameLinkSContainer',
                  presentationId: 'personNameLinkSContainer',

                  type: 'container',
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'personNameGroup',
              presentationId: 'personNameLinkOutputPGroup',

              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'group',
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'output',
          name: 'personGroup',
          presentationId: 'personWhenLinkedOutputPGroup',

          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
      });
    });

    it('should return a linked record definition for a nationalSubjectCategoryOutputPLink', () => {
      const mockDependencies = {
        metadataPool: listToPool([
          createRecordLink(
            'nationalSubjectCategoryLink',
            'nationalSubjectCategory',
          ) as BFFMetadataRecordLink,
          createGroup(
            'nationalSubjectCategoryGroup',
            'nationalSubjectCategory',
            [
              'nationalSubjectCategoryNameGroup',
              'nationalSubjectCategoryAlternativeNameGroup',
              'subjectCodeTextVar',
            ],
          ),
          createGroup('nationalSubjectCategoryNameGroup', 'name', [
            'nationalSubjectCategoryNameTextVar',
            'sweLanguageCollectionVar',
          ]),
          ...createCollVar(
            'sweLanguageCollectionVar',
            'sweLanguage',
            ['swe'],
            [],
          ),
          ...createCollVar(
            'engLanguageCollectionVar',
            'engLanguage',
            ['eng'],
            [],
          ),
          createGroup(
            'nationalSubjectCategoryAlternativeNameGroup',
            'alternativeName',
            ['nationalSubjectCategoryNameTextVar', 'engLanguageCollectionVar'],
          ),
          createTextVar(
            'nationalSubjectCategoryNameTextVar',
            'nationalSubjectCategoryName',
            [],
          ),
          createTextVar('subjectCodeTextVar', 'subjectCode', []),
        ]),
        presentationPool: listToPool([
          createPresentationRecordLink(
            'nationalSubjectCategoryOutputPLink',
            'nationalSubjectCategoryLink',
            'nationalSubjectCategoryWhenLinkedPGroup',
          ) as BFFPresentationRecordLink,
          createPresentationGroup(
            'nationalSubjectCategoryWhenLinkedPGroup',
            'nationalSubjectCategoryGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'nationalSubjectCategoryNameOutputPGroup',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'semicolonText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'spaceText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId:
                      'nationalSubjectCategoryAlternativeNameOutputPGroup',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'spaceText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'firstHalfParenthesisText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'subjectCodeOutputPVar',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'secondHalfParenthesisText',
                    type: 'text',
                  },
                ],
              },
            ],
          ),
          createPresentationGroup(
            'nationalSubjectCategoryNameOutputPGroup',
            'nationalSubjectCategoryNameGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'nationalSubjectCategoryNameOutputPVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationGroup(
            'nationalSubjectCategoryAlternativeNameOutputPGroup',
            'nationalSubjectCategoryAlternativeNameGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'nationalSubjectCategoryNameOutputPVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationVar(
            'nationalSubjectCategoryNameOutputPVar',
            'nationalSubjectCategoryNameTextVar',
            'pVar',
            'output',
          ),
          createPresentationGroup(
            'nationalSubjectCategoryPGroup',
            'nationalSubjectCategoryGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'nationalSubjectCategoryText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'nationalSubjectCategoryNamePGroup',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'nationalSubjectCategoryAlternativeNamePGroup',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'subjectCodeTextVarText',
                    type: 'text',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'subjectCodePVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
          ),
          createPresentationVar(
            'subjectCodeOutputPVar',
            'subjectCodeTextVar',
            'pVar',
            'output',
          ),
        ]),
      } as Dependencies;

      const metadataGroup = mockDependencies.metadataPool.get(
        'nationalSubjectCategoryGroup',
      );
      const presentationGroup = mockDependencies.presentationPool.get(
        'nationalSubjectCategoryWhenLinkedPGroup',
      ) as BFFPresentationGroup;

      const linkedRecordDefinition = createLinkedRecordDefinition(
        mockDependencies,
        metadataGroup as BFFMetadataGroup,
        presentationGroup as BFFPresentationGroup,
      );

      expect(linkedRecordDefinition.form!.components).toHaveLength(8);
      expect(linkedRecordDefinition).toStrictEqual({
        form: {
          components: [
            {
              components: [
                {
                  gridColSpan: 12,

                  label: 'someTextId',
                  mode: 'output',
                  name: 'nationalSubjectCategoryName',
                  presentationId: 'nationalSubjectCategoryNameOutputPVar',

                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  type: 'textVariable',
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'name',
              presentationId: 'nationalSubjectCategoryNameOutputPGroup',

              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'group',
            },
            {
              gridColSpan: 12,

              name: 'semicolonText',
              type: 'text',
            },
            {
              gridColSpan: 12,

              name: 'spaceText',
              type: 'text',
            },
            {
              components: [
                {
                  gridColSpan: 12,
                  label: 'someTextId',
                  presentationId: 'nationalSubjectCategoryNameOutputPVar',
                  mode: 'output',
                  name: 'nationalSubjectCategoryName',
                  repeat: {
                    repeatMax: 1,
                    repeatMin: 1,
                  },
                  showLabel: true,
                  tooltip: {
                    body: 'someDefTextId',
                    title: 'someTextId',
                  },
                  type: 'textVariable',
                  validation: {
                    pattern: '.*',
                    type: 'regex',
                  },
                },
              ],
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'output',
              name: 'alternativeName',
              presentationId:
                'nationalSubjectCategoryAlternativeNameOutputPGroup',

              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'group',
            },
            {
              gridColSpan: 12,

              name: 'spaceText',
              type: 'text',
            },
            {
              gridColSpan: 12,

              name: 'firstHalfParenthesisText',
              type: 'text',
            },
            {
              gridColSpan: 12,
              presentationId: 'subjectCodeOutputPVar',

              label: 'someTextId',
              mode: 'output',
              name: 'subjectCode',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'textVariable',
              validation: {
                pattern: '.*',
                type: 'regex',
              },
            },
            {
              gridColSpan: 12,

              name: 'secondHalfParenthesisText',
              type: 'text',
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'output',
          name: 'nationalSubjectCategory',
          presentationId: 'nationalSubjectCategoryWhenLinkedPGroup',

          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
      });
    });

    it('should return a linked record definition for a password', () => {
      const mockDependencies = {
        recordTypePool: listToPool([{}]),
        validationTypePool: listToPool([{}]),
        metadataPool: listToPool([
          createGroup('viewDefinitionPasswordGroup', 'password', [
            'loginIdTextVar',
            'loginPasswordTextVar',
          ]),
          createTextVar(
            'loginIdTextVar',
            'loginId',
            [],
            '^[0-9A-Za-z:-_]{2,50}@[0-9A-Za-z:-_.]{2,300}$',
          ),
          createTextVar(
            'loginPasswordTextVar',
            'password',
            [],
            '(^[0-9A-Za-z:-_]{2,50}$)',
          ),
        ]),
        presentationPool: listToPool([
          createPresentationGroup(
            'viewDefinitionPasswordPGroup',
            'viewDefinitionPasswordGroup',
            [
              {
                refGroups: [
                  {
                    childId: 'loginIdPVar',
                    type: 'presentation',
                  },
                ],
              },
              {
                refGroups: [
                  {
                    childId: 'loginPasswordPVar',
                    type: 'presentation',
                  },
                ],
              },
            ],
            'input',
          ),
          createPresentationVar(
            'loginIdPVar',
            'loginIdTextVar',
            'pVar',
            'input',
          ),
          createPresentationVar(
            'loginPasswordPVar',
            'loginPasswordTextVar',
            'pVar',
            'input',
            'password',
          ),
        ]),
      } as Dependencies;

      const passwordGroup = createLinkedRecordDefinition(
        mockDependencies,
        {
          id: 'viewDefinitionPasswordGroup',
          nameInData: 'password',
          type: 'group',
          textId: 'viewDefinitionPasswordGroupText',
          defTextId: 'viewDefinitionPasswordGroupDefText',
          children: [
            { childId: 'loginIdTextVar', repeatMin: '1', repeatMax: '1' },
            { childId: 'loginPasswordTextVar', repeatMin: '1', repeatMax: '1' },
          ],
        } as BFFMetadataGroup,
        {
          id: 'viewDefinitionPasswordPGroup',
          presentationOf: 'viewDefinitionPasswordGroup',
          mode: 'input',
          children: [
            {
              refGroups: [
                {
                  childId: 'loginIdPVar',
                  type: 'presentation',
                },
              ],
              minNumberOfRepeatingToShow: '1',
            },
            {
              refGroups: [
                {
                  childId: 'loginPasswordPVar',
                  type: 'presentation',
                },
              ],
              minNumberOfRepeatingToShow: '1',
            },
          ],
          type: 'pGroup',
        },
      );
      expect(passwordGroup.form!.components).toHaveLength(2);
      expect(passwordGroup).toStrictEqual({
        form: {
          components: [
            {
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'input',
              name: 'loginId',
              presentationId: 'loginIdPVar',

              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'textVariable',
              validation: {
                pattern: '^[0-9A-Za-z:-_]{2,50}@[0-9A-Za-z:-_.]{2,300}$',
                type: 'regex',
              },
            },
            {
              gridColSpan: 12,
              label: 'someTextId',
              mode: 'input',
              name: 'password',
              presentationId: 'loginPasswordPVar',

              inputFormat: 'password',
              repeat: {
                repeatMax: 1,
                repeatMin: 1,
              },
              showLabel: true,
              tooltip: {
                body: 'someDefTextId',
                title: 'someTextId',
              },
              type: 'textVariable',
              validation: {
                pattern: '(^[0-9A-Za-z:-_]{2,50}$)',
                type: 'regex',
              },
            },
          ],
          gridColSpan: 12,
          label: 'someTextId',
          mode: 'input',
          name: 'password',
          presentationId: 'viewDefinitionPasswordPGroup',

          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          showLabel: true,
          tooltip: {
            body: 'someDefTextId',
            title: 'someTextId',
          },
          type: 'group',
        },
      });
    });
  });
});

const someTestRecordType: BFFRecordType = {
  id: 'someRecordTypeId',
  metadataId: 'rootGroupId',
  textId: '',
  pluralTextId: '',
  defTextId: '',
  presentationViewId: 'rootPGroupId',
  listPresentationViewId: '',
  groupOfRecordType: [],
  recordTypeCategory: [],
  useTrashBin: false,
};

const testValidationTypeData: BFFValidationType = {
  id: 'someValidationTypeId',
  validatesRecordTypeId: 'someRecordTypeId',
  // New
  newMetadataGroupId: 'rootGroupId',
  newPresentationGroupId: 'rootPGroupId',
  // Update/Edit
  metadataGroupId: 'rootGroupId',
  presentationGroupId: 'rootPGroupId',
  nameTextId: 'name123',
  defTextId: 'defName456',
};

const rootGroup: BFFMetadataGroup = {
  id: 'rootGroupId',
  nameInData: 'rootGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataVariableId',
      repeatMin: '1',
      repeatMax: '3',
    },
  ],
};

export const textVariable: BFFMetadataTextVariable = {
  id: 'someMetadataVariableId',
  nameInData: 'someNameInData',
  type: 'textVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  regEx: 'someRegex',
};

export const rootPGroup: BFFPresentationGroup = {
  id: 'rootPGroupId',
  type: 'pGroup',
  presentationOf: 'rootGroupId',
  mode: 'input',

  children: [
    {
      refGroups: [{ childId: 'pSomeMetadataVariableId', type: 'presentation' }],
      childStyle: ['twelveChildStyle'],
    },
  ],
};

export const metadataPVariable: BFFPresentationTextVar = {
  id: 'pSomeMetadataVariableId',
  presentationOf: 'someMetadataVariableId',
  mode: 'input',
  inputType: 'input',
  type: 'pVar',
  emptyTextId: 'someEmptyTextId',
};
export const numberVariable: BFFMetadataNumberVariable = {
  id: 'someMetadataVariableId',
  nameInData: 'someNameInData',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  min: '0',
  max: '20',
  warningMin: '2',
  warningMax: '10',
  numberOfDecimals: '0',
  type: 'numberVariable',
};

export const numberPVariable: BFFPresentationOfSingleMetadata = {
  id: 'pSomeMetadataVariableId',
  presentationOf: 'someMetadataVariableId',
  mode: 'input',
  type: 'pNumVar',
  emptyTextId: 'someEmptyTextId',
};

export const collectionVariable: BFFMetadataCollectionVariable = {
  id: 'someMetadataVariableId',
  nameInData: 'someNameInData',
  type: 'collectionVariable',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  refCollection: 'someCollection',
};

export const itemCollection: BFFMetadataItemCollection = {
  id: 'someCollection',
  nameInData: 'colour',
  type: 'itemCollection',
  textId: 'exampleCollectionText',
  defTextId: 'exampleCollectionDefText',
  collectionItemReferences: [{ refCollectionItemId: 'exampleBlueItem' }],
};

export const collectionPVariable: BFFPresentationBase = {
  id: 'pSomeMetadataVariableId',
  presentationOf: 'someMetadataVariableId',
  mode: 'input',
  type: 'pCollVar',
  emptyTextId: 'someEmptyTextId',
};

export const itemBlue: BFFMetadataBase = {
  id: 'exampleBlueItem',
  nameInData: 'blue',
  type: 'collectionItem',
  textId: 'exampleBlueItemText',
  defTextId: 'exampleBlueItemDefText',
};

export const recordLink: BFFMetadataRecordLink = {
  id: 'someMetadataVariableId',
  nameInData: 'someNameInData',
  type: 'recordLink',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
  linkedRecordType: 'someLinkedRecordType',
};

export const recordPLink: BFFPresentationRecordLink = {
  id: 'pSomeMetadataVariableId',
  type: 'pRecordLink',
  presentationOf: 'someMetadataVariableId',
  mode: 'input',
  linkedRecordPresentations: [
    {
      presentedRecordType: 'somePresentedRecordType',
      presentationId: 'somePresentationIdPresentation',
    },
  ],
};

export const resourceLink: BFFResourceLink = {
  id: 'someMetadataVariableId',
  nameInData: 'someNameInData',
  type: 'resourceLink',
  textId: 'someTextId',
  defTextId: 'someDefTextId',
};

export const resourcePLink: BFFPresentationResourceLink = {
  id: 'pSomeMetadataVariableId',
  presentationOf: 'someMetadataVariableId',
  outputFormat: 'image',
  type: 'pResourceLink',
};

const otherRootGroup: BFFMetadataGroup = {
  id: 'rootGroupId',
  nameInData: 'rootGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someChildGroupId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

const childGroup: BFFMetadataGroup = {
  id: 'someChildGroupId',
  nameInData: 'childGroupNameInData',
  type: 'group',
  textId: 'textId345',
  defTextId: 'defTextId678',
  children: [
    {
      childId: 'someMetadataVariableId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const rootPGroup: BFFPresentationGroup = {
  id: 'rootPGroupId',
  type: 'pGroup',
  presentationOf: 'rootGroupId',
  mode: 'input',

  children: [
    {
      refGroups: [{ childId: 'childPGroupId', type: 'presentation' }],
      childStyle: ['twelveChildStyle'],
    },
  ],
};

export const childPGroup: BFFPresentationGroup = {
  id: 'childPGroupId',
  type: 'pGroup',
  presentationOf: 'someChildGroupId',
  mode: 'input',

  children: [
    {
      refGroups: [{ childId: 'pSomeMetadataVariableId', type: 'presentation' }],
      childStyle: ['twelveChildStyle'],
    },
  ],
};

/* Other? */

export const someGroupWithNumVarWithAttribute: BFFMetadataGroup = {
  id: 'someGroupWithNumVarWithAttributeId',
  nameInData: 'someGroupWithNumVarWithAttributeNameInData',
  type: 'group',
  textId: 'textId789',
  defTextId: 'defTextId012',
  children: [
    {
      childId: 'someMetadataNumberWithAttributeVarId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someGroupWithVarWithSpecifiedHeadline: BFFMetadataGroup = {
  id: 'someGroupWithVarWithSpecifiedHeadlineId',
  nameInData: 'someGroupWithVarWithSpecifiedHeadlineNameInData',
  type: 'group',
  textId: 'textId789',
  defTextId: 'defTextId012',
  children: [
    {
      childId: 'someMetadataChildGroupWithSpecifiedHeadlineTextId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};

export const someGroupWithVarWithShowHeadlineFalse: BFFMetadataGroup = {
  id: 'someGroupWithVarWithShowHeadlineFalseId',
  nameInData: 'someGroupWithVarWithShowHeadlineFalseNameInData',
  type: 'group',
  textId: 'textId789',
  defTextId: 'defTextId012',
  children: [
    {
      childId: 'someMetadataChildGroupWithShowHeadlineFalseId',
      repeatMin: '1',
      repeatMax: '1',
    },
  ],
};
