import { render, screen } from '../../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import MainSlotMachine from '../../../components/MainSlotMachine';
import { selectRandomElement } from '../../../utils/helperFunctions';

jest.mock('../../../utils/helperFunctions', () => ({
  selectRandomElement: jest.fn(),
}));

describe('clicking the spin button', () => {
  test('should generate three random colours for the slots', () => {
    // Mock the function which is used to select the random colours so
    // that the number of times the function was called can be checked
    selectRandomElement.mockImplementation((arr) => arr[0]);

    render(<MainSlotMachine />, { initialState: {} });

    userEvent.click(screen.getByText('Spin!'));

    expect(selectRandomElement.mock.calls.length).toBe(3);
  });
});
