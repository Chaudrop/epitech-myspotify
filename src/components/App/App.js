import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import reduxStore from 'redux/store';
import Router from './Router';
import './App.css';

const App = () => {
  const reduxPersistor = persistStore(reduxStore);

  return (
    <div className="app">
      <Provider store={reduxStore}>
        <PersistGate persistor={reduxPersistor}>
          <Router />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
