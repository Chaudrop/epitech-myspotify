import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from 'components/AuthPage/AuthPage';
import SearchSong from 'components/SearchSong/SearchSong';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={AuthPage} />
        <Route exact path="/search" component={SearchSong} />
        <Route path="*">
          <Redirect to={'/login'} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
