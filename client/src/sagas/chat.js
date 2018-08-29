import {
  put, call, take, takeLatest, fork, cancel,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  getAllMessagesError, getAllMessagesSuccess, getAllMessagesLoading,
  getMessageError, getMessageSuccess, getMessageLoading,
  sendMessageError, sendMessageSuccess, sendMessageLoading, sendMessage,
  startConnect, endConnect,
} from '../actions/chat';
import chat from '../actionTypes/chat';


const connect = () => {
  const socket = io(config.serverUrl);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = socket => eventChannel((emit) => {
  socket.on(chat.GET_ALL_MESSAGES.ACTION, (data) => {
    emit(getAllMessagesSuccess(data));
  });
  socket.on(chat.SEND_MESSAGE.ACTION, (data) => {
    emit(sendMessageSuccess(data));
  });
  socket.on(chat.GET_MESSAGE.ACTION, (data) => {
    emit(getAllMessagesSuccess(data));
  });
  return () => {

  };
});


function* handleEventResponse(socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* emitSendMessage(socket) {
  while (true) {
    const { payload } = yield take(chat.SEND_MESSAGE.ACTION);
    socket.emit(chat.SEND_MESSAGE.ACTION, payload);
  }
}


function* handleIO(socket) {
  yield fork(emitSendMessage, socket);
  yield fork(handleEventResponse, socket);
}

function* flow() {
  const socket = yield call(connect);
  socket.emit(chat.GET_ALL_MESSAGES.ACTION);
  yield fork(handleIO, socket);
}


export default [
  takeLatest(chat.START_CONNECT.ACTION, flow),
];
