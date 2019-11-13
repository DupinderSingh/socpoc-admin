import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import $ from 'jquery';
import './GroupSettings.css';
import Button from "../../../../components/app/button/Button";
import GroupDetails from "./groupDetails/GroupDetails";
import PrivacySettings from "./privacySettings/PrivacySettings";
import InviteMembers from "./inviteMembers/InviteMembers";
import {
    changeGroupForm,
    changeGroupSettingValidation,
    clearCreateGroupResponse,
    clearGetGroupSettingsStatus,
    clearGroupTypes,
    clearUsersAndTypesStatus,
    clearUsersResponse,
    createGroup,
    getAllUsers,
    getGroupSettings,
    getGroupTypes
} from "../../../../actions/dashbaord/groups/groups";
import {getCookie} from "../../../../actions/app";
import createNotification from "../../../../components/app/notification/Notification";

class GroupSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoError: false,
            inviteMembersError: false,
            groupTypeError: false,
            inviteMembers: []
        };
    }

    componentDidMount() {
        $("html,body").animate({scrollTop: 0});
        document.getElementsByName("name")[0].focus();
        const groupForm = {
            name: "",
            description: "",
            photo: "",
            group_type: "1",
            inviteMembers: []
        };
        const validation = {
            name: {
                isRequired: true,
                pattern: "^([!@#$%^&*()-_'\",.?*a-zA-Z0-9]+\\s)*[!@#$%^&*()-_'\",.?*a-zA-Z0-9]+$",
                id: "name",
                error: false
            },
            group_name: {
                isRequired: true,
                id: "group_name",
                error: false
            },
            description: {
                isRequired: true,
                id: "description",
                error: false
            },
            photo: {
                isRequired: true,
                id: "photo",
                error: false
            },
            group_type: {
                isRequired: true,
                id: "group_type",
                error: false
            },
            inviteMembers: {
                isRequired: true,
                id: "inviteMembers",
                error: false
            }
        };
        this.props.dispatch(changeGroupSettingValidation(validation));
        this.props.dispatch(clearGroupTypes());
        this.props.dispatch(clearUsersResponse());
        this.props.dispatch(changeGroupForm(groupForm));
        this.props.dispatch(getAllUsers(this.props.match.params.group));
        this.props.dispatch(getGroupTypes());
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.createGroupStatus && !nextProps.createGroupError) {
            this.props.dispatch(clearCreateGroupResponse());
            createNotification("success", nextProps.createGroupMessage);
            if (nextProps.location.pathname.match("/dashboard/groups/") && nextProps.location.pathname.match("/settings")) {
                // send to his group
                this.props.history.push("/dashboard/groups");
            }
        }
        if (!!nextProps.createGroupStatus && nextProps.createGroupError) {
            this.props.dispatch(clearCreateGroupResponse());
            createNotification("error", nextProps.createGroupMessage);
        }

        if (!!nextProps.getUsersStatus && !nextProps.getUsersError &&
            !!nextProps.getGroupTypesStatus && !nextProps.getGroupTypesError) {
            this.props.dispatch(clearUsersAndTypesStatus());
            if (nextProps.location.pathname.match("/settings")) {
                this.props.dispatch(getGroupSettings(nextProps.match.params.group));
            }
        }

        if (!!nextProps.groupSettingsStatus && !nextProps.groupSettingsError) {
            document.getElementById("groupType").value = nextProps.groupForm.group_name;
            this.props.dispatch(clearGetGroupSettingsStatus());
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let validation = this.props.validation;
        let name = validation.name;
        if (name.isRequired) {
            if (new RegExp(name.pattern).test(this.props.groupForm.name) &&
                this.props.groupForm.name.length >= 3 &&
                this.props.groupForm.name.length <= 50) {
                name.error = false
            } else {
                name.error = true
            }
        } else {
            name.error = false
        }

        let group_name = validation.group_name;
        if (group_name.isRequired) {
            if (!!document.getElementById("groupType").value) {
                group_name.error = false
            } else {
                group_name.error = true
            }
        } else {
            group_name.error = false
        }


        let photo = validation.photo;
        if (photo.isRequired) {
            if (!!this.props.groupForm.photo) {
                if (!!this.props.groupForm.photo.type) {
                    if (!!document.getElementById("change_img").value) {
                        const ext = document.getElementById("change_img").value.match(/\.(.+)$/)[1];
                        if (ext === "jpg" || ext === "jpeg" || ext === "png") {
                            this.setState({photoError: false});
                            photo.error = false;
                        } else {
                            this.setState({photoError: true});
                            photo.error = true;
                        }
                    } else {
                        this.setState({photoError: true});
                        photo.error = true;
                    }
                } else {
                    // link
                    this.setState({photoError: false});
                    photo.error = false;
                }
            } else {
                // empty
                this.setState({photoError: true});
                photo.error = true;
            }
        } else {
            photo.error = false;
        }


        let description = validation.description;
        if (description.isRequired) {
            if (this.props.groupForm.description.length >= 3 && this.props.groupForm.description.length <= 500) {
                description.error = false
            } else {
                description.error = true
            }
        } else {
            description.error = false
        }


        let group_type = validation.group_type;
        if (group_type.isRequired) {
            if (this.props.groupForm.group_type === "1" || this.props.groupForm.group_type === "2") {
                group_type.error = false
            } else {
                group_type.error = true
            }
        } else {
            group_type.error = false
        }

        let inviteMembers = validation.inviteMembers;
        if (inviteMembers.isRequired) {
            if (this.props.groupForm.inviteMembers.length > 0) {
                inviteMembers.error = false
            } else {
                inviteMembers.error = true
            }
        } else {
            inviteMembers.error = false
        }
        this.props.dispatch(changeGroupSettingValidation(validation));
        const validationList = Object.values(validation);
        let isError = false;
        let allError = [];
        for (let i in validationList) {
            if (validationList[i].error === true) {
                isError = true;
                allError.push(validationList[i]);
            }
        }
        if (!isError) {
            let member_id = "";
            const members = this.props.groupForm.inviteMembers;
            for (let i in members) {
                if (Number(i) === Number(members.length - 1)) {
                    member_id = member_id + members[i]._id;
                } else {
                    member_id = member_id + members[i]._id + ",";
                }
            }
            const body = {
                user_id: getCookie("userId"),
                member_id,
                group_name:
                this.props.groupForm.name,
                group_type:
                document.getElementById("groupType").value,
                description:
                this.props.groupForm.description,
                group_image:
                this.props.groupForm.photo,
                privacy:
                this.props.groupForm.group_type,
                group_id:
                this.props.match.params.group
            };
            this.props.dispatch(createGroup(body));
        } else {
            $('html, body').animate({
                scrollTop: ($('#' + allError[0].id).offset().top - 180)
            }, 500);
        }

    }

    render() {
        return (
            <div className="offset-xl-1 col-xl-10 col-lg-12">
                <div className="widget w_account">
                    <form className="create-group-form" onSubmit={this.handleSubmit.bind(this)} noValidate={true}>
                        <div className="account_header">
                            <h1>Group settings</h1>
                        </div>
                        <div className="account_body">
                            <GroupDetails groupForm={this.props.groupForm} photoError={this.state.photoError}
                                          thi={this}
                                          getGroupTypesPageLoading={this.props.getGroupTypesPageLoading}
                                          getGroupTypesStatus={this.props.getGroupTypesStatus}
                                          getGroupTypesError={this.props.getGroupTypesError}
                                          getGroupTypesMessage={this.props.getGroupTypesMessage}
                                          groupTypes={this.props.groupTypes}
                                          groupTypeError={this.state.groupTypeError}
                                          validation={this.props.validation}/>
                            <PrivacySettings groupForm={this.props.groupForm}
                                             validation={this.props.validation}/>
                            <InviteMembers groupForm={this.props.groupForm}
                                           getUsersPageLoading={this.props.getUsersPageLoading}
                                           getUsersStatus={this.props.getUsersStatus}
                                           getUsersError={this.props.getUsersError}
                                           getUsersMessage={this.props.getUsersMessage}
                                           users={this.props.users}
                                           inviteMembersError={this.state.inviteMembersError}
                                           thi={this}
                                           validation={this.props.validation}/>
                        </div>
                        <div className="account_footer">
                            <Button type="submit" className="btn btn-primary"
                                    name="button">Save Settings</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        groupForm,
        getUsersPageLoading,
        getUsersStatus,
        getUsersError,
        getUsersMessage,
        users,

        getGroupTypesPageLoading,
        getGroupTypesStatus,
        getGroupTypesError,
        getGroupTypesMessage,
        groupTypes,

        validation,

        createGroupPageLoading,
        createGroupStatus,
        createGroupError,
        createGroupMessage,

        groupSettingsPageLoading,
        groupSettingsStatus,
        groupSettingsError,
        groupSettingsMessage,

        // permanentInviteMembers
    } = state.groupsReducer;
    return {
        groupForm,
        getUsersPageLoading,
        getUsersStatus,
        getUsersError,
        getUsersMessage,
        users,

        getGroupTypesPageLoading,
        getGroupTypesStatus,
        getGroupTypesError,
        getGroupTypesMessage,
        groupTypes,

        validation,

        createGroupPageLoading,
        createGroupStatus,
        createGroupError,
        createGroupMessage,

        groupSettingsPageLoading,
        groupSettingsStatus,
        groupSettingsError,
        groupSettingsMessage,

        // permanentInviteMembers
    }
};
export default withRouter(connect(mapStateToProps)(GroupSettings))
