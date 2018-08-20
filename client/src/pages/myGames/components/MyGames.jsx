import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-virtualized/styles.css';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import CardMyGame from './CardMyGame';
import { COUNT_GAMES_ON_ROW, OFFSET_SCROLL_LIST_BOTTOM } from '../../../constants';


const styles = ({
  gridImages: {
    padding: '20px',
  },
  loader: {
    textAlign: 'center',
    background: '#fff',
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
});
class MyGames extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    props.getMyGames({ userId: props.userId, offset: 0 });
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  }

  componentWillUnmount() {
    const { props } = this;
    props.clearMyGames();
  }

  handlerScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    const { props } = this;
    const {
      responseGetMyGames, games,
    } = props;
    if (!responseGetMyGames.loading
      && responseGetMyGames.games && !responseGetMyGames.games.length) {
      return;
    }
    if (!responseGetMyGames.loading
      && scrollTop >= scrollHeight - clientHeight - OFFSET_SCROLL_LIST_BOTTOM) {
      props.getMyGames({ userId: props.userId, offset: games.length });
    }
  }

  rowRenderer = ({
    index, key, parent, style,
  }) => {
    const { props } = this;
    const gamesBy4 = props.games.slice(index * COUNT_GAMES_ON_ROW,
      index * COUNT_GAMES_ON_ROW + COUNT_GAMES_ON_ROW);
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <Grid container key={index} spacing={40} style={style}>
          {gamesBy4.map(gameInfo => (
            <Grid key={gameInfo.id} item xs={3}>
              <CardMyGame
                gameInfo={gameInfo}
                addFavorite={props.addFavorite}
                removeFavorite={props.removeFavorite}
                userId={props.userId}
                addImages={props.addImages}
              />
            </Grid>
          ))}
        </Grid>
      </CellMeasurer>
    );
  }

  render() {
    const { props } = this;
    const {
      classes, games, responseGetMyGames,
    } = props;
    this.cache.clearAll();
    return (
      <React.Fragment>
        <AutoSizer>
          {({ height, width }) => (<List
            ref={(node) => { this.list = node; }}
            onScroll={this.handlerScroll}
            className={classes.gridImages}
            width={width}
            deferredMeasurementCache={this.cache}
            height={height - 60}
            rowCount={Math.ceil(games.length / 4)}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.rowRenderer}
            overscanRowCount={3}
            games={games}
          />
          )}
        </AutoSizer>
        {responseGetMyGames.loading === true
          ? (
            <div className={classes.loader}>
              <CircularProgress size={50} />
            </div>
          )
          : null
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MyGames);
