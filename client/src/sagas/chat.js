import {
  put, call, take, takeLatest, fork,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  getAllMessagesError, getAllMessagesSuccess, getAllMessagesLoading,
  sendMessageError, sendMessageSuccess, sendMessageLoading,
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
  return () => { };
});


function* handleEventResponse(socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const action = yield take(channel);
    action.payload.loading = false;
    yield put(action);
  }
}

function* emitEndConnect(socket) {
  while (true) {
    yield take(chat.END_CONNECT.ACTION);
    socket.off(chat.GET_ALL_MESSAGES.ACTION);
    socket.off(chat.SEND_MESSAGE.ACTION);
  }
}

function* emitSendMessage(socket) {
  while (true) {
    const { payload } = yield take(chat.SEND_MESSAGE.ACTION);
    try {
      yield put(sendMessageLoading({ loading: true }));
      socket.emit(chat.SEND_MESSAGE.ACTION, payload);
    } catch (error) {
      yield put(sendMessageError({ loading: false }));
    }
  }
}


function* handleIO(socket) {
  yield fork(emitEndConnect, socket);
  yield fork(emitSendMessage, socket);
  yield fork(handleEventResponse, socket);
}

function* flow() {
  const socket = yield call(connect);
  yield fork(handleIO, socket);
  try {
    yield put(getAllMessagesLoading({ loading: true }));
    socket.emit(chat.GET_ALL_MESSAGES.ACTION);
  } catch (error) {
    yield put(getAllMessagesError({ loading: false }));
  }
}


export default [
  takeLatest(chat.START_CONNECT.ACTION, flow),
];
