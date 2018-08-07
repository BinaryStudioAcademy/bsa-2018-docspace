import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import history from './history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
))

export { store, sagaMiddleware }
