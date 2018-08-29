import { createAction } from 'redux-actions';
import { chat } from '../actionTypes';

export const getAllMessages = createAction(chat.GET_ALL_MESSAGES.ACTION);
export const getAllMessagesSuccess = createAction(chat.GET_ALL_MESSAGES.SUCCESS);
export const getAllMessagesError = createAction(chat.GET_ALL_MESSAGES.ERROR);
export const getAllMessagesLoading = createAction(chat.GET_ALL_MESSAGES.LOADING);

export const sendMessage = createAction(chat.SEND_MESSAGE.ACTION);
export const sendMessageSuccess = createAction(chat.SEND_MESSAGE.SUCCESS);
export const sendMessageError = createAction(chat.SEND_MESSAGE.ERROR);
export const sendMessageLoading = createAction(chat.SEND_MESSAGE.LOADING);

export const startConnect = createAction(chat.START_CONNECT.ACTION);
export const endConnect = createAction(chat.END_CONNECT.ACTION);
