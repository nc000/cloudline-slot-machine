import { render, screen } from '../../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import MainSlotMachine from '../../../components/MainSlotMachine';
import { selectRandomElement } from '../../../utils/helperFunctions';

jest.mock('../../../utils/helperFunctions', () => ({
  selectRandomElement: jest.fn(),
}));

describe('clicking the spin button', () => {
  test('should increment the number of wins twice if spin button was clicked twice', () => {
    // Remove the randomness when selecting a random colour
    selectRandomElement.mockImplementation((arr) => arr[0]);

    const component = render(<MainSlotMachine />, { initialState: {} });

    userEvent.click(screen.getByText('Spin!'));
    userEvent.click(screen.getByText('Spin!'));

    expect(component.getByText(`Tries: 2`)).toBeDefined();
    expect(component.getByText(`Wins: 2`)).toBeDefined();
  });
});
