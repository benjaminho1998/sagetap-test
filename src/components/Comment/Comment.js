import React, {useState, useEffect} from 'react';
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
import ReplyIcon from '@mui/icons-material/Reply';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';


//TODO: Figure out how to get user info into comments / ADD REDUX????
const Comment = (props) => {

    const [checked, setChecked] = useState(false);
    
    useEffect(() => {
        console.log('checked', checked);
    }, [checked]);

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

    return (
        <Card className='spacing'>
            <Card.Body>
                <Card.Title className='comment-header'>
                    <Avatar style={{paddingTop: '2.5px', width: '45px', height: '45px'}} {...stringAvatar(props.name)} />
                    <div className='comment-name-date'>
                        <div className='name'>
                            {props.name} 
                            {props.role && <Chip style={{height: '18px', marginLeft: '5px'}} label={props.role} />}
                        </div>
                        <div className='date-created'>{props.dateCreated}</div>
                    </div>
                </Card.Title>
                <Card.Text className='comment-text'>{props.comment}</Card.Text>
                <div className='footer'>
                    <div className='footer-sub'>
                        <Tooltip title='Like Comment'>
                            <div>
                                <UseAnimations reverse={checked} onClick={() => {setChecked(!checked)}} size={30} strokeColor='red' fillColor='red' animation={heart} />
                            </div>
                        </Tooltip>
                        {props.numberOfLikes > 0 && 
                            <Tooltip title='View Likes'>
                                <div className='num-likes'>{props.numberOfLikes}</div>
                            </Tooltip>
                        }
                    </div>
                    <div className='footer-sub'>
                        <Tooltip title='Reply to Comment'>
                            <div>
                                <ReplyIcon></ReplyIcon>
                            </div>
                        </Tooltip>
                        <Tooltip title='Mark as Complete'>
                            <div>
                                <UseAnimations size={30} animation={checkBox} />
                            </div>
                        </Tooltip>
                        <Tooltip title='Edit Comment'>
                            <div>
                                <UseAnimations size={34} animation={edit} />
                            </div>
                        </Tooltip>
                        <Tooltip title='Delete Comment'>
                            <div className='trash-icon'>
                                <UseAnimations size={30} animation={trash2} />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Comment;