import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment';
import { NO_CONTENT_API_GAME } from '../../../constants';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarNoRating: {
    backgroundColor: NO_CONTENT_API_GAME.rating[500],
  },
});

class CardGame extends React.PureComponent {
  render() {
    const { props } = this;
    const { classes, gameInfo } = props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader
            avatar={(
              <Avatar aria-label="Recipe" className={gameInfo.rating ? classes.avatar : classes.avatarNoRating}>
                {gameInfo.rating ? +gameInfo.rating.toFixed(1) : null}
              </Avatar>
              )}
            title={gameInfo.name}
            subheader={gameInfo.date ? moment(gameInfo.date).format('YYYY MMMM DD') : NO_CONTENT_API_GAME.date}
          />
          <CardMedia
            className={classes.media}
            image={gameInfo.image ? gameInfo.image.url : NO_CONTENT_API_GAME.image}
            title={gameInfo.name}
          />
          <CardContent>
            <Typography>
              {gameInfo.summary ? gameInfo.summary : NO_CONTENT_API_GAME.summary}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton className={classes.expand}>
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CardGame);
