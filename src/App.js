import firebase from 'firebase/app';
import firebaseConfig from './config/firebase';
import ReduxThunk from 'redux-thunk';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';
import authReducer from './store/reducers/auth';

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  const reducer = combineReducers({
    auth: authReducer,
  });

  const reduxStore = createStore(reducer, applyMiddleware(ReduxThunk));

  return (
    <ReduxProvider store={reduxStore}>
      <div>
        <h1>Oii</h1>
      </div>
    </ReduxProvider>
  );
};

export default App;
