import { defineAction } from 'redux-define';
import { SUB_ACTIONS_TYPES } from '../constants';

const GET_MESSAGE = defineAction('GET_MESSAGE', SUB_ACTIONS_TYPES);
const GET_ALL_MESSAGES = defineAction('GET_ALL_MESSAGES', SUB_ACTIONS_TYPES);
const SEND_MESSAGE = defineAction('SEND_MESSAGE', SUB_ACTIONS_TYPES);
const START_CONNECT = defineAction('START_CONNECT');
const END_CONNECT = defineAction('END_CONNECT');
export default {
  GET_MESSAGE,
  GET_ALL_MESSAGES,
  SEND_MESSAGE,
  START_CONNECT,
  END_CONNECT,
};
