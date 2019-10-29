import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Label from "../../../../app/label/Label";
import Input from "../../../../app/input/Input";
import Button from "../../../../app/button/Button";
import {
    changePassword,
    changePasswordForm,
    clearChangePasswordResponse
} from '../../../../../actions/dashbaord/settings';
import createNotification from "../../../../app/notification/Notification";
import {getCookie} from "../../../../../actions/app";
import $ from "jquery";

class ChangePasswordModal extends React.Component {
    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changePasswordForm({...this.props.password, [target.name]: target.value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation(); // call only this submit box.....
        let passwordMatch = false;
        const confirmPassword = document.getElementsByName("confirm_password")[0];
        this.props.thi.setState({
            newPassword: this.props.password.new_password
        });
        const validElms = document.querySelectorAll(".change-password-form .form-group input:valid");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }
        if (this.props.password.new_password === this.props.password.confirm_password) {
            passwordMatch = true;
            confirmPassword.parentElement.classList.remove("has-error");
        }
        if (e.target.checkValidity() && !!passwordMatch) {
            this.props.dispatch(changePassword({
                "user_id": getCookie("userId"),
                "old_password": this.props.password.old_password,
                "new_password": this.props.password.new_password,
                "confirm_password": this.props.password.confirm_password
            }));
        } else {
            const invalidElms = document.querySelectorAll(".change-password-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++) {
                invalidElms[i].parentElement.classList.add("has-error");
            }
            const validElms = document.querySelectorAll(".change-password-form .form-group input:valid");
            for (let i = 0; i < validElms.length; i++) {
                validElms[i].parentElement.classList.remove("has-error");
            }
            if (!passwordMatch) {
                confirmPassword.parentElement.classList.add("has-error")
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.changePasswordStatus) {
            if (!nextProps.changePasswordError) {
                // clear everything
                nextProps.dispatch(changePasswordForm({
                    ...this.props.password,
                    old_password: "",
                    new_password: "",
                    confirm_password: ""
                }));
                const validElms = document.querySelectorAll(".change-password-form .form-group input");
                for (let i = 0; i < validElms.length; i++) {
                    validElms[i].parentElement.classList.remove("has-error");
                }
                createNotification("success", nextProps.changePasswordMessage);
                this.props.dispatch(clearChangePasswordResponse());
                $("#change_password").click();
            } else {
                createNotification("error", nextProps.changePasswordMessage);
                this.props.dispatch(clearChangePasswordResponse());
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="change_password" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form className="change-password-form" onSubmit={this.handleSubmit.bind(this)}
                              noValidate={true}>
                            <div className="modal-header">
                                <h5 className="modal-title">Change password</h5>
                            </div>
                            <div className="modal-body">
                                <div className="modal_width_wrapper">
                                    <div className="form-group">
                                        <Label>Current Password</Label>
                                        <Input type="password" className="form-control"
                                               name="old_password"
                                               value={this.props.password.old_password}
                                               pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your current password"/>
                                        <p className="with-error">Please enter valid Current Password.</p>
                                    </div>
                                    <div className="form-group">
                                        <Label>New Password</Label>
                                        <Input type="password" className="form-control"
                                               name="new_password"
                                               value={this.props.password.new_password}
                                               pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your new password"/>
                                        <p className="with-error" style={{color: "unset"}}>Enter your
                                            New Password (<span
                                                style={{color: `${this.props.newPassword.length >= 8 ? "green" : "red"}`}}>Min 8 characters</span>, <span
                                                style={{color: `${this.props.newPassword.match("(?=.*?[A-Z])") ? "green" : "red"}`}}>at least one uppercase letter</span>, <span
                                                style={{color: `${this.props.newPassword.match("(?=.*?[a-z])") ? "green" : "red"}`}}>one lowercase letter</span>, <span
                                                style={{color: `${this.props.newPassword.match("(?=.*?[0-9])") ? "green" : "red"}`}}>one number and </span>
                                            <span
                                                style={{color: `${this.props.newPassword.match("(?=.*?[#?!@$%^&*-])") ? "green" : "red"}`}}>one special character required</span>).
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <Label>Confirm Password</Label>
                                        <Input type="password" className="form-control"
                                               name="confirm_password"
                                               value={this.props.password.confirm_password}
                                               pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your confirm password"/>
                                        <p className="with-error">Please enter valid Confirm Password.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className={this.props.changePasswordPageLoading ? "btn btn-primary m-loader" : "btn btn-primary btn-icon-right"}
                                    disabled={!!this.props.changePasswordPageLoading} type="submit">
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
    const {password, changePasswordPageLoading, changePasswordStatus, changePasswordError, changePasswordMessage} = state.settingsReducer;
    return {password, changePasswordPageLoading, changePasswordStatus, changePasswordError, changePasswordMessage}
};
export default withRouter(connect(mapStateToProps)(ChangePasswordModal))