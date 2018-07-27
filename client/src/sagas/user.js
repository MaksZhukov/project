import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import {
  signUpError, signUpLoading, signUpSuccess,
  forgotPassError, forgotPassLoading, forgotPassSuccess,
} from '../actions/user';
import user from '../actionTypes/user';
import apiUser from '../api/user';

function* fetchResponseSignUp(action) {
  try {
    yield put(signUpLoading('loading'));
    const responseSignUp = yield call(apiUser.fetchResponseSignUp, action.payload);
    yield put(signUpSuccess(responseSignUp));
  } catch (err) {
    yield put(signUpError());
  }
}


function* fetchResponseForgotPass(action) {
  try {
    yield put(forgotPassLoading('loading'));
    const responseForgotPass = yield call(apiUser.fetchResponseForgotPass, action.payload);
    yield put(forgotPassSuccess(responseForgotPass));
  } catch (err) {
    yield put(forgotPassError());
  }
}

function* watchLastSagas() {
  yield all([
    takeLatest(user.FORGOT_PASS_USER.ACTION, fetchResponseForgotPass),
    takeLatest(user.SIGNUP_USER.ACTION, fetchResponseSignUp),
  ]);
}


export default watchLastSagas;
