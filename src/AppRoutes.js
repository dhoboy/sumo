import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import WrestlerList from './components/WrestlerList/WrestlerList';

const AppRoutes = (props) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => <WrestlerList />} />
    </Switch>
  )
}

export default connect()(AppRoutes);
