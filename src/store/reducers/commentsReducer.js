import { GET_COMMENTS, COMMENTS_ERROR, ADD_COMMENT, LIKE_COMMENT, DELETE_COMMENT, ACKNOWLEDGE_COMMENT, PIN_COMMENT } from '../types';

//initial state for the comments
const initialState = {
    comments: [],
    loading: true
}

//takes an action and changes the store according to the action
const commentsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: {
                    comments: [...state.comments.comments, action.payload]
                },
                loading: false
            }
        case LIKE_COMMENT:
            return {
                ...state,
                comments: {
                    comments: state.comments.comments.map(
                        (comment) => comment.id === action.payload.id ? {...comment, numberOfLikes: comment.numberOfLikes + 1, likers: [...comment.likers, action.payload.name]} : comment
                    )
                }
            }   
        case DELETE_COMMENT:
            return {
                ...state,
                comments: {
                    comments: state.comments.comments.filter(comment => comment.id !== action.payload)
                }
            }     
        case ACKNOWLEDGE_COMMENT:
            return {
                ...state,
                comments: {
                    comments: state.comments.comments.map(
                        (comment) => comment.id === action.payload ? {...comment, acknowledged: true} : comment
                    )
                }
            } 
        case PIN_COMMENT:
            return {
                ...state,
                comments: {
                    comments: [...state.comments.comments.filter((comment) => comment.id === action.payload), ...state.comments.comments.filter((comment) => comment.id !== action.payload)]
                }
            } 
        case COMMENTS_ERROR:
            return{
                loading: false, 
                error: action.payload 
            }
        default: return state;
    }
}

export default commentsReducer;