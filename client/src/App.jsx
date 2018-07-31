import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer, ToastStore } from 'react-toasts';
import SignInContainer from './container/SignIn';
import PassChangeContainer from './container/PassChange';
import SignUpContainer from './container/SignUp';

class App extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { location } = this.props;
    if (localStorage.getItem('token')) {
      // to page
    } else {
      const query = queryString.parse(location.search);
      if (query.token) {
        localStorage.setItem('token', query.token);
        // to page
      }
    }
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

export default App;
