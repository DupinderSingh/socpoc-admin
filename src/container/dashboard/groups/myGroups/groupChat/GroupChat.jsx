import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './GroupChat.css';
import ChatChannels from "./chatChannels/ChatChannels";
import $ from "jquery";

class GroupChat extends React.Component {
    componentDidMount() {
        $("html,body").animate({scrollTop: 0});
    }

    render() {
        return (
            <>
                <ChatChannels/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {state}
};
export default withRouter(connect(mapStateToProps)(GroupChat))
