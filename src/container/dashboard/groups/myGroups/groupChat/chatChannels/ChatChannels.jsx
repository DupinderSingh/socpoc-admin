import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './ChatChannels.css';
import PendingInvitations from "../pendingInvitations/PendingInvitations";
import {changeSocketConfig} from "../../../../../../actions/dashbaord/groups/groups";
import {getCookie} from "../../../../../../actions/app";

class ChatChannels extends React.Component {
    chatWithOneTwoOne(member) {
        this.props.dispatch(changeSocketConfig({
            isChannel: false,
            socketChannelId: "",
            socketChannelName: "",
            OneToOneChatId: member._id,
            OneToOneChatName: member.name,
            getMessages: true
        }));
        localStorage.setItem("isChannel", "false");
        localStorage.setItem("OneToOneChatId", member._id);
        localStorage.setItem("OneToOneChatName", member.name);
        localStorage.setItem("socketChannelId", "");
        localStorage.setItem("socketChannelName", "");
    }

    chatWithChannel(channel) {
        localStorage.setItem("OneToOneChatId", "");
        this.props.dispatch(changeSocketConfig({
            isChannel: true,
            socketChannelId: channel._id,
            OneToOneChatId: "",
            socketChannelName: channel.name,
            OneToOneChatName: "",
            getMessages: true
        }));
        localStorage.setItem("isChannel", "true");
        localStorage.setItem("OneToOneChatId", "");
        localStorage.setItem("OneToOneChatName", "");
        localStorage.setItem("socketChannelId", channel._id);
        localStorage.setItem("socketChannelName", channel.name);
    }

    render() {
        return (
            <div className="col-lg-3">
                <div className="widget group_chat">
                    <div className="channel">
                        <div className="group_chat_heading">
                            Channels
                        </div>
                        <ul>
                            {
                                !this.props.getMyGroupDetailsPageLoading && !this.props.getMyGroupDetailsError && this.props.getMyGroupDetails.length > 0 &&
                                this.props.getMyGroupDetails[0].channel_id.length > 0 &&
                                this.props.getMyGroupDetails[0].channel_id.map((channel, i) => (
                                    <li key={i} onClick={() => this.chatWithChannel(channel)}>
                                        <a id={channel._id} href="javascript:;">#{channel.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="one_chat">
                        <div className="group_chat_heading">
                            1-on-1 Chats
                        </div>
                        <ul>
                            {
                                !this.props.getMyGroupDetailsPageLoading && !this.props.getMyGroupDetailsError && this.props.getMyGroupDetails.length > 0 &&
                                this.props.getMyGroupDetails[0].member_id.length > 0 &&
                                this.props.getMyGroupDetails[0].member_id.map((member, i) => (
                                    member._id !== getCookie("userId") &&
                                    <li onClick={() => this.chatWithOneTwoOne(member)}>
                                        <a href="javascript:;">
                                            <div className="one_chat_detail">
                                                <div className="one_chat_avatar">
                                                    {
                                                        !!member.image &&
                                                        <img className="object_fit"
                                                             src={member.image} alt="user"/>
                                                    }
                                                    {
                                                        !!!member.image &&
                                                        <img className="object_fit"
                                                             src={require("../../../../../../images/person-placeholder.jpg")}
                                                             alt="user"/>
                                                    }
                                                </div>
                                                <div className="one_chat_info">
                                                    <h3>{member.name}</h3>
                                                    {/*<p>Yes, I’d love to meet…</p>*/}
                                                </div>
                                                {/*<span className="counting">4</span>*/}
                                            </div>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <PendingInvitations/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {getMyGroupDetailsPageLoading, getMyGroupDetailsError, getMyGroupDetails} = state.groupsReducer;
    return {getMyGroupDetailsPageLoading, getMyGroupDetailsError, getMyGroupDetails}
};
export default withRouter(connect(mapStateToProps)(ChatChannels))
