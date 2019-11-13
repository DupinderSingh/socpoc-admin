import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {acceptRejectGroupNotification} from "../../../../../../actions/dashbaord/groups/groups";

class GroupNotifications extends React.Component {
    acceptGroupNotification(accept) {
        this.props.dispatch(acceptRejectGroupNotification({group_id: "", sender_id: "", accepted: accept}))
    }

    render() {
        return (
            <div style={{display: "block"}}>
                <ul>
                    <li>
                        <span>Do you want to accept/ delete the group noti=fication..</span>
                        <button onClick={() => this.acceptGroupNotification(true)}>Accept</button>
                        <button onClick={() => this.acceptGroupNotification(false)}>Cancel</button>
                    </li>
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        acceptRejectGroupPageLoading,
        acceptRejectGroupStatus,
        acceptRejectGroupError,
        acceptRejectGroupMessage
    } = state.groupsReducer;
    return {
        acceptRejectGroupPageLoading,
        acceptRejectGroupStatus,
        acceptRejectGroupError,
        acceptRejectGroupMessage
    }
};
export default withRouter(connect(mapStateToProps)(GroupNotifications))
