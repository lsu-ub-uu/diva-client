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
                  large: {
                    large: {
                      id: 'first-attachment-large-id',
                      name: 'large',
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
                  large: {
                    large: {
                      id: 'second-attachment-large-id',
                      name: 'large',
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

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('first-attachment-large-id'),
    );
  });

  it('renders nothing if there are no attachments', () => {
    const mockData = {
      attachments: {
        attachment: [] as AttachmentGroup[],
      },
    } as DivaOutputGroup;

    const { container } = render(<PresentationImage output={mockData} />);

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders nothing if the first attachment has no large image', () => {
    const mockData = {
      attachments: {
        attachment: [
          {
            _label: 'attachment',
            file: {
              linkedRecord: {
                binary: {
                  large: {},
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
                  large: {
                    large: {
                      id: 'other-attachment-large-id',
                      name: 'large',
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
                  large: {
                    large: {
                      id: 'other-fulltext-large-id',
                      name: 'large',
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
                  large: {
                    large: {
                      id: 'presentation-image-large-id',
                      name: 'large',
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

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('presentation-image-large-id'),
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
                  large: {
                    large: {
                      id: 'other-attachment-large-id',
                      name: 'large',
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
                  large: {
                    large: {
                      id: 'other-fulltext-large-id',
                      name: 'large',
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

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('other-fulltext-large-id'),
    );
  });
});
