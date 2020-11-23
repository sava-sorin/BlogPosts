// Imports
import { combineReducers } from 'redux';

// App Imports
import user from './user';
import { posts, post } from './posts';

export default combineReducers({
  user,
  posts,
  post
});
