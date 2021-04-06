import actions from 'redux/actions/song';

const services = {
  playSong: song => {
    return dispatch => {
      dispatch(actions.playSong(song));
    };
  },
};

export default services;
