import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
  const { authToken, setAuthToken } = props;
  const tokenFromRedirect = getParamValues(window.location.hash).access_token;
  if (!authToken && tokenFromRedirect) {
    setAuthToken(tokenFromRedirect);
  }
  return (
    <div>
      {authToken ? (
        <Redirect to={'/search'} />
      ) : (
        <Container maxWidth="md" className="login-page-container">
          <Typography noWrap className="my-spotify-title" variant="h1" align="center">
            MySpotify
          </Typography>
          <SpotifyAuth
            redirectUri="http://localhost:3000/login"
            clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
            scopes={[Scopes.streaming]}
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
};

const connectedAuthPage = connect(mapStateToProps, mapDispatchToProps)(AuthPage);

export default connectedAuthPage;
