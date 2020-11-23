// Imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// App Imports
import { fetchUserPosts } from '../../actions/post';
import Loading from '../loading';
import PostList from './list';

const MyPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchUserPosts());
    }, [dispatch]);

    return (
        <section>
          <h2>My Posts</h2>
  
          <br/>
  
          {posts.loading ? <Loading/> : <PostList posts={posts.list}/>}
        </section>
    )
}

export default MyPosts;
  