import { all } from 'redux-saga/effects';
import userSagas from './user';
import gameSagas from './game';
import myGamesSagas from './myGames';
import chat from './chat';

export default function* () {
  yield all([
    ...userSagas,
    ...gameSagas,
    ...myGamesSagas,
    ...chat,
  ]);
}
