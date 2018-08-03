import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { ToastStore } from 'react-toasts';
import {
  signUpError, signUpLoading, signUpSuccess,
  forgotPassError, forgotPassLoading, forgotPassSuccess,
  checkTokenChangePassError, checkTokenChangePassSuccess, checkTokenChangePassLoading,
  changePassError, changePassSuccess, changePassLoading,
  signInError, signInLoading, signInSuccess,
  checkTokenError, checkTokenLoading, checkTokenSuccess,
} from '../actions/user';
import user from '../actionTypes/user';
import apiUser from '../api/user';

function* fetchResponseSignUp(action) {
  try {
    yield put(signUpLoading({ loading: true }));
    const responseSignUp = yield call(apiUser.fetchResponseSignUp, action.payload);
    responseSignUp.loading = false;
    ToastStore[responseSignUp.status](responseSignUp.message);
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
    ToastStore[responseForgotPass.status](responseForgotPass.message);
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
    ToastStore[responseChangePass.status](responseChangePass.message);
    if (responseChangePass.status === 'success') {
      yield put(push('/sign-in'));
    }
  } catch (err) {
    yield put(changePassError({ loading: false }));
  }
}

function* fetchResponseSignIn(action) {
  try {
    yield put(signInLoading({ loading: true }));
    const responseSignIn = yield call(apiUser.fetchResponseSignIn, action.payload);
    responseSignIn.response.loading = false;
    yield put(signInSuccess(responseSignIn));
    if (responseSignIn.response.status === 'success') {
      localStorage.setItem('token', responseSignIn.userInfo.token);
      yield put(push('/'));
    } else {
      ToastStore[responseSignIn.status](responseSignIn.message);
    }
  } catch (err) {
    yield put(signInError({ loading: false }));
  }
}

function* fetchResponseCheckToken(action) {
  try {
    yield put(checkTokenLoading({ loading: true }));
    const responseCheckToken = yield call(apiUser.fetchResponseCheckToken, action.payload);
    responseCheckToken.response.loading = false;
    yield put(checkTokenSuccess(responseCheckToken));
  } catch (err) {
    yield put(checkTokenError({ loading: false }));
  }
}

function* watchLastSagas() {
  yield all([
    takeLatest(user.FORGOT_PASS_USER.ACTION, fetchResponseForgotPass),
    takeLatest(user.SIGNUP_USER.ACTION, fetchResponseSignUp),
    takeLatest(user.СHECK_TOKEN_CHANGE_PASS_USER.ACTION, fetchResponseCheckTokenChangePass),
    takeLatest(user.CHANGE_PASS_USER.ACTION, fetchResponseChangePass),
    takeLatest(user.SIGNIN_USER.ACTION, fetchResponseSignIn),
    takeLatest(user.СHECK_TOKEN_USER.ACTION, fetchResponseCheckToken),
  ]);
}


export default watchLastSagas;
