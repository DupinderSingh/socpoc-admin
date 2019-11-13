import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Select, {components} from 'react-select';
import './InviteMembers.css';
import {changeGroupForm} from "../../../../../actions/dashbaord/groups/groups";

const {Option} = components;

const IconOption = (props) => (
    <Option {...props}>
        <div className="tagged mt-1">
            <img className="tagged_image"
                 src={props.data.image ? props.data.image : require("../../../../../images/person-placeholder.jpg")}
                 alt="image"/>
            <span>{props.data.label}</span>
        </div>
    </Option>
);

// const colourStyles = {
//     control: styles => ({ ...styles, backgroundColor: 'white' }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//         return {
//             ...styles,
//             backgroundColor: isDisabled ? 'red' : 'blue',
//             color: '#FFF',
//             cursor: isDisabled ? 'not-allowed' : 'default'
//         };
//     },
// };

class InviteMembers extends React.Component {
    onInviteMemberChange(selectedOptions) {
        this.props.dispatch(changeGroupForm({...this.props.groupForm, inviteMembers: selectedOptions}));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.validation, "vaaallll111")
    }

    render() {
        const {groupForm, getUsersPageLoading, getUsersStatus, getUsersError, getUsersMessage, users, inviteMembersError, validation} = this.props;
        return (
            <div className="account_info">
                <div className="row">
                    <div className="col-md-6">
                        <div className="account_title">
                            <h4>Invite members <span className="required-field">*</span></h4>
                            <p>Invite members to join your group</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="account_fields">
                            <div className={validation.inviteMembers.error ? "form-group has-error" : "form-group"}
                                 id="inviteMembers">
                                {/*<Label>Add some people</Label>*/}
                                {/*<Input type="text" className="form-control"/>*/}
                                {/*<div className="tagged mt-1">*/}
                                {/*    <img className="tagged_image" src={require("../../../../../images/user2.png")}*/}
                                {/*         alt="image"/>*/}
                                {/*    <span>Dinesh Kananji</span>*/}
                                {/*    <img className="tagged_cross" src={require("../../../../../images/cross_tag.svg")}*/}
                                {/*         alt="delete"/>*/}
                                {/*</div>*/}
                                {/*<div className="tagged mt-1">*/}
                                {/*    <img className="tagged_image" src={require("../../../../../images/user2.png")}*/}
                                {/*         alt="image"/>*/}
                                {/*    <span>John Doe</span>*/}
                                {/*    <img className="tagged_cross" src={require("../../../../../images/cross_tag.svg")}*/}
                                {/*         alt="delete"/>*/}
                                {/*</div>*/}

                                <Select
                                    value={groupForm.inviteMembers}
                                    onChange={this.onInviteMemberChange.bind(this)}
                                    placeholder={"Select multiple members"}
                                    components={{Option: IconOption}}
                                    options={users}
                                    isSearchable={true}
                                    isMulti={true}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 1,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(240, 151, 25, 0.6)',
                                            primary: 'rgba(240, 151, 25, 1)',
                                        },
                                    })}
                                />
                                <p className="with-error">Please select atleast one member.</p>
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
export default withRouter(connect(mapStateToProps)(InviteMembers))
