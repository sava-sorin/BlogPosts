// App Imports
import config from '../config';

export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const SET_POSTS = 'SET_POSTS';
export const FETCH_USER_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const SET_USER_POSTS = 'SET_POSTS';
export const FETCH_POST_BEGIN = 'FETCH_POST_BEGIN';
export const SET_POST = 'SET_POST';

export function fetchPosts () {
  return dispatch => {
    dispatch({
      type: FETCH_POSTS_BEGIN
    })

    return fetch(`${ config.url.api }posts`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          dispatch({
            type: SET_POSTS,
            posts: response.data
          })
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function fetchUserPosts () {
  const token = localStorage.getItem('token');

  return dispatch => {
    dispatch({
      type: FETCH_USER_POSTS_BEGIN
    })
    return fetch(`${ config.url.api }my-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(function (response) {
        if (response.ok) {
          response.json().then(function (response) {
            dispatch({
              type: SET_USER_POSTS,
              posts: response.data
            })
          })
        } else {
          console.log('Looks like the response wasn\'t perfect, got status', response.status)
        }
      }, function (e) {
        console.log('Fetch failed!', e)
      })
  }
}

export function fetchPost (postId) {
  return dispatch => {
    dispatch({
      type: FETCH_POST_BEGIN
    })

    return fetch(`${ config.url.api }post/${ postId }`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.success) {
            dispatch({
              type: SET_POST,
              post: response.data
            })
          }
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function postPost (post) {
  const token = localStorage.getItem('token');

  return dispatch => {
    return fetch(`${ config.url.api }post/add`, {
      method: 'post',

      body: JSON.stringify(post),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(response => response.json())
  }
}

export function editPost (post,myList = false) {
  const token = localStorage.getItem('token');

  return dispatch => {
    return fetch(`${ config.url.api }edit/${ post.postId }`, {
      method: 'put',

      body: JSON.stringify(post),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(function (response) {
        if (response.ok) {
          
          switch (myList) {
            case true:
              dispatch(fetchUserPosts());
              break;
            default:
              dispatch(fetchPosts());
              break;
          }
        } else {
          console.log('Looks like the response wasn\'t perfect, got status', response.status);
        }
      }, function (e) {
        console.log('Fetch failed!', e);
      })
  }
}

export function deletePost (postId) {

  return dispatch => {
    return fetch(`${ config.url.api }delete/${ postId }`).then(function (response) {
      if (response.ok) {
        dispatch(fetchPosts());
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status);
      }
    }, function (e) {
      console.log('Fetch failed!', e);
    })
  }
}
