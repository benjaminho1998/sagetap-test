import { GET_COMMENTS, SORT_COMMENTS, COMMENTS_ERROR, ADD_COMMENT, LIKE_COMMENT, DELETE_COMMENT, ACKNOWLEDGE_COMMENT, PIN_COMMENT, UNLIKE_COMMENT } from '../types';

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
        case SORT_COMMENTS:
            let sort = action.payload;
            let low = false;
            if(sort.slice(sort.length - 3) === 'Low') {
                low = true;
                sort = sort.slice(0, sort.length - 3);
            } else {
                low = false;
            }
            return {
                ...state,
                comments: {
                    comments: [...state.comments.comments.sort((a, b) => {
                        if(sort === 'name' || sort === 'role') {
                            const nameA = a[sort].toLowerCase();
                            const nameB = b[sort].toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        }
                        return low ?
                            a[sort] - b[sort] :
                            b[sort] - a[sort]
                    })]
                }
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
                        (comment) => comment.id === action.payload.id ? {...comment, numberOfLikes: comment.numberOfLikes + action.payload.num, likers: [...comment.likers, action.payload.name]} : comment
                    )
                }
            }   
        case UNLIKE_COMMENT:
            return {
                ...state,
                comments: {
                    comments: state.comments.comments.map(
                        (comment) => comment.id === action.payload.id ? {...comment, numberOfLikes: comment.numberOfLikes + action.payload.num, likers: [...comment.likers.filter((liker) => liker !== action.payload.name)]} : comment
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