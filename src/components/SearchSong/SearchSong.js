import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import AuthServices from 'redux/services/auth';
import './SearchSong.css';

import { Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, makeStyles } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
}));

const SearchSong = props => {
  const [listMusic, setListMusic] = useState([]);
  const [keyword, setKeyword] = useState('');
  const { authToken, logOut } = props;
  const classes = useStyles();

  async function setValues(value) {
    const listMusic = await searchOnSpotify(value);
    if (listMusic) setListMusic(listMusic);
  }

  return !authToken ? (
    <Redirect to={'/login'} />
  ) : (
    <div>
      <div className="header">
        <SearchBar
          className="searchbar"
          placeholder={'Search a song...'}
          onChange={value => setKeyword(value)}
          onRequestSearch={() => setValues(keyword)}
        />
        <Button
          onClick={() => {
            logOut();
          }}
          variant="outlined"
          className="logout"
        >
          log out
        </Button>
      </div>
      <div>
        <List className={classes.root}>
          {listMusic.map(music => (
            <ListItem>
              <ListItemAvatar>
                {music['album'] ? (
                  <Avatar src={music['album']['images'][0]['url']}></Avatar>
                ) : (
                  <Avatar src="https://f4.bcbits.com/img/a4139357031_10.jpg"></Avatar>
                )}
              </ListItemAvatar>
              <ListItemText>{music['name']}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

async function searchOnSpotify(value) {
  try {
    const data = await axios.get(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer BQC7bMYHw0Po9dGoHfFJOXuWp6gOck0MBtT--2WgRlXRbukjJa_CP3lxFmCeovYQTJK7HzzJ_X9-kkwjQlpewTjPX0G8JrVJf0tGbaPPWTrIpT96Pg98GZV7QBPMuoqZ2drIsU7ju8bi7XZ2aFDS4-KUJsDVFVzLcnCKsq-GX14altOiYYS0uCT_BcT5OYDpHUujvJhMOBaDgv0nAxs4DunQGXwFfzJ7i7Xz5CVOlbp1WQFzQ2lVgnuvel--Uh0QhV5ePLtkK3VVv1M5C5QLmw`,
      },
    });
    return data.data.tracks.items;
  } catch (err) {
    console.log(err);
  }
}

const mapStateToProps = state => {
  return { authToken: state.auth.token };
};

const mapDispatchToProps = {
  logOut: AuthServices.logOut,
};

const connectedSearchSong = connect(mapStateToProps, mapDispatchToProps)(SearchSong);

export default connectedSearchSong;
