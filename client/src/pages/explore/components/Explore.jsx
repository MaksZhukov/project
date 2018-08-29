import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-virtualized/styles.css';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import Filters from './Filters';
import CardGame from './CardGame';
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
class Explore extends React.PureComponent {
  state = {
    heightHeaderAndFilter: 148,
  }

  componentWillMount() {
    const { props } = this;
    props.getDataFilters();
    props.getDataGames({ search: props.search, filters: props.filters });
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  }

  componentWillUnmount() {
    const { props } = this;
    const { resetData } = props;
    resetData(['games', 'search']);
  }

  handlerScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    const { props } = this;
    const {
      responseGetDataGames, games, filters, search,
    } = props;
    if (!responseGetDataGames.loading
      && responseGetDataGames.games && !responseGetDataGames.games.length) {
      return;
    }
    if (!responseGetDataGames.loading
      && scrollTop >= scrollHeight - clientHeight - OFFSET_SCROLL_LIST_BOTTOM) {
      props.getDataGames({ offset: games.length, search, filters });
    }
  }

  UpdateHeightHeaderAndFilter = (value) => {
    this.setState({ heightHeaderAndFilter: value });
  }

  resetCacheList = () => {
    this.cache.clearAll();
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
              <CardGame
                gameInfo={gameInfo}
                userId={props.userId}
                addFavorite={props.addFavorite}
                removeFavorite={props.removeFavorite}
              />
            </Grid>
          ))}
        </Grid>
      </CellMeasurer>
    );
  }

  render() {
    const { props, state } = this;
    const {
      classes, games, getDataGames, resetData,
      responseGetDataFilters, search, filters, responseGetDataGames,
    } = props;
    return (
      <React.Fragment>
        <Filters
          responseGetDataFilters={responseGetDataFilters}
          changeData={props.changeData}
          getDataGames={getDataGames}
          resetData={resetData}
          search={search}
          filters={filters}
          UpdateHeightHeaderAndFilter={this.UpdateHeightHeaderAndFilter}
          resetCacheList={this.resetCacheList}
        />
        <AutoSizer>
          {({ height, width }) => (<List
            onScroll={this.handlerScroll}
            className={classes.gridImages}
            width={width}
            deferredMeasurementCache={this.cache}
            height={height - state.heightHeaderAndFilter}
            rowCount={Math.ceil(games.length / COUNT_GAMES_ON_ROW)}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.rowRenderer}
            overscanRowCount={3}
            games={games}
          />
          )}
        </AutoSizer>
        {responseGetDataGames.loading === true
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

export default withStyles(styles)(Explore);
