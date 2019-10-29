import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import moment from "moment";
import {changePostLikesPageNumber, getPostLikes} from "../../../../../actions/dashbaord/post";

class LikesModal extends React.Component {
    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", () => {
            if (
                this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
                this.refs.iScroll.scrollHeight
            ) {
                // add +1 to current page
                // call api to fetch data....
                this.props.dispatch(changePostLikesPageNumber(this.props.postLikesPageNumber + 1));
                this.props.dispatch(getPostLikes(this.props.post_id, this.props.postLikesPageNumber + 1));
            }
        });
    }

    render() {
        const {likes} = this.props;
        return (
            <div className="modal fade" id="like_list" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form method="post">
                            <div className="modal-header">
                                <h5 className="modal-title">Likes</h5>
                            </div>
                            <div className="modal-body modal-body-overflow" ref={"iScroll"}
                                 style={{maxHeight: "200px", overflow: "auto", overflowX: "hidden"}}>
                                <div className="like_listing">
                                    <ul>
                                        {
                                            likes.map((data, index) => (
                                                data.map((d, i) => (
                                                    <li key={index}>
                                                        <div className="like_list_header">
                                                            <div className="user_avatar">
                                                                <img
                                                                    src={!!d.user_id.image ? d.user_id.image : require("../../../../../images/person-placeholder.jpg")}
                                                                    alt="user"/>
                                                            </div>
                                                            <div className="user_info">
                                                            <span
                                                                className="username">{!!d.user_id.name ? d.user_id.name : ""}</span>
                                                                {/*<span className="user_profile">Interaction Designer at Behold</span>*/}
                                                            </div>
                                                            <div className="post_time">
                                                                {moment(data.updatedAt).fromNow()}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
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
    return {state}
};
export default withRouter(connect(mapStateToProps)(LikesModal))
