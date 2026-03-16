import type {
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationTextVar,
  Dependencies,
} from '@/cora/bffTypes.server';
import { describe, expect, it } from 'vitest';
import { createPresentationComponent } from '../createPresentationComponent';
import { listToPool } from 'server/dependencies/util/listToPool';

describe('createPresentationComponent', () => {
  it('generates a group with a textVar that has no presentation but finalValue', () => {
    const mockDependencies = {
      metadataPool: listToPool([
        {
          id: 'agentGroup',
          nameInData: 'agent',
          type: 'group',
          textId: 'agentGroupText',
          defTextId: 'agentGroupDefText',
          children: [
            {
              childId: 'namePartTextVar',
              repeatMin: '0',
              repeatMax: 'X',
            },
            {
              childId: 'rolePublisherGroup',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          nameInData: 'namePart',
          regEx: '.+',
          id: 'namePartTextVar',
          type: 'textVariable',
          textId: 'namePartTextVarText',
          defTextId: 'namePartTextVarDefText',
        } as BFFMetadataTextVariable,
        {
          id: 'rolePublisherGroup',
          nameInData: 'role',
          type: 'group',
          textId: 'rolePublisherGroupText',
          defTextId: 'rolePublisherGroupDefText',
          children: [
            {
              childId: 'rolePublisherTextVar',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          nameInData: 'roleTerm',
          regEx: '.+',
          id: 'rolePublisherTextVar',
          finalValue: 'pbl',
          type: 'textVariable',
          textId: 'rolePublisherTextVarText',
          defTextId: 'rolePublisherTextVarDefText',
        } as BFFMetadataTextVariable,
      ]),
      presentationPool: listToPool([
        {
          id: 'agentPGroup',
          presentationOf: 'agentGroup',
          mode: 'input',
          children: [
            {
              refGroups: [
                {
                  childId: 'namePartPVar',
                  type: 'presentation',
                },
              ],
              minNumberOfRepeatingToShow: '0',
            },
          ],
          type: 'pGroup',
        } as BFFPresentationGroup,
        {
          id: 'namePartPVar',
          presentationOf: 'namePartTextVar',
          mode: 'input',
          type: 'pVar',
          inputType: 'input',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const actual = createPresentationComponent(
      mockDependencies,
      'agentGroup',
      'agentPGroup',
      {} as BFFPresentationChildReference,
      { minNumberOfRepeatingToShow: 0, repeatMin: 0, repeatMax: 1 },
    );

    expect(actual).toStrictEqual({
      repeat: {
        minNumberOfRepeatingToShow: 0,
        repeatMin: 0,
        repeatMax: 1,
      },
      gridColSpan: 12,
      name: 'agent',
      type: 'group',
      mode: 'input',
      presentationId: 'agentPGroup',

      tooltip: {
        title: 'agentGroupText',
        body: 'agentGroupDefText',
      },
      label: 'agentGroupText',
      showLabel: true,
      components: [
        {
          repeat: {
            minNumberOfRepeatingToShow: 0,
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308,
          },

          gridColSpan: 12,
          name: 'namePart',
          presentationId: 'namePartPVar',

          type: 'textVariable',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'namePartTextVarText',
            body: 'namePartTextVarDefText',
          },
          label: 'namePartTextVarText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '.+',
          },
        },
        {
          type: 'group',
          name: 'role',
          mode: 'input',
          hidden: true,
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              type: 'hidden',
              name: 'roleTerm',
              finalValue: 'pbl',
              attributesToShow: 'none',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
          ],
        },
      ],
    });
  });
});
