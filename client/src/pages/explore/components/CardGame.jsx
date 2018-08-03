import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = ({
  container: {
    padding: 20,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

class CardGame extends React.PureComponent {
  render() {
    const { props } = this;
    const { classes, user } = props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
            Word of the Day
            </Typography>
            <Typography variant="headline" component="h2" />
            <Typography className={classes.pos} color="textSecondary">
            adjective
            </Typography>
            <Typography component="p">
            well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
Learn More
            </Button>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CardGame);
