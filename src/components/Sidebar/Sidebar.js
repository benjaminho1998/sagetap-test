import React from 'react';
import Comment from '../Comment/Comment';
import './Sidebar.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { v4 as uuidv4 } from 'uuid';

//Sidebar is the container for the comments and their states
const Sidebar = (props) => {

    //Passing down the comments prop
    const comments = props.comments;

    return (
        <Offcanvas show={props.show} onHide={props.handleShow} placement='end' backdrop={false}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Comments ({comments.length})</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {comments.map((comment, i) =>
                    <Comment key={uuidv4()} name={comment.name} comment={comment.comment} dateCreated={comment.dateCreated} numberOfLikes={comment.numberOfLikes} role={comment.role} />
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Sidebar;