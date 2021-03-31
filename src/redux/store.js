import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import reducers from 'redux/reducer/index';

const persistConfig = {
  key: 'my-spotify',
  storage,
  whitelist: ['auth'],
};

// middlewares
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

// recuders
const persistedReducer = persistReducer(persistConfig, reducers);

// store
const store = createStore(persistedReducer, enhancer);

export default store;
