import { handleActions } from 'redux-actions';
import {
  signUpSuccess, signUpError, signUpLoading,
  forgotPassSuccess, forgotPassError, forgotPassLoading,
  checkTokenChangePassError, checkTokenChangePassSuccess, checkTokenChangePassLoading,
  changePassError, changePassLoading, changePassSuccess,
  signInError, signInLoading, signInSuccess,
} from '../actions/user';

const defaultState = {
  responseSignUp: { },
  responseSignIn: {},
  responseForgotPass: { },
  responseCheckTokenChangePass: { },
  responseChangePass: { },
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
  [signInSuccess](state, { payload: responseSignIn }) {
    return { ...state, responseSignIn };
  },
  [signInError](state, { payload: responseSignIn }) {
    return { ...state, responseSignIn };
  },
  [signInLoading](state, { payload: responseSignIn }) {
    return { ...state, responseSignIn };
  },
},
defaultState);


export default reducer;
