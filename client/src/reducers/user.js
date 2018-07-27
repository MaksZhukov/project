import { handleActions } from 'redux-actions';
import {
  signUpSuccess, signUpError, signUpLoading, forgotPassSuccess, forgotPassError, forgotPassLoading,
} from '../actions/user';

const defaultState = {};
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
},
defaultState);


export default reducer;
