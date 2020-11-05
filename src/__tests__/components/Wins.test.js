import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Wins from '../../components/Wins';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

test('should read the wins value from the state', () => {
  const numberOfWins = 5;

  useSelector.mockImplementation(() => ({ wins: numberOfWins }));
  const component = render(<Wins />);

  const element = component.getByText(`Wins: ${numberOfWins}`);
  expect(element).toBeDefined();
});
