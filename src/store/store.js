import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducers/index';

const initalState = {}

const middleware = [thunk];

//creates the store with the reducer, initial state and middleware
const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;