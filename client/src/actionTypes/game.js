import { defineAction } from 'redux-define';
import { SUB_ACTIONS_TYPES } from '../constants';

const GET_DATA_FILTERS = defineAction('GET_DATA_FILTERS', SUB_ACTIONS_TYPES);
const GET_DATA_GAMES = defineAction('GET_DATA_GAMES', SUB_ACTIONS_TYPES);
export default {
  GET_DATA_FILTERS,
  GET_DATA_GAMES,
};
