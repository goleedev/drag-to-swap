import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PageHeader from '../pageHeader';

jest.mock('../actions', () => ({
  __esModule: true,
  default: () => <div data-testid="actions-component" />,
}));

describe('PageHeader Component', () => {
  test('renders the title correctly', () => {
    render(<PageHeader title="Test Page Title" />);

    const titleElement = screen.getByText('Test Page Title');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the Actions component', () => {
    render(<PageHeader title="Test Page Title" />);

    const actionsComponent = screen.getByTestId('actions-component');
    expect(actionsComponent).toBeInTheDocument();
  });
});
