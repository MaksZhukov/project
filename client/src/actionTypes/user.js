import { defineAction } from 'redux-define';
import SUB_ACTIONS_TYPES from '../constants';

const SIGNUP_USER = defineAction('SIGNUP_USER', SUB_ACTIONS_TYPES);
const FORGOT_PASS_USER = defineAction('FORGOT_PASS_USER', SUB_ACTIONS_TYPES);
const TOKEN_PASS_CHANGE_USER = defineAction('TOKEN_PASS_CHANGE_USER', SUB_ACTIONS_TYPES);
export default { SIGNUP_USER, FORGOT_PASS_USER, TOKEN_PASS_CHANGE_USER };
