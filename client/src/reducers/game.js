import { handleActions } from 'redux-actions';
import {
  getDataFiltersError, getDataFiltersSuccess, getDataFiltersLoading,
  getDataGamesError, getDataGamesSuccess, getDataGamesLoading,
  changeData, resetData, changeGameFavorite,
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
    rating: {
      min: RATING.MIN,
      max: RATING.MAX,
    },
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
  [changeGameFavorite](state, { payload: gameId }) {
    const games = state.games.map((gameInfo) => {
      if (gameInfo && gameInfo.id === gameId) {
        return { ...gameInfo, favorite: !gameInfo.favorite };
      }
      return gameInfo;
    });
    return { ...state, games };
  },
},
defaultState);


export default reducer;
