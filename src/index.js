import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import { ChakraProvider } from '@chakra-ui/react';

const reducer = combineReducers({
  auth: authReducer,
});

const reduxStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
