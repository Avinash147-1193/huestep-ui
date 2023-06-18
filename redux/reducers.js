import { SET_AUTH_USER, SET_AUTH_USER_PROFILE, SET_AUTH_USER_POST } from "./actions";

const initialState = {
    user: '',
    user_profile: '',
    user_post: '',
}

function userReducer(state=initialState, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            return {...state, user: action.payload};
        case SET_AUTH_USER_PROFILE:
                return {...state, user_profile: action.payload};
        case SET_AUTH_USER_POST:
            return {...state, user_post: action.payload};
        default:
            return state;
    }
}


export default userReducer;