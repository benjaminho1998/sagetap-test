import {GET_USER, USER_ERROR} from '../types';

const initialState = {
    user: {},
    loading: true
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER:
        return {
            ...state,
            user: action.payload,
            loading: false
        }
        case USER_ERROR:
            return{
                loading: false, 
                error: action.payload 
            }
        default: return state
    }
}

export default userReducer;