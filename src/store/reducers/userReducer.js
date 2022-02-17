import { UPDATE_USER } from '../types';

const initialState = {
    user: {
        firstName: 'Example',
        lastName: 'User',
        email: 'example@email.com',
        role: 'Software Engineer'
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            }
        default: return state;
    }
}

export default userReducer;