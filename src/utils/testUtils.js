import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
// Import your own reducer
import reducers from '../reducers';

function render(
  ui,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware(reduxThunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
