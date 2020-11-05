import { listTally } from '../../reducers/tallyReducer';
import { ADD_TO_WINS, ADD_TO_TRIES, RESET_TALLY } from '../../actions/types';

test('should return the initial state', () => {
  const initialState = {
    wins: 0,
    tries: 0,
  };

  expect(listTally(undefined, { type: undefined })).toEqual(initialState);
});

test('should increment wins on ADD_TO_WINS action', () => {
  const startState = {
    wins: 0,
    tries: 0,
  };

  const expectedState = {
    wins: 1,
    tries: 0,
  };

  expect(listTally(startState, { type: ADD_TO_WINS })).toEqual(expectedState);
});

test('should increment tries on ADD_TO_TRIES action', () => {
  const startState = {
    wins: 0,
    tries: 0,
  };

  const expectedState = {
    wins: 0,
    tries: 1,
  };

  expect(listTally(startState, { type: ADD_TO_TRIES })).toEqual(expectedState);
});

test('should increment reset state on RESET_TALLY action', () => {
  const startState = {
    wins: 10,
    tries: 10,
  };

  const expectedState = {
    wins: 0,
    tries: 0,
  };

  expect(listTally(startState, { type: RESET_TALLY })).toEqual(expectedState);
});
