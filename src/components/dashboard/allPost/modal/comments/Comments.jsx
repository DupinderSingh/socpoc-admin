import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import moment from "moment";
import {changePostCommentsPage, getPostComments} from "../../../../../actions/dashbaord/post";

class CommentsModal extends React.Component {
    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", () => {
            if (
                this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
                this.refs.iScroll.scrollHeight
            ) {
                // add +1 to current page
                // call api to fetch data....
                this.props.dispatch(changePostCommentsPage(this.props.commentsPageNumber + 1));
                this.props.dispatch(getPostComments(this.props.commentsPageNumber + 1));
            }
        });
    }

    render() {
        return (
            <div className="modal fade" id="comment_list" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form method="post">
                            <div className="modal-header">
                                <h5 className="modal-title">Comments</h5>
                            </div>
                            <div id="scrollableComments" className="modal-body modal-body-overflow comments"
                                 ref="iScroll"
                                 style={{height: "200px", overflow: "auto"}}>
                                <div className="like_listing">
                                    <ul>
                                        {
                                            this.props.comments.map((data, index) => (
                                                <li key={index}>
                                                    <div className="like_list_header">
                                                        <div className="user_avatar">
                                                            <img
                                                                src={!!data.user_id.image ? data.user_id.image : require("../../../../../images/person-placeholder.jpg")}
                                                                alt="user"/>
                                                        </div>
                                                        <div className="user_info">
                                                            <span
                                                                className="username">{!!data.user_id.name ? data.user_id.name : ""}</span>
                                                            <span className="user_profile">Interaction Designer at Behold</span>
                                                        </div>
                                                        <div className="post_time">
                                                            {moment(data.updatedAt).fromNow()}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {comments, commentsPageNumber} = state.postReducer;
    return {comments, commentsPageNumber}
};
export default withRouter(connect(mapStateToProps)(CommentsModal))