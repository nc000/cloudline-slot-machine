import { render, screen } from '../../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import MainSlotMachine from '../../../components/MainSlotMachine';
import { selectRandomElement } from '../../../utils/helperFunctions';

jest.mock('../../../utils/helperFunctions', () => ({
  selectRandomElement: jest.fn(),
}));

describe('clicking the spin button', () => {
  test('if all colours match, both the number of tries and wins should increment', () => {
    // Remove the randomness when selecting a random colour
    selectRandomElement.mockImplementation((arr) => arr[0]);

    const component = render(<MainSlotMachine />, { initialState: {} });

    userEvent.click(screen.getByText('Spin!'));

    expect(component.getByText(`Tries: 1`)).toBeDefined();
    expect(component.getByText(`Wins: 1`)).toBeDefined();
  });
});
