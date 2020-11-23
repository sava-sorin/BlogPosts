// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Imports
import { fetchPosts } from '../../actions/post';
import Loading from '../loading';
import PostList from './list';

class PostListContainer extends Component {
  componentDidMount () {
    this.props.fetchPosts();
  }


  render () {

    return (
      <section>
        <h2>Posts</h2>

        <br/>

        {this.props.posts.loading ? <Loading/> : <PostList posts={this.props.posts.list}/>}
      </section>
    )
  }
}

PostListContainer.propTypes = {
  posts: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func.isRequired
}

function postsState (state) {
  return {
    posts: state.posts
  }
}

export default connect(postsState, {fetchPosts})(PostListContainer);
