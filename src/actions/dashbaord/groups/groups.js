import {GET_API} from "../../../middleware/token/get-api";
import {authApi, getCookie} from "../../app";
import {
    ACCEPT_DECLINE_GROUP_FAILURE,
    ACCEPT_DECLINE_GROUP_REQUEST,
    ACCEPT_DECLINE_GROUP_SUCCESS,
    ACCEPT_REJECT_GROUP_FAILURE,
    ACCEPT_REJECT_GROUP_REQUEST,
    ACCEPT_REJECT_GROUP_SUCCESS,
    CHANGE_CHAT_MESSAGE,
    CHANGE_CREATE_CHANNEL_FORM,
    CHANGE_GROUP_FORM,
    CHANGE_GROUP_SETTING_VALIDATION,
    CHANGE_INVITE_USER_FORM,
    CHANGE_IS_DISCOVER_STATUS,
    CHANGE_MY_GROUPS_PAGE,
    CHANGE_SOCKET_CONFIG,
    CLEAR_ACCEPT_DECLINE_GROUP_STATUS,
    CLEAR_CREATE_CHANNEL_RESPONSE,
    CLEAR_CREATE_GROUP_RESPONSE,
    CLEAR_DELETE_MY_GROUP_STATUS,
    CLEAR_DISCOVER_GROUP_DETAILS_RESPONSE,
    CLEAR_GET_DISCOVER_GROUPS_RESPONSE,
    CLEAR_GET_GROUP_SETTINGS_STATUS,
    CLEAR_GET_GROUP_TYPE_GROUPS_RESPONSE,
    CLEAR_GET_MY_GROUP_DETAILS_RESPONSE,
    CLEAR_GET_MY_GROUP_DETAILS_STATUS_RESPONSE,
    CLEAR_GET_MY_GROUPS_RESPONSE,
    CLEAR_GROUP_TYPES_RESPONSE,
    CLEAR_INVITE_USER_RESPONSE,
    CLEAR_LEAVE_MY_GROUP_STATUS,
    CLEAR_REQUEST_JOIN_GROUP_STATUS,
    CLEAR_USERS_AND_TYPES_STATUS,
    CLEAR_USERS_RESPONSE,
    CREATE_CHANNEL_FAILURE,
    CREATE_CHANNEL_REQUEST,
    CREATE_CHANNEL_SUCCESS,
    CREATE_GROUP_FAILURE,
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    DELETE_MY_GROUP_FAILURE,
    DELETE_MY_GROUP_REQUEST,
    DELETE_MY_GROUP_SUCCESS,
    DISCOVER_GROUP_DETAILS_FAILURE,
    DISCOVER_GROUP_DETAILS_REQUEST,
    DISCOVER_GROUP_DETAILS_SUCCESS,
    DISCOVER_GROUPS_FAILURE,
    DISCOVER_GROUPS_REQUEST,
    DISCOVER_GROUPS_SUCCESS,
    GET_GROUP_SETTINGS_FAILURE,
    GET_GROUP_SETTINGS_REQUEST,
    GET_GROUP_SETTINGS_SUCCESS,
    GET_GROUP_TYPE_GROUPS_FAILURE,
    GET_GROUP_TYPE_GROUPS_REQUEST,
    GET_GROUP_TYPE_GROUPS_SUCCESS,
    GET_GROUP_TYPES_FAILURE,
    GET_GROUP_TYPES_REQUEST,
    GET_GROUP_TYPES_SUCCESS,
    GET_MY_GROUP_DETAILS_FAILURE,
    GET_MY_GROUP_DETAILS_REQUEST,
    GET_MY_GROUP_DETAILS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    INVITE_USER_FAILURE,
    INVITE_USER_REQUEST,
    INVITE_USER_SUCCESS,
    LEAVE_MY_GROUP_FAILURE,
    LEAVE_MY_GROUP_REQUEST,
    LEAVE_MY_GROUP_SUCCESS,
    MY_GROUPS_FAILURE,
    MY_GROUPS_REQUEST,
    MY_GROUPS_SUCCESS,
    REQUEST_JOIN_GROUP_FAILURE,
    REQUEST_JOIN_GROUP_REQUEST,
    REQUEST_JOIN_GROUP_SUCCESS,
    SEND_NO_CHANNEL_AND_MEMBERS_ERROR,
    STOP_CHAT_CONNECTION,
    TARGET_MY_GROUPS_PAGE
} from "../../../types/dashboard/groups/groups";
import {logoutQuick} from "../../account/login";
import {CALL_DELETE_API_WITH_BODY} from "../../../middleware/token/delete/delete-api-with-body";
import {CALL_POST_API} from "../../../middleware/token/post-api";
import {PUT_API_WITHOUT_BODY} from "../../../middleware/token/put_api/put-api-without-body";

const AUTH_API = authApi();

export const getGroupTypes = () => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/group/type',
            types: [GET_GROUP_TYPES_REQUEST,
                GET_GROUP_TYPES_SUCCESS,
                GET_GROUP_TYPES_FAILURE],
            token: getCookie("token")
        }
    }
};
export const getGroupTypeGroups = (type, isDiscover) => {
    return {
        [GET_API]: {
            endpoint: AUTH_API + (isDiscover ? "/discover/groups/by-type/" + type : "/my-group/by-type/" + type),
            types: [GET_GROUP_TYPE_GROUPS_REQUEST,
                GET_GROUP_TYPE_GROUPS_SUCCESS,
                GET_GROUP_TYPE_GROUPS_FAILURE],
            token: getCookie("token")
        }
    }
};

export const changeIsDiscoverStatus = (status) => {
    return {type: CHANGE_IS_DISCOVER_STATUS, status}
};

export const clearGroupTypes = () => {
    return {type: CLEAR_GROUP_TYPES_RESPONSE}
};

export const changeGroupForm = (newState) => {
    return {type: CHANGE_GROUP_FORM, newState}
};

export function getAllUsers(group_id) {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/search/user/'+group_id,
            types: [GET_USERS_REQUEST,
                GET_USERS_SUCCESS,
                GET_USERS_FAILURE],
            token: getCookie("token")
        }
    }
}

export function clearUsersResponse() {
    return {type: CLEAR_USERS_RESPONSE}
}

export function changeGroupSettingValidation(newState) {
    return {type: CHANGE_GROUP_SETTING_VALIDATION, newState}
}

/* create or update group*/

export function createGroup(body) {
    let status = "", config = {};
    let formData = new FormData();
    formData.append('member_id', body.member_id);
    formData.append('group_name', body.group_name);

    formData.append('group_type', body.group_type);
    formData.append('description', body.description);

    formData.append('group_image', body.group_image);
    formData.append('privacy', body.privacy);
    config = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${getCookie("token")}`,
            "user_id": getCookie("userId"),
            'Access-Control-Allow-Origin': '*'
        },
        body: formData
    };
    return dispatch => {
        dispatch(createGroupRequest());
        fetch(AUTH_API + "/admin/group/update/" + body.group_id, config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 403 || status === 401 || status === 404) {
                        dispatch(logoutQuick())
                    } else {
                        if (status === 200 && !res.error) {
                            dispatch(createGroupSuccess({
                                data: {error: false, message: res.message},
                                status: 200
                            }));
                        } else {
                            dispatch(createGroupFailure({
                                data: {error: true, message: res.message},
                                status: status
                            }))
                        }
                    }
                },
                function () {
                    dispatch(createGroupFailure({
                        data: {
                            message: "Internal server error.",
                            error: true
                        },
                        status: 500
                    }))
                })
    }
}


export function createGroupRequest() {
    return {type: CREATE_GROUP_REQUEST}
}

export function createGroupSuccess(response) {
    return {type: CREATE_GROUP_SUCCESS, response}
}

export function createGroupFailure(response) {
    return {type: CREATE_GROUP_FAILURE, response}
}

export function clearCreateGroupResponse() {
    return {type: CLEAR_CREATE_GROUP_RESPONSE}
}

export function getDiscoverGroups() {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/discover-groups/' + getCookie("userId"),
            types: [DISCOVER_GROUPS_REQUEST,
                DISCOVER_GROUPS_SUCCESS,
                DISCOVER_GROUPS_FAILURE],
            token: getCookie("token")
        }
    }
}

export function getMyGroups(page) {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/groups/' + page,
            types: [MY_GROUPS_REQUEST,
                MY_GROUPS_SUCCESS,
                MY_GROUPS_FAILURE],
            token: getCookie("token")
        }
    }
}

export function clearGetMyGroupsResponse() {
    return {type: CLEAR_GET_MY_GROUPS_RESPONSE}
}

export function clearGetDiscoverGroupsResponse() {
    return {type: CLEAR_GET_DISCOVER_GROUPS_RESPONSE}
}

export function getDiscoverGroupDetails(group) {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/discover-groups/details/' + group,
            types: [DISCOVER_GROUP_DETAILS_REQUEST,
                DISCOVER_GROUP_DETAILS_SUCCESS,
                DISCOVER_GROUP_DETAILS_FAILURE],
            token: getCookie("token")
        }
    }
}

export function clearDiscoverGroupDetailsResponse() {
    return {type: CLEAR_DISCOVER_GROUP_DETAILS_RESPONSE}
}

export function clearGetMyGroupDetailsResponse() {
    return {type: CLEAR_GET_MY_GROUP_DETAILS_RESPONSE}
}

export function getMyGroupDetails(group) {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/my-groups/details/' + group,
            types: [GET_MY_GROUP_DETAILS_REQUEST,
                GET_MY_GROUP_DETAILS_SUCCESS,
                GET_MY_GROUP_DETAILS_FAILURE],
            token: getCookie("token")
        }
    }
}

export function clearGroupTypeGroups() {
    return {type: CLEAR_GET_GROUP_TYPE_GROUPS_RESPONSE}
}

export function getGroupSettings(group) {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/group/get/' + group,
            types: [GET_GROUP_SETTINGS_REQUEST,
                GET_GROUP_SETTINGS_SUCCESS,
                GET_GROUP_SETTINGS_FAILURE],
            token: getCookie("token")
        }
    }
}

export function clearUsersAndTypesStatus() {
    return {type: CLEAR_USERS_AND_TYPES_STATUS}
}

export function clearGetGroupSettingsStatus() {
    return {type: CLEAR_GET_GROUP_SETTINGS_STATUS}
}

export function deleteMyGroup(group_id) {
    return {
        [PUT_API_WITHOUT_BODY]: {
            endpoint: AUTH_API + '/admin/group-inactive/' + group_id,
            types: [DELETE_MY_GROUP_REQUEST,
                DELETE_MY_GROUP_SUCCESS,
                DELETE_MY_GROUP_FAILURE,]
        }
    }
}

export function leaveMyGroup(body) {
    return {
        [CALL_DELETE_API_WITH_BODY]: {
            endpoint: AUTH_API + '/left/group',
            types: [LEAVE_MY_GROUP_REQUEST,
                LEAVE_MY_GROUP_SUCCESS, LEAVE_MY_GROUP_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

export function clearDeleteMyGroupStatus() {
    return {type: CLEAR_DELETE_MY_GROUP_STATUS}
}

export function clearLeaveMyGroupStatus() {
    return {type: CLEAR_LEAVE_MY_GROUP_STATUS}
}

export function requestJoinGroup(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/join/group',
            types: [REQUEST_JOIN_GROUP_REQUEST,
                REQUEST_JOIN_GROUP_SUCCESS, REQUEST_JOIN_GROUP_FAILURE],
            body,
            token: getCookie("token")
        }
    }
}

export function clearRequestJoinGroupStatus() {
    return {type: CLEAR_REQUEST_JOIN_GROUP_STATUS}
}

export function acceptRejectGroupNotification(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/accept/group',
            types: [ACCEPT_REJECT_GROUP_REQUEST,
                ACCEPT_REJECT_GROUP_SUCCESS, ACCEPT_REJECT_GROUP_FAILURE],
            body,
            token: getCookie("token")
        }
    }
}

export function changeCreateChannelForm(nextState) {
    return {type: CHANGE_CREATE_CHANNEL_FORM, nextState}
}

export function clearCreateChannelResponse() {
    return {type: CLEAR_CREATE_CHANNEL_RESPONSE}
}

export function createChannel(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/create/channel',
            types: [CREATE_CHANNEL_REQUEST,
                CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAILURE],
            body,
            token: getCookie("token")
        }
    }
}

export function acceptDeclineGroup(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/accept/group',
            types: [ACCEPT_DECLINE_GROUP_REQUEST,
                ACCEPT_DECLINE_GROUP_SUCCESS, ACCEPT_DECLINE_GROUP_FAILURE],
            body,
            token: getCookie("token")
        }
    }
}

export function clearAcceptDeclineGroupStatus() {
    return {type: CLEAR_ACCEPT_DECLINE_GROUP_STATUS}
}

export function changeSocketConfig(config) {
    return {type: CHANGE_SOCKET_CONFIG, config}
}

export function clearGetMyGroupDetailsStatusResponse() {
    return {type: CLEAR_GET_MY_GROUP_DETAILS_STATUS_RESPONSE}
}

export function sendNoChannelAndMembersError() {
    return {type: SEND_NO_CHANNEL_AND_MEMBERS_ERROR}
}

export function changeChatMessage(msg) {
    return {type: CHANGE_CHAT_MESSAGE, msg}
}

export function isEmpty(value) {
    var isEmptyObject = function (a) {
        if (typeof a.length === 'undefined') { // it's an Object, not an Array
            var hasNonempty = Object.keys(a).some(function nonEmpty(element) {
                return !isEmpty(a[element]);
            });
            return hasNonempty ? false : isEmptyObject(Object.keys(a));
        }

        return !a.some(function nonEmpty(element) { // check if array is really not empty as JS thinks
            return !isEmpty(element); // at least one element should be non-empty
        });
    };
    return (
        value == false
        || typeof value === 'undefined'
        || value == null
        || (typeof value === 'object' && isEmptyObject(value))
    );
}

export function stopConnection(status) {
    return {type: STOP_CHAT_CONNECTION, status}
}

/*
    invite a user
 */

export function changeinviteUserForm(nextState) {
    return {type: CHANGE_INVITE_USER_FORM, nextState}
}

export function clearinviteUserResponse() {
    return {type: CLEAR_INVITE_USER_RESPONSE}
}

export function inviteUser(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/invite/user',
            types: [INVITE_USER_REQUEST,
                INVITE_USER_SUCCESS, INVITE_USER_FAILURE],
            body,
            token: getCookie("token")
        }
    }
}

export const changeMyGroupsPage = (page) => {
    return {type: CHANGE_MY_GROUPS_PAGE, page}
};
export const targetMyGroupsPage = (page) => {
    return {type: TARGET_MY_GROUPS_PAGE, page}
};
