import { handleActions } from 'redux-actions';
import { signUpSuccess, signUpError, signUpLoading } from '../actions/user';

const defaultState = {};
const reducer = handleActions(
  {
    [signUpSuccess]: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
    [signUpError]: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
    [signUpLoading]: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
  },
  defaultState,
);


export default reducer;
