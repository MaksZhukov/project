import { all } from 'redux-saga/effects';
import userSagas from './user';
import gameSagas from './game';
import myGamesSagas from './myGames';

export default function* () {
  yield all([
    ...userSagas,
    ...gameSagas,
    ...myGamesSagas,
  ]);
}
