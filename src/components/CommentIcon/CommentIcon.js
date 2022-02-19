import React from 'react';
import UseAnimations from 'react-useanimations';
import Tooltip from '@mui/material/Tooltip';

const CommentIcon = (props) => {

    const icon = props.icon;
    const color = icon === 'heart' ? 'red': 'black';
    const size = icon === 'edit' ? 34: 30;

    let title = '';
    if(icon === 'heart') {
        title = 'Like Comment';
    }
    if(icon === 'checkBox') {
        title = 'Mark as Complete';
    }
    if(icon === 'edit') {
        title = 'Edit Comment';
    }
    if(icon === 'trash2') {
        title = 'Delete Comment';
    }

    return (
        <Tooltip title={title}>
            <div>
                <UseAnimations 
                    className='pointer' 
                    onClick={props.handleFunction && props.handleFunction} 
                    size={size} strokeColor={color} 
                    fillColor={color} 
                    animation={props.animation} />
            </div>
        </Tooltip>
    );
}
export default CommentIcon;