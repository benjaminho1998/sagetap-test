import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import './Sidebar.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addComment } from '../../store/actions/commentsAction';

//Sidebar is the container for the comments and their states
const Sidebar = (props) => {

    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');
    const [id, setId] = useState(6);
    const [disabled, setDisabled] = useState(true);

    //Passing down the comments prop

    const firstName = useSelector(state => state.user.user.firstName);
    const lastName = useSelector(state => state.user.user.lastName);
    const role = useSelector(state => state.user.user.role);

    const addCommentInput = 'Add your comment here as ' + firstName;
    const comments = useSelector(state => state.comments.comments.comments, shallowEqual);

    const handlePostComment = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        today = mm + '/' + dd + '/' + yyyy + ' at ' + time;
        
        const newCommentObject = {
            id: id + 1,
            name: firstName + ' ' + lastName,
            dateCreated: today,
            comment: newComment,
            edited: false,
            dateEdited: null,
            numberOfLikes: 0,
            likers: [],
            acknowledged: false,
            deleted: false,
            role: role
        }

        dispatch(addComment(newCommentObject));
        setId(id + 1);
    }

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    }

    //componentDidUpdate to check for button disabled value
    useEffect(() => {
        if(newComment.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newComment])

    return (
        <div>
            {comments.length > 0 &&
                <Offcanvas show={props.show} onHide={props.handleShow} placement='end' backdrop={false}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Comments ({comments.length})</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {comments.map((comment) =>
                            <Comment key={comment.id} name={comment.name} comment={comment.comment} dateCreated={comment.dateCreated} numberOfLikes={comment.numberOfLikes} role={comment.role} />
                        )}
                        <TextField
                            onChange={handleNewCommentChange}
                            name='newComment'
                            value={newComment}
                            fullWidth
                            label={addCommentInput}
                            multiline
                            rows={6}
                        />
                        <div className='button-float'>
                            <Button disabled={disabled} onClick={handlePostComment} style={{marginTop: '10px'}} variant="contained">Post Comment</Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </div>
    );
};

export default Sidebar;