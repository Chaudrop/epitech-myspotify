import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, makeStyles } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';
import SpotifyPlayer from 'react-spotify-web-playback';

import AuthServices from 'redux/services/auth';
import SearchServices from 'redux/services/search';
import SongServices from 'redux/services/song';
import './SearchSong.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    height: '80vh',
    overflow: 'auto',
  },
  logout: {
    margin: 16,
    position: 'absolute',
  },
}));

const SearchSong = props => {
  const [keyword, setKeyword] = useState('');
  const { authToken, logOut, searchOnSpotify, songs, playedSong, playSong } = props;
  const classes = useStyles();

  async function setValues(value) {
    if (value) await searchOnSpotify(value);
  }

  return !authToken ? (
    <Redirect to={'/login'} />
  ) : (
    <div>
      <div className="header">
        <Button
          onClick={logOut}
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<ExitToApp />}
          className={classes.logout}
        >
          log out
        </Button>
        <SearchBar
          className="searchbar"
          placeholder="Search a song..."
          onChange={value => setKeyword(value)}
          onRequestSearch={() => setValues(keyword)}
        />
      </div>
      <div>
        {songs.length === 0 ? null : (
          <List className={classes.root}>
            {songs.map((music, index) => (
              <ListItem button key={index} onClick={() => playSong(music.uri)}>
                <ListItemAvatar>
                  {music.album ? (
                    <Avatar src={music.album.images[0].url}></Avatar>
                  ) : (
                    <Avatar src="https://f4.bcbits.com/img/a4139357031_10.jpg"></Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText>
                  {music.artists[0].name} - {music.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <div className="player">
        <SpotifyPlayer
          play={playedSong !== undefined}
          showSaveIcon={false}
          token={authToken}
          initialVolume={0.5}
          uris={playedSong ? [playedSong] : []}
          styles={{
            sliderColor: 'green',
            bgColor: '#1f1f1f',
            color: 'white',
            sliderTrackColor: '#4e4e4e',
            trackNameColor: 'white',
          }}
        />
      </div>
      ;
    </div>
  );
};

const mapStateToProps = state => {
  return { authToken: state.auth.token, songs: state.search.songs, playedSong: state.song.song };
};

const mapDispatchToProps = {
  logOut: AuthServices.logOut,
  searchOnSpotify: SearchServices.searchOnSpotify,
  playSong: SongServices.playSong,
};

const connectedSearchSong = connect(mapStateToProps, mapDispatchToProps)(SearchSong);

export default connectedSearchSong;
