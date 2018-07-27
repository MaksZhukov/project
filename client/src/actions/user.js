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

export const checkTokenChangePass = createAction(user.TOKEN_PASS_CHANGE_USER.ACTION);
export const checkTokenChangePassSuccess = createAction(user.FORGOT_PASS_USER.SUCCESS);
export const checkTokenChangePassError = createAction(user.FORGOT_PASS_USER.ERROR);
export const checkTokenChangePassSuccessLoading = createAction(user.FORGOT_PASS_USER.LOADING);
