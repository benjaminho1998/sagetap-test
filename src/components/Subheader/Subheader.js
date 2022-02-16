import React from 'react';
import './Subheader.css';
import CommentIcon from '@mui/icons-material/Comment';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Subheader = (props) => {

    const handleShow = () => {
        props.handleShow();
    }

    return (
        <div className='subheader-container'>
            <span>Demo Project</span>
            <Tooltip title='Open Comments'>
                <IconButton onClick={handleShow} aria-label='comments'>
                    <Badge badgeContent={props.commentsLength} color='error'>
                        <CommentIcon style={{ color: "white" }} color='action' />
                    </Badge>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default Subheader;