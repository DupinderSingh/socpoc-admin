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
} from '../../types/dashboard/post';

const initialState = {
    newPost: {
        post: "",
        image: ""
    },
    editMyPostDetails: {
        edit: false,
        post_id: ""
    },
    addNewPostPageLoading: false,
    addNewPostStatus: "",
    addNewPostError: false,
    addNewPostMessage: "",

    posts: [],
    positions: [],
    getPostsPageLoading: false,
    getPostsStatus: "",
    getPostsError: false,
    getPostsMessage: "",

    deletePostPageLoading: false,
    deletePostStatus: "",
    deletePostError: false,
    deletePostMessage: "",


    newComment: {
        post: "",
        comment: ""
    },
    editMyCommentDetails: {
        edit: false,
        post_id: "",
        comment_id: ""
    },
    addNewCommentPageLoading: false,
    addNewCommentStatus: "",
    addNewCommentError: false,
    addNewCommentMessage: "",

    deleteCommentPageLoading: false,
    deleteCommentStatus: "",
    deleteCommentError: false,
    deleteCommentMessage: "",

    likePostPageLoading: false,
    likePostStatus: "",
    likePostError: false,
    likePostMessage: "",

    postLikes: [],
    postComments: [],


    comments: [],
    commentsPageNumber: 1,
    commentsPageLoading: false,
    commentsStatus: "",
    commentsError: false,
    commentsMessage: "",

    postPageNumber: 1,

    selectedTargetPage: 1,
    selectedTargetPostId: null,

    commentsTarget: [],

    targetCommentId: null,

    addNewPost: false,

    defaultCommentsPageNumber: 1,

    commentsScrollUp: false,

    commentsScrollBottomOnClick: {status: false, post_id: ""},

    getPostLikesPageLoading: false,
    getPostLikesStatus: "",
    getPostLikesError: false,
    getPostLikesMessage: "",

    postLikesPageNumber: 1,

    getPostCommentsPageLoading: false,
    getPostCommentsStatus: "",
    getPostCommentsError: false,
    getPostCommentsMessage: "",

    count: Math.random()
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_ADD_NEW_POST_FORM:
            return {
                ...state,
                newPost: action.newState
            };
        case CHANGE_ADD_NEW_COMMENT_FORM:
            return {
                ...state,
                newComment: action.newState
            };
        case CLEAR_ADD_NEW_POST_RESPONSE:
            return {
                ...state,
                addNewPostStatus: "",
                addNewPostError: false,
                addNewPostMessage: ""
            };
        case CLEAR_ADD_NEW_COMMENT_RESPONSE:
            return {
                ...state,
                addNewCommentStatus: "",
                addNewCommentError: false,
                addNewCommentMessage: ""
            };
        case CLEAR_LIKE_POST_RESPONSE:
            return {
                ...state,
                likePostStatus: "",
                likePostError: false,
                likePostMessage: ""
            };

        case ADD_NEW_POST_REQUEST:
            return Object.assign({}, state, {
                addNewPostPageLoading: true
            });
        case ADD_NEW_POST_SUCCESS:
            return Object.assign({}, state, {
                addNewPostPageLoading: false,
                addNewPostStatus: 200,
                addNewPostError: action.response.data.error,
                addNewPostMessage: action.response.data.message
            });
        case ADD_NEW_POST_FAILURE:
            return Object.assign({}, state, {
                addNewPostPageLoading: false,
                addNewPostStatus: action.response.status,
                addNewPostError: true,
                addNewPostMessage: action.response.data.message
            });

        case GET_POST_REQUEST:
            return Object.assign({}, state, {
                getPostsPageLoading: true
            });
        case GET_POST_SUCCESS:
            const previousPostss = state.posts;
            if (state.addNewPost) {
                let responsePostss = [];
                /*** update the posts starts***/
                if (!action.response.data.error) {
                    responsePostss = action.response.data.posts;
                    responsePostss.reverse();
                    // responsePostss.reverse();
                    // previousPostss.reverse()
                    // add both posts... and update existing one
                    let matchedPosts = []; // list of just post id's....
                    for (let l in responsePostss) {
                        for (let k in previousPostss) {
                            if (previousPostss[k]._id === responsePostss[l]._id) {
                                matchedPosts.push(previousPostss[k]._id);
                                //update existing one done here
                                // can contain commentList and likesList in previousPosts.....
                                let commentsList = [];
                                let pageNumber = previousPostss[k].pageNumber;
                                if (!!previousPostss[k].commentsList) {
                                    if (previousPostss[k].commentsList.length > 0) {
                                        commentsList = previousPostss[k].commentsList;
                                    }
                                }
                                previousPostss[k] = responsePostss[l];
                                if (commentsList.length > 0) {
                                    previousPostss[k].commentsList = commentsList
                                }
                                previousPostss[k].pageNumber = pageNumber
                            }
                        }
                    }
                    // responsePostss.reverse();
                    // previousPostss.reverse()
                    // access the unmatched id's from responsePosts and add them to previousPosts
                    for (let r in responsePostss) {
                        let isThere = false;
                        for (let m in matchedPosts) {
                            if (matchedPosts[m] === responsePostss[r]._id) {
                                isThere = true;
                            }
                        }
                        if (!isThere) {
                            responsePostss[r].pageNumber = 1;
                            previousPostss.unshift(responsePostss[r]);
                        }
                    }
                    // previousPostss.reverse();
                    /*** update the posts ends***/
                    /**
                     *
                     * update comments and likes into posts starts
                     */

                    //
                    // let comments = [];
                    // let particularUserComments = [];
                    // let xyz =previousPosts
                    // for (let i in previousPosts) {
                    //
                    // }
                    // let likes = state.likes;
                    // if (previousPosts.length > 0) {
                    //     for (let i in previousPosts) {
                    //         if (!previousPosts[i].commentsList) {
                    //             previousPosts[i].commentsList = []
                    //         }
                    //         for (let i in previousPosts) {
                    //
                    //             if ()
                    //             for (let j in comments) {
                    //                 // // matching the post id's and pushing data into it......
                    //                 // if (comments[j].post_id === previousPosts[i]._id) {
                    //                 //     // if (comments[j].post_id === previousPosts[i]._id) {// couldn't establish here....
                    //                 //     previousPosts[i].commentsList.push(comments[j])
                    //                 //     // }
                    //                 // }
                    //             }
                    //         }
                    //     }
                    //     for (let i in previousPosts) {
                    //         if (!previousPosts[i].likesList) {
                    //             previousPosts[i].likesList = []
                    //         }
                    //         for (let i in previousPosts) {
                    //             for (let j in likes) {
                    //                 if (likes[j].post_id === previousPosts[i]._id) {
                    //                     previousPosts[i].likesList.push(likes[j])
                    //                 }
                    //             }
                    //         }
                    //     }
                    //     /**
                    //      *
                    //      * update comments and likes into posts ends
                    //      */
                }
            } else {
                // for page switching
                let responsePostss = [];
                /*** update the posts starts***/
                if (!action.response.data.error) {
                    responsePostss = action.response.data.posts;
                    responsePostss.reverse();
                    // responsePostss.reverse();
                    // previousPostss.reverse()
                    // add both posts... and update existing one
                    let matchedPosts = []; // list of just post id's....
                    for (let l in responsePostss) {
                        for (let k in previousPostss) {
                            if (previousPostss[k]._id === responsePostss[l]._id) {
                                matchedPosts.unshift(previousPostss[k]._id);
                                //update existing one done here
                                // can contain commentList and likesList in previousPosts.....
                                let commentsList = [];
                                let pageNumber = previousPostss[k].pageNumber;
                                if (!!previousPostss[k].commentsList) {
                                    if (previousPostss[k].commentsList.length > 0) {
                                        commentsList = previousPostss[k].commentsList;
                                    }
                                }
                                previousPostss[k] = responsePostss[l];
                                if (commentsList.length > 0) {
                                    previousPostss[k].commentsList = commentsList
                                }
                                previousPostss[k].pageNumber = pageNumber
                            }
                        }
                    }
                    responsePostss.reverse();
                    // previousPostss.reverse()
                    // access the unmatched id's from responsePosts and add them to previousPosts
                    for (let r in responsePostss) {
                        let isThere = false;
                        for (let m in matchedPosts) {
                            if (matchedPosts[m] === responsePostss[r]._id) {
                                isThere = true;
                            }
                        }
                        if (!isThere) {
                            responsePostss[r].pageNumber = state.postPageNumber;
                            previousPostss.push(responsePostss[r]);
                        }
                    }
                    // previousPostss.reverse();
                    /*** update the posts ends***/
                    /**
                     *
                     * update comments and likes into posts starts
                     */

                    //
                    // let comments = [];
                    // let particularUserComments = [];
                    // let xyz =previousPosts
                    // for (let i in previousPosts) {
                    //
                    // }
                    // let likes = state.likes;
                    // if (previousPosts.length > 0) {
                    //     for (let i in previousPosts) {
                    //         if (!previousPosts[i].commentsList) {
                    //             previousPosts[i].commentsList = []
                    //         }
                    //         for (let i in previousPosts) {
                    //
                    //             if ()
                    //             for (let j in comments) {
                    //                 // // matching the post id's and pushing data into it......
                    //                 // if (comments[j].post_id === previousPosts[i]._id) {
                    //                 //     // if (comments[j].post_id === previousPosts[i]._id) {// couldn't establish here....
                    //                 //     previousPosts[i].commentsList.push(comments[j])
                    //                 //     // }
                    //                 // }
                    //             }
                    //         }
                    //     }
                    //     for (let i in previousPosts) {
                    //         if (!previousPosts[i].likesList) {
                    //             previousPosts[i].likesList = []
                    //         }
                    //         for (let i in previousPosts) {
                    //             for (let j in likes) {
                    //                 if (likes[j].post_id === previousPosts[i]._id) {
                    //                     previousPosts[i].likesList.push(likes[j])
                    //                 }
                    //             }
                    //         }
                    //     }
                    //     /**
                    //      *
                    //      * update comments and likes into posts ends
                    //      */
                }
            }
            return Object.assign({}, state, {
                getPostsPageLoading: false,
                getPostsStatus: 200,
                getPostsError: action.response.data.error,
                getPostsMessage: action.response.data.error ? action.response.data.message : "",
                posts: action.response.data.error ? state.posts : previousPostss,
                positions: action.response.data.error ?
                    state.positions :
                    (!!action.response.data.users ? (action.response.data.users.positions.length > 0 ? (action.response.data.users.positions) : state.positions) : state.positions),
                addNewPost: false
            });
        case
        GET_POST_FAILURE:
            return Object.assign({}, state, {
                getPostsPageLoading: false,
                getPostsStatus: action.response.status,
                getPostsError: true,
                getPostsMessage: action.response.data.message,
                posts: state.posts,
                positions: state.positions,
                addNewPost: false
            });
        case
        CLEAR_ALL_POST_RESPONSE:
            return {
                ...state,
                getPostsStatus: "",
                getPostsError: false,
                getPostsMessage: "",
                deletePostStatus: "",
                deletePostError: false,
                deletePostMessage: "",
                // postLikes: [],
                // postComments: []
            };
        case
        CLEAR_ALL_COMMENT_RESPONSE:
            return {
                ...state,
                deleteCommentStatus: "",
                deleteCommentError: false,
                deleteCommentMessage: ""
            };
        case
        DELETE_POST_REQUEST:
            return Object.assign({}, state, {
                deletePostPageLoading: true
            });
        case
        DELETE_POST_SUCCESS:
            return Object.assign({}, state, {
                deletePostPageLoading: false,
                deletePostStatus: 200,
                deletePostError: action.response.data.error,
                deletePostMessage: action.response.data.message
            });
        case
        DELETE_POST_FAILURE:
            return Object.assign({}, state, {
                deletePostPageLoading: false,
                deletePostStatus: action.response.status,
                deletePostError: true,
                deletePostMessage: action.response.data.message
            });
        case
        CLEAR_ALL_POST:
            return {
                ...state,
                posts: [],
                positions: []
            };
        case
        EDIT_POST_DETAILS:
            return {
                ...state,
                editMyPostDetails: action.newState
            };
        case
        EDIT_COMMENT_DETAILS:
            return {
                ...state,
                editMyCommentDetails: action.newState
            };
        case
        ADD_NEW_COMMENT_REQUEST:
            return Object.assign({}, state, {
                addNewCommentPageLoading: true
            });
        case
        ADD_NEW_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                addNewCommentPageLoading: false,
                addNewCommentStatus: 200,
                addNewCommentError: action.response.data.error,
                addNewCommentMessage: action.response.data.message
            });
        case
        ADD_NEW_COMMENT_FAILURE:
            return Object.assign({}, state, {
                addNewCommentPageLoading: false,
                addNewCommentStatus: action.response.status,
                addNewCommentError: true,
                addNewCommentMessage: action.response.data.message
            });


        case
        DELETE_COMMENT_REQUEST:
            return Object.assign({}, state, {
                deleteCommentPageLoading: true
            });
        case
        DELETE_COMMENT_SUCCESS:
            return Object.assign({}, state, {
                deleteCommentPageLoading: false,
                deleteCommentStatus: 200,
                deleteCommentError: action.response.data.error,
                deleteCommentMessage: action.response.data.message
            });
        case
        DELETE_COMMENT_FAILURE:
            return Object.assign({}, state, {
                deleteCommentPageLoading: false,
                deleteCommentStatus: action.response.status,
                deleteCommentError: true,
                deleteCommentMessage: action.response.data.message
            });

        case
        LIKE_POST_REQUEST:
            return Object.assign({}, state, {
                likePostPageLoading: true
            });
        case
        LIKE_POST_SUCCESS:
            return Object.assign({}, state, {
                likePostPageLoading: false,
                likePostStatus: 200,
                likePostError: action.response.data.error,
                likePostMessage: action.response.data.message
            });
        case
        LIKE_POST_FAILURE:
            return Object.assign({}, state, {
                likePostPageLoading: false,
                likePostStatus: action.response.status,
                likePostError: true,
                likePostMessage: action.response.data.message
            });
        case
        UPDATE_POST_LIKES_LIST:
            return {
                ...state,
                postLikes: action.likes
            };
        case
        UPDATE_POST_COMMENTS_LIST:
            return {
                ...state,
                postComments: action.comments
            };
        case
        CLEAR_GET_POST_COMMENTS_RESPONSE:
            return {
                ...state,
                comments: [],
                commentsPageNumber: 1,
                commentsStatus: "",
                commentsError: false,
                commentsMessage: ""
            };
        case
        GET_POST_COMMENTS_REQUEST:
            return Object.assign({}, state, {
                getPostCommentsPageLoading: true
            });
        case
        GET_POST_COMMENTS_SUCCESS:
            let oldPosts = state.posts;
            if (!state.commentsScrollUp) {
                /**
                 * Comments functionality starts....
                 * @type {[]}
                 */
                let responsePostsComments = [];
                /*** update the posts starts***/
                if (!action.response.data.error) {
                    responsePostsComments = action.response.data.posts;
                    // add both posts... and update existing one
                    let matchedComments = []; // list of just post id's....
                    let postId = "";
                    if (responsePostsComments.length > 0) {
                        postId = responsePostsComments[0].post_id;
                    }
                    for (let x in oldPosts) {
                        if (oldPosts[x]._id === postId) {
                            // now we have in the post id ready to play with comments now....

                            let previousPostComments = !!oldPosts[x].commentsList ? oldPosts[x].commentsList : [];
                            previousPostComments.reverse();
                            for (let l in responsePostsComments) {
                                for (let k in previousPostComments) {
                                    if (previousPostComments[k]._id === responsePostsComments[l]._id) {
                                        // passing the comment id
                                        let pageNumber = previousPostComments[k].pageNumber;
                                        matchedComments.push(previousPostComments[k]._id);
                                        //update existing one done here i.e, updating the comment.... here
                                        previousPostComments[k] = responsePostsComments[l];
                                        previousPostComments[k].pageNumber = pageNumber
                                    }
                                }
                            }
                            // access the unmatched id's from responsePosts and add them to previousPosts
                            for (let r in responsePostsComments) {
                                let isThere = false;
                                for (let m in matchedComments) {
                                    if (matchedComments[m] === responsePostsComments[r]._id) {
                                        isThere = true;
                                    }
                                }
                                if (!isThere) {
                                    let pageNumber = state.defaultCommentsPageNumber;
                                    let commentsTarget = state.commentsTarget;
                                    for (let i in commentsTarget) {
                                        // match the both comment id's.........
                                        if (commentsTarget[i].post_id === responsePostsComments[r].post_id) {
                                            pageNumber = commentsTarget[i].pageNumber
                                        }
                                    }
                                    responsePostsComments[r].pageNumber = pageNumber;
                                    previousPostComments.unshift(responsePostsComments[r]);
                                }
                            }
                            // add commenbts to posts.....
                            previousPostComments.reverse();
                            oldPosts[x].commentsList = previousPostComments
                        }
                    }
                    /*** update the posts ends***/
                } else {
                    responsePostsComments = state.posts
                }
            } else {
                /**
                 * Comments functionality starts....
                 * @type {[]}
                 */
                let responsePostsComments = [];
                /*** update the posts starts***/
                if (!action.response.data.error) {
                    responsePostsComments = action.response.data.posts;
                    // add both posts... and update existing one
                    let matchedComments = []; // list of just post id's....
                    let postId = "";
                    if (responsePostsComments.length > 0) {
                        postId = responsePostsComments[0].post_id;
                    }
                    for (let x in oldPosts) {
                        if (oldPosts[x]._id === postId) {
                            // now we have in the post id ready to play with comments now....

                            let previousPostComments = !!oldPosts[x].commentsList ? oldPosts[x].commentsList : [];
                            previousPostComments.reverse();
                            for (let l in responsePostsComments) {
                                for (let k in previousPostComments) {
                                    if (previousPostComments[k]._id === responsePostsComments[l]._id) {
                                        // passing the comment id
                                        let pageNumber = previousPostComments[k].pageNumber;
                                        matchedComments.push(previousPostComments[k]._id);
                                        //update existing one done here i.e, updating the comment.... here
                                        previousPostComments[k] = responsePostsComments[l];
                                        previousPostComments[k].pageNumber = pageNumber
                                    }
                                }
                            }
                            previousPostComments.reverse();
                            responsePostsComments.reverse()

                            // access the unmatched id's from responsePosts and add them to previousPosts
                            for (let r in responsePostsComments) {
                                let isThere = false;
                                for (let m in matchedComments) {
                                    if (matchedComments[m] === responsePostsComments[r]._id) {
                                        isThere = true;
                                    }
                                }
                                if (!isThere) {
                                    let pageNumber = state.defaultCommentsPageNumber;
                                    let commentsTarget = state.commentsTarget;
                                    for (let i in commentsTarget) {
                                        // match the both comment id's.........
                                        if (commentsTarget[i].post_id === responsePostsComments[r].post_id) {
                                            pageNumber = commentsTarget[i].pageNumber
                                        }
                                    }
                                    responsePostsComments[r].pageNumber = pageNumber;
                                    previousPostComments.unshift(responsePostsComments[r]);
                                }
                            }
                            // add commenbts to posts.....
                            // previousPostComments.reverse();
                            oldPosts[x].commentsList = previousPostComments
                        }
                    }
                    /*** update the posts ends***/
                } else {
                    responsePostsComments = state.posts
                }
            }

            return Object.assign({}, state, {
                getPostCommentsPageLoading: false,
                getPostCommentsStatus: 200,
                getPostCommentsError: action.response.data.error,
                getPostCommentsMessage: action.response.data.error ? action.response.data.message : "",
                posts: action.response.data.error ? state.posts : oldPosts
            });
        case
        GET_POST_COMMENTS_FAILURE:
            return Object.assign({}, state, {
                getPostCommentsPageLoading: false,
                getPostCommentsStatus: action.response.status,
                getPostCommentsError: true,
                getPostCommentsMessage: action.response.data.message,
                posts: state.posts
            });
        case
        CHANGE_POST_COMMENTS_PAGE:
            return {
                ...state,
                commentsPageNumber: action.page
            };
        case
        CHANGE_POST_PAGE:
            return {
                ...state,
                postPageNumber: action.page
            };
        case
        SET_TARGET_PAGENUMBER:
            return {
                ...state,
                selectedTargetPage: action.targetPage
            };

        case
        SET_TARGET_POST_ID:
            return {
                ...state,
                selectedTargetPostId: action.targetId
            };

        case
        CHANGE_COMMENT_TARGET:
            return {
                ...state,
                commentsTarget: action.newState
            };
        case CHANGE_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case SET_COMMENT_ID:
            return {
                ...state,
                targetCommentId: action.id
            };
        case ADD_NEW_POST_STATUS:
            return {
                ...state,
                addNewPost: action.status
            };
        case SET_DEFAULT_COMMENTS_PAGE_NUMBER:
            return {
                ...state,
                defaultCommentsPageNumber: action.page
            };
        case SET_COMMENTS_SCROLL_UP:
            return {
                ...state,
                commentsScrollUp: action.status
            };
        case SET_COMMENTS_SCROLL_BOTTOM_ON_CLICK:
            return {
                ...state,
                commentsScrollBottomOnClick: action.newState
            };
        case
        GET_POST_LIKES_REQUEST:
            return Object.assign({}, state, {
                getPostLikesPageLoading: true
            });
        case
        GET_POST_LIKES_SUCCESS:
            let oldLikes = state.postLikes;
            if (!action.response.data.error) {
                let responseLikes = action.response.data.posts;
                oldLikes.push(responseLikes)
            }
            return Object.assign({}, state, {
                getPostLikesPageLoading: false,
                getPostLikesStatus: 200,
                getPostLikesError: action.response.data.error,
                getPostLikesMessage: action.response.data.error ? action.response.data.message : "",
                postLikes: action.response.data.error ? state.postLikes : oldLikes
            });
        case
        GET_POST_LIKES_FAILURE:
            return Object.assign({}, state, {
                getPostLikesPageLoading: false,
                getPostLikesStatus: action.response.status,
                getPostLikesError: true,
                getPostLikesMessage: action.response.data.message,
                postLikes: state.postLikes
            });
        case CLEAR_GET_POST_LIKES_RESPONSE:
            return {
                ...state,
                getPostLikesPageLoading: false,
                getPostLikesStatus: "",
                getPostLikesError: false,
                getPostLikesMessage: "",
                postLikes: []
            };
        case CHANGE_POST_LIKES_PAGENUMBER:
            return {
                ...state,
                postLikesPageNumber: action.page
            };
        case CLEAR_GET_POST_COMMENTS_STATUS:
            return {
                ...state,
                getPostCommentsStatus: ""
            };
        case CHANGE_COUNT:
            return {
                ...state,
                count: action.count
            };
        default:
            return state
    }
}
