import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Tries from '../../components/Tries';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

test('should read the tries value from the state', () => {
  const numberOfTries = 5;

  useSelector.mockImplementation(() => ({ tries: numberOfTries }));
  const component = render(<Tries />);

  const element = component.getByText(`Tries: ${numberOfTries}`);
  expect(element).toBeDefined();
});
