import { handleActions } from 'redux-actions';
import {
  addFavoriteError, addFavoriteSuccess, addFavoriteLoading,
  removeFavoriteError, removeFavoriteSuccess, removeFavoriteLoading,
  getMyGamesError, getMyGamesSuccess, getMyGamesLoading,
  addImagesError, addImagesSuccess, addImagesLoading,
  removeMyGame, clearMyGames,
} from '../actions/myGames';

const defaultState = {
  games: [],
  responseAddFavorite: {},
  responseRemoveFavorite: {},
  responseGetMyGames: {},
  responseAddImages: {},
};
const reducer = handleActions({
  [addFavoriteSuccess](state, { payload: responseAddFavorite }) {
    return { ...state, responseAddFavorite };
  },
  [addFavoriteError](state, { payload: responseAddFavorite }) {
    return { ...state, responseAddFavorite };
  },
  [addFavoriteLoading](state, { payload: responseAddFavorite }) {
    return { ...state, responseAddFavorite };
  },
  [removeFavoriteSuccess](state, { payload: responseRemoveFavorite }) {
    return { ...state, responseRemoveFavorite };
  },
  [removeFavoriteError](state, { payload: responseRemoveFavorite }) {
    return { ...state, responseRemoveFavorite };
  },
  [removeFavoriteLoading](state, { payload: responseRemoveFavorite }) {
    return { ...state, responseRemoveFavorite };
  },
  [getMyGamesSuccess](state, { payload: responseGetMyGames }) {
    return {
      ...state,
      responseGetMyGames,
      games: [...state.games, ...responseGetMyGames.games],
    };
  },
  [getMyGamesError](state, { payload: responseGetMyGames }) {
    return { ...state, responseGetMyGames };
  },
  [getMyGamesLoading](state, { payload: responseGetMyGames }) {
    return { ...state, responseGetMyGames };
  },
  [addImagesSuccess](state, { payload: responseAddImages }) {
    const { urls, gameId } = responseAddImages;

    const games = state.games.map((gameInfo) => {
      const game = { ...gameInfo };
      if (game && gameId === game.id) {
        game.photos.push(...urls);
      }
      return game;
    });
    return {
      ...state,
      responseAddImages,
      games,
    };
  },
  [addImagesError](state, { payload: responseAddImages }) {
    return { ...state, responseAddImages };
  },
  [addImagesLoading](state, { payload: responseAddImages }) {
    return { ...state, responseAddImages };
  },
  [removeMyGame](state, { payload: gameId }) {
    const games = state.games.filter(gameInfo => gameInfo.id !== gameId);
    return { ...state, games };
  },
  [clearMyGames](state) {
    const games = [];
    return { ...state, games };
  },
},
defaultState);


export default reducer;
