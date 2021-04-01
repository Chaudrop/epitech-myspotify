import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { toast } from 'react-toastify';

import AuthServices from 'redux/services/auth';
import './SearchSong.css';

const SearchSong = props => {
  const { authToken, logOut } = props;

  return !authToken ? (
    <Redirect to={'/login'} />
  ) : (
    <div>
      <button
        onClick={() => {
          logOut();
        }}
      >
        log out
      </button>
      You are connected
      <button onClick={() => toast('Salut je suis un toast')}>Toast</button>
    </div>
  );
};

const mapStateToProps = state => {
  return { authToken: state.auth.token };
};

const mapDispatchToProps = {
  logOut: AuthServices.logOut,
};

const connectedSearchSong = connect(mapStateToProps, mapDispatchToProps)(SearchSong);

export default connectedSearchSong;
