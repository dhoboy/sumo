import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WrestlerList from './components/WrestlerList/WrestlerList';
import WrestlerDetailNew from './components/WrestlerDetail/WrestlerDetailNew';

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
        render={routeProps => <WrestlerDetailNew {...routeProps} />}
      />
      <Route 
        path="/wrestler-list"
        render={routeProps => <WrestlerList {...routeProps} />}
      />
    </Switch>
  )
}

export default connect()(AppRoutes);
