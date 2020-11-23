// Imports
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// UI Imports
import Dialog from 'material-ui/Dialog';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { fetchPost, editPost, deletePost } from '../../actions/post'

const PostItem = ({ post }) => {
    const dispatch = useDispatch();
    const { location: {pathname}, push } = useHistory();
    const { user: {_id: currentUser} } = useSelector(state => state.user);
    const dbPost = useSelector(state => state.post);
    const [dialogStatus, setDialogStatus] = useState(false);
    const [postEdit, setPostEdit] = useState({
      title: '',
      text: '',
      isLoading: false,
      error: '',
      postId: ''
    });

    useEffect(() => {
        setPostEdit({
            ...postEdit,
            title: dbPost.details.title,
            text: dbPost.details.text,
            isLoading: dbPost.loading,
            error: dbPost.error,
            postId: dbPost.details._id
        });
    }, [dispatch,dbPost]);

    const removePost = (e) => {
        e.preventDefault();
        dispatch(deletePost(post._id));
        push('/');
    }
    
    const editPostTrigger = (e) => {
        e.preventDefault();
        setDialogStatus(true);
        dispatch(fetchPost(post._id));
    }

    const handleOnChange = (e) => {
        setPostEdit({...postEdit,[e.target.name]: e.target.value})
    }

    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={() => setDialogStatus(false)}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={(e) => {
            dispatch(editPost(postEdit,pathname === '/my-posts'));
            setDialogStatus(false);
        }}
        />,
      ];

    const renderCommands = () => {

        if (currentUser === post.userId) {
            return(
                <>
                <div className="button-control">
                    <FlatButton label="Edit" onClick={(e) => editPostTrigger(e)}/>
                    <FlatButton label="Delete" onClick={(e) => removePost(e)}/>
                </div>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={dialogStatus}
                    onRequestClose={() => setDialogStatus(false)}
                    >
                    <div id="form-post">
                        <TextField
                            name="title"
                            value={postEdit.title}
                            onChange={(e) => handleOnChange(e)}
                            floatingLabelText="Title"
                            multiLine={true}
                            rows={1}
                            fullWidth={true}
                        />

                        <TextField
                            name="text"
                            value={postEdit.text}
                            onChange={(e) => handleOnChange(e)}
                            floatingLabelText="Content"
                            multiLine={true}
                            rows={3}
                            fullWidth={true}
                        />
                    </div>
                </Dialog>
                </>
            )
        }
    }

    const renderPostDate = () => {

        let createdAt = "Created: " + moment(post.createdAt).fromNow();
        let modifiedAt = post.lastModified ? "\nModified: " + moment(post.lastModified).fromNow() : '';
        let string = createdAt + modifiedAt;
        return string;
    }

    return(
        <Card>
          <CardTitle title={post.title} subtitle={renderPostDate()} subtitleStyle={{whiteSpace: 'pre-wrap'}}/>
          <CardText>{post.text}</CardText>
          {renderCommands()}
        </Card>
    )
}

export default PostItem; 