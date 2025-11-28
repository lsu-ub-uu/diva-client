import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OutputView } from '../OutputView';
import type { DivaOutput } from '@/generatedTypes/divaTypes';

describe('OutputView', () => {
  it('renders minimal output', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
      },
    } as DivaOutput;
    render(<OutputView data={mockData} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'divaClient_missingTitleText',
    );
    expect(screen.getByText('12345')).toBeInTheDocument();
  });

  it('shows publication title', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        titleInfo: {
          title: { value: 'Test Publication Title' },
          subtitle: { value: 'Subtitle' },
          _lang: 'eng',
        },
      },
    } as DivaOutput;
    render(<OutputView data={mockData} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Publication Title: Subtitle',
    );
  });

  it('shows persons', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        name_type_personal: [
          {
            __text: { en: 'Author' },
            namePart_type_family: { value: 'Doe' },
            namePart_type_given: { value: 'John' },
          },
          {
            __text: { en: 'Author' },
            namePart_type_family: { value: 'Smith' },
            namePart_type_given: { value: 'Jane' },
          },
        ],
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('shows organisations', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        name_type_corporate: [
          {
            __text: { en: 'Organization' },
            namePart: { value: 'University A' },
          },
          {
            __text: { en: 'Organization' },
            namePart: { value: 'Institute B' },
          },
        ],
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('University A')).toBeInTheDocument();
    expect(screen.getByText('Institute B')).toBeInTheDocument();
  });

  it('shows creator count', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        note_type_creatorCount: {
          __text: { en: 'Number of creators' },
          value: '3',
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Number of creators')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows alternative titles', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        titleInfo_type_alternative: [
          {
            title: { value: 'Alt Title 1' },
            subtitle: { value: 'Alt Subtitle 1' },
            _lang: 'swe',
            __text: { en: 'Alternative title' },
          },
          {
            title: { value: 'Alt Title 2' },
            _lang: 'eng',
            __text: { en: 'Alternative title' },
          },
        ],
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(
      screen.getByText('Alternative title (sweLangItemText)'),
    ).toBeInTheDocument();
    expect(screen.getByText('Alt Title 1: Alt Subtitle 1')).toBeInTheDocument();
    expect(
      screen.getByText('Alternative title (engLangItemText)'),
    ).toBeInTheDocument();
    expect(screen.getByText('Alt Title 2')).toBeInTheDocument();
  });

  it('shows output type', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        genre_type_outputType: {
          __text: { en: 'Output type' },
          __valueText: { en: 'Thesis' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Output type')).toBeInTheDocument();
    expect(screen.getByText('Thesis')).toBeInTheDocument();
  });

  it('shows output subcategory', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        genre_type_subcategory: {
          __text: { en: 'Subcategory' },
          __valueText: { en: 'Bachelor Thesis' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Bachelor Thesis')).toBeInTheDocument();
  });

  it('shows languages', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        language: [
          {
            'languageTerm_authority_iso639-2b_type_code': {
              __text: { en: 'Language' },
              __valueText: { en: 'English' },
            },
          },
          {
            'languageTerm_authority_iso639-2b_type_code': {
              __text: { en: 'Language' },
              __valueText: { en: 'Swedish' },
            },
          },
        ],
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Swedish')).toBeInTheDocument();
  });

  it('shows output type', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        artisticWork_type_outputType: {
          __text: { en: 'Artistic work type' },
          __valueText: { en: 'Painting' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Artistic work type')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
  });

  it('shows genre', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        genre_type_contentType: {
          __text: { en: 'Content type' },
          __valueText: { en: 'Fiction' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Content type')).toBeInTheDocument();
    expect(screen.getByText('Fiction')).toBeInTheDocument();
  });

  it('shows abstracts', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        abstract: [
          {
            __text: { en: 'Abstract' },
            value: 'This is an abstract.',
            _lang: 'eng',
          },
          {
            __text: { en: 'Abstract' },
            value: 'Detta är en sammanfattning.',
            _lang: 'swe',
          },
        ],
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Abstract (engLangItemText)')).toBeInTheDocument();
    expect(screen.getByText('This is an abstract.')).toBeInTheDocument();
    expect(screen.getByText('Abstract (sweLangItemText)')).toBeInTheDocument();
    expect(screen.getByText('Detta är en sammanfattning.')).toBeInTheDocument();
  });

  it('shows publication status note', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        note_type_publicationStatus: {
          __text: { en: 'Publication status' },
          __valueText: { en: 'Published' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Publication status')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('shows number of pages', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        physicalDescription: {
          extent_unit_pages: {
            __text: { en: 'Number of pages' },
            value: '150',
          },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Number of pages')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('shows conference', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        relatedItem_type_conference: {
          __text: { en: 'Conference' },
          conference: { value: 'International Conference on Testing' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Conference')).toBeInTheDocument();
    expect(
      screen.getByText('International Conference on Testing'),
    ).toBeInTheDocument();
  });

  it('shows publication channel', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        relatedItem_type_publicationChannel: {
          __text: { en: 'Publication channel' },
          publicationChannel: { value: 'Science Journal' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Publication channel')).toBeInTheDocument();
    expect(screen.getByText('Science Journal')).toBeInTheDocument();
  });

  it('shows sfo initiatives', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        relatedItem_type_initiative: {
          __text: { en: 'Initiative' },
          sfo: [
            {
              __valueText: { en: 'Initiative 1' },
            },
            {
              __valueText: { en: 'Initiative 2' },
            },
          ],
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Initiative')).toBeInTheDocument();
    expect(screen.getByText('Initiative 1')).toBeInTheDocument();
    expect(screen.getByText('Initiative 2')).toBeInTheDocument();
  });

  it('shows patent date', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        dateOther_type_patent: {
          __text: { en: 'Patent date' },
          year: { value: '2021' },
          month: { value: '12' },
          day: { value: '05' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Patent date')).toBeInTheDocument();
    expect(screen.getByText('2021-12-05')).toBeInTheDocument();
  });

  it('shows patent holder', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        patentHolder_type_corporate: {
          __text: { en: 'Patent holder' },
          namePart: { value: 'Patent Corp' },
        },
      },
    } as DivaOutput;
    render(<OutputView data={mockData} />);

    expect(screen.getByText('Patent holder')).toBeInTheDocument();
    expect(screen.getByText('Patent Corp')).toBeInTheDocument();
  });

  it('shows patent country', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        patentCountry: {
          __text: { en: 'Patent country' },
          __valueText: { en: 'Sweden' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Patent country')).toBeInTheDocument();
    expect(screen.getByText('Sweden')).toBeInTheDocument();
  });

  it('shows urls', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        location: [
          {
            __text: { en: 'Location' },
            url: { value: 'http://example.com' },
            displayLabel: { value: 'Some link' },
          },
          {
            __text: { en: 'Location' },
            url: { value: 'http://example.org' },
            displayLabel: { value: 'Another link' },
          },
        ],
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByRole('link', { name: 'Some link' })).toHaveAttribute(
      'href',
      'http://example.com',
    );
    expect(screen.getByRole('link', { name: 'Another link' })).toHaveAttribute(
      'href',
      'http://example.org',
    );
  });

  it('shows order link', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        location_displayLabel_orderLink: {
          __text: { en: 'Order link' },
          url: { value: 'http://orderlink.com' },
          displayLabel: { value: 'Order here' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByRole('link', { name: 'Order here' })).toHaveAttribute(
      'href',
      'http://orderlink.com',
    );
  });

  it('shows external note', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        note_type_external: {
          __text: { en: 'External note' },
          value: 'This is an external note.',
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('External note')).toBeInTheDocument();
    expect(screen.getByText('This is an external note.')).toBeInTheDocument();
  });

  it('shows internal note', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        adminInfo: {
          note_type_internal: {
            __text: { en: 'Internal note' },
            value: 'This is an internal note.',
          },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Internal note')).toBeInTheDocument();
    expect(screen.getByText('This is an internal note.')).toBeInTheDocument();
  });

  it('shows data quality', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        dataQuality: {
          __text: { en: 'Data quality' },
          __valueText: { en: 'High' },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Data quality')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('shows failed', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        adminInfo: {
          failed: { __text: { en: 'Failed' }, __valueText: { en: 'True' } },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('True')).toBeInTheDocument();
  });

  it('shows reviewed', () => {
    const mockData = {
      output: {
        recordInfo: { id: { value: '12345' } },
        adminInfo: {
          reviewed: { __text: { en: 'Reviewed' }, __valueText: { en: 'Yes' } },
        },
      },
    } as DivaOutput;

    render(<OutputView data={mockData} />);

    expect(screen.getByText('Reviewed')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });
});
