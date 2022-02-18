import { UPDATE_USER } from '../types';

//intial state for the active user
const initialState = {
    user: {
        firstName: 'Example',
        lastName: 'User',
        email: 'example@email.com',
        role: 'Software Engineer'
    }
}

//takes an action and changes the store according to the action
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