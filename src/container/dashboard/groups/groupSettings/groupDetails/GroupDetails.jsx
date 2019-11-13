import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './GroupDetails.css';
import Label from "../../../../../components/app/label/Label";
import Input from "../../../../../components/app/input/Input";
import createNotification from "../../../../../components/app/notification/Notification";
import {changeGroupForm} from "../../../../../actions/dashbaord/groups/groups";
import $ from "jquery";

function ReadUrl(props) {
    const reader = new FileReader();
    reader.onload = function (e) {
        $('#blah')
            .attr('src', reader.result);
    };
    reader.readAsDataURL(props.image);
    return <div/>
}

class GroupDetails extends React.Component {
    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changeGroupForm({...this.props.groupForm, [target.name]: target.value}))
    }

    uploadPic(e, removePic) {
        e.preventDefault();
        const target = e.target;
        if (removePic) {
            // this.props.dispatch(updateProfilePic({}, true, this.props.profile.country));
            createNotification("error", "we are working on it...");
        } else {
            const photo = document.getElementById("change_img").files[0];
            if (!!document.getElementById("change_img").value) {
                const ext = document.getElementById("change_img").value.match(/\.(.+)$/)[1];
                if (ext === "jpg" || ext === "jpeg" || ext === "png") {
                    this.props.dispatch(changeGroupForm(Object.assign(this.props.groupForm, {[target.name]: photo})));
                } else {
                    this.props.dispatch(changeGroupForm(Object.assign(this.props.groupForm, {[target.name]: ""})));
                }
            } else {
                this.props.dispatch(changeGroupForm(Object.assign(this.props.groupForm, {[target.name]: ""})));
            }
        }
    }

    render() {
        const {
            groupForm, photoError,
            getGroupTypesPageLoading,
            getGroupTypesStatus,
            getGroupTypesError,
            getGroupTypesMessage,
            groupTypes,
            groupTypeError,
            validation
        } = this.props;
        return (
            <div className="account_info">
                <div className="row">
                    <div className="col-md-6">
                        <div className="account_title">
                            <h4>Group Details</h4>
                            <p>General group details and information</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="account_fields">
                            <div className={validation.name.error ? "form-group has-error" : "form-group"} id="name">
                                <Label>Name your group</Label>
                                <span className="required-field">*</span>
                                <Input type="text" className="form-control"
                                       name="name"
                                       onChange={this.handleChange.bind(this)}
                                       placeholder="What will your group be called?"
                                       value={groupForm.name}/>
                                <p className="with-error">Please enter valid Group name.</p>
                            </div>
                            <div className={validation.group_name.error ? "form-group has-error" : "form-group"}
                                 id="group_name">
                                <label>Group type</label>
                                <span className="required-field">*</span>
                                <div className="select_group">
                                    <select id="groupType" className="form-control">
                                        <option value="">Select Group type</option>
                                        {
                                            !getGroupTypesPageLoading && !getGroupTypesError && groupTypes.length > 0 &&
                                            groupTypes.map((type, index) => (
                                                <option value={type._id}>{type.name}</option>
                                            ))
                                        }
                                    </select>
                                    <p className="with-error">Please select Group type</p>
                                </div>
                            </div>
                            <div className={validation.description.error ? "form-group has-error" : "form-group"}
                                 id="description">
                                <label>Group description</label>
                                <span className="required-field">*</span>
                                <textarea className="form-control"
                                          name="description"
                                          value={groupForm.description}
                                          onChange={this.handleChange.bind(this)}
                                          placeholder="Give your group a clear description"/>
                                <p className="with-error">Please enter valid Group description.</p>
                            </div>
                            <div className={validation.photo.error ? "form-group has-error" : "form-group"}
                                 id="photo">
                                <Label>Group cover photo</Label>
                                <span className="required-field">*</span>
                                <div className="profile_change group_profile_change">
                                    {
                                        // check the type file or image or empty....
                                        (!!groupForm.photo && !!groupForm.photo.type &&
                                            (groupForm.photo.type === "image/png" ||
                                                groupForm.photo.type === "image/jpg" ||
                                                groupForm.photo.type === "image/jpeg")) &&
                                        <div className="profile_avatar" style={{height: "auto"}}>
                                            <div>
                                                <ReadUrl image={groupForm.photo}/>
                                                <img id="blah" src="http://placehold.it/180" alt="your image"
                                                     style={{width: "100%"}}/>
                                            </div>
                                        </div>
                                    }
                                    {
                                        (!!groupForm.photo && !!!groupForm.photo.type) &&
                                        <div className="profile_avatar" style={{height: "auto"}}>
                                            <img
                                                src={groupForm.photo}
                                                alt="image"/>
                                        </div>
                                    }
                                    <div className="profile_button_group">
                                        <div className="profile_change_button">
                                            <Input type="file" id="change_img" name="photo"
                                                   onChange={(e) => this.uploadPic(e, false)}/>
                                            <Label htmlFor="change_img"
                                                   className="outline_field_button">{this.props.location.pathname.match("/edit") ? "Change photo" : "Upload photo"}
                                            </Label></div>
                                        {
                                            this.props.location.pathname.match("/edit") &&
                                            <a href="javascript" className="remove_image">Remove photo</a>
                                        }
                                    </div>
                                </div>
                                <p className="with-error">Please upload group photo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {state}
};
export default withRouter(connect(mapStateToProps)(GroupDetails))
