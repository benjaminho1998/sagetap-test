import React, { useState, useEffect } from 'react';
import './Content.css';
import Subheader from '../Subheader/Subheader';
import Sidebar from '../Sidebar/Sidebar';
import CreateUser from '../CreateUser/CreateUser';
import axios from 'axios';

//Container for the non-header content part of the app
//Also loads in the json data so that the commentsLength shared state can be passed to subheader and sidebar
const Content = () => {

    //Raised the state of "show" to this component because it's used in sidebar and in subheader
    const [show, setShow] = useState(false);

    //Comments state array to hold base comments and future comments
    const [comments, setComments] = useState([]);

    const [user, setUser] = useState({
        firstName: 'Example',
        lastName: 'User',
        email: 'example@email.com',
        role: 'Software Engineer'
    });

    //Axios get call to retrieve base data
    const getComments = () => {
        axios.get('comments.json')
            .then(res => {
                console.log(res);
                setComments(res.data.comments);
            })
            .catch(err => {
                console.log(err)
            });
    }

    //When Sidebar mounts, get the base data
    useEffect(() => {
        getComments();
    }, []);

    //Sets the show state variable to the opposite of what it currently is
    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div className='content-container'>
            <Subheader commentsLength={comments.length} handleShow={handleShow} />
            <Sidebar comments={comments} show={show} handleShow={handleShow} />
            <div className='create-user-container'>
                <CreateUser />
            </div>
        </div>
    );
}

export default Content;