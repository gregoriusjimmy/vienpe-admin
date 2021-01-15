import { createStore, applyMiddleware, Middleware } from 'redux'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import { rootReducer } from './root-reducer'

let middlewares: Middleware[] = [ReduxThunk]

if (process.env.NODE_ENV === 'development') middlewares.push(logger)

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
