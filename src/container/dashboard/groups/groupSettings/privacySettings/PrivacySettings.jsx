import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './PrivacySettings.css';
import Label from "../../../../../components/app/label/Label";
import Input from "../../../../../components/app/input/Input";
import {changeGroupForm} from "../../../../../actions/dashbaord/groups/groups";

class PrivacySettings extends React.Component {
    handleChange(e) {
        const target = e.target;
        if (target.id === "public_group") {
            this.props.dispatch(changeGroupForm({...this.props.groupForm, group_type: "1"}));
        } else {
            this.props.dispatch(changeGroupForm({...this.props.groupForm, group_type: "2"}));
        }
    }

    render() {
        const {groupForm, validation} = this.props;
        return (
            <div className="account_info">
                <div className="row">
                    <div className="col-md-6">
                        <div className="account_title">
                            <h4>Privacy settings <span className="required-field">*</span></h4>
                            <p>Manage your group’s privacy. You can always change later.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="account_fields">
                            <div className={validation.group_type.error ? "form-group has-error" : "form-group"}
                                 id="group_type">
                                <div className="group_type_options">
                                    <div className="group_select">
                                        <Input checked={groupForm.group_type === "1"}
                                               onChange={this.handleChange.bind(this)} type="radio" id="public_group"
                                               name="g_type"/>
                                        <Label htmlFor="public_group">
                                            <div className="group_select_name">
                                                This is a public group
                                            </div>
                                            <div className="group_select_desc">
                                                Public group
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="group_select private_group">
                                        <Input checked={groupForm.group_type === "2"}
                                               onChange={this.handleChange.bind(this)} type="radio" id="private_group"
                                               name="g_type"/>
                                        <Label htmlFor="private_group">
                                            <div className="group_select_name">
                                                This is a private group
                                            </div>
                                            <div className="group_select_desc">
                                                Private group
                                            </div>
                                        </Label>
                                    </div>
                                </div>
                                <p className="with-error">Please select valid Group.</p>
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
export default withRouter(connect(mapStateToProps)(PrivacySettings))
