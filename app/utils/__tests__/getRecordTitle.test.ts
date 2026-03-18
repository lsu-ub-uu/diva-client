/*
 * Copyright 2024 Uppsala University Library
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
import type {
  DivaCourse,
  DivaFunder,
  DivaJournal,
  DivaLocalLabel,
  DivaMember,
  DivaOrganisation,
  DivaOutput,
  DivaPerson,
  DivaProgramme,
  DivaProject,
  DivaSeries,
  DivaSubject,
} from '@/generatedTypes/divaTypes';
import type { BFFDataRecord, RecordInfo } from '@/types/record';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { describe, expect, it } from 'vitest';

describe('getRecordTitle', () => {
  describe('diva-output', () => {
    it('shows title for report', () => {
      const formData = {
        id: 'diva-output:10211259349608221',
        recordType: 'diva-output',
        validationType: 'publication_report',
        createdAt: '2024-12-16T12:27:23.840907Z',
        createdBy: '161616',
        updated: [
          {
            updateAt: '2024-12-16T12:27:23.840907Z',
            updatedBy: '161616',
          },
        ],
        userRights: ['read', 'update', 'index', 'delete'],
        data: {
          output: {
            titleInfo: {
              title: {
                value: 'someTitle',
              },
              _lang: 'arg',
            },
          },
        } as DivaOutput,
        actionLinks: { read: { url: '', rel: 'read', requestMethod: 'GET' } },
      } satisfies BFFDataRecord<DivaOutput>;
      const actual = getRecordTitle(formData, 'sv');
      expect(actual).toBe('someTitle');
    });

    it('shows title for diva-output', () => {
      const formData = {
        id: 'diva-output:10211259349608221',
        recordType: 'diva-output',
        validationType: 'publication_report',
        createdAt: '2024-12-16T12:27:23.840907Z',
        createdBy: '161616',
        updated: [
          {
            updateAt: '2024-12-16T12:27:23.840907Z',
            updatedBy: '161616',
          },
        ],
        userRights: ['read', 'update', 'index', 'delete'],
        data: {
          output: {
            titleInfo: {
              title: {
                value: 'someTitle',
              },
              _lang: 'arg',
            },
            recordInfo,
          },
        },
        actionLinks: { read: { url: '', rel: 'read', requestMethod: 'GET' } },
      } satisfies BFFDataRecord;

      const actual = getRecordTitle(formData, 'sv');
      expect(actual).toBe('someTitle');
    });
  });

  describe('diva-person', () => {
    it('gets title for diva-person', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-person',
        data: {
          person: {
            authority: {
              name_type_personal: {
                namePart_type_family: {
                  value: 'Smith',
                },
                namePart_type_given: {
                  value: 'John',
                },
              },
            },
          },
        } as DivaPerson,
      } as BFFDataRecord<DivaPerson>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('John Smith');
    });

    it('gets title for diva-person when given name is missing', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-person',
        data: {
          person: {
            authority: {
              name_type_personal: {
                namePart_type_family: {
                  value: 'Smith',
                },
              },
            },
          },
        } as DivaPerson,
      } as BFFDataRecord<DivaPerson>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('Smith');
    });

    it('gets title for diva-person when family name is missing', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-person',
        data: {
          person: {
            authority: {
              name_type_personal: {
                namePart_type_given: {
                  value: 'John',
                },
              },
            },
          },
        } as DivaPerson,
      } as BFFDataRecord<DivaPerson>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('John');
    });

    it('gets title for diva-person when both given and family name are missing', () => {
      const record = {
        id: '123',
        recordType: 'diva-person',
        data: {
          person: {
            authority: {
              name_type_personal: {},
            },
          },
        } as DivaPerson,
      } as BFFDataRecord<DivaPerson>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('123');
    });
  });

  describe('diva-project', () => {
    it('gets title for diva-project', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-project',
        data: {
          project: {
            titleInfo: {
              title: {
                value: 'someProjectTitle',
              },
            },
          },
        } as DivaProject,
      } as BFFDataRecord<DivaProject>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('someProjectTitle');
    });
  });

  describe('diva-course', () => {
    it('gets swedish title for diva-course', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-course',
        data: {
          course: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Ämnestiteln',
                },
              },
              {
                _lang: 'eng',
                topic: {
                  value: 'The subject title',
                },
              },
            ],
          },
        } as DivaCourse,
      } as BFFDataRecord<DivaCourse>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Ämnestiteln');
    });

    it('gets english title for diva-course', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-course',
        data: {
          course: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Ämnestiteln',
                },
              },
              {
                _lang: 'eng',
                topic: {
                  value: 'The subject title',
                },
              },
            ],
          },
        } as DivaCourse,
      } as BFFDataRecord<DivaCourse>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('The subject title');
    });

    it('gets swedish title for diva-course when lang en and no english title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-course',
        data: {
          course: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Ämnestiteln',
                },
              },
            ],
          },
        } as DivaCourse,
      } as BFFDataRecord<DivaCourse>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Ämnestiteln');
    });

    it('gets english title for diva-course when lang swe and no swedish title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-course',
        data: {
          course: {
            authority: [
              {
                _lang: 'eng',
                topic: {
                  value: 'The subject title',
                },
              },
            ],
          },
        } as DivaCourse,
      } as BFFDataRecord<DivaCourse>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('The subject title');
    });
  });

  describe('diva-organisation', () => {
    it('gets swedish title for diva-organisation', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-organisation',
        data: {
          organisation: {
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Uppsala Universitet',
                  },
                },
              },
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Uppsala University',
                  },
                },
              },
            ],
          },
        } as DivaOrganisation,
      } as BFFDataRecord<DivaOrganisation>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Uppsala Universitet');
    });

    it('gets english title for diva-organisation', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-organisation',
        data: {
          organisation: {
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Uppsala Universitet',
                  },
                },
              },
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Uppsala University',
                  },
                },
              },
            ],
          },
        } as DivaOrganisation,
      } as BFFDataRecord<DivaOrganisation>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Uppsala University');
    });

    it('gets swedish title for diva-organisation when lang en and no english title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-organisation',
        data: {
          organisation: {
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Uppsala Universitet',
                  },
                },
              },
            ],
          },
        } as DivaOrganisation,
      } as BFFDataRecord<DivaOrganisation>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Uppsala Universitet');
    });

    it('gets english title for diva-organisation when lang swe and no swedish title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-organisation',
        data: {
          organisation: {
            authority: [
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Uppsala University',
                  },
                },
              },
            ],
          },
        } as DivaOrganisation,
      } as BFFDataRecord<DivaOrganisation>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Uppsala University');
    });
  });

  describe('diva-journal', () => {
    it('gets title for diva-journal', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-journal',
        data: {
          journal: {
            titleInfo: {
              title: {
                value: 'someJournalTitle',
              },
            },
          },
        } as DivaJournal,
      } as BFFDataRecord<DivaJournal>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('someJournalTitle');
    });
  });

  describe('diva-subject', () => {
    it('gets swedish title for diva-subject', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-subject',
        data: {
          subject: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Mat & Dryck',
                },
              },
              {
                _lang: 'eng',
                topic: {
                  value: 'Food & Drink',
                },
              },
            ],
          },
        } as DivaSubject,
      } as BFFDataRecord<DivaSubject>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Mat & Dryck');
    });

    it('gets english title for diva-subject', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-subject',
        data: {
          subject: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Mat & Dryck',
                },
              },
              {
                _lang: 'eng',
                topic: {
                  value: 'Food & Drink',
                },
              },
            ],
          },
        } as DivaSubject,
      } as BFFDataRecord<DivaSubject>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Food & Drink');
    });

    it('gets swedish title for diva-subject when lang en and no english title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-subject',
        data: {
          subject: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Mat & Dryck',
                },
              },
            ],
          },
        } as DivaSubject,
      } as BFFDataRecord<DivaSubject>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Mat & Dryck');
    });

    it('gets english title for diva-subject when lang swe and no swedish title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-subject',
        data: {
          subject: {
            authority: [
              {
                _lang: 'eng',
                topic: {
                  value: 'Food & Drink',
                },
              },
            ],
          },
        } as DivaSubject,
      } as BFFDataRecord<DivaSubject>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('Food & Drink');
    });
  });

  describe('diva-programme', () => {
    it('gets swedish title for diva-programme', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-programme',
        data: {
          programme: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Teknisk fysik',
                },
              },
              {
                _lang: 'eng',
                topic: {
                  value: 'Engineering Physics',
                },
              },
            ],
          },
        } as DivaProgramme,
      } as BFFDataRecord<DivaProgramme>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Teknisk fysik');
    });

    it('gets english title for diva-programme', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-programme',
        data: {
          programme: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Teknisk fysik',
                },
              },
              {
                _lang: 'eng',
                topic: {
                  value: 'Engineering Physics',
                },
              },
            ],
          },
        } as DivaProgramme,
      } as BFFDataRecord<DivaProgramme>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Engineering Physics');
    });

    it('gets swedish title for diva-programme when lang en and no english title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-programme',
        data: {
          programme: {
            authority: [
              {
                _lang: 'swe',
                topic: {
                  value: 'Teknisk fysik',
                },
              },
            ],
          },
        } as DivaProgramme,
      } as BFFDataRecord<DivaProgramme>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Teknisk fysik');
    });

    it('gets english title for diva-programme when lang swe and no swedish title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-programme',
        data: {
          programme: {
            authority: [
              {
                _lang: 'eng',
                topic: {
                  value: 'Engineering Physics',
                },
              },
            ],
          },
        } as DivaProgramme,
      } as BFFDataRecord<DivaProgramme>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Engineering Physics');
    });
  });

  describe('diva-series', () => {
    it('gets title for diva-series', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-series',
        data: {
          series: {
            titleInfo: {
              title: {
                value: 'someSeriesTitle',
              },
            },
          },
        } as DivaSeries,
      } as BFFDataRecord<DivaSeries>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('someSeriesTitle');
    });
  });

  describe('diva-localLabel', () => {
    it('gets title for diva-localLabel', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-localLabel',
        data: {
          localLabel: {
            localLabel: {
              value: 'someLocalLabel',
            },
          },
        } as DivaLocalLabel,
      } as BFFDataRecord<DivaLocalLabel>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('someLocalLabel');
    });
  });

  describe('diva-funder', () => {
    it('gets swedish title for diva-funder', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-funder',
        data: {
          funder: {
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Vetenskapsrådet',
                  },
                },
              },
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Swedish Research Council',
                  },
                },
              },
            ],
          },
        } as DivaFunder,
      } as BFFDataRecord<DivaFunder>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Vetenskapsrådet');
    });

    it('gets english title for diva-funder', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-funder',
        data: {
          funder: {
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Vetenskapsrådet',
                  },
                },
              },
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Swedish Research Council',
                  },
                },
              },
            ],
          },
        } as DivaFunder,
      } as BFFDataRecord<DivaFunder>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Swedish Research Council');
    });

    it('gets swedish title for diva-funder when lang en and no english title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-funder',
        data: {
          funder: {
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Vetenskapsrådet',
                  },
                },
              },
            ],
          },
        } as DivaFunder,
      } as BFFDataRecord<DivaFunder>;

      const title = getRecordTitle(record, 'en');

      expect(title).toEqual('Vetenskapsrådet');
    });

    it('gets english title for diva-funder when lang swe and no swedish title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-funder',
        data: {
          funder: {
            authority: [
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Swedish Research Council',
                  },
                },
              },
            ],
          },
        } as DivaFunder,
      } as BFFDataRecord<DivaFunder>;

      const title = getRecordTitle(record, 'sv');

      expect(title).toEqual('Swedish Research Council');
    });
  });

  describe('diva-member', () => {
    it('gets swedish title for diva-member', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-member',
        data: {
          'diva-member': {
            pageTitleSv: {
              value: 'Svensk medlemstitel',
            },
            pageTitleEn: {
              value: 'English member title',
            },
          },
        } as DivaMember,
      } as BFFDataRecord<DivaMember>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('Svensk medlemstitel');
    });

    it('gets english title for diva-member', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-member',
        data: {
          'diva-member': {
            pageTitleSv: {
              value: 'Svensk medlemstitel',
            },
            pageTitleEn: {
              value: 'English member title',
            },
          },
        } as DivaMember,
      } as BFFDataRecord<DivaMember>;

      const title = getRecordTitle(record, 'en');
      expect(title).toEqual('English member title');
    });

    it('gets swedish title for diva-member when lang en and no english title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-member',
        data: {
          'diva-member': {
            pageTitleSv: {
              value: 'Svensk medlemstitel',
            },
          },
        } as DivaMember,
      } as BFFDataRecord<DivaMember>;

      const title = getRecordTitle(record, 'en');
      expect(title).toEqual('Svensk medlemstitel');
    });

    it('gets english title for diva-member when lang swe and no swedish title', () => {
      const record = {
        id: 'someRecord',
        recordType: 'diva-member',
        data: {
          'diva-member': {
            pageTitleEn: {
              value: 'English member title',
            },
          },
        } as DivaMember,
      } as BFFDataRecord<DivaMember>;

      const title = getRecordTitle(record, 'sv');
      expect(title).toEqual('English member title');
    });
  });

  it('returns record id when data has unexpected format', () => {
    const formData = {
      id: 'diva-output:10211259349608221',
      recordType: 'diva-output',
      validationType: 'publication_report',
      createdAt: '2024-12-16T12:27:23.840907Z',
      createdBy: '161616',
      updated: [
        {
          updateAt: '2024-12-16T12:27:23.840907Z',
          updatedBy: '161616',
        },
      ],
      userRights: ['read', 'update', 'index', 'delete'],
      data: {
        output: {
          recordInfo,
        },
      },
      actionLinks: { read: { url: '', rel: 'read', requestMethod: 'GET' } },
    } satisfies BFFDataRecord;

    const actual = getRecordTitle(formData, 'sv');
    expect(actual).toEqual('diva-output:10211259349608221');
  });
});

const recordInfo: RecordInfo = {
  recordContentSource: {
    value: 'hb',
  },
  genre: {
    value: 'diva-output',
    _type: 'outputType',
  },
  validationType: {
    value: 'diva-output',
  },
  dataDivider: {
    value: 'divaData',
  },
  id: {
    value: 'diva-output:10211259349608221',
  },
  type: {
    value: 'diva-output',
  },

  createdBy: {
    value: '161616',
  },
  tsCreated: {
    value: '2024-12-16T12:27:23.840907Z',
  },

  updated: [
    {
      tsUpdated: {
        value: '2024-12-16T12:27:23.840907Z',
      },
      updatedBy: {
        value: '161616',
      },
    },
  ],
};
