import { handleActions } from 'redux-actions';
import {
  getAllMessagesError, getAllMessagesSuccess, getAllMessagesLoading,
  getMessageError, getMessageSuccess, getMessageLoading,
  sendMessageError, sendMessageSuccess, sendMessageLoading,
} from '../actions/chat';

const defaultState = {
  messages: [],
  responseGetAllMessages: {},
  responseGetMessage: {},
  responseSendMessage: {},
};
const reducer = handleActions({
  [getAllMessagesSuccess](state, { payload: responseGetAllMessages }) {
    return { ...state, responseGetAllMessages, messages: responseGetAllMessages.messages };
  },
  [getAllMessagesError](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getAllMessagesLoading](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getMessageSuccess](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getMessageError](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [getMessageLoading](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [sendMessageSuccess](state, { payload: responseSendMessage }) {
    return { ...state, responseSendMessage };
  },
  [sendMessageError](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
  [sendMessageLoading](state, { payload: responseGetDataFilters }) {
    return { ...state, responseGetDataFilters };
  },
},
defaultState);


export default reducer;
