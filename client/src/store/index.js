import { createStore, applyMiddleware } from 'redux'
import logger from './middleware/logger'
import thunk from 'redux-thunk'
import rootReducers from "./reducers/rootReducer"


let store = createStore(rootReducers, applyMiddleware(thunk, logger))

export default store