import type {
  AttachmentGroup,
  DivaOutputGroup,
} from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PresentationImage } from '../PresentationImage';

describe('PresentationImage', () => {
  it('renders the preview of the first attachment', () => {
    const mockData = {
      attachments: {
        attachment: [
          {
            _label: 'attachment',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'first-attachment-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
          {
            _label: 'attachment',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'second-attachment-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
        ],
      },
    } as DivaOutputGroup;

    render(<PresentationImage output={mockData} />);

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      expect.stringContaining('first-attachment-medium-id'),
    );
  });

  it('renders nothing if there are no attachments', () => {
    const mockData = {
      attachments: {
        attachment: [] as AttachmentGroup[],
      },
    } as DivaOutputGroup;

    const { container } = render(<PresentationImage output={mockData} />);

    expect(container.querySelector('presentation')).not.toBeInTheDocument();
  });

  it('renders nothing if the first attachment has no medium image', () => {
    const mockData = {
      attachments: {
        attachment: [
          {
            _label: 'attachment',
            file: {
              linkedRecord: {
                binary: {
                  medium: {},
                },
              },
            },
          },
        ],
      },
    } as DivaOutputGroup;

    const { container } = render(<PresentationImage output={mockData} />);

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders the attachment with label previewImage if present', () => {
    const mockData = {
      attachments: {
        attachment: [
          {
            _label: 'attachment',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'other-attachment-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
          {
            _label: 'fullText',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'other-fulltext-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
          {
            _label: 'previewImage',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'presentation-image-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
        ],
      },
    } as DivaOutputGroup;

    render(<PresentationImage output={mockData} />);

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      expect.stringContaining('presentation-image-medium-id'),
    );
  });

  it('renders first full text attachment if no preview image', () => {
    const mockData = {
      attachments: {
        attachment: [
          {
            _label: 'attachment',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'other-attachment-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
          {
            _label: 'fullText',
            file: {
              linkedRecord: {
                binary: {
                  medium: {
                    medium: {
                      id: 'other-fulltext-medium-id',
                      name: 'medium',
                    },
                  },
                },
              },
            },
          },
        ],
      },
    } as DivaOutputGroup;

    render(<PresentationImage output={mockData} />);

    expect(screen.getByRole('presentation')).toHaveAttribute(
      'src',
      expect.stringContaining('other-fulltext-medium-id'),
    );
  });
});
