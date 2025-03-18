import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';

export const dataListContainingOnePerson: DataListWrapper = {
  dataList: {
    fromNo: '1',
    data: [
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:112',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'rinst123',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-03-23T13:46:04.970Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'user',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'rinst123',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2021-03-24T04:25:30.434Z',
                      },
                    ],
                    name: 'updated',
                  },
                  {
                    name: 'public',
                    value: 'yes',
                  },
                  {
                    repeatId: '0',
                    name: 'domain',
                    value: 'test',
                  },
                  {
                    repeatId: '1',
                    name: 'domain',
                    value: 'uu',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'familyName',
                    value: 'Enequist',
                  },
                  {
                    name: 'givenName',
                    value: 'Gerd',
                  },
                ],
                name: 'authorisedName',
              },
              {
                name: 'academicTitle',
                value: 'Professor',
              },
              {
                name: 'yearOfBirth',
                value: '1903',
              },
              {
                name: 'yearOfDeath',
                value: '1989',
              },
              {
                name: 'emailAddress',
                value: 'gerd@enequist.se',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'familyName',
                    value: 'Enequist',
                  },
                  {
                    name: 'givenName',
                    value: 'Gerd Margareta',
                  },
                ],
                name: 'alternativeName',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'affiliation',
                    value: 'Fritextorganisation',
                  },
                  {
                    name: 'affiliationFromYear',
                    value: '1949',
                  },
                  {
                    name: 'affiliationUntilYear',
                    value: '1950',
                  },
                ],
                name: 'otherAffiliation',
              },
              {
                repeatId: '0',
                name: 'ORCID_ID',
                value: '0000-0003-5342-25345',
              },
              {
                repeatId: '0',
                name: 'VIAF_ID',
                value: '66928422',
              },
              {
                repeatId: '0',
                name: 'Libris_ID',
                value: '543453',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954–1958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951–57.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
                  },
                  {
                    name: 'language',
                    value: 'en',
                  },
                ],
                name: 'biographyEnglish',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954–1958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951–57.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
                  },
                  {
                    name: 'language',
                    value: 'sv',
                  },
                ],
                name: 'biographySwedish',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:112:test',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:test',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
              {
                repeatId: '1',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:112:uu',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:uu',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
            ],
            name: 'person',
          },
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        },
      },
    ],
    totalNo: '1',
    containDataOfType: 'mix',
    toNo: '1',
  },
};

export function getDataListContainingOnePerson(): DataListWrapper {
  return dataListContainingOnePerson;
}

export const dataListContainingFourPersons: DataListWrapper = {
  dataList: {
    fromNo: '1',
    data: [
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:112',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'rinst123',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-03-23T13:46:04.970Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'user',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'rinst123',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2021-03-24T04:25:30.434Z',
                      },
                    ],
                    name: 'updated',
                  },
                  {
                    name: 'public',
                    value: 'yes',
                  },
                  {
                    repeatId: '0',
                    name: 'domain',
                    value: 'test',
                  },
                  {
                    repeatId: '1',
                    name: 'domain',
                    value: 'uu',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'familyName',
                    value: 'Enequist',
                  },
                  {
                    name: 'givenName',
                    value: 'Gerd',
                  },
                ],
                name: 'authorisedName',
              },
              {
                name: 'academicTitle',
                value: 'Professor',
              },
              {
                name: 'yearOfBirth',
                value: '1903',
              },
              {
                name: 'yearOfDeath',
                value: '1989',
              },
              {
                name: 'emailAddress',
                value: 'gerd@enequist.se',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'familyName',
                    value: 'Enequist',
                  },
                  {
                    name: 'givenName',
                    value: 'Gerd Margareta',
                  },
                ],
                name: 'alternativeName',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'affiliation',
                    value: 'Fritextorganisation',
                  },
                  {
                    name: 'affiliationFromYear',
                    value: '1949',
                  },
                  {
                    name: 'affiliationUntilYear',
                    value: '1950',
                  },
                ],
                name: 'otherAffiliation',
              },
              {
                repeatId: '0',
                name: 'ORCID_ID',
                value: '0000-0003-5342-25345',
              },
              {
                repeatId: '0',
                name: 'VIAF_ID',
                value: '66928422',
              },
              {
                repeatId: '0',
                name: 'Libris_ID',
                value: '543453',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954–1958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951–57.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
                  },
                  {
                    name: 'language',
                    value: 'en',
                  },
                ],
                name: 'biographyEnglish',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954–1958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951–57.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
                  },
                  {
                    name: 'language',
                    value: 'sv',
                  },
                ],
                name: 'biographySwedish',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:112:test',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:test',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
              {
                repeatId: '1',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:112:uu',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:uu',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
            ],
            name: 'person',
          },
          permissions: {
            read: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'personDomainPart',
              'public',
              'createdBy',
              'domain',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
            write: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'public',
              'createdBy',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:112',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:112',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    name: 'recordType',
                  },
                  {
                    name: 'recordId',
                    value: 'authority-person:112',
                  },
                  {
                    name: 'type',
                    value: 'index',
                  },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
            delete: {
              requestMethod: 'DELETE',
              rel: 'delete',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:112',
            },
          },
        },
      },
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:111',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'rinst123',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-03-23T13:01:00.013Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'user',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'rinst123',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2021-03-23T14:33:52.976Z',
                      },
                    ],
                    name: 'updated',
                  },
                  {
                    name: 'public',
                    value: 'no',
                  },
                  {
                    repeatId: '0',
                    name: 'domain',
                    value: 'test',
                  },
                  {
                    repeatId: '1',
                    name: 'domain',
                    value: 'uu',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'familyName',
                    value: 'Celsius',
                  },
                  {
                    name: 'givenName',
                    value: 'Anders',
                  },
                ],
                name: 'authorisedName',
              },
              {
                name: 'academicTitle',
                value: 'Professor',
              },
              {
                name: 'yearOfBirth',
                value: '1701',
              },
              {
                name: 'yearOfDeath',
                value: '1744',
              },
              {
                name: 'emailAddress',
                value: 'anders@celsius.se',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'familyName',
                    value: 'Celsius',
                  },
                  {
                    name: 'givenName',
                    value: 'Andreas',
                  },
                ],
                name: 'alternativeName',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkTitle',
                    value: 'Wikipedia',
                  },
                  {
                    name: 'URL',
                    value: 'https://sv.wikipedia.org/wiki/Anders_Celsius',
                  },
                ],
                name: 'externalURL',
              },
              {
                repeatId: '1',
                children: [
                  {
                    name: 'linkTitle',
                    value: 'Wikipedia English',
                  },
                  {
                    name: 'URL',
                    value: 'https://en.wikipedia.org/wiki/Anders_Celsius',
                  },
                ],
                name: 'externalURL',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'affiliation',
                    value: 'Fritextorganisation',
                  },
                  {
                    name: 'affiliationFromYear',
                    value: '1733',
                  },
                  {
                    name: 'affiliationUntilYear',
                    value: '1734',
                  },
                ],
                name: 'otherAffiliation',
              },
              {
                repeatId: '0',
                name: 'ORCID_ID',
                value: '0000-0003-3443-5332',
              },
              {
                repeatId: '0',
                name: 'VIAF_ID',
                value: '67259216',
              },
              {
                repeatId: '0',
                name: 'Libris_ID',
                value: '51233',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Anders Celsius (Swedish pronunciation: [ˌanːdəʂ ˈsɛlːsiɵs], 27 November 1701 – 25 April 1744) was a Swedish astronomer, physicist and mathematician. He was professor of astronomy at Uppsala University from 1730 to 1744, but traveled from 1732 to 1735 visiting notable observatories in Germany, Italy and France. He founded the Uppsala Astronomical Observatory in 1741, and in 1742 proposed (an inverted form of) the Centigrade temperature scale which was later renamed Celsius in his honor. </p>',
                  },
                  {
                    name: 'language',
                    value: 'en',
                  },
                ],
                name: 'biographyEnglish',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Anders Celsius, född 27 november 1701 i Uppsala, död 25 april 1744 i Uppsala, var en svensk vetenskapsman och astronom, i tjänst som professor i astronomi vid Uppsala universitet. Han är idag mest känd för Celsiusskalan, den hundragradiga termometerskalan. En enhet för temperatur är därför uppkallad efter honom och betecknas med ett stort C: °C. </p>',
                  },
                  {
                    name: 'language',
                    value: 'sv',
                  },
                ],
                name: 'biographySwedish',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:111:test',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:111:test',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
              {
                repeatId: '1',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:111:uu',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:111:uu',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
            ],
            name: 'person',
          },
          permissions: {
            read: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'personDomainPart',
              'public',
              'createdBy',
              'domain',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
            write: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'public',
              'createdBy',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:111',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:111',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    name: 'recordType',
                  },
                  {
                    name: 'recordId',
                    value: 'authority-person:111',
                  },
                  {
                    name: 'type',
                    value: 'index',
                  },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
            delete: {
              requestMethod: 'DELETE',
              rel: 'delete',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:111',
            },
          },
        },
      },
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:124',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'rinst123',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-04-06T07:58:17.618Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    name: 'public',
                    value: 'yes',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'familyName',
                    value: 'Ernman',
                  },
                  {
                    name: 'givenName',
                    value: 'Malena',
                  },
                ],
                name: 'authorisedName',
              },
              {
                name: 'yearOfBirth',
                value: '1970',
              },
              {
                name: 'emailAddress',
                value: 'malena@ernman.se',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Sara Magdalena Ernman, känd som Malena Ernman, född 4 november 1970 i Uppsala,[1] är en svensk operasångerska (mezzosopran). Trots att hennes centrala roller återfinns i mezzofacket har hon ett unikt röstomfång upp till en koloratursoprans trestrukna f. Hon har haft återkommande uppdrag utomlands, bland annat på olika scener i Berlin, Wien (främst vid Volksoper) och Amsterdam.[2]</p><p>Ernman fick ett populärmusikaliskt genombrott med deltagandet och vinsten i Melodifestivalen 2009, den svenska uttagningen till Eurovision Song Contest 2009 med bidraget La Voix, skrivet av henne själv och Fredrik Kempe. År 2015 utsågs hon att läsa den traditionella dikten Nyårsklockan av Alfred Tennyson vid Skansens nyårsfirande, vilket också sänds i Sveriges Television.[3]</p>',
                  },
                  {
                    name: 'language',
                    value: 'sv',
                  },
                ],
                name: 'biographySwedish',
              },
            ],
            name: 'person',
          },
          permissions: {
            read: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'personDomainPart',
              'public',
              'createdBy',
              'domain',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
            write: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'public',
              'createdBy',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:124',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:124',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    name: 'recordType',
                  },
                  {
                    name: 'recordId',
                    value: 'authority-person:124',
                  },
                  {
                    name: 'type',
                    value: 'index',
                  },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
            delete: {
              requestMethod: 'DELETE',
              rel: 'delete',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:124',
            },
          },
        },
      },
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:110',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'rinst123',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-03-23T10:55:34.682Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    name: 'public',
                    value: 'yes',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'familyName',
                    value: 'Linné',
                  },
                  {
                    name: 'givenName',
                    value: 'Carl von',
                  },
                ],
                name: 'authorisedName',
              },
              {
                name: 'academicTitle',
                value: 'Rektor',
              },
              {
                name: 'yearOfBirth',
                value: '1744',
              },
              {
                name: 'yearOfDeath',
                value: '1778',
              },
              {
                name: 'emailAddress',
                value: 'car@linne.se',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'familyName',
                    value: 'Linnæus',
                  },
                  {
                    name: 'givenName',
                    value: 'Carolus',
                  },
                ],
                name: 'alternativeName',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkTitle',
                    value: 'Wikipedia',
                  },
                  {
                    name: 'URL',
                    value: 'https://sv.wikipedia.org/wiki/Carl_von_Linn%C3%A9',
                  },
                ],
                name: 'externalURL',
              },
              {
                repeatId: '0',
                name: 'ORCID_ID',
                value: '0000-0002-3234-3243',
              },
              {
                repeatId: '0',
                name: 'VIAF_ID',
                value: '34594730',
              },
              {
                repeatId: '0',
                name: 'Libris_ID',
                value: '81641',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Carl Linnaeus (/lɪˈniːəs, lɪˈneɪəs/;[1][2] 23 May[note 1] 1707 – 10 January 1778), also known after his ennoblement as Carl von Linné[3] (Swedish pronunciation: [ˈkɑːɭ fɔn lɪˈneː] ( listen)), was a Swedish botanist, zoologist, taxonomist, and physician who formalised binomial nomenclature, the modern system of naming organisms. He is known as the "father of modern taxonomy".[4] Many of his writings were in Latin, and his name is rendered in Latin as Carolus Linnæus (after 1761 Carolus a Linné). </p>',
                  },
                  {
                    name: 'language',
                    value: 'en',
                  },
                ],
                name: 'biographyEnglish',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Carl von Linné (info) (före adlandet 1757 Carl Linnæus, Carolus Linnæus), född 13 maj[anm 1][2] 1707 i Råshult, Stenbrohults socken, Småland, död 10 januari 1778 i Uppsala, var en svensk botaniker, läkare, geolog och zoolog[3] som lade grunden till den moderna nomenklaturen inom biologin och den moderna systematiken, som grupperar växter och djur. Många av hans skrifter publicerades på latin, och därför återges hans latinska namn som Carolus Linnæus (Carolus a Linné efter 1761). </p>',
                  },
                  {
                    name: 'language',
                    value: 'sv',
                  },
                ],
                name: 'biographySwedish',
              },
            ],
            name: 'person',
          },
          permissions: {
            read: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'personDomainPart',
              'public',
              'createdBy',
              'domain',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
            write: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'biographyEnglish',
              'ORCID_ID',
              'type',
              'dataDivider',
              'academicTitle',
              'yearOfDeath',
              'emailAddress',
              'public',
              'createdBy',
              'Libris_ID',
              'tsCreated',
              'id',
              'alternativeName',
              'VIAF_ID',
              'updated',
              'yearOfBirth',
            ],
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:110',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:110',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    name: 'recordType',
                  },
                  {
                    name: 'recordId',
                    value: 'authority-person:110',
                  },
                  {
                    name: 'type',
                    value: 'index',
                  },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
            delete: {
              requestMethod: 'DELETE',
              rel: 'delete',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:110',
            },
          },
        },
      },
    ],
    totalNo: '4',
    containDataOfType: 'mix',
    toNo: '4',
  },
};

export function getDataListContainingFourPersons(): DataListWrapper {
  return dataListContainingFourPersons;
}

export const dataListContainingTwoOfFifteen: DataListWrapper = {
  dataList: {
    fromNo: '3',
    data: [
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:118',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-03-04T14:46:00.463Z',
                  },
                  { name: 'public', value: 'yes' },
                  {
                    repeatId: '0',
                    name: 'domain',
                    value: 'test',
                  },
                  {
                    repeatId: '1',
                    name: 'domain',
                    value: 'uu',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  { name: 'familyName', value: 'Långstrump' },
                  { name: 'givenName', value: 'Pippi' },
                ],
                name: 'authorisedName',
              },
              { name: 'academicTitle', value: 'Doktor' },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'familyName',
                    value: 'Efraimsdotter',
                  },
                  { name: 'givenName', value: 'Rullgardina' },
                ],
                name: 'alternativeName',
              },
              {
                repeatId: '0',
                children: [
                  { name: 'linkTitle', value: 'Facebook' },
                  {
                    name: 'URL',
                    value: 'http://facebook.se/pippi',
                  },
                ],
                name: 'externalURL',
              },
              {
                repeatId: '0',
                children: [
                  { name: 'affiliation', value: 'Harvard' },
                  {
                    name: 'affiliationFromYear',
                    value: '1920',
                  },
                  {
                    name: 'affiliationUntilYear',
                    value: '1922',
                  },
                ],
                name: 'otherAffiliation',
              },
              {
                repeatId: '0',
                name: 'ORCID_ID',
                value: '238942+',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      "<p>Pippi Longstocking (Swedish: Pippi Långstrump) is the fictional main character in an eponymous series of children's books by Swedish author Astrid Lindgren. Pippi was named by Lindgren's daughter Karin, who asked her mother for a get-well story when she was off school.</p><p>Pippi is red-haired, freckled, unconventional and superhumanly strong \u2013 able to lift her horse one-handed. She is playful and unpredictable. She often makes fun of unreasonable adults, especially if they are pompous and condescending. Her anger comes out in extreme cases, such as when a man mistreats his horse. Pippi, like Peter Pan, does not want to grow up. She is the daughter of a buccaneer captain and has adventure stories to tell about that, too. Her four best friends are her horse and monkey, and the neighbours' children, Tommy and Annika.</p><p>After being rejected by Bonnier Publishers in 1944, Lindgren's first manuscript was accepted by Rabén and Sjögren. The three Pippi chapter books (Pippi Longstocking, Pippi Goes on Board, and Pippi in the South Seas) were published from 1945 to 1948, followed by three short stories and a number of picture book adaptations. They have been translated into 76 languages as of 2018[1] and made into several films and television series.</p>",
                  },
                  { name: 'language', value: 'en' },
                ],
                name: 'biographyEnglish',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Pippi Långstrump, Pippilotta Viktualia Rullgardina Krusmynta Efraimsdotter Långstrump,[1] är en av Astrid Lindgrens mest kända litterära figurer och även namnet på den första boken om Pippi och hennes vänner, Tommy och Annika. Lindgren skapade figuren 1941 och första boken kom ut 1945. Pippi-böckerna finns översatta till 77 olika språk (2020).[2]</p><p>Pippi är världens starkaste, har fräknar och röda flätor som står rakt ut, säger emot vuxna och är allmänt ouppfostrad. I början när böckerna kom ut kunde hon upplevas som kontroversiell. Hon bor utan föräldrar i ett hus kallat Villa Villekulla tillsammans med sin prickiga häst Lilla gubben och sin apa Herr Nilsson. Hon äter "krumelurpiller" (som gör att man aldrig blir stor), hennes mamma är i himlen, hennes pappa Efraim Långstrump är kung på söderhavsön Kurrekurreduttön och hon har en kappsäck full med guldpengar. I hennes trädgård finns ett ihåligt träd där det enligt Pippi växer sockerdricka. I böckerna om Pippi myntas begrepp såsom pluttifikationstabellen, spunk och sak-letare.</p>',
                  },
                  { name: 'language', value: 'sv' },
                ],
                name: 'biographySwedish',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:118:test',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:118:test',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
              {
                repeatId: '1',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:118:uu',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:118:uu',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
            ],
            name: 'person',
          },
          permissions: {
            read: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'personDomainPart',
              'public',
              'biographyEnglish',
              'Libris_ID',
              'domain',
              'ORCID_ID',
              'alternativeName',
              'VIAF_ID',
              'academicTitle',
            ],
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:118',
              accept: 'application/vnd.uub.record+json',
            },
          },
        },
      },
      {
        record: {
          data: {
            children: [
              {
                children: [
                  {
                    name: 'id',
                    value: 'authority-person:112',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'person',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    name: 'tsCreated',
                    value: '2021-03-23T13:46:04.970Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  { name: 'public', value: 'yes' },
                  {
                    repeatId: '0',
                    name: 'domain',
                    value: 'test',
                  },
                  {
                    repeatId: '1',
                    name: 'domain',
                    value: 'uu',
                  },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  { name: 'familyName', value: 'Enequist' },
                  { name: 'givenName', value: 'Gerd' },
                ],
                name: 'authorisedName',
              },
              { name: 'academicTitle', value: 'Professor' },
              {
                repeatId: '0',
                children: [
                  { name: 'familyName', value: 'Enequist' },
                  {
                    name: 'givenName',
                    value: 'Gerd Margareta',
                  },
                ],
                name: 'alternativeName',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'affiliation',
                    value: 'Fritextorganisation',
                  },
                  {
                    name: 'affiliationFromYear',
                    value: '1949',
                  },
                  {
                    name: 'affiliationUntilYear',
                    value: '1950',
                  },
                ],
                name: 'otherAffiliation',
              },
              {
                repeatId: '0',
                name: 'ORCID_ID',
                value: '0000-0003-5342-25345',
              },
              {
                repeatId: '0',
                name: 'VIAF_ID',
                value: '66928422',
              },
              {
                repeatId: '0',
                name: 'Libris_ID',
                value: '543453',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954\u20131958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951\u201357.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
                  },
                  { name: 'language', value: 'en' },
                ],
                name: 'biographyEnglish',
              },
              {
                children: [
                  {
                    name: 'biography',
                    value:
                      '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954\u20131958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951\u201357.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
                  },
                  { name: 'language', value: 'sv' },
                ],
                name: 'biographySwedish',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:112:test',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:test',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
              {
                repeatId: '1',
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'personDomainPart',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'authority-person:112:uu',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:uu',
                    accept: 'application/vnd.uub.record+json',
                  },
                },
                name: 'personDomainPart',
              },
            ],
            name: 'person',
          },
          permissions: {
            read: [
              'externalURL',
              'otherAffiliation',
              'biographySwedish',
              'personDomainPart',
              'public',
              'biographyEnglish',
              'Libris_ID',
              'domain',
              'ORCID_ID',
              'alternativeName',
              'VIAF_ID',
              'academicTitle',
            ],
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/authority-person:112',
              accept: 'application/vnd.uub.record+json',
            },
          },
        },
      },
    ],
    totalNo: '15',
    containDataOfType: 'mix',
    toNo: '4',
  },
};

export const onePerson: RecordWrapper = {
  record: {
    data: {
      children: [
        {
          children: [
            {
              name: 'id',
              value: 'authority-person:112',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'recordType',
                },
                {
                  name: 'linkedRecordId',
                  value: 'person',
                },
              ],
              actionLinks: {
                read: {
                  requestMethod: 'GET',
                  rel: 'read',
                  url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                  accept: 'application/vnd.uub.record+json',
                },
              },
              name: 'type',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'user',
                },
                {
                  name: 'linkedRecordId',
                  value: 'rinst123',
                },
              ],
              name: 'createdBy',
            },
            {
              name: 'tsCreated',
              value: '2021-03-23T13:46:04.970Z',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'system',
                },
                {
                  name: 'linkedRecordId',
                  value: 'diva',
                },
              ],
              actionLinks: {
                read: {
                  requestMethod: 'GET',
                  rel: 'read',
                  url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                  accept: 'application/vnd.uub.record+json',
                },
              },
              name: 'dataDivider',
            },
            {
              repeatId: '0',
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'user',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'rinst123',
                    },
                  ],
                  name: 'updatedBy',
                },
                {
                  name: 'tsUpdated',
                  value: '2021-03-24T04:25:30.434Z',
                },
              ],
              name: 'updated',
            },
            {
              name: 'public',
              value: 'yes',
            },
            {
              repeatId: '0',
              name: 'domain',
              value: 'test',
            },
            {
              repeatId: '1',
              name: 'domain',
              value: 'uu',
            },
          ],
          name: 'recordInfo',
        },
        {
          children: [
            {
              name: 'familyName',
              value: 'Enequist',
            },
            {
              name: 'givenName',
              value: 'Gerd',
            },
          ],
          name: 'authorisedName',
        },
        {
          name: 'academicTitle',
          value: 'Professor',
        },
        {
          name: 'yearOfBirth',
          value: '1903',
        },
        {
          name: 'yearOfDeath',
          value: '1989',
        },
        {
          name: 'emailAddress',
          value: 'gerd@enequist.se',
        },
        {
          repeatId: '0',
          children: [
            {
              name: 'familyName',
              value: 'Enequist',
            },
            {
              name: 'givenName',
              value: 'Gerd Margareta',
            },
          ],
          name: 'alternativeName',
        },
        {
          repeatId: '0',
          children: [
            {
              name: 'affiliation',
              value: 'Fritextorganisation',
            },
            {
              name: 'affiliationFromYear',
              value: '1949',
            },
            {
              name: 'affiliationUntilYear',
              value: '1950',
            },
          ],
          name: 'otherAffiliation',
        },
        {
          repeatId: '0',
          name: 'ORCID_ID',
          value: '0000-0003-5342-25345',
        },
        {
          repeatId: '0',
          name: 'VIAF_ID',
          value: '66928422',
        },
        {
          repeatId: '0',
          name: 'Libris_ID',
          value: '543453',
        },
        {
          children: [
            {
              name: 'biography',
              value:
                '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954–1958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951–57.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
            },
            {
              name: 'language',
              value: 'en',
            },
          ],
          name: 'biographyEnglish',
        },
        {
          children: [
            {
              name: 'biography',
              value:
                '<p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Gerd Margareta Enequist, född 24 februari 1903 i Luleå, död 21 maj 1989 i Uppsala domkyrkoförsamling[1], var en svensk geograf och professor.</p><p>Enequist var dotter till lanträntmästaren Axel Enequist och Anna Hederstedt. Efter studentexamen i Göteborg 1922 och folkskollärarexamen i Luleå 1923 blev Enequist filosofie magister i Uppsala 1929, filosofie licentiat 1934, filosofie doktor och docent i geografi vid Uppsala universitet 1937. Hon var professor i geografi, särskilt kulturgeografi med ekonomisk geografi mellan 1949 och 1968, tillförordnad redan 1947.</p><p>Enequist var ledamot delegationen för vägplanering 1954–1958 och av redaktionskommittén för Atlas över Sverige, i vilken hon medverkade med kartor som beskrev befolkning, bebyggelse och näringsliv. Hon var inspektor vid kommunala flickskolan i Uppsala och Uppsala högre elementarläroverk samt ledamot av kyrkofullmäktige 1951–57.</p><p>Enequist blev korresponderande ledamot av Österreichische Gesellschaft zur Förderung von Landesforschung und Landesplanung 1955, ledamot av Kungliga Humanistiska vetenskapssamfundet i Uppsala 1956, av Kungliga Skytteanska samfundet 1956, hedersledamot av Upplands fornminnesförening 1976 och av Olaus Magnus-sällskapet 1976. Hon blev filosofie hedersdoktor i Umeå 1982 och var ledamot av Nordstjärneorden.</p>',
            },
            {
              name: 'language',
              value: 'sv',
            },
          ],
          name: 'biographySwedish',
        },
        {
          repeatId: '0',
          children: [
            {
              name: 'linkedRecordType',
              value: 'personDomainPart',
            },
            {
              name: 'linkedRecordId',
              value: 'authority-person:112:test',
            },
          ],
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:test',
              accept: 'application/vnd.uub.record+json',
            },
          },
          name: 'personDomainPart',
        },
        {
          repeatId: '1',
          children: [
            {
              name: 'linkedRecordType',
              value: 'personDomainPart',
            },
            {
              name: 'linkedRecordId',
              value: 'authority-person:112:uu',
            },
          ],
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/personDomainPart/authority-person:112:uu',
              accept: 'application/vnd.uub.record+json',
            },
          },
          name: 'personDomainPart',
        },
      ],
      name: 'person',
    },
    actionLinks: {
      read: {
        url: '',
        rel: 'read',
        requestMethod: 'GET',
      },
    },
  },
};

export const dataListContainingOneOrganisation: DataListWrapper = {
  dataList: {
    fromNo: '1',
    data: [
      {
        record: {
          data: {
            children: [
              {
                children: [
                  { name: 'id', value: '985' },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/recordType/subOrganisation',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'coraUser',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'coraUser:4412982402853626',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2017-01-01T00:00:00.000000Z',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'coraUser',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'coraUser:4412982402853626',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2017-01-01T00:00:00.000000Z',
                      },
                    ],
                    name: 'updated',
                  },
                  { name: 'domain', value: 'uu' },
                  { name: 'selectable', value: 'yes' },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'name',
                    value: 'Universitetsbiblioteket',
                  },
                  { name: 'language', value: 'sv' },
                ],
                name: 'organisationName',
              },
              {
                children: [
                  { name: 'language', value: 'en' },
                  {
                    name: 'name',
                    value: 'University Library',
                  },
                ],
                name: 'organisationAlternativeName',
              },
              { name: 'organisationType', value: 'unit' },
              {
                children: [
                  { name: 'city', value: 'Uppsala' },
                  { name: 'box', value: 'Box 510' },
                  { name: 'postcode', value: '75120' },
                  { name: 'country', value: 'SE' },
                ],
                name: 'address',
              },
              {
                repeatId: '0',
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'topOrganisation',
                      },
                      {
                        name: 'linkedRecordId',
                        value: '978',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/topOrganisation/978',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'organisationLink',
                  },
                ],
                name: 'parentOrganisation',
              },
            ],
            name: 'organisation',
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/985',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/985',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    name: 'recordType',
                  },
                  { name: 'recordId', value: '985' },
                  { name: 'type', value: 'index' },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
          },
        },
      },
    ],
    totalNo: '1',
    containDataOfType: 'mix',
    toNo: '1',
  },
};

export const dataListContainingThreeOrganisations: DataListWrapper = {
  dataList: {
    fromNo: '1',
    data: [
      {
        record: {
          data: {
            children: [
              {
                children: [
                  { name: 'id', value: '979' },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/recordType/subOrganisation',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'coraUser',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'coraUser:4412982402853626',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2017-01-01T00:00:00.000000Z',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'coraUser',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'coraUser:4412982402853626',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2017-01-01T00:00:00.000000Z',
                      },
                    ],
                    name: 'updated',
                  },
                  { name: 'domain', value: 'uu' },
                  { name: 'selectable', value: 'yes' },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'name',
                    value: 'Universitetsförvaltningen',
                  },
                  { name: 'language', value: 'sv' },
                ],
                name: 'organisationName',
              },
              {
                children: [
                  { name: 'language', value: 'en' },
                  {
                    name: 'name',
                    value: 'University Administration',
                  },
                ],
                name: 'organisationAlternativeName',
              },
              { name: 'organisationType', value: 'unit' },
              {
                children: [
                  { name: 'city', value: 'Uppsala' },
                  { name: 'box', value: 'Box 256' },
                  { name: 'postcode', value: '75105' },
                  { name: 'country', value: 'SE' },
                ],
                name: 'address',
              },
              { name: 'organisationCode', value: 'TEST2' },
              {
                repeatId: '0',
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'topOrganisation',
                      },
                      {
                        name: 'linkedRecordId',
                        value: '978',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/topOrganisation/978',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'organisationLink',
                  },
                ],
                name: 'parentOrganisation',
              },
            ],
            name: 'organisation',
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/979',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/979',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    name: 'recordType',
                  },
                  { name: 'recordId', value: '979' },
                  { name: 'type', value: 'index' },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
          },
        },
      },
      {
        record: {
          data: {
            children: [
              {
                children: [
                  { name: 'id', value: '985' },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/recordType/subOrganisation',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'coraUser',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'coraUser:4412982402853626',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2017-01-01T00:00:00.000000Z',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'coraUser',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'coraUser:4412982402853626',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2017-01-01T00:00:00.000000Z',
                      },
                    ],
                    name: 'updated',
                  },
                  { name: 'domain', value: 'uu' },
                  { name: 'selectable', value: 'yes' },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'name',
                    value: 'Universitetsbiblioteket',
                  },
                  { name: 'language', value: 'sv' },
                ],
                name: 'organisationName',
              },
              {
                children: [
                  { name: 'language', value: 'en' },
                  {
                    name: 'name',
                    value: 'University Library',
                  },
                ],
                name: 'organisationAlternativeName',
              },
              { name: 'organisationType', value: 'unit' },
              {
                children: [
                  { name: 'city', value: 'Uppsala' },
                  { name: 'box', value: 'Box 510' },
                  { name: 'postcode', value: '75120' },
                  { name: 'country', value: 'SE' },
                ],
                name: 'address',
              },
              {
                repeatId: '0',
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'topOrganisation',
                      },
                      {
                        name: 'linkedRecordId',
                        value: '978',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/topOrganisation/978',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'organisationLink',
                  },
                ],
                name: 'parentOrganisation',
              },
            ],
            name: 'organisation',
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/985',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/985',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    name: 'recordType',
                  },
                  { name: 'recordId', value: '985' },
                  { name: 'type', value: 'index' },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
          },
        },
      },
      {
        record: {
          data: {
            children: [
              {
                children: [
                  { name: 'id', value: '11211' },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/recordType/subOrganisation',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'type',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'system',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'diva',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/system/diva',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'dataDivider',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'coraUser',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'coraUser:4412982402853626',
                      },
                    ],
                    name: 'createdBy',
                  },
                  {
                    name: 'tsCreated',
                    value: '2017-01-01T00:00:00.000000Z',
                  },
                  {
                    repeatId: '0',
                    children: [
                      {
                        children: [
                          {
                            name: 'linkedRecordType',
                            value: 'coraUser',
                          },
                          {
                            name: 'linkedRecordId',
                            value: 'coraUser:4412982402853626',
                          },
                        ],
                        name: 'updatedBy',
                      },
                      {
                        name: 'tsUpdated',
                        value: '2017-01-01T00:00:00.000000Z',
                      },
                    ],
                    name: 'updated',
                  },
                  { name: 'domain', value: 'uu' },
                  { name: 'selectable', value: 'yes' },
                ],
                name: 'recordInfo',
              },
              {
                children: [
                  {
                    name: 'name',
                    value:
                      'Avdelningen för universitetspedagogisk utveckling (PU)',
                  },
                  { name: 'language', value: 'sv' },
                ],
                name: 'organisationName',
              },
              {
                children: [
                  { name: 'language', value: 'en' },
                  {
                    name: 'name',
                    value: 'Division for Development of Teaching and Learning',
                  },
                ],
                name: 'organisationAlternativeName',
              },
              { name: 'closedDate', value: '2013-12-31' },
              { name: 'organisationType', value: 'division' },
              {
                children: [
                  { name: 'city', value: 'Uppsala' },
                  { name: 'box', value: '2136' },
                  { name: 'postcode', value: '750 02' },
                ],
                name: 'address',
              },
              {
                repeatId: '0',
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'subOrganisation',
                      },
                      {
                        name: 'linkedRecordId',
                        value: '979',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/979',
                        accept: 'application/vnd.uub.record+json',
                      },
                    },
                    name: 'organisationLink',
                  },
                ],
                name: 'parentOrganisation',
              },
            ],
            name: 'organisation',
          },
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/11211',
              accept: 'application/vnd.uub.record+json',
            },
            update: {
              requestMethod: 'POST',
              rel: 'update',
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/subOrganisation/11211',
              accept: 'application/vnd.uub.record+json',
            },
            index: {
              requestMethod: 'POST',
              rel: 'index',
              body: {
                children: [
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'recordType',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'subOrganisation',
                      },
                    ],
                    name: 'recordType',
                  },
                  { name: 'recordId', value: '11211' },
                  { name: 'type', value: 'index' },
                ],
                name: 'workOrder',
              },
              contentType: 'application/vnd.uub.record+json',
              url: 'https://cora.test.diva-portal.org/diva/rest/record/workOrder/',
              accept: 'application/vnd.uub.record+json',
            },
          },
        },
      },
    ],
    totalNo: '3',
    containDataOfType: 'mix',
    toNo: '3',
  },
};
