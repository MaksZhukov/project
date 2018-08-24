import { defineAction } from 'redux-define';
import { SUB_ACTIONS_TYPES } from '../constants';

const ADD_FAVORITE = defineAction('ADD_FAVORITE', SUB_ACTIONS_TYPES);
const REMOVE_FAVORITE = defineAction('REMOVE_FAVORITE', SUB_ACTIONS_TYPES);
const GET_MY_GAMES = defineAction('GET_MY_GAMES', SUB_ACTIONS_TYPES);
const ADD_IMAGES = defineAction('ADD_IMAGES', SUB_ACTIONS_TYPES);
export default {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_MY_GAMES,
  ADD_IMAGES,
};
