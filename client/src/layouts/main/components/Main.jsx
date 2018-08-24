import React from 'react';
import { Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import NavBar from '../../navBar/NavBar';
import ExploreContainer from '../../../pages/explore/containers/Explore';
import MyGamesContainer from '../../../pages/myGames/containers/MyGames';

class Main extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    const token = localStorage.getItem('token') || queryString.parse(window.location.search).token;
    if (token) {
      localStorage.setItem('token', token);
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
        <div className="app-main">
          <NavBar user={props.user} />
          <Switch>
            <Route exact path="(/explore|/)" component={ExploreContainer} />
            <Route exact path="/my-games" component={MyGamesContainer} />
          </Switch>
        </div>
      );
    }
    return null;
  }
}

export default Main;
