import constants from 'redux/constants/search';

const actions = {
  setResults: songs => ({
    type: constants.SET_RESULTS,
    songs,
  }),
};

export default actions;
