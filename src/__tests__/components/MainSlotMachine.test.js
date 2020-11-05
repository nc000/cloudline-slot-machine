import { render } from '../../utils/testUtils';
import MainSlotMachine from '../../components/MainSlotMachine';

test('renders MainSlotMachine component with no errors', () => {
  render(<MainSlotMachine />, { initialState: {} });
});
