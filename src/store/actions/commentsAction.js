import { GET_COMMENTS, COMMENTS_ERROR, ADD_COMMENT, LIKE_COMMENT, DELETE_COMMENT, ACKNOWLEDGE_COMMENT, PIN_COMMENT, UNLIKE_COMMENT } from '../types'
import axios from 'axios';

//container for comment actions
export const getComments = () => async dispatch => {
    try{
        const res = await axios.get('comments.json');
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    }
    catch(error){
        dispatch({
            type: COMMENTS_ERROR,
            payload: error,
        });
    }
}

export const addComment = (comment) => dispatch => {
    dispatch({
        type: ADD_COMMENT,
        payload: comment
    });
}

export const likeComment = (likeInfo) => dispatch => {
    dispatch({
        type: LIKE_COMMENT,
        payload: likeInfo
    });
}

export const unlikeComment = (likeInfo) => dispatch => {
    dispatch({
        type: UNLIKE_COMMENT,
        payload: likeInfo
    });
}

export const deleteComment = (id) => dispatch => {
    dispatch({
        type: DELETE_COMMENT,
        payload: id
    });
}

export const acknowledgeComment = (id) => dispatch => {
    dispatch({
        type: ACKNOWLEDGE_COMMENT,
        payload: id
    });
}

export const pinComment = (id) => dispatch => {
    dispatch({
        type: PIN_COMMENT,
        payload: id
    });
}