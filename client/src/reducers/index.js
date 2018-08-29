import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import game from './game';
import myGames from './myGames';
import chat from './chat';

export default combineReducers({
  user,
  game,
  myGames,
  chat,
  routing: routerReducer,
});
