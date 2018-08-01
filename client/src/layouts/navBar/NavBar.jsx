import React from 'react';
import queryString from 'query-string';
import { Redirect, Link } from 'react-router-dom';
import { BrokenImage } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

import './NavBar.sass';

class NavBar extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    const { location } = props;
    console.log(location);
    const token = localStorage.getItem('token') || queryString.parse(location.search).token;
    if (token) {
      props.checkToken(token);
    } else {
      props.push('/sign-in');
    }
    console.log(this);
  }

  render() {
    const { props } = this;
    const { responseCheckToken } = props;
    if (responseCheckToken.loading === false) {
      if (responseCheckToken.user) {
        return (
          <React.Fragment>
            <AppBar position="fixed" className="app-bar">
              <Grid container spacing={16}>
                <Grid item xs="auto">
                  <BrokenImage />
                </Grid>
                <Grid item xs="auto">
                  <Link to="/explore" className="app-bar-link">
                     Discovery
                  </Link>
                </Grid>
                <Grid item xs="auto">
                  <Link to="/games" className="app-bar-link">
                    My games
                  </Link>
                </Grid>
                <Grid item xs />
                <Grid item xs="auto">
                  <Link to="/user/:id" className="app-bar-link">
                    {responseCheckToken.user.name}
                  </Link>
                </Grid>
              </Grid>
            </AppBar>
          </React.Fragment>
        );
      }
      return <Redirect to="/sign-in" />;
    }
    return null;
  }
}

export default NavBar;
