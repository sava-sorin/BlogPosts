// Imports
import update from 'immutability-helper';

// App Imports
import {SET_USER_POSTS, FETCH_USER_POSTS_BEGIN, SET_POSTS, FETCH_POSTS_BEGIN, SET_POST, FETCH_POST_BEGIN } from '../actions/post';

export function posts (state = {list: [], error: false, loading: false}, action = {}) {
  switch (action.type) {

    case FETCH_POSTS_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });

    case SET_POSTS:
      return update(state, {
        $merge: {
          list: action.posts,
          error: false,
          loading: false
        }
      });

    case FETCH_USER_POSTS_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });
    
    case SET_USER_POSTS:
      return update(state, {
        $merge: {
          list: action.posts,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}

export function post (state = {details: {}, error: false, loading: false}, action = {}) {
  switch (action.type) {

    case FETCH_POST_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      });

    case SET_POST:
      return update(state, {
        $merge: {
          details: action.post,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}
