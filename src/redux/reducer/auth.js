import constants from 'redux/constants/auth';

const initialstate = {};

function auth(state = initialstate, action) {
  switch (action.type) {
    case constants.SET_TOKEN:
      return { token: action.token };
    case constants.LOG_OUT:
      return initialstate;
    default:
      return state;
  }
}

export default auth;
