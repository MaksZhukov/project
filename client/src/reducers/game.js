import { handleActions } from 'redux-actions';
import {
  getDataFiltersError, getDataFiltersSuccess, getDataFiltersLoading,
  getDataGamesError, getDataGamesSuccess, getDataGamesLoading,
  changeData, resetData,
} from '../actions/game';
import { RATING } from '../constants';

const defaultState = {
  games: [],
  search: '',
  filters: {
    date: null,
    genre: '',
    platform: '',
    gameEngine: '',
    PEGLRating: '',
    gameMode: '',
    rating: RATING,
  },
  responseGetDataFilters: {},
  responseGetDataGames: {},
};
const reducer = handleActions({
  [getDataFiltersSuccess](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getDataFiltersError](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getDataFiltersLoading](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getDataGamesSuccess](state, { payload: responseGetDataGames }) {
    return {
      ...state,
      responseGetDataGames,
      games: [...state.games, ...responseGetDataGames.games],
    };
  },
  [getDataGamesError](state, { payload: responseGetDataGames }) {
    return { ...state, responseGetDataGames };
  },
  [getDataGamesLoading](state, { payload: responseGetDataGames }) {
    return { ...state, responseGetDataGames };
  },
  [changeData](state, { payload: data }) {
    return { ...state, ...data };
  },
  [resetData](state, { payload: data }) {
    const newState = {};
    data.forEach((element) => {
      newState[element] = defaultState[element];
    });
    return { ...state, ...newState };
  },
},
defaultState);


export default reducer;
