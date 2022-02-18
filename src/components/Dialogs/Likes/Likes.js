import React from 'react';
import './Likes.css';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';


//Dialog that displays the names of people who've liked a particular comment
const LikesDialog = (props) => {
  const { onClose, open } = props;

  return (
    <div>
        {props.commentObj &&
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>
                    <div className='title-likes'>Likes</div>
                    <div>
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                            >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <List sx={{ pt: 0 }}>
                    {props.commentObj.likers.map((liker, i) => (
                        <ListItem key={i}>
                            <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={liker} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        }
    </div>
  );
}

export default LikesDialog;

LikesDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};