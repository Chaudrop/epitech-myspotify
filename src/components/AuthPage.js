import React from 'react';
import { connect } from 'react-redux';

import { Container, Typography } from '@material-ui/core';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

import AuthServices from 'redux/services/auth';
import './AuthPage.css';

const getParamValues = url => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};

const AuthPage = props => {
  const { authToken, setAuthToken, logOut } = props;
  const tokenFromRedirect = getParamValues(window.location.hash).access_token;
  if (!authToken && tokenFromRedirect) {
    setAuthToken(tokenFromRedirect);
  }
  return (
    <div className="app">
      {authToken ? (
        <>
          <button onClick={logOut}>logout</button>
          You are authorized with token: {authToken}
        </>
      ) : (
        <Container maxWidth="md" className="login-page-container">
          <Typography noWrap className="my-spotify-title" variant="h1" align="center">
            MySpotify
          </Typography>
          <SpotifyAuth
            redirectUri="http://localhost:3000/test"
            clientID="908535d088d34756a941e90699f6db68"
            scopes={[Scopes.userReadPrivate, 'user-read-email']}
            btnClassName="login-button"
          />
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return { authToken: state.auth.token };
};

const mapDispatchToProps = {
  setAuthToken: AuthServices.setToken,
  logOut: AuthServices.logOut,
};

const connectedAuthPage = connect(mapStateToProps, mapDispatchToProps)(AuthPage);

export default connectedAuthPage;
