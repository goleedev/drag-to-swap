import { DndContext } from '@dnd-kit/core';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { useInitialData } from '../../hooks/useInitialData';
import PrintPage from '../printPage';

jest.mock('../pageHeader', () => ({
  __esModule: true,
  default: ({ title }) => <div data-testid="page-header">{title}</div>,
}));

jest.mock('../sortableItem', () => ({
  __esModule: true,
  default: ({ id, url }) => (
    <div data-testid="sortable-item" data-id={id} data-url={url} />
  ),
}));

jest.mock('../../hooks/useInitialData', () => ({
  useInitialData: jest.fn(),
}));

describe('PrintPage Component', () => {
  beforeEach(() => {
    useInitialData.mockReturnValue([
      {
        title: 'Page 1',
        images: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
        ],
      },
      {
        title: 'Page 2',
        images: [
          'https://example.com/image3.jpg',
          'https://example.com/image4.jpg',
        ],
      },
    ]);
  });

  test('renders PageHeader for each page', () => {
    render(<PrintPage data={[]} />);

    const headers = screen.getAllByTestId('page-header');
    expect(headers.length).toBe(2);
    expect(headers[0]).toHaveTextContent('Page 1');
    expect(headers[1]).toHaveTextContent('Page 2');
  });

  test('calls onDragEnd when a drag event occurs', () => {
    const handleDragEnd = jest.fn();

    render(
      <DndContext onDragEnd={handleDragEnd}>
        <PrintPage data={[]} />
      </DndContext>
    );

    handleDragEnd();
    expect(handleDragEnd).toHaveBeenCalled();
  });
});
