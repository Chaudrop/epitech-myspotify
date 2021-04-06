import constants from 'redux/constants/song';

const actions = {
  playSong: song => ({
    type: constants.SET_SONG,
    song,
  }),
};

export default actions;
