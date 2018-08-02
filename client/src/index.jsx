import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer, ToastStore } from 'react-toasts';
import TransitionedPage from './components/TransitionedPage';
import { store, history } from './store';
import SignInContainer from './pages/signIn/containers/SignIn';
import PassChangeContainer from './pages/passChange/containers/PassChange';
import SignUpContainer from './pages/signUp/containers/SignUp';
import ExploreContainer from './pages/explore/containers/Explore';
import './index.sass';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Switch>
          <Route exact path="(/explore|/)" component={ExploreContainer} />
          <Route exact path="/sign-in" component={TransitionedPage(SignInContainer)} />
          <Route exact path="/sign-up" component={TransitionedPage(SignUpContainer)} />
          <Route exact path="/pass-change" component={TransitionedPage(PassChangeContainer)} />
        </Switch>
        <ToastContainer position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore} />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>
), document.getElementById('app'));
