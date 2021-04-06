import { toast } from 'react-toastify';
import axios from 'axios';

import actions from 'redux/actions/search';

async function searchOnSpotify(query, token) {
  const data = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.tracks.items;
}

const services = {
  searchOnSpotify: query => {
    return async (dispatch, getState) => {
      const state = getState();
      try {
        const songs = await searchOnSpotify(query, state.auth.token);
        dispatch(actions.setResults(songs));
      } catch (err) {
        toast.error('Error with Spotify API');
      }
    };
  },
};

export default services;
