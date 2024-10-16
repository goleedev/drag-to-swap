import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import SortableItem from '../sortableItem';

jest.mock('../../hooks/useDragAndDrop', () => ({
  useDragAndDrop: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn((element) => element),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ objectFit, ...rest }) => <img {...rest} />, // Mocking Next.js Image component
}));

describe('SortableItem Component', () => {
  beforeEach(() => {
    useDragAndDrop.mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      showPreview: false,
      position: { x: 0, y: 0 },
      isDragging: false,
    });
  });

  test('renders an image with provided URL', () => {
    render(<SortableItem id="1" url="/test-image.jpg" />);

    const image = screen.getByAltText('Test Image 1');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  test('renders image placeholder when no URL is provided', () => {
    render(<SortableItem id="2" url={null} />);

    const placeholder = screen.getByTestId('image-placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  test('renders drag preview when showPreview is true', () => {
    useDragAndDrop.mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      showPreview: true,
      position: { x: 100, y: 100 },
      isDragging: false,
    });

    render(<SortableItem id="3" url="/preview-image.jpg" />);

    const preview = screen.getByAltText('Preview 3');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute('src', '/preview-image.jpg');
  });
});
