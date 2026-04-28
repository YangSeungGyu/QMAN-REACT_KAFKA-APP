import { combineReducers } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';

const rootReducer = combineReducers({
  post: postReducer,
});

export default rootReducer;