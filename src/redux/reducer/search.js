import constants from 'redux/constants/search';

const initialstate = {
  songs: [],
};

function auth(state = initialstate, action) {
  switch (action.type) {
    case constants.SET_RESULTS:
      return { songs: action.songs };
    default:
      return state;
  }
}

export default auth;
