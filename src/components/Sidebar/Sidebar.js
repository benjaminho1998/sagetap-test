import React, { useState, useEffect, useCallback } from 'react';
import Comment from '../Comment/Comment';
import LikesDialog from '../Dialogs/Likes/Likes';
import CommentSelectors from '../CommentSelectors/CommentSelectors';
import './Sidebar.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addComment, likeComment, unlikeComment, sortComments } from '../../store/actions/commentsAction';

//Sidebar is the container for the comments and their states
const Sidebar = (props) => {

    //State init
    const [newComment, setNewComment] = useState(''); //newComment: string = text in comment input
    const [id, setId] = useState(6); //id: number = id counter to give newComments an unique id
    const [disabled, setDisabled] = useState(true); //disabled: boolean = disabled state of button depending on input
    const [replyMode, setReplyMode] = useState(false); //replyMode: boolean = whether or not the user is replying
    const [openViewLikes, setOpenViewLikes] = useState(false); //openViewLikes: boolean = opens dialog to see who liked a comment
    const [viewLikesObj, setViewLikesObj] = useState(); //viewLikesObj: Comment object = the comment object whose likes will be viewed

    //Grabbing info from redux store
    const firstName = useSelector(state => state.user.user.firstName);
    const lastName = useSelector(state => state.user.user.lastName);
    const role = useSelector(state => state.user.user.role);
    const comments = useSelector(state => state.comments.comments.comments, shallowEqual);

    //Constants init
    const addCommentInput = 'Add your comment here as ' + firstName;
    const dispatch = useDispatch();

    //Handle input functions

    //Scrolls to bottom and focuses on input
    const scrollToAdd = () => {
        document.getElementById("focused").focus();
    }

    //Scrolls to top
    const scrollToTop = () => {
        const top = document.getElementById('containerDiv');
        top.scrollTo({top: 0, behavior: 'smooth'});
    }

    //Handles when user presses post comment
    const handlePostComment = () => {
        const newCommentObject = {
            id: id + 1,
            name: firstName + ' ' + lastName,
            dateCreated: createDate(),
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
        setNewComment('');
        setReplyMode(false);
    }

    //handles when comment input is changed
    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    }

    //function to handle reply logic
    const handleReply = useCallback((id) => {
        setReplyMode(true);
        const replyObj = comments.find(obj => obj.id === id);
        setNewComment('@' + replyObj.name + ' - ');
    }, [comments]);

    //function to clear input text
    const handleClearText = () => {
        setNewComment('');
        setReplyMode(false);
    }

    //function to handle view likes
    const handleViewLikes = useCallback((id) => {
        const likeObj = comments.find(obj => obj.id === id);
        setViewLikesObj(likeObj);
        setOpenViewLikes(true);
    }, [comments]);

    //function to close view likes dialog
    const handleClose = (value) => {
        setOpenViewLikes(false);
    };

    //function to handle adding likes
    const handleLike = useCallback((id, num) => {
        const likeInfo = {
            id: id,
            name: firstName + ' ' + lastName,
            num: num
        }
        dispatch(likeComment(likeInfo));
    }, [dispatch, firstName, lastName]);

    //function to handle unliking
    const handleUnlike = useCallback((id, num) => {
        const likeInfo = {
            id: id,
            name: firstName + ' ' + lastName,
            num: num
        }
        dispatch(unlikeComment(likeInfo));
    }, [dispatch, firstName, lastName]);

    const handleCloseSidebar = () => {
        props.handleShow();
    }

    const handleSort = useCallback((sort) => {
        if(sort === 'Likes') {
            dispatch(sortComments('numberOfLikes'))
        }
    }, [dispatch]);

    //Helper functions
    const createDate = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        today = mm + '/' + dd + '/' + yyyy + ' at ' + time;
        return today;
    }
    
    //to check for button disabled value and reply mode
    useEffect(() => {
        if(newComment.length > 0) {
            setDisabled(false);
        } else {
            setReplyMode(false);
            setDisabled(true);
        }

        //If reply gets pressed, scroll to the input box with the prefilled info
        if(replyMode) {
            document.getElementById('focused').focus();
        }
    }, [newComment, replyMode])

    return (
        <div>
            {comments.length > 0 &&
                <Offcanvas show={props.show} onHide={props.handleShow} placement='end' backdrop={false}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <span>Comments ({comments.length})</span>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body id='containerDiv'>
                        <CommentSelectors handleSort={handleSort} />
                        {comments.map((comment) =>
                            <Comment 
                                key={comment.id} 
                                handleViewLikes={handleViewLikes} 
                                handleReply={handleReply} 
                                handleLike={handleLike}
                                handleUnlike={handleUnlike}
                                id={comment.id} 
                                name={comment.name} 
                                comment={comment.comment} 
                                dateCreated={comment.dateCreated} 
                                numberOfLikes={comment.numberOfLikes} 
                                role={comment.role} 
                            />
                        )}
                        <div className='centered'>
                            <Tooltip title='Scroll to Top'>
                                <Button sx={{marginBottom: '12px', marginRight: '7px'}}onClick={scrollToTop}>Back to Top</Button>
                            </Tooltip>
                        </div>
                        <TextField
                            id='focused'
                            onChange={handleNewCommentChange}
                            name='newComment'
                            value={newComment}
                            fullWidth
                            label={addCommentInput}
                            multiline
                            rows={6}
                        />
                        <div className='bottom-buttons'>
                            <Button onClick={handleClearText} variant="text">Clear</Button>
                            <Button disabled={disabled} onClick={handlePostComment} style={{marginTop: '10px'}} variant="contained">Post Comment</Button>
                        </div>
                        <LikesDialog
                            open={openViewLikes}
                            onClose={handleClose}
                            commentObj={viewLikesObj}
                        />
                        <Tooltip title='Add Comment'>
                            <Fab onClick={scrollToAdd} color="primary" aria-label="add comment" style={{position: 'fixed', top: 82.5, right: 32.5}}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </div>
    );
};

export default Sidebar;