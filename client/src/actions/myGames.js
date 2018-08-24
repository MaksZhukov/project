import { createAction } from 'redux-actions';
import { myGames } from '../actionTypes';

export const addFavorite = createAction(myGames.ADD_FAVORITE.ACTION);
export const addFavoriteSuccess = createAction(myGames.ADD_FAVORITE.SUCCESS);
export const addFavoriteError = createAction(myGames.ADD_FAVORITE.ERROR);
export const addFavoriteLoading = createAction(myGames.ADD_FAVORITE.LOADING);

export const removeFavorite = createAction(myGames.REMOVE_FAVORITE.ACTION);
export const removeFavoriteSuccess = createAction(myGames.REMOVE_FAVORITE.SUCCESS);
export const removeFavoriteError = createAction(myGames.REMOVE_FAVORITE.ERROR);
export const removeFavoriteLoading = createAction(myGames.REMOVE_FAVORITE.LOADING);

export const getMyGames = createAction(myGames.GET_MY_GAMES.ACTION);
export const getMyGamesSuccess = createAction(myGames.GET_MY_GAMES.SUCCESS);
export const getMyGamesError = createAction(myGames.GET_MY_GAMES.ERROR);
export const getMyGamesLoading = createAction(myGames.GET_MY_GAMES.LOADING);

export const addImages = createAction(myGames.ADD_IMAGES.ACTION);
export const addImagesSuccess = createAction(myGames.ADD_IMAGES.SUCCESS);
export const addImagesError = createAction(myGames.ADD_IMAGES.ERROR);
export const addImagesLoading = createAction(myGames.ADD_IMAGES.LOADING);

export const removeMyGame = createAction('REMOVE_MY_GAME');
export const clearMyGames = createAction('CLEAR_MY_GAMES');
