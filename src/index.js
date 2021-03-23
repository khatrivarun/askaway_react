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
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import bugsnagKeys from './config/bugsnag';
import _500Page from './pages/500';

Bugsnag.start({
  apiKey: bugsnagKeys.apiKey,
  plugins: [new BugsnagPluginReact()],
  appType: 'client',
  appVersion: '1.0.0-alpha',
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const reducer = combineReducers({
  auth: authReducer,
});

const reduxStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={_500Page}>
      <ReduxProvider store={reduxStore}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
