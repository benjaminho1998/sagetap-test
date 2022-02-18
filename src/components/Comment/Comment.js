import React, { useState } from 'react';
import './Comment.css';
import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import UseAnimations from 'react-useanimations';
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

    const [pinned, setPinned] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [liked, setLiked] = useState(false);

    //getting states from redux store
    const firstName = useSelector(state => state.user.user.firstName); 
    const lastName = useSelector(state => state.user.user.lastName);
    const completedTmp = useSelector(state => state.comments.comments.comments.map((comment) => comment.id === props.id && comment.acknowledged), shallowEqual);
    
    //logic and formatting
    const completed = completedTmp.includes(true); 
    const name = firstName + ' ' + lastName;

    //This function is from https://mui.com/components/avatars/
    //It chooses a different color for the avatar depending on the name
    const stringToColor = (string) => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    //This function is from https://mui.com/components/avatars/
    //It gives each avatar the css styles to change the background color
    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    //calls the prop function to raise the comment id 
    const handleReply = () => {
        props.handleReply(props.id);
    }

    //calls the prop function to raise the comment id 
    const handleViewLikes = () => {
        props.handleViewLikes(props.id);
    }

    //Could just send to redux, but also want active user name, so send to Sidebar then to redux
    const handleLike = () => {
        if(liked) {
            setLiked(false);
            props.handleUnlike(props.id, -1);
        } else {
            setLiked(true);
            props.handleLike(props.id, 1);
        }
    }

    //dispatches action to delete comment with specific id
    const handleDelete = () => {
        dispatch(deleteComment(props.id));
    }

    //dispatches action to acknowledge comment with specific id
    const handleComplete = () => {
        dispatch(acknowledgeComment(props.id));
    }

    //dispatches action to pin comment with specific id
    const handlePin = () => {
        setPinned(true);
        setOpenSnackbar(true);
        dispatch(pinComment(props.id));
    }

    //handle closing the snackbar
    const handleCloseSnackbar = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <Card className='spacing' style={{outline: completed && '1px solid green'}}>
            <Card.Body>
                <Card.Title className='comment-header'>
                    <Avatar style={{width: '45px', height: '45px'}} {...stringAvatar(props.name)} />
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
                        <Tooltip title='Like Comment'>
                            <div>
                                <UseAnimations className='pointer' onClick={handleLike} size={30} strokeColor='red' fillColor='red' animation={heart} />
                            </div>
                        </Tooltip>
                        {props.numberOfLikes > 0 && 
                            <Tooltip title='View Likes'>
                                <div onClick={handleViewLikes} className='num-likes'>{props.numberOfLikes}</div>
                            </Tooltip>
                        }
                        {completed &&
                            <Chip label="Completed" color="success" size='small' variant='outlined' style={{marginLeft: '10px'}} />
                        }
                        {pinned &&
                            <Chip label="Pinned" color="warning" size='small' variant='outlined' style={{marginLeft: completed ? '5px': '10px'}} />
                        }
                    </div>
                    <div className='footer-sub'>
                        <Tooltip title='Reply to Comment'>
                            <div>
                                <ReplyIcon onClick={handleReply} className='pointer'></ReplyIcon>
                            </div>
                        </Tooltip>
                        <Tooltip title='Mark as Complete'>
                            <div>
                                <UseAnimations onClick={handleComplete} className='pointer' size={30} animation={checkBox} />
                            </div>
                        </Tooltip>
                        {props.name === name &&
                            <div className='hidden-icons'>
                                <Tooltip title='Edit Comment'>
                                    <div>
                                        <UseAnimations className='pointer' size={34} animation={edit} />
                                    </div>
                                </Tooltip>
                                <Tooltip title='Delete Comment'>
                                    <div className='trash-icon'>
                                        <UseAnimations onClick={handleDelete} className='pointer' size={30} animation={trash2} />
                                    </div>
                                </Tooltip>
                            </div>
                        }
                        <Tooltip title='Pin Comment'>
                            <div>
                                <PushPinOutlinedIcon onClick={handlePin} className='pointer'></PushPinOutlinedIcon>
                            </div>
                        </Tooltip>
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