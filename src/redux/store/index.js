import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from "redux-thunk";

// Create store
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;