import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import {
  signUpError, signUpLoading, signUpSuccess,
  forgotPassError, forgotPassLoading, forgotPassSuccess, checkTokenChangePassError, checkTokenChangePassSuccess, checkTokenChangePassLoading, changePassError, changePassSuccess, changePassLoading,
} from '../actions/user';
import user from '../actionTypes/user';
import apiUser from '../api/user';

function* fetchResponseSignUp(action) {
  try {
    yield put(signUpLoading({ loading: true }));
    const responseSignUp = yield call(apiUser.fetchResponseSignUp, action.payload);
    responseSignUp.loading = false;
    yield put(signUpSuccess(responseSignUp));
  } catch (err) {
    yield put(signUpError({ loading: false }));
  }
}


function* fetchResponseForgotPass(action) {
  try {
    yield put(forgotPassLoading({ loading: true }));
    const responseForgotPass = yield call(apiUser.fetchResponseForgotPass, action.payload);
    responseForgotPass.loading = false;
    yield put(forgotPassSuccess(responseForgotPass));
  } catch (err) {
    yield put(forgotPassError({ loading: false }));
  }
}

function* fetchResponseCheckTokenChangePass(action) {
  try {
    yield put(checkTokenChangePassLoading({ loading: true }));
    const responseCheckTokenChangePass = yield call(apiUser.fetchResponseCheckTokenChangePass, action.payload);
    responseCheckTokenChangePass.loading = false;
    yield put(checkTokenChangePassSuccess(responseCheckTokenChangePass));
  } catch (err) {
    yield put(checkTokenChangePassError({ loading: false }));
  }
}

function* fetchResponseChangePass(action) {
  try {
    yield put(changePassLoading({ loading: true }));
    const responseChangePass = yield call(apiUser.fetchResponseChangePass, action.payload);
    responseChangePass.loading = false;
    yield put(changePassSuccess(responseChangePass));
  } catch (err) {
    yield put(changePassError({ loading: false }));
  }
}

function* watchLastSagas() {
  yield all([
    takeLatest(user.FORGOT_PASS_USER.ACTION, fetchResponseForgotPass),
    takeLatest(user.SIGNUP_USER.ACTION, fetchResponseSignUp),
    takeLatest(user.СHECK_TOKEN_CHANGE_PASS_USER.ACTION, fetchResponseCheckTokenChangePass),
    takeLatest(user.CHANGE_PASS_USER.ACTION, fetchResponseChangePass),
  ]);
}


export default watchLastSagas;
