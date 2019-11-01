import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import "./Posts.css";

import {
    addMyComment,
    changeAddNewCommentForm,
    changeCommentTarget,
    changePostLikesPageNumber,
    changePostPage,
    changePosts,
    clearAddNewCommentResponse,
    clearAllCommentResponse,
    clearAllPost,
    clearAllPostResponse,
    clearGetPostCommentsStatus,
    clearLikePostResponse,
    clearLikesResponse,
    deleteComment,
    deletePost,
    editCommentDetails,
    getAllPostMix,
    getPostComments,
    setCommentId,
    setCommentsScrollBottomOnClick,
    setCommentsScrollUp,
    setDefaultCommentsPageNumber,
    setTargetPageNumber,
    setTargetPostId
} from "../../../actions/dashbaord/post";
import moment from "moment";
import {getCookie} from "../../../actions/app";
import $ from "jquery";
import LoadMorePost from "./loadMorePost/LoadMorePost";
import Button from "../../../components/app/button/Button";

class AllPost extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     scrollX: 0,
        //     scrollY: 0
        // }
    }

    componentDidMount() {
        this.props.dispatch(editCommentDetails({edit: false, post_id: "", comment_id: ""}));
        this.props.dispatch(clearLikesResponse());
        this.props.dispatch(setTargetPostId(null));
        this.props.dispatch(changePostLikesPageNumber(1));

        this.props.dispatch(changeAddNewCommentForm({post: "", comment: ""}));
        this.props.dispatch(clearAllPost());
        this.props.dispatch(clearAllPostResponse());
        this.props.dispatch(clearAllCommentResponse());
        this.props.dispatch(clearAddNewCommentResponse());
        this.props.dispatch(changePostPage(1));
        this.props.dispatch(getAllPostMix(getCookie("userId"), 1));
    }

    removePost(post) {
        this.props.dispatch(setTargetPostId(post._id));
        this.props.dispatch(setTargetPageNumber(!!post.pageNumber ? post.pageNumber : 1));
        // this.setState({
        //     scrollX: window.pageXOffset,
        //     scrollY: window.pageYOffset
        // });


        // this.props.dispatch(changeAddNewPostForm({...this.props.newPost, post: "", image: ""}));
        // this.props.dispatch(editPostDetails({
        //     ...this.props.editMyPostDetails, edit: false,
        //     post_id: ""
        // }));
        // if (!!document.getElementsByClassName("has-error")[0]) {
        //     document.getElementsByClassName("has-error")[0].classList.remove("has-error")
        // }
        this.props.dispatch(deletePost({user_id: getCookie("userId"), post_id: post._id}));
    }

    // editPost(post, page) {
    //     $("html,body").animate({scrollTop: 0});
    //
    //     this.props.dispatch(setTargetPageNumber(!!page ? page : 1));
    //     // send details to submit post box... with tag edit......true
    //     this.props.dispatch(changeAddNewPostForm({...this.props.newPost, post: post["post"], image: post.image}));
    //     this.props.dispatch(editPostDetails({
    //         ...this.props.editMyPostDetails, edit: true,
    //         post_id: post._id
    //     }));
    //     if (!!document.getElementsByClassName("has-error")[0]) {
    //         document.getElementsByClassName("has-error")[0].classList.remove("has-error")
    //     }
    // }

    cancelEditComment(post_id) {
        this.props.dispatch(changeAddNewCommentForm({post: "", comment: ""}));
        this.props.dispatch(editCommentDetails({
            ...this.props.editMyCommentDetails, edit: false,
            post_id: "",
            comment_id: ""
        }));
        if (!!document.getElementsByClassName(post_id + "textarea-outer")[0]) {
            if (document.getElementsByClassName(post_id + "textarea-outer")[0].classList.contains("has-error")) {
                document.getElementsByClassName(post_id + "textarea-outer")[0].classList.remove("has-error")
            }
        }

        const button = document.getElementsByClassName("add-comment" + post_id)[0];
        button.disabled = true;
        // check for all inputs and check if the input value is correct than enable button else disable button.
        // loop other than this post id
        const allPosts = this.props.posts;
        for (let i in allPosts) {
            if (allPosts[i]._id != post_id) {
                // check the input and disable that button according.....
                const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
                const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
                if (!!comment) {
                    if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                        // disable false
                        button.disabled = true;
                    } else {
                        // disable true
                        button.disabled = false;
                    }
                }
            }
        }
    }

    editComment(e, comment, postPageNumber, postId) {
        const cmt = comment["comment"];
        if (this.props.editMyCommentDetails.edit) {
            const button = document.getElementsByClassName("add-comment" + postId)[0];
            if (!!this.props.addNewCommentPageLoading || !(cmt.split("").length > 0 ? (cmt.split("")[0] !== " " && cmt.split("")[cmt.split("").length - 1] !== " ") : false)) {
                // disable false
                button.disabled = true;
            } else {
                // disable true
                button.disabled = false;
            }
        }
// check for all inputs and check if the input value is correct than enable button else disable button.
// loop other than this post id
        const allPosts = this.props.posts;
        for (let i in allPosts) {
            if (allPosts[i]._id != postId) {
                // check the input and disable that button according.....
                const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
                const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
                if (!!comment) {
                    if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                        // disable false
                        button.disabled = true;
                    } else {
                        // disable true
                        button.disabled = false;
                    }
                }
            }
        }


        // scroll to edit input...
        $('html, body').animate({
            scrollTop: ($('.' + comment.post_id + 'textarea-outer' +
                '.comment.form-group').offset().top - 265)
        }, 500);
        if (!!document.getElementsByClassName(comment.post_id + "textarea-outer")[0]) {
            if (document.getElementsByClassName(comment.post_id + "textarea-outer")[0].classList.contains("has-error")) {
                document.getElementsByClassName(comment.post_id + "textarea-outer")[0].classList.remove("has-error")
            }
        }
        // // send details to submit post box... with tag edit......true
        this.props.dispatch(changeAddNewCommentForm({
            ...this.props.newComment,
            post: comment["post_id"],
            ["comment" + comment.post_id]: comment["comment"]
        }));

        this.props.dispatch(setTargetPageNumber(postPageNumber));
        this.props.dispatch(setTargetPostId(postId));

        const commentsTarget = this.props.commentsTarget;
        const post_id = comment.post_id;
        const nextPage = comment.pageNumber;
        let postIdIsThere = false;
        let index = null;
        for (let i in commentsTarget) {
            if (commentsTarget[i].post_id === post_id) {
                postIdIsThere = true
                index = i;
            }
        }
        if (postIdIsThere) {
            // update
            console.log(post_id, "post_id", nextPage, "nextPage");
            commentsTarget[index] = {
                post_id: post_id,
                pageNumber: nextPage
            }
        } else {
            commentsTarget.push({
                post_id: post_id,
                pageNumber: nextPage
            })
        }
        this.props.dispatch(changeCommentTarget(commentsTarget));
        // window.setTimeout(() => {
        this.props.dispatch(editCommentDetails({
            ...this.props.editMyCommentDetails, edit: true,
            post_id: comment.post_id,
            comment_id: comment._id
        }));
        // }, 2000);
    }

    removeComment(e, comment, postPageNumber, postId) {
//         const cmt = comment["comment"];
//         const button = document.getElementsByClassName("add-comment" + postId)[0];
//         if (!!this.props.addNewCommentPageLoading || !(cmt.split("").length > 0 ? (cmt.split("")[0] !== " " && cmt.split("")[cmt.split("").length - 1] !== " ") : false)) {
//             // disable false
//             button.disabled = true;
//         } else {
//             // disable true
//             button.disabled = false;
//         }
// // check for all inputs and check if the input value is correct than enable button else disable button.
// // loop other than this post id
//         const allPosts = this.props.posts;
//         for (let i in allPosts) {
//             if (allPosts[i]._id != postId) {
//                 // check the input and disable that button according.....
//                 const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
//                 const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
//                 if (!!comment) {
//                     if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
//                         // disable false
//                         button.disabled = true;
//                     } else {
//                         // disable true
//                         button.disabled = false;
//                     }
//                 }
//             }
//         }


        this.props.dispatch(setCommentId(comment._id));
        this.props.dispatch(setTargetPageNumber(postPageNumber));
        this.props.dispatch(setTargetPostId(postId));

        const commentsTarget = this.props.commentsTarget;
        const post_id = comment.post_id;
        const nextPage = comment.pageNumber;
        let postIdIsThere = false;
        let index = null;
        for (let i in commentsTarget) {
            if (commentsTarget[i].post_id === post_id) {
                postIdIsThere = true
                index = i;
            }
        }
        if (postIdIsThere) {
            // update
            console.log(post_id, "post_id", nextPage, "nextPage");
            commentsTarget[index] = {
                post_id: post_id,
                pageNumber: nextPage
            }
        } else {
            commentsTarget.push({
                post_id: post_id,
                pageNumber: nextPage
            })
        }
        this.props.dispatch(changeCommentTarget(commentsTarget));

        this.props.dispatch(deleteComment({user_id: getCookie("userId"), comment_id: comment._id}));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.deletePostStatus) {
            if (!nextProps.deletePostError) {
                // createNotification("success", nextProps.deletePostMessage);
                this.props.dispatch(clearAllPostResponse());
                this.props.dispatch(getAllPostMix(getCookie("userId"), nextProps.selectedTargetPage));
                // delete the post from react redux...
                let posts = nextProps.posts;
                for (let i in posts) {
                    if (posts[i]._id === nextProps.selectedTargetPostId) {
                        posts.splice(i, 1);
                    }
                }
                // send posts to react redux...
                this.props.dispatch(changePosts(posts));
                // window.setTimeout(() => {
                //     $("html,body").animate({scrollTop: this.state.scrollY}, 1000);
                // }, 1000)
            } else {
                // createNotification("error", nextProps.deletePostMessage);
                this.props.dispatch(clearAllPostResponse());
            }
        }

        if (!!nextProps.addNewCommentStatus) {
            const comment = document.getElementsByName("comment" + nextProps.selectedTargetPostId)[0].value;
            const button = document.getElementsByClassName("add-comment" + nextProps.selectedTargetPostId)[0];
            if (!!this.props.addNewCommentPageLoading || !(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                // disable false
                button.disabled = true;
            } else {
                // disable true
                button.disabled = false;
            }
            // check for all inputs and check if the input value is correct than enable button else disable button.
            // loop other than this post id
            const allPosts = this.props.posts;
            for (let i in allPosts) {
                if (allPosts[i]._id != nextProps.selectedTargetPostId) {
                    // check the input and disable that button according.....
                    const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
                    const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
                    if (!!comment) {
                        if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                            // disable false
                            button.disabled = true;
                        } else {
                            // disable true
                            button.disabled = false;
                        }
                    }
                }
            }

            if (!nextProps.addNewCommentError) {
                // createNotification("success", nextProps.addNewCommentMessage);
                // edit false
                if (!this.props.editMyCommentDetails.edit) {
                    // scroll down...
                    console.log($("#scroll" + nextProps.commentsScrollBottomOnClick.post_id), "addddddddddddddddddddd")
                    window.setTimeout(() => {
                        console.log(nextProps.commentsScrollBottomOnClick.post_id, "scroll...")
                        $("#scroll" + nextProps.commentsScrollBottomOnClick.post_id).animate({
                            scrollTop: $("#scroll" + nextProps.commentsScrollBottomOnClick.post_id)[0].scrollHeight - $("#scroll" + nextProps.commentsScrollBottomOnClick.post_id)[0].clientHeight
                        }, 500);
                    }, 1800);
                    this.props.dispatch(setCommentsScrollBottomOnClick({status: false, post_id: ""}));
                }
                this.props.dispatch(editCommentDetails({
                    ...this.props.editMyCommentDetails, edit: false,
                    post_id: "",
                    comment_id: ""
                }));
                this.props.dispatch(clearAddNewCommentResponse());
                // clear
                // const newCommentKeys = Object.keys(this.props.newComment);
                // let newCommentObj = {};
                // for (let i in newCommentKeys) {
                //     newCommentObj[newCommentKeys[i]] = ""
                // }
                this.props.dispatch(changeAddNewCommentForm({post: "", comment: ""}));
                this.props.dispatch(getAllPostMix(getCookie("userId"), nextProps.selectedTargetPage));
                // get comments....
                const commentsTarget = nextProps.commentsTarget;
                let commentsPageNumber = 1;
                for (let i in commentsTarget) {
                    if (commentsTarget[i].post_id === nextProps.selectedTargetPostId) {
                        console.log(commentsTarget[i], "matched id's...... receive props....");
                        commentsPageNumber = commentsTarget[i].pageNumber;
                    }
                }
                this.props.dispatch(setCommentsScrollUp(false));
                this.props.dispatch(getPostComments(nextProps.selectedTargetPostId, commentsPageNumber)); // pass postid and comment....


                // scroll to that page
                // window.setTimeout(() => {
                //     $("html,body").animate({scrollTop: this.state.scrollY}, 1000);
                // }, 1000)
                // window.scrollTo(this.state.scrollY)
            } else {
                // createNotification("error", nextProps.addNewCommentMessage);
                this.props.dispatch(clearAddNewCommentResponse());
            }
        }

        if (!!nextProps.deleteCommentStatus) {
            if (!nextProps.deleteCommentError) {
                // createNotification("success", nextProps.deleteCommentMessage);
                this.props.dispatch(clearAllCommentResponse());
                this.props.dispatch(getAllPostMix(getCookie("userId"), nextProps.selectedTargetPage));
                // get comments....
                const commentsTarget = nextProps.commentsTarget;
                let commentsPageNumber = 1;
                for (let i in commentsTarget) {
                    if (commentsTarget[i].post_id === nextProps.selectedTargetPostId) {
                        console.log(commentsTarget[i], "matched id's...... receive props....");
                        commentsPageNumber = commentsTarget[i].pageNumber;
                    }
                }
                let posts = nextProps.posts;
                for (let i in posts) {
                    if (posts[i]._id === nextProps.selectedTargetPostId) {
                        const commentsList = posts[i].commentsList;
                        for (let j in commentsList) {
                            if (commentsList[j]._id === nextProps.targetCommentId) {
                                commentsList.splice(j, 1);
                            }
                        }
                    }
                }
                this.props.dispatch(changePosts(posts));
                this.props.dispatch(setCommentsScrollUp(false));
                this.props.dispatch(getPostComments(nextProps.selectedTargetPostId, commentsPageNumber)); // pass postid and comment....

                // window.setTimeout(() => {
                //     $("html,body").animate({scrollTop: this.state.scrollY}, 1000);
                // }, 1000)
            } else {
                // createNotification("error", nextProps.deleteCommentMessage);
                this.props.dispatch(clearAllCommentResponse());
            }
        }

        if (!!nextProps.likePostStatus) {
            if (!nextProps.likePostError) {
                // createNotification("success", nextProps.likePostMessage);
                this.props.dispatch(clearLikePostResponse());
                this.props.dispatch(getAllPostMix(getCookie("userId"), nextProps.selectedTargetPage));
                // scroll to that page
                // window.setTimeout(() => {
                //     $("html,body").animate({scrollTop: this.state.scrollY}, 1000);
                // }, 1000)
            } else {
                // createNotification("error", nextProps.likePostMessage);
                this.props.dispatch(clearLikePostResponse());
            }
        }

        if (!!nextProps.getPostCommentsStatus) {
            if (!nextProps.getPostCommentsError) {
                if (nextProps.commentsScrollBottomOnClick.status) {
                    // scroll comments to bottom....
                    // window.setTimeout(() => {
                    //     $("#scroll" + nextProps.commentsScrollBottomOnClick.post_id).animate({
                    //         scrollTop: $("#scroll" + nextProps.commentsScrollBottomOnClick.post_id)[0].scrollHeight - $("#scroll" + nextProps.commentsScrollBottomOnClick.post_id)[0].clientHeight
                    //     }, 1000);
                    // }, 500);
                    // window.setTimeout(() => {
                    //     this.props.dispatch(setCommentsScrollBottomOnClick({status: false, post_id: ""}));
                    // }, 1600);
                    this.props.dispatch(clearGetPostCommentsStatus());
                }
            }
        }
        // if commentslist click or post new comment >>> scroll down...

    }

    // likePost(post_id, page) {
    //     // this.setState({
    //     //     scrollX: window.pageXOffset,
    //     //     scrollY: window.pageYOffset
    //     // });
    //     this.props.dispatch(setTargetPageNumber(page));
    //     this.props.dispatch(likeMyPost({user_id: getCookie("userId"), post_id}));
    // }

    handleChange(e, post_id) {
        const target = e.target;
        this.props.dispatch(changeAddNewCommentForm({
            ...this.props.newComment,
            [target.name]: target.value,
            post: post_id
        }));
        const comment = target.value;
        if (this.props.editMyCommentDetails.edit) {
            const button = document.getElementsByClassName("add-comment" + post_id)[0];
            console.log(button, "button")
            if (!!this.props.addNewCommentPageLoading || !(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                // disable false
                console.log("disable true")
                button.disabled = true;
                // button.setAttribute("disabled","disabled")
            } else {
                // disable true
                console.log("disable false")
                button.disabled = false;
                // button.removeAttribute("disabled");
            }
        }
        // check for all inputs and check if the input value is correct than enable button else disable button.
        // loop other than this post id
        const allPosts = this.props.posts;
        for (let i in allPosts) {
            if (allPosts[i]._id != post_id) {
                // check the input and disable that button according.....
                const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
                const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
                if (!!comment) {
                    if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                        // disable false
                        button.disabled = true;
                    } else {
                        // disable true
                        button.disabled = false;
                    }
                }
            }
        }

    }

    // submit a comment
    handleSubmit(e, commentsList, post_id, targetPageNumber) {
        e.preventDefault();
        this.props.dispatch(setTargetPostId(post_id));
        if (!this.props.editMyCommentDetails.edit) {
            this.props.dispatch(setTargetPageNumber(targetPageNumber));
            let nextPage = 1;
            if (commentsList) {
                if (commentsList > 0) {
                    console.log(commentsList, "comments length");
                    // const pageNumber =
                    if (Number.isInteger(commentsList / 10)) {
                        console.log(Number.isInteger(commentsList / 10), "without decimal")
                        // without decimal... + page
                        nextPage = (commentsList / 10) + 1;
                        console.log(nextPage, "nextpage")
                    } else {
                        // with decimal....
                        const n = (commentsList / 10);
                        console.log(n, "with decimal....")
                        const fraction = n.toString().split(".")[0];
                        console.log(fraction, "fraction....")
                        nextPage = Number(fraction) + 1;
                        console.log(nextPage, "nextPage with decimal")
                        console.log(nextPage, "nextPage.....")
                        console.log(typeof nextPage, "typeofff")
                    }
                    console.log(commentsList, "commentslist");
                    // if (commentsList)
                    //     if (commentsList[commentsList.length - 1].pageNumber < 10) {
                    //         nextPage = commentsList[commentsList.length - 1].pageNumber
                    //     } else {
                    //         nextPage = commentsList[commentsList.length - 1].pageNumber + 1
                    //     }
                }
            }
            // const nextPage = Math.trunc(totalComments / 10) + 2;
            const commentsTarget = this.props.commentsTarget;
            let postIdIsThere = false;
            let index = null;
            for (let i in commentsTarget) {
                if (commentsTarget[i].post_id === post_id) {
                    postIdIsThere = true
                    index = i;
                }
            }
            if (postIdIsThere) {
                // update
                commentsTarget[index] = {
                    post_id: post_id,
                    pageNumber: nextPage
                }
            } else {
                commentsTarget.push({
                    post_id: post_id,
                    pageNumber: nextPage
                })
            }
            this.props.dispatch(setCommentsScrollBottomOnClick({status: true, post_id}));
            this.props.dispatch(changeCommentTarget(commentsTarget));
        }
        this.props.dispatch(addMyComment({
            user_id: getCookie("userId"),
            post_id: this.props.newComment.post,
            comment: this.props.newComment["comment" + this.props.newComment.post]
        }, this.props.editMyCommentDetails));
    }

    // updatePostLikes(post_id) {
    //     this.props.dispatch(clearLikesResponse());
    //     this.props.dispatch(setTargetPostId(post_id));
    //     this.props.dispatch(changePostLikesPageNumber(1));
    //     this.props.dispatch(getPostLikes(post_id, 1));
    // }

    handleFocus(e, post_id) {
        const comment = e.target.value;
        if (this.props.editMyCommentDetails.edit) {
            const button = document.getElementsByClassName("add-comment" + post_id)[0];
            if (!!this.props.addNewCommentPageLoading || !(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                // disable false
                button.disabled = true;
            } else {
                // disable true
                button.disabled = false;
            }
        }
        // check for all inputs and check if the input value is correct than enable button else disable button.
        // loop other than this post id
        const allPosts = this.props.posts;
        for (let i in allPosts) {
            if (allPosts[i]._id != post_id) {
                // check the input and disable that button according.....
                const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
                const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
                if (!!comment) {
                    if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
                        // disable false
                        button.disabled = true;
                    } else {
                        // disable true
                        button.disabled = false;
                    }
                }
            }
        }
    }

    // handleDisable(post_id) {
    //     // const comment = document.getElementsByName("comment" + post_id)[0].value;
    //     // const button = document.getElementsByClassName("add-comment" + post_id)[0];
    //     // if (!!this.props.addNewCommentPageLoading || !(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
    //     //     // disable false
    //     //     button.disabled = true;
    //     // } else {
    //     //     // disable true
    //     //     button.disabled = false;
    //     // }
    //     // // check for all inputs and check if the input value is correct than enable button else disable button.
    //     // // loop other than this post id
    //     // const allPosts = this.props.posts;
    //     // for (let i in allPosts) {
    //     //     if (allPosts[i]._id != post_id) {
    //     //         // check the input and disable that button according.....
    //     //         const comment = document.getElementsByName("comment" + allPosts[i]._id)[0].value;
    //     //         const button = document.getElementsByClassName("add-comment" + allPosts[i]._id)[0];
    //     //         if (!!comment) {
    //     //             if (!(comment.split("").length > 0 ? (comment.split("")[0] !== " " && comment.split("")[comment.split("").length - 1] !== " ") : false)) {
    //     //                 // disable false
    //     //                 button.disabled = true;
    //     //             } else {
    //     //                 // disable true
    //     //                 button.disabled = false;
    //     //             }
    //     //         } else {
    //     //             // button disable
    //     //             button.disabled = false;
    //     //         }
    //     //     }
    //     // }
    //
    // }

    updatePostComments(post_id, commentsList) {
        // // scroll to top
        // $("#scrollableComments").animate({scrollTop: 0}, 1000);
        // this.props.dispatch(changePostCommentsPage(1));
        // // here clear everything... to show to dialog listing...
        // this.props.dispatch(clearGetPostCommentsResponse());
        // // hit the api to fetch comments....

        let nextPage = 1;
        if (commentsList) {
            if (commentsList > 0) {
                console.log(commentsList, "comments length");
                // const pageNumber =
                if (Number.isInteger(commentsList / 10)) {
                    console.log(Number.isInteger(commentsList / 10), "without decimal")
                    // without decimal... + page
                    nextPage = (commentsList / 10);
                    console.log(nextPage, "nextpage")
                } else {
                    // with decimal....
                    const n = (commentsList / 10);
                    console.log(n, "with decimal....")
                    const fraction = n.toString().split(".")[0];
                    console.log(fraction, "fraction....")
                    nextPage = Number(fraction) + 1;
                    console.log(nextPage, "nextPage with decimal")
                    console.log(nextPage, "nextPage.....")
                    console.log(typeof nextPage, "typeofff")
                }
                console.log(commentsList, "commentslist");
            }
        }
        this.props.dispatch(setCommentsScrollBottomOnClick({status: true, post_id}));
        this.props.dispatch(setDefaultCommentsPageNumber(nextPage));
        this.props.dispatch(setCommentsScrollUp(false));
        this.props.dispatch(getPostComments(post_id, nextPage));
    }

    // handleScroll(nextPage, post_id) {
    //     if (nextPage !== 0) {
    //         this.props.dispatch(setCommentsScrollUp(true));
    //         // var element = document.getElementById('scroll' + post_id);
    //         // if (element.scrollTop === 0 && element.clientHeight === 199) {
    //         // const nextPage = Math.trunc(totalComments / 10) + 2;
    //         // element is at the end of its scroll, load more content
    //         // add +1 to current page
    //         // call api to fetch comment data....
    //         // this.props.dispatch(getAllPostMix(this.props.selectedTargetPage));
    //         const commentsTarget = this.props.commentsTarget;
    //         let postIdIsThere = false;
    //         let index = null;
    //         for (let i in commentsTarget) {
    //             if (commentsTarget[i].post_id === post_id) {
    //                 postIdIsThere = true
    //                 index = i;
    //             }
    //         }
    //         if (postIdIsThere) {
    //             // update
    //             commentsTarget[index] = {
    //                 post_id: post_id,
    //                 pageNumber: nextPage
    //             }
    //         } else {
    //             console.log({
    //                 post_id: post_id,
    //                 pageNumber: nextPage
    //             }, "new....")
    //             commentsTarget.push({
    //                 post_id: post_id,
    //                 pageNumber: nextPage
    //             })
    //         }
    //         this.props.dispatch(changeCommentTarget(commentsTarget));
    //         // window.setTimeout(() => {
    //         this.props.dispatch(getPostComments(post_id, nextPage));
    //         // }, 1000)
    //         // }
    //     }
    // }

    render() {
        return (
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <div className="top-header">
                        <h1 className="page-title">Posts</h1>
                    </div>
                    {
                        !this.props.getPostsError && this.props.posts.length > 0 &&
                        this.props.posts.map((post, i) => (

                            <div className="card">
                                {
                                    !!post.user_id.image ?
                                        <div className="user_avatar">
                                            <img style={{
                                                height: "40px",
                                                borderRadius: "50px",
                                                width: "40px"
                                            }} src={post.user_id.image} alt="post image"/>
                                        </div>
                                        :
                                        <div className="user_avatar">
                                            <img style={{
                                                height: "40px",
                                                borderRadius: "50px",
                                                width: "40px"
                                            }}
                                                 src={require("../../../images/person-placeholder.jpg")}
                                                 alt="post image"/>
                                        </div>
                                }
                                <div className="user_info">
                                            <span
                                                className="username">{!!post.user_id.name ? post.user_id.name : ""}</span>
                                    <span
                                        className="user_profile">{post.positions}</span>
                                </div>
                                <div className="post_time">
                                    {moment(post.createdAt).fromNow()}
                                </div>
                                {
                                    !!post.image &&
                                    <img className="card-media" src={post.image}
                                         alt="post image"/>
                                }
                                <div className="card-details">
                                    <h2 className="card-head">{post["post"]}</h2>
                                    <p>{post.positions}</p>
                                    <div className="post_options">
                                        {
                                            post.comments > 0 &&
                                            <div className="message_button">
                                                <img src={require("../../../images/comment.svg")} alt="comment"/>
                                                <a className="count_like"
                                                   onClick={() => this.updatePostComments(post._id, post.comments)}
                                                   href="javascript:;">{post.comments}</a>
                                            </div>
                                        }
                                    </div>
                                    {
                                        !!post.commentsList &&
                                        <div style={{paddingTop: "15px"}}>
                                            {
                                                post.commentsList.length > 0 &&
                                                post.commentsList[0].pageNumber !== 1 &&
                                                <a href="#/"
                                                   onClick={() => this.handleScroll(post.commentsList.length > 0 ? (post.commentsList[0].pageNumber - 1) : 1, post._id)}>View
                                                    10 more comments</a>
                                            }
                                            <div
                                                id={"scroll" + post._id}
                                                className={post.commentsList.length > 0 ? "post_comment_listing" : ""}
                                                style={{
                                                    height: "200px",
                                                    overflow: "auto",
                                                    overflowX: "hidden",
                                                    marginTop: "15px"
                                                }}>
                                                <ul className={post._id}>
                                                    {
                                                        post.commentsList.length > 0 &&
                                                        post.commentsList.map((comment, i) => (
                                                            <li className="single_post_comment">
                                                                <div className="single_post_header">
                                                                    <div className="single_post_image">
                                                                        {
                                                                            !!comment.user_id.image ?
                                                                                <img className="object_fit"
                                                                                     src={comment.user_id.image}
                                                                                     style={{
                                                                                         height: "40px",
                                                                                         borderRadius: "50px",
                                                                                         width: "40px"
                                                                                     }}
                                                                                     alt="image"/>
                                                                                :
                                                                                <img className="object_fit"
                                                                                     style={{
                                                                                         height: "40px",
                                                                                         borderRadius: "50px",
                                                                                         width: "40px"
                                                                                     }}
                                                                                     src={require("../../../images/person-placeholder.jpg")}
                                                                                     alt="image"/>
                                                                        }
                                                                    </div>
                                                                    <div className="">
                                                                        <div className="single_post_text">
                                                                            <b className="mr-1">{comment.user_id.name}</b>{comment["comment"]}
                                                                        </div>
                                                                        <div
                                                                            className="dropdown post_actions comment_actions">
                                                                            <div className="dropdown-toggle"
                                                                                 role="button"
                                                                                 data-toggle="dropdown"
                                                                                 aria-haspopup="true"
                                                                                 aria-expanded="false">
                                                                                <img
                                                                                    src={require("../../../images/post_action.svg")}
                                                                                    alt="option"/>
                                                                            </div>
                                                                            <div
                                                                                className="dropdown-menu dropdown-menu-right">
                                                                                <div className="dropdown_box">
                                                                                    <div className="dropdown_body">
                                                                                        <div
                                                                                            className="dropdown_links">
                                                                                            <ul>
                                                                                                <li>
                                                                                                    <a href="javascript:;"
                                                                                                       style={{cursor: "pointer"}}
                                                                                                       onClick={(e) => this.editComment(e, comment, !!post.pageNumber ? post.pageNumber : 1, post._id)}>
                                                                                                        Edit
                                                                                                    </a>
                                                                                                </li>
                                                                                                <a className="text-danger"
                                                                                                   style={{cursor: "pointer"}}
                                                                                                   href="javascript:;"
                                                                                                   onClick={(e) => this.removeComment(e, comment, !!post.pageNumber ? post.pageNumber : 1, post._id)}>
                                                                                                    {comment.status === 1 ? "inactive" : "active"}
                                                                                                </a>
                                                                                                {/*<li>*/}
                                                                                                {/*    <a className="text-danger"*/}
                                                                                                {/*       href="javascript:;"*/}
                                                                                                {/*       onClick={(e) => this.removeComment(e, comment, !!post.pageNumber ? post.pageNumber : 1, post._id)}>*/}
                                                                                                {/*        Delete*/}
                                                                                                {/*    </a>*/}
                                                                                                {/*</li>*/}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="single_post_footer"
                                                                     style={{marginTop: "0px"}}>
                                                                    {moment(comment.createdAt).fromNow()}
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {
                                    this.props.editMyCommentDetails.edit &&
                                    <form className={post["_id"] + i + " add-comment-form"} noValidate={true}
                                          onSubmit={(e) => this.handleSubmit(e, post.comments, post._id, post.pageNumber)}>
                                        <div className={"post_footer"}>
                                            <div className="post_comment autoheighttextarea"
                                                 style={{display: "block", marginTop: "10px"}}>
                                                <div className={post["_id"] + "textarea-outer comment form-group mb-2"}>
                                                <textarea
                                                    name={"comment" + post["_id"]}
                                                    value={!!this.props.newComment["comment" + post["_id"]] ? this.props.newComment["comment" + post["_id"]] : ""}
                                                    onChange={(e) => this.handleChange(e, post._id)}
                                                    required={true}
                                                    onFocus={(e) => this.handleFocus(e, post._id)}
                                                    placeholder="Write a comment…"
                                                    style={{height: "50px", marginBottom: "0px"}}/>
                                                    <p className="with-error">Please enter valid Comment.</p>
                                                </div>
                                            </div>
                                            <div className="post_message" style={{marginTop: "10px"}}>
                                                <Button
                                                    className={post._id === this.props.selectedTargetPostId ? (this.props.addNewCommentPageLoading ? ("btn btn-primary m-loader add-comment" + post._id) : "btn btn-primary btn-icon-right add-comment" + post._id) : "btn btn-primary btn-icon-right add-comment" + post._id}
                                                    disabled={true}
                                                    style={{display: "inline-flex"}}
                                                    type={"submit"}><span>Post</span>
                                                    <img className="arrow"
                                                         src={require("../../../images/btn_arrow.svg")}
                                                         alt="arrow"/>
                                                </Button>
                                                {
                                                    this.props.editMyCommentDetails.edit && this.props.editMyCommentDetails.post_id === post._id &&
                                                    <Button
                                                        className="btn btn-danger btn-icon-right"
                                                        onClick={() => this.cancelEditComment(post._id)}
                                                        style={{display: "inline-flex", marginLeft: "17px"}}
                                                        type={"button"}><span>Cancel</span>
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                }
                                {
                                    <div className="dropdown post_actions">
                                        <div className="dropdown-toggle" role="button" data-toggle="dropdown"
                                             aria-haspopup="true" aria-expanded="false">
                                            <img src={require("../../../images/post_action.svg")} alt="option"/>
                                        </div>
                                        <div className="dropdown-menu dropdown-menu-right"
                                        >
                                            <div className="dropdown_box">
                                                <div className="dropdown_body">
                                                    <div className="dropdown_links">
                                                        <ul>
                                                            <li>
                                                                <a href="javascript:;">
                                                                    Edit
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="text-danger" href="javascript:;"
                                                                   onClick={() => this.removePost(post)}>
                                                                    {post.status === 1 ? "inactive" : "active"}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    }
                    {
                        !this.props.getPostsPageLoading && !this.props.getPostsError && this.props.posts.length === 0 &&
                        <div className="error_wrapper">
                            <div className="error_page">
                                <img src={require("../../../images/error.png")} alt="images"/>
                                <h3>No posts found!!</h3>
                            </div>
                        </div>
                    }
                    {
                        this.props.getPostsError &&
                        <div className="error_wrapper">
                            <div className="error_page">
                                <img src={require("../../../images/error.png")} alt="images"/>
                                <h3>{this.props.getPostsError}</h3>
                                <p>The server encountered an internal error and was unable to complete
                                    your request. Please try reloading the page, or try visiting again
                                    later. </p>
                            </div>
                        </div>
                    }
                    {
                        !this.props.getPostsError && this.props.posts.length > 0 &&
                        this.props.posts[this.props.posts.length - 1].pageNumber === (Number.isInteger(this.props.posts.length / 10) ? (this.props.posts.length / 10) : (this.props.posts.length / 10) + 1) &&
                        <LoadMorePost/>
                    }
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        editMyPostDetails, posts, getPostsPageLoading, getPostsStatus, getPostsError, getPostsMessage,
        deletePostPageLoading,
        deletePostStatus,
        deletePostError,
        deletePostMessage,

        newComment,
        editMyCommentDetails,
        deleteCommentPageLoading,
        deleteCommentStatus,
        deleteCommentError,
        deleteCommentMessage,

        addNewCommentPageLoading,
        addNewCommentStatus,
        addNewCommentError,
        addNewCommentMessage,

        likePostPageLoading,
        likePostStatus,
        likePostError,
        likePostMessage,

        postLikes,
        postComments,

        postPageNumber,

        selectedTargetPage,

        commentsTarget,

        selectedTargetPostId,

        targetCommentId,

        commentsScrollBottomOnClick,

        postLikesPageNumber,

        getPostCommentsStatus,
        getPostCommentsError
    } = state.postReducer;
    console.log(commentsTarget, "commentsTarget");
    return {
        editMyPostDetails, posts, getPostsPageLoading, getPostsStatus, getPostsError, getPostsMessage,
        deletePostPageLoading,
        deletePostStatus,
        deletePostError,
        deletePostMessage,

        newComment,
        editMyCommentDetails,
        deleteCommentPageLoading,
        deleteCommentStatus,
        deleteCommentError,
        deleteCommentMessage,

        addNewCommentPageLoading,
        addNewCommentStatus,
        addNewCommentError,
        addNewCommentMessage,

        likePostPageLoading,
        likePostStatus,
        likePostError,
        likePostMessage,

        postLikes,
        postComments,

        postPageNumber,

        selectedTargetPage,

        commentsTarget,

        selectedTargetPostId,

        targetCommentId,

        commentsScrollBottomOnClick,

        postLikesPageNumber,

        getPostCommentsStatus,
        getPostCommentsError
    }
};
export default withRouter(connect(mapStateToProps)(AllPost))
