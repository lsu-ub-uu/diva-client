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

import type { DivaOutput, DivaOutputGroup } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { DivaOutputSearchResult } from '../DivaOutputSearchResult';

describe('DivaOutputSearchResult', () => {
  it('shows heading and date', () => {
    const record = {
      data: {
        output: {
          originInfo: {
            dateIssued: {
              year: {
                value: '2015',
                __text: {
                  sv: 'År',
                  en: 'Year',
                },
              },
              __text: {
                sv: 'Utgivningsdatum',
                en: 'Date of issue',
              },
            },
            __text: {
              sv: 'Tillkomstinformation',
              en: 'Origin information',
            },
          },
          titleInfo: {
            title: {
              value: 'Some title for the article',
              __text: {
                sv: 'Huvudtitel',
                en: 'Main title',
              },
            },
            __text: {
              sv: 'Titel',
              en: 'Title',
            },
            _lang: 'afr',
          },
          __text: {
            sv: 'DiVA-output',
            en: 'DiVA-output',
          },
        } as DivaOutputGroup,
      },
    } as BFFDataRecord<DivaOutput>;
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
  });

  it('shows binary', () => {
    const record = {
      data: {
        output: {
          attachments: {
            attachment: [
              {
                file: {
                  value: 'binary:25405698184842996',
                  linkedRecord: {
                    binary: {
                      master: {
                        master: {
                          name: 'master',
                          mimeType: 'application/pdf',
                          id: 'binary:25405698184842996',
                        },
                      },
                      thumbnail: {
                        thumbnail: {
                          name: 'thumbnail',
                          mimeType: 'image/jpeg',
                          id: 'binary:25405698184842996',
                        },
                      },
                    },
                  },
                },
                __text: {
                  sv: 'Bifogad fil',
                  en: 'Attachment file',
                },
              },
            ],
          },
          __text: {
            sv: 'DiVA-output',
            en: 'DiVA-output',
          },
        } as DivaOutputGroup,
      },
    } as BFFDataRecord<DivaOutput>;
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <DivaOutputSearchResult searchResult={record} />,
      },
    ]);

    render(<RoutesStub />);

    const attachmentLink = screen.getByRole('link', {
      name: 'Attachment file',
    });
    expect(attachmentLink).toHaveAttribute(
      'href',
      '/binary/binary:25405698184842996/master',
    );
    expect(attachmentLink.querySelector('img')).toHaveAttribute(
      'src',
      '/binary/binary:25405698184842996/thumbnail',
    );
  });

  it('shows authors', () => {
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
          name_type_personal: [
            {
              role: [
                {
                  __text: {
                    sv: 'Roller',
                    en: 'Roles',
                  },

                  roleTerm: {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                  },
                },
              ],
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
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
            },
            {
              role: [
                {
                  roleTerm: {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                  },

                  __text: {
                    sv: 'Roller',
                    en: 'Roles',
                  },
                },
              ],
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
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '1',
            },
            {
              role: [
                {
                  roleTerm: {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                  },

                  __text: {
                    sv: 'Roller',
                    en: 'Roles',
                  },
                },
              ],
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
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '2',
            },
            {
              role: [
                {
                  roleTerm: {
                    value: 'aut',
                    __valueText: {
                      en: 'Author',
                      sv: 'Författare',
                    },
                    __text: {
                      sv: 'Roll',
                      en: 'Role',
                    },
                  },

                  __text: {
                    sv: 'Roller',
                    en: 'Roles',
                  },
                },
              ],
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
              },
              __text: {
                sv: 'Författare, redaktör eller annan roll',
                en: 'Author, editor or other role',
              },
              _type: 'personal',
              repeatId: '3',
            },
          ],
        } as DivaOutputGroup,
      },
    } as BFFDataRecord<DivaOutput>;
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <DivaOutputSearchResult searchResult={record} />,
      },
    ]);

    render(<RoutesStub />);

    const author1 = screen.getByText('Sidhant Chaudhary');
    expect(author1).toBeInTheDocument();
    const author2 = screen.getByText('Edoardo Piombo');
    expect(author2).toBeInTheDocument();
    const author3 = screen.getByText('Mukesh Dubey');
    expect(author3).toBeInTheDocument();
    const author4 = screen.queryByText('Dan Funck Jensen');
    expect(author4).not.toBeInTheDocument();
  });

  it('shows related book when linked', () => {
    const record = {
      data: {
        output: {
          relatedItem_type_book: {
            __text: { en: 'Part of book' },
            book: {
              linkedRecord: {
                output: {
                  titleInfo: {
                    title: { value: 'Related Book Title' },
                    subtitle: { value: 'Related Book Subtitle' },
                  },
                },
              },
            },
          },
        },
      },
    } as BFFDataRecord<DivaOutput>;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <DivaOutputSearchResult searchResult={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByText('Part of book:')).toBeVisible();
    expect(
      screen.getByText('Related Book Title: Related Book Subtitle'),
    ).toBeVisible();
  });

  it('shows related book when freetext', () => {
    const record = {
      data: {
        output: {
          relatedItem_type_book: {
            __text: { en: 'Part of book' },
            titleInfo: {
              title: { value: 'Related Book Title' },
              subtitle: { value: 'Related Book Subtitle' },
            },
          },
        },
      },
    } as BFFDataRecord<DivaOutput>;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <DivaOutputSearchResult searchResult={record} />,
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByText('Part of book:')).toBeVisible();
    expect(
      screen.getByText('Related Book Title: Related Book Subtitle'),
    ).toBeVisible();
  });
});
