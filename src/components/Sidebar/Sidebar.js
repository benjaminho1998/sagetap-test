import React from 'react';
import Comment from '../Comment/Comment';
import './Sidebar.css';
import Offcanvas from 'react-bootstrap/Offcanvas';

//Sidebar is the container for the comments and their states
const Sidebar = (props) => {

    //Passing down the comments prop
    const comments = props.comments;

    return (
        <Offcanvas show={props.show} onHide={props.handleClick} placement='end' backdrop={false}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Comments ({comments.length})</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {comments.map((comment, i) =>
                    //TODO: add lodash key
                    <Comment key={i} name={comment.name} comment={comment.comment} dateCreated={comment.dateCreated} />
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Sidebar;