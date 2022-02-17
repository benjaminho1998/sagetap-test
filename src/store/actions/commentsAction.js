import {GET_COMMENTS, COMMENTS_ERROR, ADD_COMMENT} from '../types'
import axios from 'axios';

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