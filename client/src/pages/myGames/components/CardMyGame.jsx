import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ShareIcon from '@material-ui/icons/Share';
import Dropzone from 'react-dropzone';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { NO_CONTENT_API_GAME } from '../../../constants';

const styles = () => ({
  card: {
    maxWidth: 400,
  },
  dropZone: {
    display: 'flex',
    marginTop: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    border: '2px dashed gray',
    borderRadius: '10px',
  },
  CloudUpload: {
    fontSize: '40px',
  },
});

class CardMyGame extends React.PureComponent {
  clickFavorite = () => {
    const { props } = this;
    if (props.gameInfo.favorite) {
      props.removeFavorite({ userId: props.userId, gameId: props.gameInfo.id });
    } else {
      props.addFavorite({ userId: props.userId, gameId: props.gameInfo.id });
    }
  }

  handleDrop = (files) => {
    const { props } = this;
    const dataFile = new FormData();
    dataFile.append('file', files[0]);
    props.addImages({ gameId: props.gameInfo.id, userId: props.userId, file: dataFile });
  }


  render() {
    const { props } = this;
    const { classes, gameInfo } = props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader
            title={gameInfo.name}
          />
          <CardContent>
            <Typography>
              {gameInfo.summary ? gameInfo.summary : NO_CONTENT_API_GAME.summary}
            </Typography>
            <Dropzone accept="image/jpeg, image/png" onDrop={this.handleDrop} className={classes.dropZone}>
              <CloudUpload className={classes.CloudUpload} />
            </Dropzone>
            {/* <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {tileData.map(tile => (
                <GridListTile key={tile.img} cols={tile.cols || 1}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              ))}
            </GridList> */}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites" color={gameInfo.favorite ? 'secondary' : 'default'} onClick={this.clickFavorite}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CardMyGame);
