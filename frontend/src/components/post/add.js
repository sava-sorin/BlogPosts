// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// UI Imports
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, red500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';

// App Imports
import { postPost } from '../../actions/post';
import AuthRedirect from '../user/auth-redirect';
import Loading from '../loading';

class PostAdd extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
      isLoading: false,
      error: '',
      notification: false,
      viewPost: false,
      postId: ''
    }
  }

  onSubmit (event) {
    event.preventDefault();

    this.setState({isLoading: true});

    let input = {};
    input.title = this.state.title;
    input.text = this.state.text;

    if (input.title !== '' && input.text !== '') {
      this.props.postPost(input).then((response) => {
        if (response.success) {
          this.setState({isLoading: false, notification: true,title: '', text: '', error: '', postId: response.data.postId});
        } else {
          this.setState({isLoading: false, error: response.errors[0].message});
        }
      })
    } else {
      this.setState({isLoading: false, error: 'All post fields cannot be empty.', notification: false});
    }
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <section>
        <h2>Post to the world</h2>

        <br/>

        {this.state.error ? <Card><CardText color={red500}>{this.state.error}</CardText></Card> : ''}

        {this.state.message ? <Card><CardText color={blue500}>{this.state.message}</CardText></Card> : ''}

        <form id="form-post" onSubmit={this.onSubmit.bind(this)}>
          <TextField
            name="title"
            value={this.state.title}
            onChange={this.onChange.bind(this)}
            floatingLabelText="Title"
            multiLine={true}
            rows={1}
            fullWidth={true}
          />

          <TextField
            name="text"
            value={this.state.text}
            onChange={this.onChange.bind(this)}
            floatingLabelText="Content"
            multiLine={true}
            rows={3}
            fullWidth={true}
          />

          {this.state.isLoading ? <Loading/> : <RaisedButton label="Submit" type="submit" backgroundColor={blue500} />}
        </form>

        <Snackbar
          open={this.state.notification}
          message="Post has been posted"
          autoHideDuration={4000}
          action="View Post"
          onActionClick={() => (this.setState({viewPost: true}))}
        />

        {this.state.viewPost ? <Redirect to={`/post/${ this.state.postId }`}/> : ''}

        <AuthRedirect/>
      </section>
    )
  }
}

PostAdd.propTypes = {
  postPost: PropTypes.func.isRequired
}

export default connect(null, {postPost})(PostAdd);
