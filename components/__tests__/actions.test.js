import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Actions from '../../components/actions';

jest.mock('../../components/icons/ArchiveIcon', () => ({
  __esModule: true,
  default: (props) => <svg {...props} data-testid="archive-icon" />,
}));

jest.mock('../../components/icons/MoreIcon', () => ({
  __esModule: true,
  default: (props) => <svg {...props} data-testid="more-icon" />,
}));

describe('Actions Component', () => {
  test('renders ArchiveIcon correctly', () => {
    render(<Actions data={null} />);

    const archiveIcon = screen.getByTestId('archive-icon');
    expect(archiveIcon).toBeInTheDocument();
  });

  test('renders MoreIcon correctly', () => {
    render(<Actions data={null} />);

    const moreIcon = screen.getByTestId('more-icon');
    expect(moreIcon).toBeInTheDocument();
  });

  test('renders the correct layout for buttons', () => {
    const { container } = render(<Actions data={null} />);

    const buttonLayout = container.querySelector('div');
    expect(buttonLayout).toBeInTheDocument();

    const buttonMenu = container.querySelector('div');
    expect(buttonMenu).toBeInTheDocument();
  });
});
