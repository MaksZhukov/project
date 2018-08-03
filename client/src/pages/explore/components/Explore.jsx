import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Filters from './Filters';
import CardGame from './CardGame';


const styles = ({
  root: {
    padding: '25px',
  },
});
class Explore extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Filters />
        <Grid container spacing={40} className={classes.root}>
          <Grid item xs={3}>
            <CardGame />
          </Grid>
          <Grid item xs={3}>
            <CardGame />
          </Grid>
          <Grid item xs={3}>
            <CardGame />
          </Grid>
          <Grid item xs={3}>
            <CardGame />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Explore);
