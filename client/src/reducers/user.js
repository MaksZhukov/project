import { handleActions } from 'redux-actions';
import {
  signUpSuccess, signUpError, signUpLoading,
  forgotPassSuccess, forgotPassError, forgotPassLoading,
  checkTokenChangePassError, checkTokenChangePassSuccess, checkTokenChangePassLoading,
  changePassError, changePassLoading, changePassSuccess,
  signInError, signInLoading, signInSuccess,
  checkTokenError, checkTokenLoading, checkTokenSuccess,
} from '../actions/user';

const defaultState = {
  userInfo: null,
  responseSignUp: { },
  responseSignIn: {},
  responseForgotPass: { },
  responseCheckTokenChangePass: { },
  responseChangePass: { },
  responseCheckToken: { },
};
const reducer = handleActions({
  [signUpSuccess](state, { payload: responseSignUp }) {
    return { ...state, responseSignUp };
  },
  [signUpError](state, { payload: responseSignUp }) {
    return { ...state, responseSignUp };
  },
  [signUpLoading](state, { payload: responseSignUp }) {
    return { ...state, responseSignUp };
  },
  [forgotPassSuccess](state, { payload: responseForgotPass }) {
    return { ...state, responseForgotPass };
  },
  [forgotPassError](state, { payload: responseForgotPass }) {
    return { ...state, responseForgotPass };
  },
  [forgotPassLoading](state, { payload: responseForgotPass }) {
    return { ...state, responseForgotPass };
  },
  [checkTokenChangePassSuccess](state, { payload: responseCheckTokenChangePass }) {
    return { ...state, responseCheckTokenChangePass };
  },
  [checkTokenChangePassError](state, { payload: responseCheckTokenChangePass }) {
    return { ...state, responseCheckTokenChangePass };
  },
  [checkTokenChangePassLoading](state, { payload: responseCheckTokenChangePass }) {
    return { ...state, responseCheckTokenChangePass };
  },
  [changePassSuccess](state, { payload: responseChangePass }) {
    return { ...state, responseChangePass };
  },
  [changePassError](state, { payload: responseChangePass }) {
    return { ...state, responseChangePass };
  },
  [changePassLoading](state, { payload: responseChangePass }) {
    return { ...state, responseChangePass };
  },
  [signInSuccess](state, { payload: { response, userInfo } }) {
    return { ...state, responseSignIn: response, userInfo };
  },
  [signInError](state, { payload: responseSignIn }) {
    return { ...state, responseSignIn };
  },
  [signInLoading](state, { payload: responseSignIn }) {
    return { ...state, responseSignIn };
  },
  [checkTokenSuccess](state, { payload: { response, userInfo } }) {
    return { ...state, responseCheckToken: response, userInfo };
  },
  [checkTokenError](state, { payload: responseCheckToken }) {
    return { ...state, responseCheckToken };
  },
  [checkTokenLoading](state, { payload: responseCheckToken }) {
    return { ...state, responseCheckToken };
  },
},
defaultState);


export default reducer;
