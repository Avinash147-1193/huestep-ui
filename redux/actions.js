export const SET_AUTH_USER = 'SET_AUTH_USER'
export const SET_AUTH_USER_PROFILE = 'SET_AUTH_USER_PROFILE'
export const SET_AUTH_USER_POST = 'SET_AUTH_USER_POST'
export const SET_AUTH_USER_LIKED_POSTS = 'SET_AUTH_USER_LIKED_POSTS'
export const SET_AUTH_USER_LIKE_REACT = 'SET_AUTH_USER_LIKE_REACT'


export const setAuthUser = (user) => dispatch => {
    dispatch({
        type: SET_AUTH_USER,
        payload: user,
    })
};

export const setAuthUserProfile = (user_profile) => dispatch => {
    dispatch({
        type: SET_AUTH_USER_PROFILE,
        payload: user_profile,
    })
};

export const setAuthUserPost = (user_post) => dispatch => {
    dispatch({
        type: SET_AUTH_USER_POST,
        payload: user_post,
    })
};

export const setAuthUserLikedPost = (user_liked_posts) => dispatch => {
    dispatch({
        type: SET_AUTH_USER_LIKED_POSTS,
        payload: user_liked_posts,
    })
};

export const setUserLikeReaction = (user_like_post_react) => dispatch => {
    dispatch({
        type: SET_AUTH_USER_LIKE_REACT,
        payload: user_like_post_react,
    })
};