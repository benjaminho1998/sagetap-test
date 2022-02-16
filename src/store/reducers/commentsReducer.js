import {GET_COMMENTS, COMMENTS_ERROR} from '../types'

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
        case COMMENTS_ERROR:
                return{
                    loading: false, 
                    error: action.payload 
                }
        default: return state;
    }
}

export default commentsReducer;