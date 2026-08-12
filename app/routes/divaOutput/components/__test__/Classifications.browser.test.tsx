import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Classifications } from '../Classifications';

vi.mock('@/i18n/useLanguage', () => ({
  useLanguage: () => 'en',
}));

const renderClassifications = async (output: DivaOutputGroup) => {
  const RoutesStub = createRoutesStub([
    {
      path: '/',
      id: 'root',
      Component: () => <Classifications output={output} />,
    },
    { path: '/diva-output' },
  ]);
  return render(<RoutesStub />);
};

const baseOutput: DivaOutputGroup = {
  recordInfo: {
    id: { value: '123' },
    type: { value: 'diva-output' },
    validationType: { value: 'diva-output' },
    dataDivider: { value: 'divaPreview' },
    createdBy: { value: 'system' },
    tsCreated: { value: '2024-01-01' },
    updated: [],
    permissionUnit: { value: 'uu' },
    visibility: { value: 'published' },
    inTrashBin: { value: 'false' },
    urn: { value: 'urn:nbn:se:uu:diva-123' },
  },
};

describe('Classifications', () => {
  it('renders keywords', async () => {
    const output: DivaOutputGroup = {
      ...baseOutput,
      subject: [
        {
          topic: { value: 'machine learning' },
          _lang: 'eng',
          __text: { sv: 'Nyckelord', en: 'Keywords' },
        },
        {
          topic: { value: 'deep learning' },
          _lang: 'eng',
        },
      ],
    };

    const screen = await renderClassifications(output);

    await expect
      .element(screen.getByRole('heading', { name: 'Keywords' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'machine learning' }))
      .toHaveAttribute(
        'href',
        '/diva-output?keywordsSearchTerm=machine learning',
      );
    await expect
      .element(screen.getByRole('link', { name: 'deep learning' }))
      .toHaveAttribute('href', '/diva-output?keywordsSearchTerm=deep learning');
  });

  it('renders SSIF classifications', async () => {
    const output: DivaOutputGroup = {
      ...baseOutput,
      classification_authority_ssif: [
        {
          value: '10201',
          _authority: 'ssif',
          __text: { sv: 'Klassifikation', en: 'Classification' },
          __valueText: {
            sv: '(10201) Datavetenskap',
            en: '(10201) Computer Sciences',
          },
        },
      ],
    };

    const screen = await renderClassifications(output);

    await expect
      .element(screen.getByRole('heading', { name: 'Classification' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'Computer Sciences' }))
      .toHaveAttribute('href', '/diva-output?ssifSearchTerm=10201');
  });

  it('renders DiVA subjects with linked record title', async () => {
    const output: DivaOutputGroup = {
      ...baseOutput,
      subject_authority_diva: {
        topic: [
          {
            value: '42',
            linkedRecord: {
              subject: {
                recordInfo: {
                  id: { value: '42' },
                  type: { value: 'diva-subject' },
                  validationType: { value: 'diva-subject' },
                  dataDivider: { value: 'divaData' },
                  createdBy: { value: 'system' },
                  tsCreated: { value: '2024-01-01' },
                  updated: [],
                  permissionUnit: { value: 'uu' },
                  inTrashBin: { value: 'false' },
                },
                authority: [
                  { topic: { value: 'AI Research' }, _lang: 'eng' },
                  { topic: { value: 'AI-forskning' }, _lang: 'swe' },
                ],
              },
            },
          },
        ],
        _authority: 'diva',
        __text: { sv: 'DiVA ämnesord', en: 'DiVA subjects' },
      },
    };

    const screen = await renderClassifications(output);

    await expect
      .element(screen.getByRole('heading', { name: 'DiVA subjects' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'AI Research' }))
      .toHaveAttribute(
        'href',
        '/diva-output?subjectLinkedRecordIdSearchTerm=diva-subject_42',
      );
  });

  it('renders SDG items from array', async () => {
    const output: DivaOutputGroup = {
      ...baseOutput,
      subject_authority_sdg: [
        {
          topic: {
            value: 'sdg4',
            __valueText: {
              sv: 'Mål 4: God utbildning',
              en: 'Goal 4: Quality Education',
            },
          },
          _authority: 'sdg',
          __text: { sv: 'Hållbarhetsmål', en: 'SDG' },
        },
        {
          topic: {
            value: 'sdg7',
            __valueText: {
              sv: 'Mål 7: Hållbar energi',
              en: 'Goal 7: Affordable and Clean Energy',
            },
          },
          _authority: 'sdg',
        },
      ],
    };

    const screen = await renderClassifications(output);

    await expect
      .element(screen.getByRole('heading', { name: 'SDG' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'Goal 4: Quality Education' }))
      .toHaveAttribute('href', '/diva-output?sdgSearchTerm=sdg4');
    await expect
      .element(
        screen.getByRole('link', {
          name: 'Goal 7: Affordable and Clean Energy',
        }),
      )
      .toHaveAttribute('href', '/diva-output?sdgSearchTerm=sdg7');
  });

  it('renders local labels', async () => {
    const output: DivaOutputGroup = {
      ...baseOutput,
      localLabel: [
        {
          value: '99',
          linkedRecord: {
            localLabel: {
              recordInfo: {
                id: { value: '99' },
                type: { value: 'diva-localLabel' },
                validationType: { value: 'diva-localLabel' },
                dataDivider: { value: 'divaData' },
                createdBy: { value: 'system' },
                tsCreated: { value: '2024-01-01' },
                updated: [],
                permissionUnit: { value: 'uu' },
                inTrashBin: { value: 'false' },
              },
              localLabel: { value: 'My Label' },
            },
          },
          __text: { sv: 'Lokala etiketter', en: 'Local labels' },
        },
      ],
    };

    const screen = await renderClassifications(output);

    await expect
      .element(screen.getByRole('heading', { name: 'Local labels' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('link', { name: 'My Label' }))
      .toHaveAttribute(
        'href',
        '/diva-output?localLabelLinkedRecordIdSearchTerm=diva-localLabel_99',
      );
  });

  it('renders nothing when no classification data present', async () => {
    const screen = await renderClassifications(baseOutput);

    await expect.element(screen.getByRole('heading')).not.toBeInTheDocument();
  });
});
