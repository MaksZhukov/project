import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import rootSaga from './sagas';


const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));
const store = createStore(rootReducer, composeWithDevTools(middleware));
sagaMiddleware.run(rootSaga);


export { store, history };
