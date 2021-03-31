import constants from 'redux/constants/auth';

const actions = {
  setToken: token => ({
    type: constants.SET_TOKEN,
    token,
  }),

  logOut: () => ({
    type: constants.LOG_OUT,
  }),
};

export default actions;
