import { handleActions } from 'redux-actions';
import {
  signUpSuccess, signUpError, signUpLoading, forgotPassSuccess, forgotPassError, forgotPassLoading, checkTokenChangePassError, checkTokenChangePassSuccess, checkTokenChangePassLoading, changePassError, changePassLoading, changePassSuccess,
} from '../actions/user';

const defaultState = {
  responseSignUp: { },
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
},
defaultState);


export default reducer;
