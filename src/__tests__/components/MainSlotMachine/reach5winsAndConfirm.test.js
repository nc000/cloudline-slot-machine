import { render, screen } from '../../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import MainSlotMachine from '../../../components/MainSlotMachine';
import { selectRandomElement } from '../../../utils/helperFunctions';

jest.mock('../../../utils/helperFunctions', () => ({
  selectRandomElement: jest.fn(),
}));

// Simulate clicking ok on the confirm window
global.confirm = () => true;

describe('clicking the spin button and winning 5 times', () => {
  test('spin button should be disabled if ok was pressed', () => {
    // Remove the randomness when selecting a random colour
    selectRandomElement.mockImplementation((arr) => arr[0]);

    const component = render(<MainSlotMachine />, { initialState: {} });

    userEvent.click(screen.getByText('Spin!'));
    userEvent.click(screen.getByText('Spin!'));
    userEvent.click(screen.getByText('Spin!'));
    userEvent.click(screen.getByText('Spin!'));
    userEvent.click(screen.getByText('Spin!'));

    // After reaching five wins, the state should be reset
    expect(component.getByText(`Tries: 0`)).toBeDefined();
    expect(component.getByText(`Wins: 0`)).toBeDefined();

    userEvent.click(screen.getByText('Spin!'));

    expect(component.getByText(`Tries: 0`)).toBeDefined();
    expect(component.getByText(`Wins: 0`)).toBeDefined();
  });
});
