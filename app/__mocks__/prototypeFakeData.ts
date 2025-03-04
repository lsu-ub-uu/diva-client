import type { BFFDataRecord, BFFDataRecordData } from '@/types/record';

const example1: BFFDataRecordData = {
  mine: true,
  output: {
    recordInfo: {
      validationType: {
        value: 'publication_report',
      },
      dataDivider: {
        value: 'divaData',
      },
      recordContentSource: {
        value: 'havochvatten',
      },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: {
        value: 'diva-output:2248124598774321',
      },
      type: {
        value: 'diva-output',
      },
      createdBy: {
        value: '161616',
      },
      tsCreated: {
        value: '2025-03-03T14:15:22.123456Z',
      },
      updated: [
        {
          tsUpdated: {
            value: '2025-03-03T14:15:22.123456Z',
          },
          updatedBy: {
            value: '161616',
          },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'vet',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Klimatförändringarnas påverkan på Östersjöns ekosystem: En långtidsstudie',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: {
        year: {
          value: '2024',
        },
      },
    },
    admin: {
      reviewed: {
        value: 'true',
      },
    },
    adminInfo: {
      visibility: {
        value: 'published',
      },
    },
    name_type_personal: [
      {
        namePart_type_given: [
          {
            value: 'Lena',
            _type: 'given',
          },
        ],
        namePart_type_family: [
          {
            value: 'Andersson',
            _type: 'family',
          },
        ],
        _type: 'personal',
      },
    ],
    subject: [
      {
        topic: {
          value: 'klimatförändringar, Östersjön, ekosystem, långtidsstudie',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example2: BFFDataRecordData = {
  readyForReview: true,
  output: {
    recordInfo: {
      validationType: {
        value: 'publication_report',
      },
      dataDivider: {
        value: 'divaData',
      },
      recordContentSource: {
        value: 'havochvatten',
      },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: {
        value: 'diva-output:2248235709885432',
      },
      type: {
        value: 'diva-output',
      },
      createdBy: {
        value: '161616',
      },
      tsCreated: {
        value: '2025-03-03T15:30:45.987654Z',
      },
      updated: [
        {
          tsUpdated: {
            value: '2025-03-03T15:30:45.987654Z',
          },
          updatedBy: {
            value: '161616',
          },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'ref',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Hållbart fiske i svenska vatten: Strategier och rekommendationer',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: {
        year: {
          value: '2025',
        },
      },
    },
    admin: {
      reviewed: {
        value: 'true',
      },
    },
    adminInfo: {
      visibility: {
        value: 'published',
      },
    },
    name_type_corporate: [
      {
        namePart: [
          {
            value: 'Havs- och vattenmyndigheten',
          },
        ],
        _type: 'corporate',
      },
    ],
    subject: [
      {
        topic: {
          value: 'hållbart fiske, svenska vatten, fiskbestånd, fiskemetoder',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example3: BFFDataRecordData = {
  output: {
    recordInfo: {
      validationType: {
        value: 'publication_report',
      },
      dataDivider: {
        value: 'divaData',
      },
      recordContentSource: {
        value: 'havochvatten',
      },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: {
        value: 'diva-output:2248346820996543',
      },
      type: {
        value: 'diva-output',
      },
      createdBy: {
        value: '161616',
      },
      tsCreated: {
        value: '2025-03-03T16:45:30.246801Z',
      },
      updated: [
        {
          tsUpdated: {
            value: '2025-03-03T16:45:30.246801Z',
          },
          updatedBy: {
            value: '161616',
          },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'vet',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Mikroplaster i svenska vattendrag: Förekomst, spridning och åtgärder',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: {
        year: {
          value: '2024',
        },
      },
    },
    admin: {
      reviewed: {
        value: 'true',
      },
    },
    adminInfo: {
      visibility: {
        value: 'published',
      },
    },
    name_type_personal: [
      {
        namePart_type_given: [
          {
            value: 'Erik',
            _type: 'given',
          },
        ],
        namePart_type_family: [
          {
            value: 'Lindström',
            _type: 'family',
          },
        ],
        _type: 'personal',
      },
    ],
    subject: [
      {
        topic: {
          value: 'mikroplaster, vattendrag, miljöförorening, åtgärder',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example4: BFFDataRecordData = {
  mine: true,
  readyForReview: true,
  output: {
    recordInfo: {
      validationType: { value: 'publication_report' },
      dataDivider: { value: 'divaData' },
      recordContentSource: { value: 'havochvatten' },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: { value: 'diva-output:2248457931107654' },
      type: { value: 'diva-output' },
      createdBy: { value: '161616' },
      tsCreated: { value: '2025-03-03T17:30:15.123456Z' },
      updated: [
        {
          tsUpdated: { value: '2025-03-03T17:30:15.123456Z' },
          updatedBy: { value: '161616' },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'vet',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Havsnivåhöjningens effekter på svenska kustsamhällen: En framtidsprognos',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: { year: { value: '2024' } },
    },
    admin: { reviewed: { value: 'true' } },
    adminInfo: { visibility: { value: 'published' } },
    name_type_personal: [
      {
        namePart_type_given: [{ value: 'Maria', _type: 'given' }],
        namePart_type_family: [{ value: 'Svensson', _type: 'family' }],
        _type: 'personal',
      },
    ],
    subject: [
      {
        topic: {
          value:
            'havsnivåhöjning, kustsamhällen, klimatanpassning, framtidsprognos',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example5 = {
  output: {
    recordInfo: {
      validationType: { value: 'publication_report' },
      dataDivider: { value: 'divaData' },
      recordContentSource: { value: 'havochvatten' },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: { value: 'diva-output:2248568042218765' },
      type: { value: 'diva-output' },
      createdBy: { value: '161616' },
      tsCreated: { value: '2025-03-03T18:45:30.987654Z' },
      updated: [
        {
          tsUpdated: { value: '2025-03-03T18:45:30.987654Z' },
          updatedBy: { value: '161616' },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'ref',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value: 'Övergödning i Östersjön: Nulägesanalys och åtgärdsförslag',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: { year: { value: '2025' } },
    },
    admin: { reviewed: { value: 'true' } },
    adminInfo: { visibility: { value: 'published' } },
    name_type_corporate: [
      {
        namePart: [{ value: 'Havs- och vattenmyndigheten' }],
        _type: 'corporate',
      },
    ],
    subject: [
      {
        topic: {
          value: 'övergödning, Östersjön, vattenkvalitet, miljöåtgärder',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example6: BFFDataRecordData = {
  mine: true,
  output: {
    recordInfo: {
      validationType: { value: 'publication_report' },
      dataDivider: { value: 'divaData' },
      recordContentSource: { value: 'havochvatten' },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: { value: 'diva-output:2248679153329876' },
      type: { value: 'diva-output' },
      createdBy: { value: '161616' },
      tsCreated: { value: '2025-03-03T19:20:45.246801Z' },
      updated: [
        {
          tsUpdated: { value: '2025-03-03T19:20:45.246801Z' },
          updatedBy: { value: '161616' },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'vet',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Invasiva främmande arter i svenska vattenmiljöer: Kartläggning och hantering',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: { year: { value: '2024' } },
    },
    admin: { reviewed: { value: 'true' } },
    adminInfo: { visibility: { value: 'published' } },
    name_type_personal: [
      {
        namePart_type_given: [{ value: 'Anders', _type: 'given' }],
        namePart_type_family: [{ value: 'Nilsson', _type: 'family' }],
        _type: 'personal',
      },
    ],
    subject: [
      {
        topic: {
          value:
            'invasiva arter, vattenmiljöer, ekologisk påverkan, artbevarande',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example7: BFFDataRecordData = {
  readyForReview: true,
  output: {
    recordInfo: {
      validationType: { value: 'publication_report' },
      dataDivider: { value: 'divaData' },
      recordContentSource: { value: 'havochvatten' },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: { value: 'diva-output:2248790264430987' },
      type: { value: 'diva-output' },
      createdBy: { value: '161616' },
      tsCreated: { value: '2025-03-03T20:10:30.135792Z' },
      updated: [
        {
          tsUpdated: { value: '2025-03-03T20:10:30.135792Z' },
          updatedBy: { value: '161616' },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'ref',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Hållbar vattenförvaltning i urbana miljöer: Utmaningar och lösningar',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: { year: { value: '2025' } },
    },
    admin: { reviewed: { value: 'true' } },
    adminInfo: { visibility: { value: 'published' } },
    name_type_corporate: [
      {
        namePart: [{ value: 'Havs- och vattenmyndigheten' }],
        _type: 'corporate',
      },
    ],
    subject: [
      {
        topic: {
          value:
            'vattenförvaltning, urbana miljöer, hållbarhet, dagvattenhantering',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example8: BFFDataRecordData = {
  output: {
    recordInfo: {
      validationType: { value: 'publication_report' },
      dataDivider: { value: 'divaData' },
      recordContentSource: { value: 'havochvatten' },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: { value: 'diva-output:2248901375542098' },
      type: { value: 'diva-output' },
      createdBy: { value: '161616' },
      tsCreated: { value: '2025-03-03T21:05:15.864209Z' },
      updated: [
        {
          tsUpdated: { value: '2025-03-03T21:05:15.864209Z' },
          updatedBy: { value: '161616' },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'vet',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Marin förnybar energi: Möjligheter och miljökonsekvenser i svenska vatten',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: { year: { value: '2024' } },
    },
    admin: { reviewed: { value: 'true' } },
    adminInfo: { visibility: { value: 'published' } },
    name_type_personal: [
      {
        namePart_type_given: [{ value: 'Emma', _type: 'given' }],
        namePart_type_family: [{ value: 'Karlsson', _type: 'family' }],
        _type: 'personal',
      },
    ],
    subject: [
      {
        topic: {
          value:
            'marin energi, förnybar energi, miljöpåverkan, havsbaserad vindkraft',
        },
        _lang: 'swe',
      },
    ],
  },
};

const example9: BFFDataRecordData = {
  output: {
    recordInfo: {
      validationType: { value: 'publication_report' },
      dataDivider: { value: 'divaData' },
      recordContentSource: { value: 'havochvatten' },
      genre_type_outputType: {
        value: 'publication_report',
        _type: 'outputType',
      },
      id: { value: 'diva-output:2249012486653109' },
      type: { value: 'diva-output' },
      createdBy: { value: '161616' },
      tsCreated: { value: '2025-03-03T22:00:00.753951Z' },
      updated: [
        {
          tsUpdated: { value: '2025-03-03T22:00:00.753951Z' },
          updatedBy: { value: '161616' },
        },
      ],
    },
    language: [
      {
        'languageTerm_authority_iso639-2b_type_code': {
          value: 'swe',
          _authority: 'iso639-2b',
          _type: 'code',
        },
      },
    ],
    genre_type_contentType: {
      value: 'ref',
      _type: 'contentType',
    },
    titleInfo: {
      title: {
        value:
          'Fiskevård i svenska insjöar: Strategier för hållbart sportfiske',
      },
      _lang: 'swe',
    },
    originInfo: {
      dateIssued: { year: { value: '2025' } },
    },
    admin: { reviewed: { value: 'true' } },
    adminInfo: { visibility: { value: 'published' } },
    name_type_corporate: [
      {
        namePart: [{ value: 'Havs- och vattenmyndigheten' }],
        _type: 'corporate',
      },
    ],
    subject: [
      {
        topic: { value: 'fiskevård, insjöar, sportfiske, hållbar förvaltning' },
        _lang: 'swe',
      },
    ],
  },
};

const wrappedExample1: BFFDataRecord = {
  id: 'diva-output:2248124598774321',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T14:15:22.123456Z',
  createdBy: '161616',
  data: example1,
};

const wrappedExample2: BFFDataRecord = {
  id: 'diva-output:2248235709885432',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T15:30:45.987654Z',
  createdBy: '161616',
  data: example2,
};

const wrappedExample3: BFFDataRecord = {
  id: 'diva-output:2248346820996543',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T16:45:30.246801Z',
  createdBy: '161616',
  data: example3,
};

const wrappedExample4: BFFDataRecord = {
  id: 'diva-output:2248457931107654',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T17:30:15.123456Z',
  createdBy: '161616',
  data: example4,
};

const wrappedExample5: BFFDataRecord = {
  id: 'diva-output:2248568042218765',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T18:45:30.987654Z',
  createdBy: '161616',
  data: example5,
};

const wrappedExample6: BFFDataRecord = {
  id: 'diva-output:2248679153329876',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T19:20:45.246801Z',
  createdBy: '161616',
  data: example6,
};

const wrappedExample7: BFFDataRecord = {
  id: 'diva-output:2248790264430987',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T20:10:30.135792Z',
  createdBy: '161616',
  data: example7,
};

const wrappedExample8: BFFDataRecord = {
  id: 'diva-output:2248901375542098',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T21:05:15.864209Z',
  createdBy: '161616',
  data: example8,
};

const wrappedExample9: BFFDataRecord = {
  id: 'diva-output:2249012486653109',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-03-03T22:00:00.753951Z',
  createdBy: '161616',
  data: example9,
};

export const fakeRecords = [
  wrappedExample1,
  wrappedExample2,
  wrappedExample3,
  wrappedExample4,
  wrappedExample5,
  wrappedExample6,
  wrappedExample7,
  wrappedExample8,
  wrappedExample9,
];
