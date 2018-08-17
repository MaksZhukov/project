import {
  put, call, takeLatest,
} from 'redux-saga/effects';
import {
  addFavoriteError, addFavoriteLoading, addFavoriteSuccess,
  removeFavoriteError, removeFavoriteLoading, removeFavoriteSuccess,
  getMyGamesError, getMyGamesLoading, getMyGamesSuccess,
  addImagesError, addImagesLoading, addImagesSuccess,
  removeMyGame,
} from '../actions/myGames';
import { changeGameFavorite } from '../actions/game';
import myGames from '../actionTypes/myGames';
import apiMyGames from '../api/myGames';

function* fetchResponseAddFavorite(action) {
  try {
    yield put(addFavoriteLoading({ loading: true }));
    const responseAddFavorite = yield call(apiMyGames.fetchResponseAddFavorite, action.payload);
    responseAddFavorite.loading = false;
    yield put(addFavoriteSuccess(responseAddFavorite));
    yield put(changeGameFavorite(responseAddFavorite.gameId));
  } catch (err) {
    yield put(addFavoriteError({ loading: false }));
  }
}

function* fetchResponseRemoveFavorite(action) {
  try {
    yield put(removeFavoriteLoading({ loading: true }));
    const responseRemoveFavorite = yield call(
      apiMyGames.fetchResponseRemoveFavorite,
      action.payload,
    );
    responseRemoveFavorite.loading = false;
    yield put(removeFavoriteSuccess(responseRemoveFavorite));
    yield put(changeGameFavorite(responseRemoveFavorite.gameId));
    yield put(removeMyGame(responseRemoveFavorite.gameId));
  } catch (err) {
    yield put(removeFavoriteError({ loading: false }));
  }
}

function* fetchResponseGetMyGames(action) {
  try {
    yield put(getMyGamesLoading({ loading: true }));
    const responseGetMyGames = yield call(
      apiMyGames.fetchResponseGetMyGames,
      action.payload,
    );
    responseGetMyGames.loading = false;
    yield put(getMyGamesSuccess(responseGetMyGames));
  } catch (err) {
    yield put(getMyGamesError({ loading: false }));
  }
}

function* fetchResponseAddImages(action) {
  try {
    yield put(addImagesLoading({ loading: true }));
    const responseAddImages = yield call(
      apiMyGames.fetchResponseAddImages,
      action.payload,
    );
    responseAddImages.loading = false;
    yield put(addImagesSuccess(responseAddImages));
  } catch (err) {
    yield put(addImagesError({ loading: false }));
  }
}

export default [
  takeLatest(myGames.ADD_FAVORITE.ACTION, fetchResponseAddFavorite),
  takeLatest(myGames.REMOVE_FAVORITE.ACTION, fetchResponseRemoveFavorite),
  takeLatest(myGames.GET_MY_GAMES.ACTION, fetchResponseGetMyGames),
  takeLatest(myGames.ADD_IMAGES.ACTION, fetchResponseAddImages),
];
