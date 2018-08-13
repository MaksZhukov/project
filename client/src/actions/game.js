import { createAction } from 'redux-actions';
import { game } from '../actionTypes';

export const getDataFilters = createAction(game.GET_DATA_FILTERS.ACTION);
export const getDataFiltersSuccess = createAction(game.GET_DATA_FILTERS.SUCCESS);
export const getDataFiltersError = createAction(game.GET_DATA_FILTERS.ERROR);
export const getDataFiltersLoading = createAction(game.GET_DATA_FILTERS.LOADING);

export const getDataGames = createAction(game.GET_DATA_GAMES.ACTION);
export const getDataGamesSuccess = createAction(game.GET_DATA_GAMES.SUCCESS);
export const getDataGamesError = createAction(game.GET_DATA_GAMES.ERROR);
export const getDataGamesLoading = createAction(game.GET_DATA_GAMES.LOADING);

export const changeData = createAction('CHANGE_DATA');
export const resetData = createAction('RESET_DATA');
