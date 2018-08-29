import { handleActions } from 'redux-actions';
import {
  getAllMessagesError, getAllMessagesSuccess, getAllMessagesLoading,
  sendMessageError, sendMessageSuccess, sendMessageLoading,
} from '../actions/chat';

const defaultState = {
  messages: [],
  responseGetAllMessages: {},
  responseSendMessage: {},
};
const reducer = handleActions({
  [getAllMessagesSuccess](state, { payload: responseGetAllMessages }) {
    return { ...state, responseGetAllMessages, messages: responseGetAllMessages.messages };
  },
  [getAllMessagesError](state, { payload: responseGetAllMessages }) {
    return { ...state, responseGetAllMessages };
  },
  [getAllMessagesLoading](state, { payload: responseGetAllMessages }) {
    return { ...state, responseGetAllMessages };
  },
  [sendMessageSuccess](state, { payload: responseSendMessage }) {
    const messages = state.messages.slice();
    messages.push(responseSendMessage);
    return { ...state, responseSendMessage, messages };
  },
  [sendMessageError](state, { payload: responseSendMessage }) {
    return { ...state, responseSendMessage };
  },
  [sendMessageLoading](state, { payload: responseSendMessage }) {
    return { ...state, responseSendMessage };
  },
},
defaultState);


export default reducer;
