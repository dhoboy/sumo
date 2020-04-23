import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WrestlerList from './components/WrestlerList/WrestlerList';
import WrestlerDetail from './components/WrestlerDetail/WrestlerDetail';

const AppRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => <Redirect to="/wrestler-list" />} 
      />
      <Route
        path="/wrestler/:name"
        render={routeProps => <WrestlerDetail {...routeProps} />}
      />
      <Route 
        path="/wrestler-list"
        render={routeProps => <WrestlerList {...routeProps} />}
      />
    </Switch>
  )
}

export default AppRoutes;
