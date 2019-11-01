import {
    ADD_NEW_COMMENT_FAILURE,
    ADD_NEW_COMMENT_REQUEST,
    ADD_NEW_COMMENT_SUCCESS,
    ADD_NEW_POST_FAILURE,
    ADD_NEW_POST_REQUEST,
    ADD_NEW_POST_STATUS,
    ADD_NEW_POST_SUCCESS,
    CHANGE_ADD_NEW_COMMENT_FORM,
    CHANGE_ADD_NEW_POST_FORM,
    CHANGE_COMMENT_TARGET,
    CHANGE_COUNT,
    CHANGE_POST_COMMENTS_PAGE,
    CHANGE_POST_LIKES_PAGENUMBER,
    CHANGE_POST_PAGE,
    CHANGE_POSTS,
    CLEAR_ADD_NEW_COMMENT_RESPONSE,
    CLEAR_ADD_NEW_POST_RESPONSE,
    CLEAR_ALL_COMMENT_RESPONSE,
    CLEAR_ALL_POST,
    CLEAR_ALL_POST_RESPONSE,
    CLEAR_GET_POST_COMMENTS_RESPONSE,
    CLEAR_GET_POST_COMMENTS_STATUS,
    CLEAR_GET_POST_LIKES_RESPONSE,
    CLEAR_LIKE_POST_RESPONSE,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    EDIT_COMMENT_DETAILS,
    EDIT_POST_DETAILS,
    GET_POST_COMMENTS_FAILURE,
    GET_POST_COMMENTS_REQUEST,
    GET_POST_COMMENTS_SUCCESS,
    GET_POST_FAILURE,
    GET_POST_LIKES_FAILURE,
    GET_POST_LIKES_REQUEST,
    GET_POST_LIKES_SUCCESS,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    SET_COMMENT_ID,
    SET_COMMENTS_SCROLL_BOTTOM_ON_CLICK,
    SET_COMMENTS_SCROLL_UP,
    SET_DEFAULT_COMMENTS_PAGE_NUMBER,
    SET_TARGET_PAGENUMBER,
    SET_TARGET_POST_ID,
    UPDATE_POST_COMMENTS_LIST,
    UPDATE_POST_LIKES_LIST
} from "../../types/dashboard/post";
import {authApi, getCookie} from "../app";
import {logoutQuick} from "../account/login";
import {GET_API} from "../../middleware/token/get-api";
import {CALL_POST_API} from "../../middleware/token/post-api";
import {PUT_API} from "../../middleware/token/put_api/put-api-with-body";
import {PUT_API_WITHOUT_BODY} from "../../middleware/token/put_api/put-api-without-body";

const AUTH_API = authApi();

export const changeAddNewPostForm = (newState) => {
    return {type: CHANGE_ADD_NEW_POST_FORM, newState}
};

export const clearAddNewPostResponse = () => {
    return {type: CLEAR_ADD_NEW_POST_RESPONSE}
};

export const clearLikePostResponse = () => {
    return {type: CLEAR_LIKE_POST_RESPONSE}
};

export const addMyPost = (body, edit, post_id) => {
    let status = "", config = {};
    let formData = new FormData();
    formData.append('image', !!body.image ? body.image : "");
    formData.append('post', body.post);
    formData.append('user_id', getCookie("userId"));
    if (edit) {
        formData.append('post_id', post_id);
    }
    config = {
        method: edit ? "PUT" : "POST",
        headers: {
            'Authorization': `Bearer ${getCookie("token")}`,
            "user_id": getCookie("userId"),
            'Access-Control-Allow-Origin': '*',
            withCredentials: true,
            mode: 'no-cors'
        },
        body: formData
    };
    return dispatch => {
        dispatch(addNewPostRequest());
        let apiLink = "";
        if (edit) {
            apiLink = AUTH_API + "/post/edit";
        } else {
            apiLink = AUTH_API + "/post/create";
        }
        fetch(apiLink, config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 403 || status === 401 || status === 404) {
                        dispatch(logoutQuick())
                    } else {
                        if (status === 200 && !res.error) {
                            dispatch(addNewPostSuccess({
                                data: {error: false, message: res.message},
                                status: 200
                            }));
                        } else {
                            dispatch(addNewPostFailure({
                                data: {error: true, message: res.message},
                                status: status
                            }))
                        }
                    }
                },
                function () {
                    dispatch(addNewPostFailure({
                        data: {
                            message: "Error while posting your post.",
                            error: true
                        },
                        status: 500
                    }))
                })
    }
};

export function addNewPostRequest() {
    return {type: ADD_NEW_POST_REQUEST}
}

export function addNewPostSuccess(response) {
    return {type: ADD_NEW_POST_SUCCESS, response}
}

export function addNewPostFailure(response) {
    return {type: ADD_NEW_POST_FAILURE, response}
}

export const getAllPost = (userId, page) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/post/get/' + userId + '/' + page,
            types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
            token: getCookie("token")
        }
    }
};
export const getSinglePost = (post_id) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/single/post/get/' + post_id,
            types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
            token: getCookie("token")
        }
    }
};

export const getAllPostMix = (userId, page) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/posts/' + page,
            types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
            token: getCookie("token")
        }
    }
};

export const clearAllPostResponse = () => {
    return {type: CLEAR_ALL_POST_RESPONSE}
};

export const deletePost = (body) => {
    return {
        [PUT_API_WITHOUT_BODY]: {
            endpoint: AUTH_API + '/admin/post-inactive/' + body.post_id,
            types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
            body: JSON.stringify(body)
        }
    }
};

export const clearAllPost = () => {
    return {type: CLEAR_ALL_POST}
};

/*edit my post*/
export function editPostDetails(newState) {
    return {type: EDIT_POST_DETAILS, newState}
}

/*comment -section */

export const changeAddNewCommentForm = (newState) => {
    return {type: CHANGE_ADD_NEW_COMMENT_FORM, newState}
};
// export const clearAllComment = () => {
//     return {type: CLEAR_ALL_COMMENT}
// };
export const clearAllCommentResponse = () => {
    return {type: CLEAR_ALL_COMMENT_RESPONSE}
};
export const deleteComment = (body) => {
    return {
        [PUT_API_WITHOUT_BODY]: {
            endpoint: AUTH_API + '/admin/comment-inactive/' + body.comment_id,
            types: [DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE],
            body: JSON.stringify(body)
        }
    }
};

export function editCommentDetails(newState) {
    return {type: EDIT_COMMENT_DETAILS, newState}
}

export const clearAddNewCommentResponse = () => {
    return {type: CLEAR_ADD_NEW_COMMENT_RESPONSE}
};

export function addMyComment(body, editDetails) {
    if (editDetails.edit) {
        return {
            [PUT_API]: {
                endpoint: AUTH_API + '/comment/edit',
                types: [ADD_NEW_COMMENT_REQUEST,
                    ADD_NEW_COMMENT_SUCCESS, ADD_NEW_COMMENT_FAILURE],
                body: JSON.stringify({
                    user_id: getCookie("userId"),
                    comment_id: editDetails.comment_id,
                    comment: body.comment
                })
            }
        }
    } else {
        return {
            [CALL_POST_API]: {
                endpoint: AUTH_API + '/comment/create',
                types: [ADD_NEW_COMMENT_REQUEST,
                    ADD_NEW_COMMENT_SUCCESS, ADD_NEW_COMMENT_FAILURE],
                body,
                token: getCookie("token")
            }
        }
    }
}

export const likeMyPost = (body) => {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/like/create',
            types: [LIKE_POST_REQUEST,
                LIKE_POST_SUCCESS, LIKE_POST_FAILURE],
            body,
            token: getCookie("token")
        }
    }
};

export const updatePostLikesList = (likes) => {
    return {type: UPDATE_POST_LIKES_LIST, likes}
};

export const updatePostCommentsList = (comments) => {
    return {type: UPDATE_POST_COMMENTS_LIST, comments}
};

export const clearGetPostCommentsResponse = () => {
    return {type: CLEAR_GET_POST_COMMENTS_RESPONSE}
};

export const getPostComments = (post_id, page) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/post/comments/' + post_id + '/' + page,
            types: [GET_POST_COMMENTS_REQUEST,
                GET_POST_COMMENTS_SUCCESS,
                GET_POST_COMMENTS_FAILURE],
            token: getCookie("token")
        }
    }
};

export const getPostLikes = (post_id, page) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/comment/get/' + post_id + '/like/' + page,
            types: [GET_POST_LIKES_REQUEST,
                GET_POST_LIKES_SUCCESS,
                GET_POST_LIKES_FAILURE],
            token: getCookie("token")
        }
    }
};

export const changePostCommentsPage = (page) => {
    return {type: CHANGE_POST_COMMENTS_PAGE, page}
};

export const setDefaultCommentsPageNumber = (page) => {
    return {type: SET_DEFAULT_COMMENTS_PAGE_NUMBER, page}
};

export const changePostPage = (page) => {
    return {type: CHANGE_POST_PAGE, page}
};

export const getCommentsPerPost = (post_id) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/post/get/' + getCookie("userId"),
            types: [GET_POST_COMMENTS_REQUEST,
                GET_POST_COMMENTS_SUCCESS,
                GET_POST_COMMENTS_FAILURE],
            token: getCookie("token")
        }
    }
};

export const setTargetPageNumber = (targetPage) => {
    return {type: SET_TARGET_PAGENUMBER, targetPage}
};

export const changeCommentTarget = (newState) => {
    return {type: CHANGE_COMMENT_TARGET, newState}
};

export const setTargetPostId = (targetId) => {
    return {type: SET_TARGET_POST_ID, targetId}
};

export const changePosts = (posts) => {
    return {type: CHANGE_POSTS, posts}
};

export const setCommentId = (id) => {
    return {type: SET_COMMENT_ID, id}
};
export const addNewPostStatus = (status) => {
    return {type: ADD_NEW_POST_STATUS, status}
};
export const setCommentsScrollUp = (status) => {
    return {type: SET_COMMENTS_SCROLL_UP, status}
};
export const setCommentsScrollBottomOnClick = (newState) => {
    return {type: SET_COMMENTS_SCROLL_BOTTOM_ON_CLICK, newState}
};
export const clearLikesResponse = () => {
    return {type: CLEAR_GET_POST_LIKES_RESPONSE}
};
export const changePostLikesPageNumber = (page) => {
    return {type: CHANGE_POST_LIKES_PAGENUMBER, page}
};
export const clearGetPostCommentsStatus = () => {
    return {type: CLEAR_GET_POST_COMMENTS_STATUS}
};
export const changeCount = (count) => {
    return {type: CHANGE_COUNT, count}
};
