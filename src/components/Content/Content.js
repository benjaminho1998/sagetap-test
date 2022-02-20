import React, { useState, useEffect, useCallback } from 'react';
import './Content.css';
import Subheader from '../Subheader/Subheader';
import Sidebar from '../Sidebar/Sidebar';
import CreateUser from '../CreateUser/CreateUser';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getComments } from '../../store/actions/commentsAction';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Container for the non-header content part of the app
//Also loads in the json data so that the commentsLength shared state can be passed to subheader and sidebar
const Content = () => {
    
    //Raised the state of "show" to this component because it's used in sidebar and in subheader
    const [show, setShow] = useState(false); //show: boolean =  whether or not to show the sidebar
    const [openSnackbar, setOpenSnackbar] = useState(false); //openSnackbar: boolean whether or not to show the snackbar

    //When Content mounts, dispatch an action to get the base comments from the store
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    //Getting the comments from the redux store
    const commentsList = useSelector(state => state.comments, shallowEqual);
    const {loading, error, comments} = commentsList;
    const tmpComments = comments.comments;

    //Sets the show state variable to the opposite of what it currently is
    const handleShow = useCallback(() => {
        setShow(!show);
    }, [show]);

    //Snackbar code
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //handle opening the snackbar
    const handleClick = () => {
        setOpenSnackbar(true);
    };

    //handle closing the snackbar
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <div className='content-container'>
            {loading 
                ? 'Loading'
                : error 
                    ? error.message :
                    <div>
                        <Subheader commentsLength={tmpComments.length} handleShow={handleShow} />
                        <Sidebar show={show} handleShow={handleShow} />
                        <div className='centered'>
                            <CreateUser handleClick={handleClick} />
                        </div>
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Active user updated!
                            </Alert>
                        </Snackbar>
                    </div>
            }
        </div>
    );
};

export default Content;