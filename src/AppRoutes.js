import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WrestlerList from './components/WrestlerList/WrestlerList';
import WrestlerDetail from './components/WrestlerDetail/WrestlerDetail';
import Insights from './components/Insights/Insights';
import Overview from './components/Overview/Overview';
import Tournaments from './components/Tournaments/Tournaments';

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
      <Route
        path="/overview"
        render={routeProps => <Overview {...routeProps} />}
      />
      <Route
        path="/tournaments"
        render={routeProps => <Tournaments {...routeProps} />}
      />
      <Route 
        path="/insights"
        render={routeProps => <Insights {...routeProps} />}
      />
    </Switch>
  )
}

export default AppRoutes;
