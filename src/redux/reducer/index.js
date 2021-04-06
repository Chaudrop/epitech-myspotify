import { combineReducers } from 'redux';
import auth from './auth';
import search from './search';
import song from './song';

const reducers = combineReducers({ auth, search, song });

export default reducers;
