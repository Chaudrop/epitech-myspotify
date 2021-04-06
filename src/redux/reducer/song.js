import constants from 'redux/constants/song';

const initialstate = {};

function auth(state = initialstate, action) {
  switch (action.type) {
    case constants.SET_SONG:
      return { song: action.song };
    default:
      return state;
  }
}

export default auth;
