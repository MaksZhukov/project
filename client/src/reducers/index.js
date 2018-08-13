import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import game from './game';

export default combineReducers({
  user,
  game,
  routing: routerReducer,
});
