import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Label from "../../../../app/label/Label";
import Input from "../../../../app/input/Input";
import Button from "../../../../app/button/Button";
import {
    addPosition,
    changeAddPositionForm,
    clearAddPositionResponse,
    getPosition
} from '../../../../../actions/dashbaord/profile';
import createNotification from "../../../../app/notification/Notification";
import {getCookie} from "../../../../../actions/app";
import DatePicker from "react-date-picker";

function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

class AddPositionModal extends React.Component {
    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changeAddPositionForm({...this.props.addPosition, [target.name]: target.value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        const validElms = document.querySelectorAll(".add-position-form .form-group input:valid");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }


        let isValidDate = false;
        if (!!this.props.addPosition.join_year && !!this.props.addPosition.leave_year) {
            // check both dates are valid
            this.props.changeIsValidDateState.setState({
                isValidDate: true
            })
            isValidDate = true
        } else if (!!this.props.addPosition.join_year && this.props.addPosition.leave_year === "") {
            // check the start year validity
            this.props.changeIsValidDateState.setState({
                isValidDate: true
            })
            isValidDate = true
        } else { // confirmed
            if (this.props.addPosition.join_year === "" && !!this.props.addPosition.leave_year) {
                // start year is must error true
                this.props.changeIsValidDateState.setState({
                    isValidDate: false
                });
            } else { // confirmed
                if (this.props.addPosition.join_year === "" && this.props.addPosition.leave_year === "") {
                    // both empty error true
                    this.props.changeIsValidDateState.setState({
                        isValidDate: false
                    })
                }
            }
        }


        const jd = document.getElementsByName("job_description")[0];
        // const jdPattern = /^([a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+\s)*[a-zA-Z.!-”$%&’()*\+,\/;\[\\\]\^_`{|}~]+$/;
        let validJd = false;
        // if (jd.value.length >= 3 && jd.value.length <= 500 && jdPattern.test(jd.value)) {
        //     validJd = true;
        //     jd.parentElement.classList.remove("has-error")
        // }
        if (jd.value.length >= 3 && jd.value.length <= 500) {
            validJd = true;
            jd.parentElement.classList.remove("has-error")
        }
        if (e.target.checkValidity() &&
            isValidDate &&
            !!validJd
        ) {
            this.props.dispatch(addPosition({
                "user_id": getCookie("userId"),
                "profile_name": this.props.addPosition.profile_name,
                "company_name": this.props.addPosition.company_name,
                "join_year": !!convert(this.props.addPosition.join_year) ? convert(this.props.addPosition.join_year) : "",
                "leave_year": !!this.props.addPosition.leave_year ? convert(this.props.addPosition.leave_year) : "",
                "location": this.props.addPosition.company_location,
                "description": this.props.addPosition.job_description
            }));
        } else {
            const invalidElms = document.querySelectorAll(".add-position-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++) {
                invalidElms[i].parentElement.classList.add("has-error");
            }
            const validElms = document.querySelectorAll(".add-position-form .form-group input:valid");
            for (let i = 0; i < validElms.length; i++) {
                validElms[i].parentElement.classList.remove("has-error");
            }
            if (!!this.props.addPosition.join_year && !!this.props.addPosition.leave_year) {
                // check both dates are valid
                this.props.changeIsValidDateState.setState({
                    isValidDate: true
                })
            } else if (!!this.props.addPosition.join_year && this.props.addPosition.leave_year === "") {
                // check the start year validity
                this.props.changeIsValidDateState.setState({
                    isValidDate: true
                })
            } else { // confirmed
                if (this.props.addPosition.join_year === "" && !!this.props.addPosition.leave_year) {
                    // start year is must error true
                    this.props.changeIsValidDateState.setState({
                        isValidDate: false
                    })
                } else { // confirmed
                    if (this.props.addPosition.join_year === "" && this.props.addPosition.leave_year === "") {
                        // both empty error true
                        this.props.changeIsValidDateState.setState({
                            isValidDate: false
                        })
                    }
                }
            }
        }
        if (!validJd) {
            jd.parentElement.classList.add("has-error")
        } else {
            jd.parentElement.classList.remove("has-error")
        }
    }

    onStartDateChange = date => {
        // console.log(date, "date.......");
        // // this.setState({date});
        // if (!!date) {
        //     this.props.dispatch(changeaddPositionForm({
        //         ...this.props.addPosition,
        //         join_year: date[0] ? date[0] : "",
        //         leave_year: date[1] ? date[1] : ""
        //     }));
        // } else {
        //     this.props.dispatch(changeaddPositionForm({
        //         ...this.props.addPosition,
        //         join_year: "",
        //         leave_year: ""
        //     }));
        // }


        if (!!date) {
            this.props.dispatch(changeAddPositionForm({
                ...this.props.addPosition,
                join_year: date,
                leave_year: this.props.addPosition.leave_year
            }));
        } else {
            this.props.dispatch(changeAddPositionForm({
                ...this.props.addPosition,
                join_year: "",
                leave_year: this.props.addPosition.leave_year
            }));
        }
    };

    onEndDateChange = date => {
        // console.log(date, "date.......");
        // // this.setState({date});
        // if (!!date) {
        //     this.props.dispatch(changeaddPositionForm({
        //         ...this.props.addPosition,
        //         join_year: date[0] ? date[0] : "",
        //         leave_year: date[1] ? date[1] : ""
        //     }));
        // } else {
        //     this.props.dispatch(changeaddPositionForm({
        //         ...this.props.addPosition,
        //         join_year: "",
        //         leave_year: ""
        //     }));
        // }

        if (!!date) {
            this.props.dispatch(changeAddPositionForm({
                ...this.props.addPosition,
                join_year: this.props.addPosition.join_year,
                leave_year: date
            }));
        } else {
            this.props.dispatch(changeAddPositionForm({
                ...this.props.addPosition,
                join_year: this.props.addPosition.join_year,
                leave_year: ""
            }));
        }
    };

    onCalendarClose = () => {
        // this.props.dispatch(changeAddPositionForm({
        //     ...this.props.addPosition,
        //     join_year: !!this.props.addPosition.join_year ? new Date(this.props.addPosition.join_year) : new Date(),
        //     leave_year: !!this.props.addPosition.leave_year ? new Date(this.props.addPosition.leave_year) : new Date()
        // }));
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.addPositionStatus) {
            if (!nextProps.addPositionError) {
                // clear everything
                nextProps.dispatch(changeAddPositionForm({
                    ...this.props.addPosition,
                    profile_name: "",
                    company_name: "",
                    join_year: "",
                    leave_year: "",
                    company_location: "",
                    job_description: ""
                }));
                this.props.changeIsValidDateState.setState({
                    isValidDate: null
                });
                const validElms = document.querySelectorAll(".add-position-form .form-group input");
                for (let i = 0; i < validElms.length; i++) {
                    validElms[i].parentElement.classList.remove("has-error");
                }
                document.getElementsByName("job_description")[0].parentElement.classList.remove("has-error");
                createNotification("success", nextProps.addPositionMessage);
                this.props.dispatch(clearAddPositionResponse());
                // call api to get the position....
                this.props.dispatch(getPosition(this.props.match.params.userId));
                $("#add_position").click();
            } else {
                createNotification("error", nextProps.addPositionMessage);
                this.props.dispatch(clearAddPositionResponse());
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="add_position" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form className="add-position-form" onSubmit={this.handleSubmit.bind(this)} noValidate={true}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add a new position</h5>
                            </div>
                            <div className="modal-body">
                                <div className="modal_width_wrapper">
                                    <div className="form-group">
                                        <Label>Profile</Label>
                                        <Input type="text" className="form-control"
                                               name="profile_name"
                                               minLength={3}
                                               maxLength={50}
                                               value={this.props.addPosition.profile_name}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your profile"/>
                                        <p className="with-error">Please enter valid Profile.</p>
                                    </div>
                                    <div className="form-group">
                                        <Label>Company Name</Label>
                                        <Input type="text" className="form-control"
                                               name="company_name"
                                               value={this.props.addPosition.company_name}
                                               minLength={3}
                                               maxLength={50}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your company name"/>
                                        <p className="with-error">Please enter valid Company Name.</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 ">
                                            <div
                                                className={this.props.isValidDate === false ? "form-group has-error" : "form-group"}>
                                                <Label>Join Year - Leave Year</Label>
                                                {/*<div style={{display: "grid"}}>*/}
                                                {/*    <DateRangePicker*/}
                                                {/*        selectRange={false}*/}
                                                {/*        onChange={this.onDateChange}*/}
                                                {/*        clearIcon={null}*/}
                                                {/*        clearAriaLabel={"Clear value"}*/}
                                                {/*        onCalendarClose={this.onCalendarClose}*/}
                                                {/*        value={[this.props.addPosition.join_year, this.props.addPosition.leave_year]}*/}
                                                {/*    />*/}
                                                {/*</div>*/}

                                                <div style={{display: "block", width: "100%",}} className={"mb-4"}>
                                                    <DatePicker
                                                        onChangeRaw={this.handleDateChangeRaw}
                                                        onChange={this.onStartDateChange}
                                                        maxDate={new Date()}
                                                        clearIcon={null}
                                                        clearAriaLabel={"Clear value"}
                                                        onCalendarClose={this.onCalendarClose}
                                                        value={this.props.addPosition.join_year}
                                                    />
                                                </div>
                                                <div style={{display: "block", width: "100%"}}>
                                                    <DatePicker
                                                        onChange={this.onEndDateChange}
                                                        disabled={this.props.addPosition.join_year === ""}
                                                        minDate={this.props.addPosition.join_year}
                                                        maxDate={new Date()}
                                                        clearIcon={null}
                                                        clearAriaLabel={"Clear value"}
                                                        onCalendarClose={this.onCalendarClose}
                                                        value={this.props.addPosition.leave_year}
                                                    />
                                                </div>
                                                {
                                                    this.props.isValidDate === false &&
                                                    <p className="with-error">Please enter valid Date.</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Label>Location</Label>
                                        <Input type="text" className="form-control"
                                               name="company_location"
                                               value={this.props.addPosition.company_location}
                                               minLength={3}
                                               maxLength={50}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter the company's location"/>
                                        <p className="with-error">Please enter valid Location.</p>
                                    </div>
                                    <div className="form-group">
                                        <Label>Job Description</Label>
                                        <textarea className="form-control"
                                                  name="job_description"
                                                  value={this.props.addPosition.job_description}
                                                  onChange={this.handleChange.bind(this)}
                                                  required={true}
                                                  placeholder="Enter your job description"/>
                                        <p className="with-error">Please enter valid Job Description.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className={this.props.addPositionPageLoading ? "btn btn-primary m-loader" : "btn btn-primary btn-icon-right"}
                                    disabled={!!this.props.addPositionPageLoading} type="submit">
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
    const {linkedinProfile, addPositionPageLoading, addPositionStatus, addPositionError, addPositionMessage} = state.profileReducer;
    const {addPosition} = linkedinProfile;
    return {addPosition, addPositionPageLoading, addPositionStatus, addPositionError, addPositionMessage}
};
export default withRouter(connect(mapStateToProps)(AddPositionModal))
