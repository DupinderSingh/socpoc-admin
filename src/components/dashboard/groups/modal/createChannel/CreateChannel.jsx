import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Label from "../../../../app/label/Label";
import Input from "../../../../app/input/Input";
import Button from "../../../../app/button/Button";
import {
    changeCreateChannelForm,
    clearCreateChannelResponse,
    createChannel,
    getMyGroupDetails
} from '../../../../../actions/dashbaord/groups/groups';
import createNotification from "../../../../app/notification/Notification";
import $ from "jquery";
import {getCookie} from "../../../../../actions/app";

class CreateChannelModal extends React.Component {
    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changeCreateChannelForm({...this.props.createChannelForm, [target.name]: target.value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        const validElms = document.querySelectorAll(".create-channel-form .form-group input:valid");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }
        if (e.target.checkValidity()) {
            // hit the api...
            this.props.dispatch(createChannel({
                user_id: getCookie("userId"),
                group_id: this.props.match.params.group,
                name: this.props.channel_name
            }));
        } else {
            const invalidElms = document.querySelectorAll(".create-channel-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++) {
                invalidElms[i].parentElement.classList.add("has-error");
            }
            const validElms = document.querySelectorAll(".create-channel-form .form-group input:valid");
            for (let i = 0; i < validElms.length; i++) {
                validElms[i].parentElement.classList.remove("has-error");
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.createChannelStatus) {
            if (!nextProps.createChannelError) {
                // clear everything
                nextProps.dispatch(changeCreateChannelForm({
                    ...this.props.createChannelForm,
                    channel_name: ""
                }));
                const validElms = document.querySelectorAll(".create-channel-form .form-group input");
                for (let i = 0; i < validElms.length; i++) {
                    validElms[i].parentElement.classList.remove("has-error");
                }
                createNotification("success", nextProps.createChannelMessage);
                this.props.dispatch(clearCreateChannelResponse());
                $("#create_channel").click();
                // get the fmy-profile-details....
                this.props.dispatch(getMyGroupDetails(nextProps.match.params.group));
            } else {
                createNotification("error", nextProps.createChannelMessage);
                this.props.dispatch(clearCreateChannelResponse());
                $("#create_channel").click();
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="create_channel" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form className="create-channel-form" onSubmit={this.handleSubmit.bind(this)}
                              noValidate={true}>
                            <div className="modal-header">
                                <h5 className="modal-title">Create Channel</h5>
                            </div>
                            <div className="modal-body">
                                <div className="modal_width_wrapper">
                                    <div className="form-group">
                                        <Label>Channel Name</Label>
                                        <Input type="text" className="form-control"
                                               name="channel_name"
                                               value={this.props.createChannelForm.channel_name}
                                               minLength={3}
                                               maxLength={50}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your channel name"/>
                                        <p className="with-error">Please enter valid Channel Name.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className={this.props.createChannelPageLoading ? "btn btn-primary m-loader" : "btn btn-primary btn-icon-right"}
                                    disabled={!!this.props.createChannelPageLoading} type="submit">
                                    <span>Continue</span> <img className="arrow"
                                                               src={require("../../../../../images/btn_arrow.svg")}
                                                               alt="arrow"/>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {createChannelForm, createChannelPageLoading, createChannelStatus, createChannelError, createChannelMessage} = state.groupsReducer;
    const {channel_name} = createChannelForm;
    return {
        channel_name,
        createChannelForm,
        createChannelPageLoading,
        createChannelStatus,
        createChannelError,
        createChannelMessage
    }
};
export default withRouter(connect(mapStateToProps)(CreateChannelModal))
