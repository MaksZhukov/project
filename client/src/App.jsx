import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, ToastStore } from 'react-toasts';
import SignInContainer from './container/SignIn';
import PassChangeContainer from './container/PassChange';
import SignUpContainer from './container/SignUp';

class App extends React.PureComponent {
  componentWillMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/sign-in" component={SignInContainer} />
          <Route path="/sign-up" component={SignUpContainer} />
          <Route path="/pass-change" component={PassChangeContainer} />
        </Switch>
        <ToastContainer position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore} />
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(App));
