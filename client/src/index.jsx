import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Router, Route, withRouter } from 'react-router-dom';
import store from './store';
import history from './history';
import App from './App';
import './index.sass';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));
