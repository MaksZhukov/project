import { createAction } from 'redux-actions';
import { user } from '../actionTypes';

export const signUp = createAction(user.SIGNUP_USER.ACTION);
export const signUpSuccess = createAction(user.SIGNUP_USER.SUCCESS);
export const signUpError = createAction(user.SIGNUP_USER.ERROR);
export const signUpLoading = createAction(user.SIGNUP_USER.LOADING);

export const forgotPass = createAction(user.FORGOT_PASS_USER.ACTION);
export const forgotPassSuccess = createAction(user.FORGOT_PASS_USER.SUCCESS);
export const forgotPassError = createAction(user.FORGOT_PASS_USER.ERROR);
export const forgotPassLoading = createAction(user.FORGOT_PASS_USER.LOADING);

export const checkTokenChangePass = createAction(user.СHECK_TOKEN_CHANGE_PASS_USER.ACTION);
export const checkTokenChangePassSuccess = createAction(user.СHECK_TOKEN_CHANGE_PASS_USER.SUCCESS);
export const checkTokenChangePassError = createAction(user.СHECK_TOKEN_CHANGE_PASS_USER.ERROR);
export const checkTokenChangePassLoading = createAction(user.СHECK_TOKEN_CHANGE_PASS_USER.LOADING);

export const changePass = createAction(user.CHANGE_PASS_USER.ACTION);
export const changePassSuccess = createAction(user.CHANGE_PASS_USER.SUCCESS);
export const changePassError = createAction(user.CHANGE_PASS_USER.ERROR);
export const changePassLoading = createAction(user.CHANGE_PASS_USER.LOADING);

export const signIn = createAction(user.SIGNIN_USER.ACTION);
export const signInSuccess = createAction(user.SIGNIN_USER.SUCCESS);
export const signInError = createAction(user.SIGNIN_USER.ERROR);
export const signInLoading = createAction(user.SIGNIN_USER.LOADING);
