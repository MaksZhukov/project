import { createAction } from 'redux-actions';
import { SIGNUP_USER } from '../actionTypes';
export const signUp = createAction(SIGNUP_USER);
export const signUpSuccess = createAction(SIGNUP_USER.SUCCESS);
export const signUpError = createAction(SIGNUP_USER.ERROR);
export const signUpLoading = createAction(SIGNUP_USER.LOADING);
