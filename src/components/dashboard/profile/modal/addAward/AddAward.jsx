import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import DatePicker from 'react-date-picker';
import Label from "../../../../app/label/Label";
import Input from "../../../../app/input/Input";
import Button from "../../../../app/button/Button";
import {addAward, changeAddAwardForm, clearAddAwardResponse, getAward} from '../../../../../actions/dashbaord/profile';
import createNotification from "../../../../app/notification/Notification";
import {getCookie} from "../../../../../actions/app";
import $ from "jquery";

function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

class AddAwardModal extends React.Component {
    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changeAddAwardForm({...this.props.addAward, [target.name]: target.value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        const validElms = document.querySelectorAll(".add-Award-form .form-group input:valid");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }
        if (!!this.props.addAward.date) {
            this.props.changeIsValidDateState.setState({
                isValidDate: true
            })
        }
        if (e.target.checkValidity() &&
            !!this.props.addAward.date
        ) {
            this.props.dispatch(addAward({
                "user_id": getCookie("userId"),
                "award_name": this.props.addAward.award_name,
                "organisation_name": this.props.addAward.organization,
                "date": !!convert(this.props.addAward.date) ? convert(this.props.addAward.date) : ""
            }));
        } else {
            const invalidElms = document.querySelectorAll(".add-Award-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++) {
                invalidElms[i].parentElement.classList.add("has-error");
            }
            const validElms = document.querySelectorAll(".add-Award-form .form-group input:valid");
            for (let i = 0; i < validElms.length; i++) {
                validElms[i].parentElement.classList.remove("has-error");
            }
            if (this.props.addAward.date === "") {
                this.props.changeIsValidDateState.setState({
                    isValidDate: false
                })
            } else {
                this.props.changeIsValidDateState.setState({
                    isValidDate: true
                })
            }
        }

    }

    onDateChange = date => {
        if (!!date) {
            this.props.dispatch(changeAddAwardForm({
                ...this.props.addAward,
                date
            }));
        } else {
            this.props.dispatch(changeAddAwardForm({
                ...this.props.addAward,
                date: ""
            }));
        }
    };

    onCalendarClose = () => {
        // this.props.dispatch(changeAddAwardForm({
        //     ...this.props.addAward,
        //     start_year: !!this.props.addAward.start_year ? new Date(this.props.addAward.start_year) : new Date(),
        //     end_year: !!this.props.addAward.end_year ? new Date(this.props.addAward.end_year) : new Date()
        // }));
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.addAwardStatus) {
            if (!nextProps.addAwardError) {
                // clear everything
                nextProps.dispatch(changeAddAwardForm({
                    ...this.props.addAward,
                    award_name: "",
                    organization: "",
                    date: ""
                }));
                this.props.changeIsValidDateState.setState({
                    isValidDate: null
                });
                const validElms = document.querySelectorAll(".add-Award-form .form-group input");
                for (let i = 0; i < validElms.length; i++) {
                    validElms[i].parentElement.classList.remove("has-error");
                }
                createNotification("success", nextProps.addAwardMessage);
                this.props.dispatch(clearAddAwardResponse());
                // call api to get the Awards....
                this.props.dispatch(getAward(this.props.match.params.userId));
                $("#add_award").click();
            } else {
                createNotification("error", nextProps.addAwardMessage);
                this.props.dispatch(clearAddAwardResponse());
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="add_award" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form className="add-Award-form" onSubmit={this.handleSubmit.bind(this)} noValidate={true}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add a new award</h5>
                            </div>
                            <div className="modal-body">
                                <div className="modal_width_wrapper">
                                    <div className="form-group">
                                        <Label>Award Name</Label>
                                        <Input type="text" className="form-control"
                                               name="award_name"
                                               minLength={3}
                                               maxLength={50}
                                               value={this.props.addAward.award_name}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your award name"/>
                                        <p className="with-error">Please enter valid Award Name.</p>
                                    </div>
                                    <div className="form-group">
                                        <Label>Organization</Label>
                                        <Input type="text" className="form-control"
                                               name="organization"
                                               value={this.props.addAward.organization}
                                               minLength={3}
                                               maxLength={50}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your organization"/>
                                        <p className="with-error">Please enter valid Organization.</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div
                                                className={this.props.isValidDate === false ? "form-group has-error" : "form-group"}>
                                                <Label>Date</Label>
                                                <div style={{display: "block", width: "100%"}}>
                                                    <DatePicker
                                                        onChange={this.onDateChange}
                                                        maxDate={new Date()}
                                                        clearIcon={null}
                                                        clearAriaLabel={"Clear value"}
                                                        onCalendarClose={this.onCalendarClose}
                                                        value={this.props.addAward.date}
                                                    />
                                                </div>
                                                {
                                                    this.props.isValidDate === false &&
                                                    <p className="with-error">Please enter valid Date.</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className={this.props.addAwardPageLoading ? "btn btn-primary m-loader" : "btn btn-primary btn-icon-right"}
                                    disabled={!!this.props.addAwardPageLoading} type="submit">
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
    const {linkedinProfile, addAwardPageLoading, addAwardStatus, addAwardError, addAwardMessage} = state.profileReducer;
    const {addAward} = linkedinProfile;
    return {addAward, addAwardPageLoading, addAwardStatus, addAwardError, addAwardMessage}
};
export default withRouter(connect(mapStateToProps)(AddAwardModal))