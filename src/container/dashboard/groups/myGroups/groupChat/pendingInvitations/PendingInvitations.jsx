import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";
import {
    acceptDeclineGroup,
    clearAcceptDeclineGroupStatus,
    getMyGroupDetails
} from "../../../../../../actions/dashbaord/groups/groups";
import createNotification from "../../../../../../components/app/notification/Notification";

class PendingInvitations extends React.Component {
    acceptIgnoreGroup(group_id, sender_id, status) {
        this.props.dispatch(acceptDeclineGroup({group_id, sender_id, accepted: status}));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.acceptDeclineGroupStatus && !nextProps.acceptDeclineGroupError) {
            this.props.dispatch(clearAcceptDeclineGroupStatus());
            createNotification("success", nextProps.acceptDeclineGroupMessage);
            this.props.dispatch(getMyGroupDetails(nextProps.match.params.group));
        }
        if (!!nextProps.acceptDeclineGroupStatus && nextProps.acceptDeclineGroupError) {
            this.props.dispatch(clearAcceptDeclineGroupStatus());
            createNotification("error", nextProps.acceptDeclineGroupMessage);
        }
    }

    render() {
        return (
            <div className="widget">
                <div className="widget_header">
                    <h1>Pending Invitations</h1>
                </div>
                <div className="pending_body">
                    <div className="pending_users">
                        <ul>
                            {
                                !this.props.getMyGroupDetailsPageLoading && !this.props.getMyGroupDetailsError && this.props.getMyGroupDetails.length > 0 && !!this.props.getMyGroupDetails[0].group_join_request &&
                                this.props.getMyGroupDetails[0].group_join_request.length > 0 &&
                                this.props.getMyGroupDetails[0].group_join_request.map((invitation, i) => (
                                    <li>
                                        <div className="pending_users_list flex-wrap mb-4">
                                            <div className="avatar">
                                                <img className="object-fit"
                                                     src={!!invitation.user_id.image ? invitation.user_id.image : require("../../../../../../images/person-placeholder.jpg")}
                                                     alt="user"/>
                                            </div>
                                            <div className="list_info">
                                                <a href="javascript:;"
                                                   className="list_info_link">{invitation.user_id.name}</a>
                                                <p/>
                                                <span
                                                    className="time">Requested {moment(invitation.createdAt).fromNow()}</span>
                                            </div>
                                            <div className="pending_users_buttons mt-2 ml-0">
                                                <button
                                                    onClick={() => this.acceptIgnoreGroup(this.props.match.params.group, invitation.user_id._id, 1)}
                                                    type="button" className="btn btn-primary" name="button">Accept
                                                </button>
                                                <button
                                                    onClick={() => this.acceptIgnoreGroup(this.props.match.params.group, invitation.user_id._id, 2)}
                                                    type="button" className="btn btn-outline-primary"
                                                    name="button">Ignore
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        getMyGroupDetailsPageLoading, getMyGroupDetailsError, getMyGroupDetails,
        acceptDeclineGroupPageLoading,
        acceptDeclineGroupStatus,
        acceptDeclineGroupError,
        acceptDeclineGroupMessage
    } = state.groupsReducer;
    return {
        getMyGroupDetailsPageLoading, getMyGroupDetailsError, getMyGroupDetails,
        acceptDeclineGroupPageLoading,
        acceptDeclineGroupStatus,
        acceptDeclineGroupError,
        acceptDeclineGroupMessage
    }
};
export default withRouter(connect(mapStateToProps)(PendingInvitations))
