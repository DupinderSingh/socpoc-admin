import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import DatePicker from 'react-date-picker';
import Label from "../../../../app/label/Label";
import Input from "../../../../app/input/Input";
import Button from "../../../../app/button/Button";
import {
    addInstitute,
    changeAddInstituteForm,
    clearAddInstituteResponse,
    getInstitute
} from '../../../../../actions/dashbaord/profile';
import createNotification from "../../../../app/notification/Notification";
import {getCookie} from "../../../../../actions/app";
import $ from "jquery";

function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

const CustomInput = (props) => {
    return (
        <input
            value={props.value}
            type="text"
            readOnly={true}
        />
    )
}

class AddInstitutionModal extends React.Component {
    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changeAddInstituteForm({...this.props.addInstitute, [target.name]: target.value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        const validElms = document.querySelectorAll(".add-Institute-form .form-group input:valid");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }
        let isValidDate = false;
        console.log(this.props.addInstitute.start_year, "start year", this.props.addInstitute.end_year, "end yeadr...");
        if (!!this.props.addInstitute.start_year && !!this.props.addInstitute.end_year) {
            // check both dates are valid
            this.props.changeIsValidDateState.setState({
                isValidDate: true
            })
            isValidDate = true
        } else if (!!this.props.addInstitute.start_year && this.props.addInstitute.end_year === "") {
            // check the start year validity
            this.props.changeIsValidDateState.setState({
                isValidDate: true
            })
            isValidDate = true
        } else { // confirmed
            if (this.props.addInstitute.start_year === "" && !!this.props.addInstitute.end_year) {
                // start year is must error true
                this.props.changeIsValidDateState.setState({
                    isValidDate: false
                });
            } else { // confirmed
                if (this.props.addInstitute.start_year === "" && this.props.addInstitute.end_year === "") {
                    // both empty error true
                    this.props.changeIsValidDateState.setState({
                        isValidDate: false
                    })
                }
            }
        }
        if (e.target.checkValidity() &&
            isValidDate
        ) {
            this.props.dispatch(addInstitute({
                "user_id": getCookie("userId"),
                "university_name": this.props.addInstitute.university_name,
                "degree_name": this.props.addInstitute.degree_name,
                "start_year": !!convert(this.props.addInstitute.start_year) ? convert(this.props.addInstitute.start_year) : "",
                "end_year": !!this.props.addInstitute.end_year ? convert(this.props.addInstitute.end_year) : ""
            }));
        } else {
            const invalidElms = document.querySelectorAll(".add-Institute-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++) {
                invalidElms[i].parentElement.classList.add("has-error");
            }
            const validElms = document.querySelectorAll(".add-Institute-form .form-group input:valid");
            for (let i = 0; i < validElms.length; i++) {
                validElms[i].parentElement.classList.remove("has-error");
            }
            if (!!this.props.addInstitute.start_year && !!this.props.addInstitute.end_year) {
                // check both dates are valid
                this.props.changeIsValidDateState.setState({
                    isValidDate: true
                })
            } else if (!!this.props.addInstitute.start_year && this.props.addInstitute.end_year === "") {
                // check the start year validity
                this.props.changeIsValidDateState.setState({
                    isValidDate: true
                })
            } else { // confirmed
                if (this.props.addInstitute.start_year === "" && !!this.props.addInstitute.end_year) {
                    // start year is must error true
                    this.props.changeIsValidDateState.setState({
                        isValidDate: false
                    })
                } else { // confirmed
                    if (this.props.addInstitute.start_year === "" && this.props.addInstitute.end_year === "") {
                        // both empty error true
                        this.props.changeIsValidDateState.setState({
                            isValidDate: false
                        })
                    }
                }
            }
        }
    }


    onStartDateChange = date => {
        // console.log(date, "date.......");
        // // this.setState({date});
        // if (!!date) {
        //     this.props.dispatch(changeAddInstituteForm({
        //         ...this.props.addInstitute,
        //         start_year: date[0] ? date[0] : "",
        //         end_year: date[1] ? date[1] : ""
        //     }));
        // } else {
        //     this.props.dispatch(changeAddInstituteForm({
        //         ...this.props.addInstitute,
        //         start_year: "",
        //         end_year: ""
        //     }));
        // }


        if (!!date) {
            this.props.dispatch(changeAddInstituteForm({
                ...this.props.addInstitute,
                start_year: date,
                end_year: this.props.addInstitute.end_year
            }));
        } else {
            this.props.dispatch(changeAddInstituteForm({
                ...this.props.addInstitute,
                start_year: "",
                end_year: this.props.addInstitute.end_year
            }));
        }
    };

    onEndDateChange = date => {
        // console.log(date, "date.......");
        // // this.setState({date});
        // if (!!date) {
        //     this.props.dispatch(changeAddInstituteForm({
        //         ...this.props.addInstitute,
        //         start_year: date[0] ? date[0] : "",
        //         end_year: date[1] ? date[1] : ""
        //     }));
        // } else {
        //     this.props.dispatch(changeAddInstituteForm({
        //         ...this.props.addInstitute,
        //         start_year: "",
        //         end_year: ""
        //     }));
        // }

        if (!!date) {
            this.props.dispatch(changeAddInstituteForm({
                ...this.props.addInstitute,
                start_year: this.props.addInstitute.start_year,
                end_year: date
            }));
        } else {
            this.props.dispatch(changeAddInstituteForm({
                ...this.props.addInstitute,
                start_year: this.props.addInstitute.start_year,
                end_year: ""
            }));
        }
    };

    onCalendarClose = () => {
        // this.props.dispatch(changeAddInstituteForm({
        //     ...this.props.addInstitute,
        //     start_year: !!this.props.addInstitute.start_year ? new Date(this.props.addInstitute.start_year) : new Date(),
        //     end_year: !!this.props.addInstitute.end_year ? new Date(this.props.addInstitute.end_year) : new Date()
        // }));
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.addInstituteStatus) {
            if (!nextProps.addInstituteError) {
                // clear everything
                nextProps.dispatch(changeAddInstituteForm({
                    ...this.props.addInstitute,
                    university_name: "",
                    degree_name: "",
                    start_year: "",
                    end_year: ""
                }));
                this.props.changeIsValidDateState.setState({
                    isValidDate: null
                });
                const validElms = document.querySelectorAll(".add-Institute-form .form-group input");
                for (let i = 0; i < validElms.length; i++) {
                    validElms[i].parentElement.classList.remove("has-error");
                }
                createNotification("success", nextProps.addInstituteMessage);
                this.props.dispatch(clearAddInstituteResponse());
                // call api to get the institutes....
                this.props.dispatch(getInstitute(this.props.match.params.userId));
                $("#add_institute").click();
            } else {
                createNotification("error", nextProps.addInstituteMessage);
                this.props.dispatch(clearAddInstituteResponse());
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id="add_institute" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form className="add-Institute-form" onSubmit={this.handleSubmit.bind(this)} noValidate={true}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add a new institute</h5>
                            </div>
                            <div className="modal-body">
                                <div className="modal_width_wrapper">
                                    <div className="form-group">
                                        <Label>University Name</Label>
                                        <Input type="text" className="form-control"
                                               name="university_name"
                                               minLength={3}
                                               maxLength={50}
                                               value={this.props.addInstitute.university_name}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your university name"/>
                                        <p className="with-error">Please enter valid University Name.</p>
                                    </div>
                                    <div className="form-group">
                                        <Label>Degree Name</Label>
                                        <Input type="text" className="form-control"
                                               name="degree_name"
                                               value={this.props.addInstitute.degree_name}
                                               minLength={3}
                                               maxLength={50}
                                               pattern={"^([a-zA-Z]+\\s)*[a-zA-Z]+$"}
                                               onChange={this.handleChange.bind(this)}
                                               required={true}
                                               placeholder="Enter your degree name"/>
                                        <p className="with-error">Please enter valid Degree Name.</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div
                                                className={this.props.isValidDate === false ? "form-group has-error" : "form-group"}>
                                                <Label>Start Year - End Year</Label>
                                                {/*<div style={{display: "grid"}}>*/}
                                                {/*    <DateRangePicker*/}
                                                {/*        selectRange={false}*/}
                                                {/*        onChange={this.onDateChange}*/}
                                                {/*        clearIcon={null}*/}
                                                {/*        clearAriaLabel={"Clear value"}*/}
                                                {/*        onCalendarClose={this.onCalendarClose}*/}
                                                {/*        value={[this.props.addInstitute.start_year, this.props.addInstitute.end_year]}*/}
                                                {/*    />*/}
                                                {/*</div>*/}

                                                <div style={{display: "block", width: "100%"}} className={"mb-4"}>
                                                    <DatePicker
                                                        onChange={this.onStartDateChange}
                                                        maxDate={new Date()}
                                                        clearIcon={null}
                                                        clearAriaLabel={"Clear value"}
                                                        onCalendarClose={this.onCalendarClose}
                                                        value={this.props.addInstitute.start_year}
                                                    />
                                                </div>
                                                <div style={{display: "block", width: "100%"}}>
                                                    <DatePicker
                                                        onChange={this.onEndDateChange}
                                                        disabled={this.props.addInstitute.start_year === ""}
                                                        minDate={this.props.addInstitute.start_year}
                                                        maxDate={new Date()}
                                                        clearIcon={null}
                                                        clearAriaLabel={"Clear value"}
                                                        onCalendarClose={this.onCalendarClose}
                                                        value={this.props.addInstitute.end_year}
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
                                    className={this.props.addInstitutePageLoading ? "btn btn-primary m-loader" : "btn btn-primary btn-icon-right"}
                                    disabled={!!this.props.addInstitutePageLoading} type="submit">
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
    const {linkedinProfile, addInstitutePageLoading, addInstituteStatus, addInstituteError, addInstituteMessage} = state.profileReducer;
    const {addInstitute} = linkedinProfile;
    return {addInstitute, addInstitutePageLoading, addInstituteStatus, addInstituteError, addInstituteMessage}
};
export default withRouter(connect(mapStateToProps)(AddInstitutionModal))