import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Project } from '../Project';
import type { RelatedItemProjectGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('Project', () => {
  it('renders nothing when no project', () => {
    render(<Project project={undefined} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders project information', () => {
    const project = {
      __text: { en: 'Project' },
      project: {
        __text: { en: 'Project' },
        value: 'diva-project:123',
        linkedRecord: {
          project: {
            recordInfo: { type: { value: 'diva-project' } },
            titleInfo: {
              title: { value: 'Linked Project Title' },
            },
          },
        },
      },
      titleInfo: {
        __text: { en: 'Title' },
        title: { value: 'Project title' },
        subtitle: { value: 'Project subtitle' },
      },
    } as RelatedItemProjectGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Project project={project} /> },
    ]);

    render(<RoutesStub />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Project',
    );
    expect(
      screen.getByRole('link', { name: 'Linked Project Title' }),
    ).toHaveAttribute('href', '/diva-project/diva-project:123');

    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
