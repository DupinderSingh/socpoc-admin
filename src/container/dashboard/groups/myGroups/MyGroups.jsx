import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './MyGroups.css';
import {
    changeMyGroupsPage,
    clearDeleteMyGroupStatus,
    clearGetMyGroupsResponse,
    clearGroupTypeGroups,
    deleteMyGroup,
    getMyGroups,
    targetMyGroupsPage
} from "../../../../actions/dashbaord/groups/groups";
import moment from "moment";
import createNotification from "../../../../components/app/notification/Notification";
import LoadMoreMyGroups from "./loadMoreMyGroups/LoadMoreMyGroups";

class MyGroups extends React.Component {
    componentDidMount() {
        this.props.dispatch(targetMyGroupsPage(1));
        this.props.dispatch(clearGroupTypeGroups());
        this.props.dispatch(clearGetMyGroupsResponse());
        this.props.dispatch(changeMyGroupsPage(1));
        this.props.dispatch(getMyGroups(1));
    }

    deleteGroup(group_id, selectedPage) {
        this.props.dispatch(targetMyGroupsPage(!!selectedPage ? selectedPage : 1));
        this.props.dispatch(deleteMyGroup(group_id))
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.deleteMyGroupStatus && !nextProps.deleteMyGroupError) {
            this.props.dispatch(clearDeleteMyGroupStatus());
            createNotification("success", nextProps.deleteMyGroupMessage);
            this.props.dispatch(getMyGroups(nextProps.myGroupsTargetPageNumber));
        }
        if (!!nextProps.deleteMyGroupStatus && nextProps.deleteMyGroupError) {
            this.props.dispatch(clearDeleteMyGroupStatus());
            createNotification("error", nextProps.deleteMyGroupMessage);
        }
    }

    render() {
        return (
            <>
                {
                    !this.props.myGroupsError && this.props.myGroups.length > 0 &&
                    this.props.myGroups.map((group, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="widget"
                                 style={{backgroundColor: group.status !== 1 && "rgba(255, 0, 0, 0.36)"}}>
                                <div className="group_header">
                                    <div className="group_avatar">
                                        <img className="object-fit"
                                             src={!!group.user_id.image ? group.user_id.image : require("../../../../images/person-placeholder.jpg")}
                                             alt="group_image"/>
                                    </div>
                                    <div className="group_info">
                                        <h3>{!!group.group_name ? group.group_name : ""}</h3>
                                        <p>{group.member_id.length} members
                                            • {moment(group.createdAt).fromNow()}</p>
                                    </div>


                                    <div
                                        className="dropdown post_actions comment_actions">
                                        <div className="dropdown-toggle"
                                             role="button"
                                             data-toggle="dropdown"
                                             aria-haspopup="true"
                                             aria-expanded="false">
                                            <img
                                                src={require("../../../../images/post_action.svg")}
                                                alt="option"/>
                                        </div>
                                        <div
                                            className="dropdown-menu dropdown-menu-right">
                                            <div className="dropdown_box">
                                                <div className="dropdown_body">
                                                    <div
                                                        className="dropdown_links">
                                                        <ul>
                                                            {
                                                                group.status === 1 &&
                                                                <li>
                                                                    <a href="javascript:;"
                                                                       onClick={() => this.props.history.push("/dashboard/groups/" + group._id + "/settings")}>
                                                                        Edit
                                                                    </a>
                                                                </li>
                                                            }
                                                            <li>
                                                                <a className="text-danger"
                                                                   onClick={() => this.deleteGroup(group._id, group.pageNumber)}
                                                                   href="javascript:;">
                                                                    {group.status === 1 ? "Inactivate Group" : "Activate Group"}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="group_body">
                                    {!!group.description ? group.description : ""}
                                </div>
                                <div className="group_footer">
                                    {/*<Button className="btn btn-primary btn-edge"*/}
                                    {/*        onClick={() => this.props.history.push("/dashboard/groups/my-groups/" + group._id + "/chat")}*/}
                                    {/*        type="submit"><span>View group</span>*/}
                                    {/*    <img className="arrow" src={require("../../../../images/btn_arrow.svg")}*/}
                                    {/*         alt="arrow"/>*/}
                                    {/*</Button>*/}
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    !this.props.myGroupsPageLoading && !this.props.myGroupsError && this.props.myGroups.length === 0 &&
                    <div className="error_wrapper">
                        <div className="error_page">
                            <img src={require("../../../../images/error.png")} alt="images"/>
                            <h3>No groups found!!</h3>
                        </div>
                    </div>
                }
                {
                    !this.props.myGroupsPageLoading && this.props.myGroupsError &&
                    <div className="error_wrapper">
                        <div className="error_page">
                            <img src={require("../../../../images/error.png")} alt="images"/>
                            <h3>{this.props.myGroupsError}</h3>
                            <p>The server encountered an internal error and was unable to complete
                                your request. Please try reloading the page, or try visiting again
                                later. </p>
                        </div>
                    </div>
                }
                {
                    !this.props.myGroupsError && this.props.myGroups.length > 0 &&
                    this.props.myGroups[this.props.myGroups.length - 1].pageNumber === (Number.isInteger(this.props.myGroups.length / 10) ? (this.props.myGroups.length / 10) : (this.props.myGroups.length / 10) + 1) &&
                    <LoadMoreMyGroups/>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        myGroupsPageLoading,
        myGroupsStatus,
        myGroupsError,
        myGroupsMessage,
        myGroups,

        deleteMyGroupPageLoading,
        deleteMyGroupStatus,
        deleteMyGroupError,
        deleteMyGroupMessage,

        myGroupsPageNumber,

        myGroupsTargetPageNumber
    } = state.groupsReducer;
    return {
        myGroupsPageLoading,
        myGroupsStatus,
        myGroupsError,
        myGroupsMessage,
        myGroups,

        deleteMyGroupPageLoading,
        deleteMyGroupStatus,
        deleteMyGroupError,
        deleteMyGroupMessage,

        myGroupsPageNumber,

        myGroupsTargetPageNumber
    }
};
export default withRouter(connect(mapStateToProps)(MyGroups))
