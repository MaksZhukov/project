import React from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import NavBar from '../../navBar/NavBar';
import Explore from '../../../pages/explore/components/Explore';

class Main extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    console.log(props);
    const token = localStorage.getItem('token') || queryString.parse(window.location.search).token;
    if (token) {
      props.checkToken(token);
    } else {
      props.push('/sign-in');
    }
  }

  render() {
    const { props } = this;
    const { user } = props;
    if (user.userInfo) {
      return (
        <React.Fragment>
          <NavBar user={props.user} />
          <Switch>
            <Route exact path="(/explore|/)" component={Explore} />
          </Switch>
        </React.Fragment>
      );
    }
    return null;
  }
}

export default Main;
