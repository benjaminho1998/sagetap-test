import React, { useState } from 'react';
import './Comment.css';
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import CommentIcon from '../CommentIcon/CommentIcon';
import Card from 'react-bootstrap/Card';
import heart from 'react-useanimations/lib/heart';
import checkBox from 'react-useanimations/lib/checkBox';
import edit from 'react-useanimations/lib/edit';
import trash2 from 'react-useanimations/lib/trash2';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ReplyIcon from '@mui/icons-material/Reply';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { deleteComment, acknowledgeComment, pinComment } from '../../store/actions/commentsAction';

const Comment = (props) => { 
    const dispatch = useDispatch();

    //Snackbar code
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //State init
    const [pinned, setPinned] = useState(false); //pinned: boolean = pinned state of comment
    const [openSnackbar, setOpenSnackbar] = useState(false); //openSnackbar: boolean = snackbar state for pinning action
    const [liked, setLiked] = useState(false); //liked: boolean = liked state of comment

    //getting states from redux store
    const firstName = useSelector(state => state.user.user.firstName); 
    const lastName = useSelector(state => state.user.user.lastName);
    const completedTmp = useSelector(state => state.comments.comments.comments.map((comment) => comment.id === props.id && comment.acknowledged), shallowEqual);
    
    //logic and formatting
    const completed = completedTmp.includes(true); 
    const name = firstName + ' ' + lastName;

    //calls the prop function to raise the comment id 
    const handleReply = () => {
        props.handleReply(props.id);
    };

    //calls the prop function to raise the comment id 
    const handleViewLikes = () => {
        props.handleViewLikes(props.id);
    };

    //Could just send to redux, but also want active user name, so send to Sidebar then to redux
    const handleLike = () => {
        if(liked) {
            setLiked(false);
            props.handleUnlike(props.id, -1);
        } else {
            setLiked(true);
            props.handleLike(props.id, 1);
        }
    };

    //dispatches action to delete comment with specific id
    const handleDelete = () => {
        dispatch(deleteComment(props.id));
    };

    //dispatches action to acknowledge comment with specific id
    const handleComplete = () => {
        dispatch(acknowledgeComment(props.id));
    };

    //dispatches action to pin comment with specific id
    const handlePin = () => {
        setPinned(true);
        setOpenSnackbar(true);
        dispatch(pinComment(props.id));
    };

    //handle closing the snackbar
    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <Card className='spacing'>
            <Card.Body>
                <Card.Title className='comment-header'>
                    <AvatarIcon name={props.name} />
                    <div className='comment-name-date'>
                        <div className='name'>
                            {props.name} 
                            {(props.role !== 'None' && props.role === 'Sagetapper') && <Chip style={{height: '18px', marginLeft: '5px', marginBottom: '1.5px'}} color='primary' label={props.role} />}
                            {(props.role !== 'Sagetapper' && props.role !== 'None') && <Chip style={{height: '18px', marginLeft: '5px', marginBottom: '1.5px'}} label={props.role} />}
                        </div>
                        <div className='date-created'>{props.dateCreated}</div>
                    </div>
                </Card.Title>
                <Card.Text className='comment-text'>{props.comment}</Card.Text>
                <div className='footer'>
                    <div className='footer-sub'>
                        <CommentIcon handleFunction={handleLike} icon='heart' animation={heart} />
                        {props.numberOfLikes > 0 && 
                            <Tooltip title='View Likes'>
                                <div onClick={handleViewLikes} className='num-likes'>{props.numberOfLikes}</div>
                            </Tooltip>
                        }
                        {completed &&
                            <Chip label="Completed" color="success" size='small' variant='outlined' style={{marginLeft: '8px'}} />
                        }
                        {pinned &&
                            <Chip label="Pinned" color="secondary" size='small' variant='outlined' style={{marginLeft: completed ? '3px': '8px'}} />
                        }
                    </div>
                    <div className='footer-sub'>
                        <Tooltip title='Reply to Comment'>
                            <div>
                                <ReplyIcon style={{color: '#676767'}} onClick={handleReply} className='pointer'></ReplyIcon>
                            </div>
                        </Tooltip>
                        <CommentIcon handleFunction={handleComplete} icon='checkBox' animation={checkBox} />
                        <Tooltip title='Pin Comment'>
                            <div>
                                <PushPinOutlinedIcon style={{color: '#676767'}} aria-label='handlePin' onClick={handlePin} className='pointer'></PushPinOutlinedIcon>
                            </div>
                        </Tooltip>
                        {props.name === name &&
                            <div className='hidden-icons'>
                                <CommentIcon handleFunction={null} icon='edit' animation={edit} />
                                <CommentIcon handleFunction={handleDelete} icon='trash2' animation={trash2} />
                            </div>
                        }
                    </div>
                </div>
            </Card.Body>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Comment pinned!
                </Alert>
            </Snackbar>
        </Card>
    );
};

//memoized to prevent it from rerendering everytime the sidebar input changes
export default React.memo(Comment);