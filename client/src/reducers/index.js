import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import game from './game';
import myGames from './myGames';

export default combineReducers({
  user,
  game,
  myGames,
  routing: routerReducer,
});
