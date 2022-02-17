import React, { useState, useEffect } from 'react';
import './Content.css';
import Subheader from '../Subheader/Subheader';
import Sidebar from '../Sidebar/Sidebar';
import CreateUser from '../CreateUser/CreateUser';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../store/actions/commentsAction';

//Container for the non-header content part of the app
//Also loads in the json data so that the commentsLength shared state can be passed to subheader and sidebar
const Content = () => {

    //Raised the state of "show" to this component because it's used in sidebar and in subheader
    const [show, setShow] = useState(false);

    //When Content mounts, dispatch an action to get the base comments from the store
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);

    const commentsList = useSelector(state => state.comments);
    const {loading, error, comments} = commentsList;
    console.log(comments.comments);
    const tmpComments = comments.comments;

    //Sets the show state variable to the opposite of what it currently is
    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div className='content-container'>
            {loading 
                ? 'Loading'
                : error 
                    ? error.message
                    :<div>
                        <Subheader commentsLength={tmpComments.length} handleShow={handleShow} />
                        <Sidebar comments={tmpComments} show={show} handleShow={handleShow} />
                        <div className='centered'>
                            <CreateUser />
                        </div>
                    </div>
            }
        </div>
    );
}

export default Content;