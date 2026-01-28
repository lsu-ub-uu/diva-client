import { vi, describe, it, expect } from 'vitest'
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import { BFFMetadata, type BFFMetadataTextVariable, type BFFRecordType } from '@/cora/transform/bffTypes.server';
import { getNavigation } from '../getNavigation';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { RecordWrapper, ActionLinks, DataGroup } from '@/cora/cora-data/types.server';
import type { AxiosResponse } from 'axios';


const coraRecordInfoId = {
    "children": [
        {
            "name": "id",
            "value": "someId"
        },
    ],
    "name": "recordInfo"
};

vi.mock('@/cora/getRecordDataById.server');

describe('getNavigation', () => {
    it('returns main and other navigation items', async () => {


        vi.mocked(getRecordDataById).mockResolvedValue({
            data: {
                record: {
                    data: { children: [coraRecordInfoId], name: 'someRecordType' } as DataGroup,
                    actionLinks: {
                        search: '/someSearchLink'
                    } as ActionLinks
                }
            }
        } as AxiosResponse<RecordWrapper>)


        const dependencies = {
            metadataPool: listToPool<BFFMetadata>([
                { id: 'id', textId: 'textId', type: 'textVariable' } as BFFMetadataTextVariable,
            ]),
            recordTypePool: listToPool<BFFRecordType>([
                {
                    id: 'someRecordTypeId',
                    textId: 'someRecordTypeText',
                    recordTypeCategory: ['clientMainNavigation'],
                    metadataId: 'string',
                    presentationViewId: 'string',
                    listPresentationViewId: 'string',
                    searchId: 'string',
                    defTextId: 'string',
                    groupOfRecordType: ['string'],
                    useTrashBin: true
                } as BFFRecordType,
            ])
        } as Dependencies

        const navigation = await getNavigation(dependencies)
        expect(navigation.mainNavigationItems).toEqual([
            { link: '/someRecordTypeId', textId: 'someRecordTypeText' }
        ])
        expect(navigation.otherNavigationItems).toEqual([

        ])
    })

    it.todo('sorts record types', async () => {
    })

    it('only returns record types that the user may search for')

    it('includes member settings item')

    it('includes dev items when dev cookie')
})


