// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// UI Imports
import PostItem from './post-item';

function PostView ({post}) {

  return (
    <div>
      <PostItem post={post} />

      <br/>

      <Link to="/">Back to all posts</Link>
    </div>
  )
}

export default PostView;
