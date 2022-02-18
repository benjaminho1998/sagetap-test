import { combineReducers } from 'redux';
import commentsReducer from './commentsReducer';
import userReducer from './userReducer';

//combines the two reducers into one to be used by the store
export default combineReducers({
  comments: commentsReducer,
  user: userReducer
});