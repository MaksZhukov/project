import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { BrokenImage } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

const styles = ({
  container: {
    padding: 12,
  },
  appBar: {
    position: 'relative',
    padding: '8px',
    zIndex: '55',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

class NavBar extends React.PureComponent {
  render() {
    const { props } = this;
    const { classes, user } = props;
    if (user.userInfo !== null) {
      return (
        <React.Fragment>
          <AppBar className={classes.appBar}>
            <Grid container spacing={16} alignItems="center" className={classes.container}>
              <Grid item xs="auto">
                <BrokenImage />
              </Grid>
              <Grid item xs="auto">
                <Link to="/explore" className={classes.link}>
                      Discovery
                </Link>
              </Grid>
              <Grid item xs="auto">
                <Link to="/my-games" className={classes.link}>
                  <Typography color="inherit">
                      My
                  </Typography>
                  <Typography color="inherit">
                      Games
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs />
              <Grid item xs="auto">
                <Typography color="inherit">
                  {user.userInfo.name.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
          </AppBar>
        </React.Fragment>
      );
    }
    return null;
  }
}

export default withStyles(styles)(NavBar);
