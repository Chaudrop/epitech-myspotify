import React from 'react';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

import './App.css';

const App = () => {
  const token = '';
  return (
    <div className="app">
      {token ? (
        <p>You are authorized with token: {token}</p>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback"
          clientID="1a70ba777fec4ffd9633c0c418bdcf39"
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
          btnClassName="test"
        />
      )}
    </div>
  );
};
export default App;
