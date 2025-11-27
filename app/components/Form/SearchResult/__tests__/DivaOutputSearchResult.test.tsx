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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DivaOutputSearchResult } from '../DivaOutputSearchResult';
import type { BFFDataRecord } from '@/types/record';
import { createRoutesStub } from 'react-router';

describe('DivaOutputSearchResult', () => {
  it('renders', () => {
    const record = {
      id: 'diva-output:25405502822621065',
      recordType: 'diva-output',
      validationType: 'publication_journal-article',
      createdAt: '2025-11-26T13:42:49.939579Z',
      createdBy: '161616',
      updated: [
        {
          updateAt: '2025-11-26T13:46:28.214376Z',
          updatedBy: '161616',
        },
      ],
      userRights: ['read', 'update', 'index', 'delete'],
      actionLinks: {
        read: {
          requestMethod: 'GET',
          rel: 'read',
          url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/diva-output/diva-output:25405502822621065',
          accept: 'application/vnd.cora.record+json',
        },
      },
      data: {
        output: {
          attachment: [
            {
              adminInfo: {
                availability: {
                  value: 'archiveOnly',
                  __valueText: {
                    en: 'Archive only',
                    sv: 'Endast arkivering',
                  },
                  __text: {
                    sv: 'Filens synlighet',
                    en: 'File visibility',
                  },
                  required: true,
                },
                __text: {
                  sv: 'Administrativ filinformation',
                  en: 'Administrative file information',
                },
                required: true,
              },
              note_type_attachmentVersion: {
                value: 'submitted',
                __valueText: {
                  en: 'Submitted',
                  sv: 'Inskickad',
                },
                __text: {
                  sv: 'Version av filen som görs tillgänglig i DiVA',
                  en: 'Version of the file made available in DiVA',
                },
                _type: 'attachmentVersion',
                required: true,
              },
              type: {
                value: 'fullText',
                __valueText: {
                  en: 'Full text',
                  sv: 'Fulltext',
                },
                __text: {
                  sv: 'Typ',
                  en: 'Type',
                },
                required: true,
              },
              attachmentFile: {
                value: 'binary:25405698184842996',
                linkedRecord: {
                  binary: {
                    recordInfo: {
                      dataDivider: {
                        value: 'divaData',
                        __text: {
                          sv: 'Datadelare',
                          en: 'Data divider',
                        },
                        required: true,
                      },
                      validationType: {
                        value: 'genericBinary',
                        __text: {
                          sv: 'Valideringstyp',
                          en: 'Validation type',
                        },
                        required: true,
                      },
                      visibility: {
                        value: 'unpublished',
                        __valueText: {
                          en: 'Unpublished',
                          sv: 'Opublicerad',
                          no: 'Upublisert',
                        },
                        __text: {
                          no: 'Postens synlighet',
                          sv: 'Postens synlighet',
                          en: 'Visibility of the record',
                        },
                        required: true,
                      },
                      id: {
                        value: 'binary:25405698184842996',
                        __text: {
                          no: 'Id',
                          sv: 'Id',
                          en: 'Id',
                        },
                        required: true,
                      },
                      type: {
                        value: 'binary',
                        __text: {
                          no: '',
                          sv: 'Posttyp',
                          en: 'RecordType',
                        },
                      },
                      createdBy: {
                        value: '161616',
                        __text: {
                          sv: 'Text för:createdByLinkText',
                          en: 'Text for:createdByLinkText',
                        },
                      },
                      tsCreated: {
                        value: '2025-11-26T13:46:05.301792Z',
                        __text: {
                          sv: 'Tidsstämpel för när posten skapades',
                          en: 'Timestamp for when the record was created',
                        },
                      },
                      updated: [
                        {
                          tsUpdated: {
                            value: '2025-11-26T13:46:12.643329Z',
                            __text: {
                              sv: 'Uppdateringstid',
                              en: 'Update time',
                            },
                            required: true,
                          },
                          updatedBy: {
                            value: '141414',
                            __text: {
                              no: 'Oppdatert av',
                              sv: 'Uppdaterad av',
                              en: 'Updated by',
                            },
                            required: true,
                          },
                          __text: {
                            sv: 'Uppdatering',
                            en: 'Update',
                          },
                          repeatId: '0',
                        },
                      ],
                      tsVisibility: {
                        value: '2025-11-26T13:46:05.301332Z',
                        __text: {
                          no: 'Tidsstempel for endring av synlighetsverdi',
                          sv: 'Tidsstämpel för ändring av synlighetsvärde',
                          en: 'Timestamp for visibility value update',
                        },
                      },
                      __text: {
                        sv: 'Postinformation',
                        en: 'Record info',
                      },
                      required: true,
                    },
                    master: {
                      resourceId: {
                        value: 'binary:25405698184842996-master',
                        __text: {
                          sv: 'Resurs ID',
                          en: 'Resource ID',
                        },
                        required: true,
                      },
                      master: {
                        name: 'master',
                        mimeType: 'application/pdf',
                        id: 'binary:25405698184842996',
                        __text: {
                          sv: 'Resurslänk',
                          en: 'Resource link',
                        },
                        required: true,
                      },
                      fileSize: {
                        value: '8628357',
                        __text: {
                          sv: 'Filstorlek',
                          en: 'File size',
                        },
                        required: true,
                      },
                      mimeType: {
                        value: 'application/pdf',
                        __text: {
                          sv: 'Mimetype',
                          en: 'Mimetype',
                        },
                        required: true,
                      },
                      checksum: {
                        value:
                          '9584d3a54bd1a7003519f7de07006f837ab4e43cbed9a0c2872174b2d7a3c329aa26ef8d5ec2eca3c26b0d6fcdb6057e38becf878763608a8346a8923c1d8cfb',
                        __text: {
                          sv: 'Checksum',
                          en: 'Checksum',
                        },
                      },
                      checksumType: {
                        value: 'SHA-512',
                        final: true,
                        __text: {
                          sv: 'Checksum typ',
                          en: 'Checksum type',
                        },
                      },
                      originalFileName: {
                        value: 'FULLTEXT01.pdf',
                        __text: {
                          sv: 'Originalfilnamn',
                          en: 'Original filename',
                        },
                        required: true,
                      },
                      __text: {
                        sv: 'Master',
                        en: 'Master',
                      },
                    },
                    large: {
                      resourceId: {
                        value:
                          '/tmp/sharedFileStorage/diva/streams/divaData/61d/a3c/2de/61da3c2dee8571c221e45b6f6d4965f2b092e36fec545efeb9f27fe3b95a1732/binary:binary:25405698184842996-large',
                        __text: {
                          sv: 'Resurs ID',
                          en: 'Resource ID',
                        },
                        required: true,
                      },
                      large: {
                        name: 'large',
                        mimeType: 'image/jpeg',
                        id: 'binary:25405698184842996',
                        __text: {
                          sv: 'Resurslänk',
                          en: 'Resource link',
                        },
                        required: true,
                      },
                      fileSize: {
                        value: '85151',
                        __text: {
                          sv: 'Filstorlek',
                          en: 'File size',
                        },
                        required: true,
                      },
                      mimeType: {
                        value: 'image/jpeg',
                        __text: {
                          sv: 'Mimetype',
                          en: 'Mimetype',
                        },
                        required: true,
                      },
                      height: {
                        value: '788',
                        __text: {
                          sv: 'Höjd',
                          en: 'Height',
                        },
                        required: true,
                      },
                      width: {
                        value: '600',
                        __text: {
                          sv: 'Bredd',
                          en: 'Width',
                        },
                        required: true,
                      },
                      __text: {
                        sv: 'Stor',
                        en: 'Large',
                      },
                    },
                    medium: {
                      resourceId: {
                        value:
                          '/tmp/sharedFileStorage/diva/streams/divaData/61d/a3c/2de/61da3c2dee8571c221e45b6f6d4965f2b092e36fec545efeb9f27fe3b95a1732/binary:binary:25405698184842996-medium',
                        __text: {
                          sv: 'Resurs ID',
                          en: 'Resource ID',
                        },
                        required: true,
                      },
                      medium: {
                        name: 'medium',
                        mimeType: 'image/jpeg',
                        id: 'binary:25405698184842996',
                        __text: {
                          sv: 'Resurslänk',
                          en: 'Resource link',
                        },
                        required: true,
                      },
                      fileSize: {
                        value: '28236',
                        __text: {
                          sv: 'Filstorlek',
                          en: 'File size',
                        },
                        required: true,
                      },
                      mimeType: {
                        value: 'image/jpeg',
                        __text: {
                          sv: 'Mimetype',
                          en: 'Mimetype',
                        },
                        required: true,
                      },
                      height: {
                        value: '394',
                        __text: {
                          sv: 'Höjd',
                          en: 'Height',
                        },
                        required: true,
                      },
                      width: {
                        value: '300',
                        __text: {
                          sv: 'Bredd',
                          en: 'Width',
                        },
                        required: true,
                      },
                      __text: {
                        sv: 'Medium',
                        en: 'Medium',
                      },
                    },
                    thumbnail: {
                      resourceId: {
                        value:
                          '/tmp/sharedFileStorage/diva/streams/divaData/61d/a3c/2de/61da3c2dee8571c221e45b6f6d4965f2b092e36fec545efeb9f27fe3b95a1732/binary:binary:25405698184842996-thumbnail',
                        __text: {
                          sv: 'Resurs ID',
                          en: 'Resource ID',
                        },
                        required: true,
                      },
                      thumbnail: {
                        name: 'thumbnail',
                        mimeType: 'image/jpeg',
                        id: 'binary:25405698184842996',
                        __text: {
                          sv: 'Resurslänk',
                          en: 'Resource link',
                        },
                        required: true,
                      },
                      fileSize: {
                        value: '8841',
                        __text: {
                          sv: 'Filstorlek',
                          en: 'File size',
                        },
                        required: true,
                      },
                      mimeType: {
                        value: 'image/jpeg',
                        __text: {
                          sv: 'Mimetype',
                          en: 'Mimetype',
                        },
                        required: true,
                      },
                      height: {
                        value: '131',
                        __text: {
                          sv: 'Höjd',
                          en: 'Height',
                        },
                        required: true,
                      },
                      width: {
                        value: '100',
                        __text: {
                          sv: 'Bredd',
                          en: 'Width',
                        },
                        required: true,
                      },
                      __text: {
                        sv: 'Thumbnail',
                        en: 'Thumbnail',
                      },
                    },
                    __text: {
                      sv: 'Binär',
                      en: 'Binary',
                    },
                    _type: 'document',
                  },
                },
                __text: {
                  sv: 'Bifogad fil',
                  en: 'Attachment file',
                },
                required: true,
              },
              __text: {
                sv: 'Fil',
                en: 'File',
              },
              repeatId: '0',
            },
          ],
          originInfo: {
            dateIssued: {
              year: {
                value: '2015',
                __text: {
                  sv: 'År',
                  en: 'Year',
                },
                required: true,
              },
              __text: {
                sv: 'Utgivningsdatum',
                en: 'Date of issue',
              },
              required: true,
            },
            __text: {
              sv: 'Tillkomstinformation',
              en: 'Origin information',
            },
            required: true,
          },
          name_type_personal: [
            {
              role: {
                roleTerm: [
                  {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                    required: true,
                    repeatId: '0',
                  },
                ],
                __text: {
                  sv: 'Roller',
                  en: 'Roles',
                },
                required: true,
              },
              namePart_type_given: {
                value: 'Sidhant',
                __text: {
                  sv: 'Förnamn',
                  en: 'Given name',
                },
                _type: 'given',
              },
              namePart_type_family: {
                value: 'Chaudhary',
                __text: {
                  sv: 'Efternamn',
                  en: 'Family name',
                },
                _type: 'family',
                required: true,
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '0',
            },
            {
              role: {
                roleTerm: [
                  {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                    required: true,
                    repeatId: '0',
                  },
                ],
                __text: {
                  sv: 'Roller',
                  en: 'Roles',
                },
                required: true,
              },
              namePart_type_given: {
                value: 'Edoardo',
                __text: {
                  sv: 'Förnamn',
                  en: 'Given name',
                },
                _type: 'given',
              },
              namePart_type_family: {
                value: 'Piombo',
                __text: {
                  sv: 'Efternamn',
                  en: 'Family name',
                },
                _type: 'family',
                required: true,
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '1',
            },
            {
              role: {
                roleTerm: [
                  {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                    required: true,
                    repeatId: '0',
                  },
                ],
                __text: {
                  sv: 'Roller',
                  en: 'Roles',
                },
                required: true,
              },
              namePart_type_given: {
                value: 'Mukesh',
                __text: {
                  sv: 'Förnamn',
                  en: 'Given name',
                },
                _type: 'given',
              },
              namePart_type_family: {
                value: 'Dubey',
                __text: {
                  sv: 'Efternamn',
                  en: 'Family name',
                },
                _type: 'family',
                required: true,
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '2',
            },
            {
              role: {
                roleTerm: [
                  {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                    required: true,
                    repeatId: '0',
                  },
                ],
                __text: {
                  sv: 'Roller',
                  en: 'Roles',
                },
                required: true,
              },
              namePart_type_given: {
                value: 'Dan Funck',
                __text: {
                  sv: 'Förnamn',
                  en: 'Given name',
                },
                _type: 'given',
              },
              namePart_type_family: {
                value: 'Jensen',
                __text: {
                  sv: 'Efternamn',
                  en: 'Family name',
                },
                _type: 'family',
                required: true,
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '3',
            },
          ],
          titleInfo: {
            title: {
              value: 'Some title for the article',
              __text: {
                sv: 'Huvudtitel',
                en: 'Main title',
              },
              required: true,
            },
            __text: {
              sv: 'Titel',
              en: 'Title',
            },
            _lang: 'afr',
            required: true,
          },
          dataQuality: {
            value: '2026',
            __valueText: {
              en: 'DiVA-2026',
              sv: 'DiVA-2026',
            },
            __text: {
              sv: 'Datakvalitet',
              en: 'Data quality',
            },
            required: true,
          },
          __text: {
            sv: 'DiVA-output',
            en: 'DiVA-output',
          },
        },
      },
    } as BFFDataRecord;
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <DivaOutputSearchResult searchResult={record} />,
      },
    ]);

    render(<RoutesStub />);

    const heading = screen.getByRole('heading', {
      name: 'Some title for the article',
    });
    expect(heading).toBeInTheDocument();

    const year = screen.getByText('2015');
    expect(year).toBeInTheDocument();
    expect(year.getAttribute('dateTime')).toBe('2015');

    const dataQuality = screen.getByText('2026');
    expect(dataQuality).toBeInTheDocument();

    const author1 = screen.getByText('Sidhant Chaudhary');
    expect(author1).toBeInTheDocument();
    const author2 = screen.getByText('Edoardo Piombo');
    expect(author2).toBeInTheDocument();
    const author3 = screen.getByText('Mukesh Dubey');
    expect(author3).toBeInTheDocument();
    const author4 = screen.queryByText('Dan Funck Jensen');
    expect(author4).not.toBeInTheDocument();
  });

  it.each([['classic'], ['2026']])(
    'should show dataQuality correctly for %i',
    (quality) => {
      const record = {
        id: 'diva-output:25405502822621065',
        recordType: 'diva-output',
        validationType: 'publication_journal-article',
        createdAt: '2025-11-26T13:42:49.939579Z',
        createdBy: '161616',
        updated: [
          {
            updateAt: '2025-11-26T13:46:28.214376Z',
            updatedBy: '161616',
          },
        ],
        userRights: ['read', 'update', 'index', 'delete'],
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/diva-output/diva-output:25405502822621065',
            accept: 'application/vnd.cora.record+json',
          },
        },
        data: {
          output: {
            dataQuality: {
              value: quality,
              __valueText: {
                en: 'DiVA-2026',
                sv: 'DiVA-2026',
              },
              __text: {
                sv: 'Datakvalitet',
                en: 'Data quality',
              },
              required: true,
            },
            __text: {
              sv: 'DiVA-output',
              en: 'DiVA-output',
            },
          },
        },
      } as BFFDataRecord;
      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => <DivaOutputSearchResult searchResult={record} />,
        },
      ]);

      render(<RoutesStub />);
      const dataQuality = screen.getByText(quality);
      expect(dataQuality).toBeInTheDocument();
      const other = quality === 'classic' ? '2026' : 'classic';
      expect(screen.queryByText(other)).not.toBeInTheDocument();
    },
  );
});
