import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import type { DataRecordLink } from '@/cora/cora-data/types.server';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { OutputRecordLink } from '../OutputRecordLink';

vi.mock('../OutputRecordLinkWithPresentation', () => ({
  OutputRecordLinkWithPresentation: ({
    linkedRecordType,
    linkedRecordId,
    presentationRecordLinkId,
  }: {
    linkedRecordType: string;
    linkedRecordId: string;
    presentationRecordLinkId: string;
  }) => (
    <div>
      mocked-presentation:{linkedRecordType}/{linkedRecordId}/
      {presentationRecordLinkId}
    </div>
  ),
}));

const createComponent = (
  overrides: Partial<FormComponentRecordLink> = {},
): FormComponentRecordLink => ({
  type: 'recordLink',
  name: 'profileLink',
  label: 'Profile Link',
  showLabel: true,
  ...overrides,
});

const createData = (
  overrides: Partial<DataRecordLink> = {},
): DataRecordLink => ({
  name: 'profileLink',
  children: [
    { name: 'linkedRecordType', value: 'profile' },
    { name: 'linkedRecordId', value: 'record-123' },
  ],
  ...overrides,
});

const renderOutputRecordLink = async (
  component: FormComponentRecordLink,
  data: DataRecordLink,
) => {
  const RoutesStub = createRoutesStub([
    {
      path: '/',
      Component: () => <OutputRecordLink component={component} data={data} />,
    },
    {
      path: '/:recordType/:recordId',
      Component: () => <div>record page</div>,
    },
  ]);

  return render(<RoutesStub />);
};

describe('OutputRecordLink', () => {
  it('renders a clickable link when read action link exists', async () => {
    const component = createComponent();
    const data = createData({
      actionLinks: {
        read: {
          requestMethod: 'GET',
          rel: 'read',
          url: '/record/profile/record-123',
        },
      },
    });

    const screen = await renderOutputRecordLink(component, data);

    const link = screen.getByRole('link', { name: 'profile/record-123' });
    await expect.element(link).toHaveAttribute('href', '/profile/record-123');
  });

  it('renders plain text when read action link is missing', async () => {
    const component = createComponent();
    const data = createData();

    const screen = await renderOutputRecordLink(component, data);

    await expect.element(screen.getByText('profile/record-123')).toBeVisible();

    expect(screen.container.querySelector('a')).toBeNull();
  });

  it('renders translated id for onlyTranslatedText mode', async () => {
    const component = createComponent({ presentAs: 'onlyTranslatedText' });
    const data = createData();

    const screen = await renderOutputRecordLink(component, data);

    await expect.element(screen.getByText('record-123')).toBeVisible();
    expect(screen.container.querySelector('a')).toBeNull();
  });

  it('renders linked presentation when configured and read action link exists', async () => {
    const component = createComponent({
      linkedRecordPresentation: {
        presentationId: 'presentation-link-id',
        presentedRecordType: 'profilePresentation',
      },
    });
    const data = createData({
      actionLinks: {
        read: {
          requestMethod: 'GET',
          rel: 'read',
          url: '/record/profile/record-123',
        },
      },
    });

    const screen = await renderOutputRecordLink(component, data);

    await expect
      .element(
        screen.getByText(
          'mocked-presentation:profile/record-123/presentation-link-id',
        ),
      )
      .toBeVisible();
  });

  it('renders nothing if required record link children are missing', async () => {
    const component = createComponent();
    const data = createData({
      children: [{ name: 'linkedRecordType', value: 'profile' }],
    });

    const screen = await renderOutputRecordLink(component, data);

    expect(screen.container.innerHTML).toBe('');
  });
});
