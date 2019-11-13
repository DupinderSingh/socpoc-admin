import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './GroupInfo.css';
import Spinner from "../../../../../../components/app/spinner/Spinner";
import moment from "moment";
import {
    changeCreateChannelForm,
    clearDeleteMyGroupStatus,
    clearLeaveMyGroupStatus,
    deleteMyGroup,
    leaveMyGroup
} from "../../../../../../actions/dashbaord/groups/groups";
import createNotification from "../../../../../../components/app/notification/Notification";
import {getCookie} from "../../../../../../actions/app";
import CreateChannelModal from "../../../../../../components/dashboard/groups/modal/createChannel/CreateChannel";

class GroupInfo extends React.Component {
    deleteThisGroup(group_id) {
        this.props.dispatch(deleteMyGroup(group_id));
    }

    leaveThisGroup(group_id) {
        this.props.dispatch(leaveMyGroup({user_id: getCookie("userId"), group_id}));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.leaveMyGroupStatus && !nextProps.leaveMyGroupError) {
            this.props.dispatch(clearLeaveMyGroupStatus());
            createNotification("success", nextProps.leaveMyGroupMessage);
            this.props.history.push("/dashboard/groups/my-groups");
        }
        if (!!nextProps.leaveMyGroupStatus && nextProps.leaveMyGroupError) {
            this.props.dispatch(clearLeaveMyGroupStatus());
            createNotification("error", nextProps.leaveMyGroupMessage);
        }
        if (!!nextProps.deleteMyGroupStatus && !nextProps.deleteMyGroupError) {
            this.props.dispatch(clearDeleteMyGroupStatus());
            createNotification("success", nextProps.deleteMyGroupMessage);
            this.props.history.push("/dashboard/groups/my-groups");
        }
        if (!!nextProps.deleteMyGroupStatus && nextProps.deleteMyGroupError) {
            this.props.dispatch(clearDeleteMyGroupStatus());
            createNotification("error", nextProps.deleteMyGroupMessage);
        }
    }

    initalizeModal() {
        this.props.dispatch(changeCreateChannelForm({
            ...this.props.createChannelForm,
            channel_name: ""
        }));
        const validElms = document.querySelectorAll(".create-channel-form .form-group input");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }
        window.setTimeout(() => {
            if (!!document.getElementsByName("channel_name")[0]) {
                document.getElementsByName("channel_name")[0].focus();
            }
        }, 500)
    }

    render() {
        return (
            <div className="widget group_information">
                {
                    this.props.getMyGroupDetailsPageLoading &&
                    <Spinner isPageLoading={true}/>
                }
                {
                    !this.props.getMyGroupDetailsPageLoading &&
                    !this.props.getMyGroupDetailsError &&
                    this.props.getMyGroupDetails.length > 0 &&
                    <div>
                        <div className="g_info_header">
                            <div className="g_info_image">
                                {
                                    !!this.props.getMyGroupDetails[0].group_image &&
                                    <img className="object_fit"
                                         src={this.props.getMyGroupDetails[0].group_image} alt="bg"/>
                                }
                            </div>
                            <div className="g_info_data">
                                <h1>{this.props.getMyGroupDetails[0].group_name ? this.props.getMyGroupDetails[0].group_name : ""}</h1>
                                <span>Created {moment(this.props.getMyGroupDetails[0].createdAt).fromNow()}</span>
                                <p>{this.props.getMyGroupDetails[0].description ? this.props.getMyGroupDetails[0].description : ""}</p>
                            </div>
                        </div>
                        <div className="g_sub_header">
                            <div className="g_admin_detail">
                                <div className="g_admin_image">
                                    {
                                        !!this.props.getMyGroupDetails[0].user_id.image &&
                                        <img className="object_fit"
                                             src={this.props.getMyGroupDetails[0].user_id.image} alt="user"/>
                                    }
                                    {
                                        !!!this.props.getMyGroupDetails[0].user_id.image &&
                                        <img className="object_fit"
                                             src={require("../../../../../../images/person-placeholder.jpg")}
                                             alt="user"/>
                                    }
                                </div>
                                <div className="g_admin_info">
                                    <h3>{this.props.getMyGroupDetails[0].user_id.name}</h3>
                                    <p>Group admin</p>
                                </div>
                            </div>
                            <div className="other_group_data mb-0">
                                <div className="other_group_data_detail">
                                    <span>{!!this.props.getMyGroupDetails[0].memberCount ? this.props.getMyGroupDetails[0].memberCount : 0}</span>
                                    <p>members</p>
                                </div>
                                <div className="other_group_data_detail">
                                    <span>{!!this.props.getMyGroupDetails[0].totalPost ? this.props.getMyGroupDetails[0].totalPost : 0}</span>
                                    <p>posts</p>
                                </div>
                                <div className="other_group_data_detail">
                                    <span>{!!this.props.getMyGroupDetails[0].todayPost ? this.props.getMyGroupDetails[0].todayPost : 0}</span>
                                    <p>posts today</p>
                                </div>
                            </div>
                        </div>

                        <div className="dropdown group_options">
                            <div className="dropdown-toggle" role="button" data-toggle="dropdown"
                                 aria-haspopup="true" aria-expanded="false">
                                <img src={require("../../../../../../images/options.svg")} alt="option"/>
                            </div>
                            <div className="dropdown-menu dropdown-menu-right custom-group">
                                <div className="dropdown_box">
                                    <div className="dropdown_body">
                                        <div className="dropdown_links">
                                            <ul>
                                                {
                                                    this.props.getMyGroupDetails[0].isAdmin &&
                                                    <li>
                                                        <Link
                                                            to={"/dashboard/groups/" + this.props.getMyGroupDetails[0]._id + "/settings"}>
                                                            Edit Group
                                                        </Link>
                                                    </li>
                                                }
                                                {
                                                    this.props.getMyGroupDetails[0].isAdmin ?
                                                        <li>
                                                            <a href={"#/"}
                                                               onClick={() => this.deleteThisGroup(this.props.getMyGroupDetails[0]._id)}>
                                                                Delete Group
                                                            </a>
                                                        </li>
                                                        :
                                                        <li>
                                                            <a href={"#/"}
                                                               onClick={() => this.leaveThisGroup(this.props.getMyGroupDetails[0]._id)}>
                                                                Leave Group
                                                            </a>
                                                        </li>
                                                }
                                                {
                                                    this.props.getMyGroupDetails[0].isAdmin &&
                                                    <li>
                                                        <a href="#/" onClick={this.initalizeModal.bind(this)}
                                                           data-toggle="modal"
                                                           data-target="#create_channel">Create Channel</a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !this.props.getMyGroupDetailsPageLoading && !this.props.getMyGroupDetailsError && this.props.getMyGroupDetails.length === 0 &&
                    <div className="error_wrapper">
                        <div className="error_page">
                            <img src={require("../../../../../../images/error.png")} alt="images"/>
                            <h3>No groups found!!</h3>
                        </div>
                    </div>
                }
                {
                    !this.props.getMyGroupDetailsPageLoading && this.props.getMyGroupDetailsError &&
                    <div className="error_wrapper">
                        <div className="error_page">
                            <img src={require("../../../../../../images/error.png")} alt="images"/>
                            <h3>{this.props.getMyGroupDetailsError}</h3>
                            <p>The server encountered an internal error and was unable to complete
                                your request. Please try reloading the page, or try visiting again
                                later. </p>
                        </div>
                    </div>
                }
                <CreateChannelModal/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        createChannelForm,

        getMyGroupDetailsPageLoading,
        getMyGroupDetailsStatus,
        getMyGroupDetailsError,
        getMyGroupDetailsMessage,
        getMyGroupDetails,

        deleteMyGroupPageLoading,
        deleteMyGroupStatus,
        deleteMyGroupError,
        deleteMyGroupMessage,

        leaveMyGroupPageLoading,
        leaveMyGroupStatus,
        leaveMyGroupError,
        leaveMyGroupMessage
    } = state.groupsReducer;
    return {
        createChannelForm,

        getMyGroupDetailsPageLoading,
        getMyGroupDetailsStatus,
        getMyGroupDetailsError,
        getMyGroupDetailsMessage,
        getMyGroupDetails,

        deleteMyGroupPageLoading,
        deleteMyGroupStatus,
        deleteMyGroupError,
        deleteMyGroupMessage,

        leaveMyGroupPageLoading,
        leaveMyGroupStatus,
        leaveMyGroupError,
        leaveMyGroupMessage
    }
};
export default withRouter(connect(mapStateToProps)(GroupInfo))
