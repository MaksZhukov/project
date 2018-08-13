import { all } from 'redux-saga/effects';
import userSagas from './user';
import gameSagas from './game';

export default function* () {
  yield all([
    ...userSagas,
    ...gameSagas,
  ]);
}
