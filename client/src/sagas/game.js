import {
  put, call, takeLatest,
} from 'redux-saga/effects';
import {
  getDataFiltersError, getDataFiltersLoading, getDataFiltersSuccess,
  getDataGamesError, getDataGamesLoading, getDataGamesSuccess,
} from '../actions/game';
import game from '../actionTypes/game';
import apiGame from '../api/game';

function* fetchResponseGetDataFilters(action) {
  try {
    yield put(getDataFiltersLoading({ loading: true }));
    const responseGetDataFilters = yield call(apiGame.fetchResponseGetDataFilters, action.payload);
    responseGetDataFilters.loading = false;
    yield put(getDataFiltersSuccess(responseGetDataFilters));
  } catch (err) {
    yield put(getDataFiltersError({ loading: false }));
  }
}

function* fetchResponseGetDataGames(action) {
  try {
    yield put(getDataGamesLoading({ loading: true }));
    const responseGetDataGames = yield call(apiGame.fetchResponseGetDataGames, action.payload);
    responseGetDataGames.loading = false;
    yield put(getDataGamesSuccess(responseGetDataGames));
  } catch (err) {
    yield put(getDataGamesError({ loading: false }));
  }
}


export default [
  takeLatest(game.GET_DATA_FILTERS.ACTION, fetchResponseGetDataFilters),
  takeLatest(game.GET_DATA_GAMES.ACTION, fetchResponseGetDataGames),
];
