import React from 'react';
import './Likes.css';
import AvatarIcon from '../../AvatarIcon/AvatarIcon';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
                                <AvatarIcon name={liker} />
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