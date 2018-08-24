import { connect } from 'react-redux';
import MyGames from '../components/MyGames';
import {
  addFavorite,
  removeFavorite,
  getMyGames,
  clearMyGames,
  addImages,
} from '../../../actions/myGames';


const mapStateToProps = state => ({
  games: state.myGames.games,
  responseGetMyGames: state.myGames.responseGetMyGames,
  userId: state.user.userInfo.id,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: userIdAndGameId => dispatch(addFavorite(userIdAndGameId)),
  removeFavorite: gameId => dispatch(removeFavorite(gameId)),
  getMyGames: offsetAndUserId => dispatch(getMyGames(offsetAndUserId)),
  addImages: dataFromUser => dispatch(addImages(dataFromUser)),
  clearMyGames: () => dispatch(clearMyGames()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGames);
