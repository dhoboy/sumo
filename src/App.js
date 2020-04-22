import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import AppRoutes from './AppRoutes';
import { init } from './actions/data';
import Header from './components/Header/Header';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(init());
  }

  render() {    
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <div id="sumo-app">
            <Header />
            <main className="app-content">
              <AppRoutes />
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    state,
    props,
  };
}

export default connect(mapStateToProps)(App);
