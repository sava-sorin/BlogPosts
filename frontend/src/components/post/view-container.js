// Imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// App Imports
import { fetchPost } from '../../actions/post';
import Loading from '../loading';
import PostView from './view';

const PostViewContainer = () => {
  const dispatch = useDispatch();
  const { post } = useSelector(state => state);
  const { postId } = useParams();

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch,postId]);

  return(
    <section>
      <h2>Post</h2>

      <br/>

      {post.loading ? <Loading/> : <PostView post={post.details}/>}
    </section>
  )
}

export default PostViewContainer;
