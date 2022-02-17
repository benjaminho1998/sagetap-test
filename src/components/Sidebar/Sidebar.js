import React, { useState } from 'react';
import Comment from '../Comment/Comment';
import './Sidebar.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

//Sidebar is the container for the comments and their states
const Sidebar = React.memo((props) => {

    const [newComment, setNewComment] = useState('');

    //Passing down the comments prop
    const comments = props.comments;
    const firstName = useSelector(state => state.user.user.firstName);

    const addComment = 'Add your comment here as ' + firstName;

    const handlePostComment = () => {
        console.log(newComment);
    }

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    }

    return (
        <Offcanvas show={props.show} onHide={props.handleShow} placement='end' backdrop={false}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Comments ({comments.length})</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {comments.map((comment, i) =>
                    <Comment key={uuidv4()} name={comment.name} comment={comment.comment} dateCreated={comment.dateCreated} numberOfLikes={comment.numberOfLikes} role={comment.role} />
                )}
                <TextField
                    onChange={handleNewCommentChange}
                    name='newComment'
                    value={newComment}
                    fullWidth
                    label={addComment}
                    multiline
                    rows={6}
                />
                <div className='button-float'>
                    <Button onClick={handlePostComment} style={{marginTop: '10px'}} variant="contained">Post Comment</Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
});

export default Sidebar;