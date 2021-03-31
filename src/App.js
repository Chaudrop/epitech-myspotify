import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from 'redux/store';
import AuthPage from 'components/AuthPage';
import './App.css';

const reduxPersistor = persistStore(reduxStore);

const App = () => {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistor}>
        <AuthPage />
      </PersistGate>
    </Provider>
  );
};

export default App;
