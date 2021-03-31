import actions from 'redux/actions/auth';

const services = {
  setToken: token => {
    return dispatch => {
      dispatch(actions.setToken(token));
    };
  },

  logOut: () => {
    return dispatch => {
      dispatch(actions.logOut());
    };
  },
};

export default services;
