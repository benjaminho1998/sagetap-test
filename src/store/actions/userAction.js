import { UPDATE_USER } from '../types'

//container for user actions
export const updateUser = (user) => dispatch => {
    dispatch({
        type: UPDATE_USER,
        payload: user
    });
}