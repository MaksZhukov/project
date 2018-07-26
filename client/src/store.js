import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import rootSaga from './sagas';

let store = null;

export const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  store = createStore(rootReducer, composeWithDevTools(middleware));
  sagaMiddleware.run(rootSaga);
  return store;
};

export const getStore = () => store;
