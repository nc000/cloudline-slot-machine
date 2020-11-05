import { render, screen } from '../../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import MainSlotMachine from '../../../components/MainSlotMachine';

describe('clicking the spin button', () => {
  test('should increment the number of tries', () => {
    const component = render(<MainSlotMachine />, { initialState: {} });

    userEvent.click(screen.getByText('Spin!'));

    expect(component.getByText(`Tries: 1`)).toBeDefined();
  });
});
