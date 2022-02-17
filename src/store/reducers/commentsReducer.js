import {GET_COMMENTS, COMMENTS_ERROR, ADD_COMMENT} from '../types'

const initialState = {
    comments: [],
    loading: true
}

const commentsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                loading: false
            }
        case ADD_COMMENT:
            console.log('ADD', state.comments.comments)
            console.log('PAYLOAD', action.payload)
            return {
                ...state,
                comments: {
                    comments: [...state.comments.comments, action.payload]
                },
                loading: false
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