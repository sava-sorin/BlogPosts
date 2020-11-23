// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// UI Imports
import PostItem from './post-item';

function PostList ({posts}) {
  const emptyMessage = (
    <p>No posts to show.</p>
  )

  const postsList = (
    posts.map((post) => (
      <Link to={`/post/${ post._id }`} className="post-item" key={post._id}>
        <PostItem post={post} />
      </Link>
    ))
  )

  return (
    <div className="posts-list">
      {posts.length === 0 ? emptyMessage : postsList}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostList;
