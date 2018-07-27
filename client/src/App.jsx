import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { ToastContainer, ToastStore } from 'react-toasts';
import SignInContainer from './container/SignIn';
import PassChange from './components/passChange/PassChange';
import SignUpContainer from './container/SignUp';
import { initStore, getStore } from './store';

class App extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    const { token } = queryString.parse(props.location.search);
    localStorage.setItem('token', token);
    initStore();
  }

  render() {
    return (
      <div>
        <Provider store={getStore()}>
          <Switch>
            <Route path="/sign-in" component={SignInContainer} />
            <Route path="/sign-up" component={SignUpContainer} />
            <Route path="/pass-change" component={PassChange} />
            <Redirect from="/" to="/sign-in" />
          </Switch>
        </Provider>
        <ToastContainer position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore} />
      </div>
    );
  }
}

export default App;
