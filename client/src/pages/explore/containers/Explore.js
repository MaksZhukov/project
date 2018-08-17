import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Explore from '../components/Explore';
import {
  getDataFilters, getDataGames, changeData, resetData,
} from '../../../actions/game';
import {
  addFavorite,
  removeFavorite,
} from '../../../actions/myGames';


const mapStateToProps = state => ({
  games: state.game.games,
  search: state.game.search,
  filters: state.game.filters,
  userId: state.user.userInfo.id,
  isOpenFilters: state.game.isOpenFilters,
  isDefaultFilters: state.game.isDefaultFilters,
  responseGetDataFilters: state.game.responseGetDataFilters,
  responseGetDataGames: state.game.responseGetDataGames,
});

const mapDispatchToProps = dispatch => ({
  push: path => dispatch(push(path)),
  getDataFilters: () => dispatch(getDataFilters()),
  getDataGames: (filtersAndOffset = {}) => dispatch(getDataGames(filtersAndOffset)),
  addFavorite: userIdAndGameId => dispatch(addFavorite(userIdAndGameId)),
  removeFavorite: gameId => dispatch(removeFavorite(gameId)),
  changeData: data => dispatch(changeData(data)),
  resetData: data => dispatch(resetData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
