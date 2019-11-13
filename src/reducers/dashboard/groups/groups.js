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

const initialState = {
    groupForm: {
        name: "",
        description: "",
        photo: "",
        group_type: "1",
        inviteMembers: [],
        // permanentInviteMembers: []
    },
    getUsersPageLoading: false,
    getUsersStatus: "",
    getUsersError: false,
    getUsersMessage: "",
    users: [],
    getGroupTypesPageLoading: false,
    getGroupTypesStatus: "",
    getGroupTypesError: false,
    getGroupTypesMessage: "",
    groupTypes: [],

    validation: {
        name: {
            isRequired: true,
            pattern: "^([a-zA-Z]+\\s)*[a-zA-Z]+$",
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
    },
    createGroupPageLoading: false,
    createGroupStatus: "",
    createGroupError: false,
    createGroupMessage: "",

    discoverGroupsPageLoading: false,
    discoverGroupsStatus: "",
    discoverGroupsError: false,
    discoverGroupsMessage: "",
    discoverGroups: [],

    myGroupsPageLoading: false,
    myGroupsStatus: "",
    myGroupsError: false,
    myGroupsMessage: "",
    myGroups: [],

    discoverGroupDetailsPageLoading: false,
    discoverGroupDetailsStatus: "",
    discoverGroupDetailsError: false,
    discoverGroupDetailsMessage: "",
    discoverGroupDetails: [],

    getMyGroupDetailsPageLoading: false,
    getMyGroupDetailsStatus: "",
    getMyGroupDetailsError: false,
    getMyGroupDetailsMessage: "",
    getMyGroupDetails: [],

    getGroupTypeGroupsPageLoading: false,
    getGroupTypeGroupsStatus: "",
    getGroupTypeGroupsError: false,
    getGroupTypeGroupsMessage: "",
    groupTypeGroups: [],

    isDiscover: true,

    deleteMyGroupPageLoading: false,
    deleteMyGroupStatus: "",
    deleteMyGroupError: false,
    deleteMyGroupMessage: "",

    leaveMyGroupPageLoading: false,
    leaveMyGroupStatus: "",
    leaveMyGroupError: false,
    leaveMyGroupMessage: "",

    requestJoinGroupPageLoading: false,
    requestJoinGroupStatus: "",
    requestJoinGroupError: false,
    requestJoinGroupMessage: "",

    acceptRejectGroupPageLoading: false,
    acceptRejectGroupStatus: "",
    acceptRejectGroupError: false,
    acceptRejectGroupMessage: "",

    createChannelForm: {
        channel_name: ""
    },

    createChannelPageLoading: false,
    createChannelStatus: "",
    createChannelError: false,
    createChannelMessage: "",

    acceptDeclineGroupPageLoading: false,
    acceptDeclineGroupStatus: "",
    acceptDeclineGroupError: false,
    acceptDeclineGroupMessage: "",

    isChannel: true,
    socketChannelId: "",
    OneToOneChatId: "",
    socketChannelName: "",
    OneToOneChatName: "",
    chatMessage: "",
    getMessages: true,

    stopConn: false,

    inviteUserForm: {
        email: ""
    },

    inviteUserPageLoading: false,
    inviteUserStatus: "",
    inviteUserError: "",
    inviteUserMessage: "",

    myGroupsPageNumber: 1,

    myGroupsTargetPageNumber: 1
};

export default function groupsReducer(state = initialState, action) {
    switch (action.type) {
        case
        GET_GROUP_TYPES_REQUEST:
            return Object.assign({}, state, {
                getGroupTypesPageLoading: true
            });
        case
        GET_GROUP_TYPES_SUCCESS:
            return Object.assign({}, state, {
                getGroupTypesPageLoading: false,
                getGroupTypesStatus: 200,
                getGroupTypesError: action.response.data.error,
                getGroupTypesMessage: action.response.data.error ? action.response.data.message : "",
                groupTypes: action.response.data.error ? [] : action.response.data.group_type
            });
        case
        GET_GROUP_TYPES_FAILURE:
            return Object.assign({}, state, {
                getGroupTypesPageLoading: false,
                getGroupTypesStatus: action.response.status,
                getGroupTypesError: true,
                getGroupTypesMessage: action.response.data.message,
                groupTypes: []
            });
        case CLEAR_GROUP_TYPES_RESPONSE:
            return {
                ...state,
                getGroupTypesStatus: "",
                getGroupTypesError: false,
                getGroupTypesMessage: "",
                groupTypes: []
            };
        case CHANGE_GROUP_FORM:
            return {
                ...state,
                groupForm: action.newState
            };
        case
        GET_USERS_REQUEST:
            return Object.assign({}, state, {
                getUsersPageLoading: true
            });
        case
        GET_USERS_SUCCESS:
            let users = [];
            if (!action.response.data.error) {
                users = action.response.data.users;
                for (let i in users) {
                    users[i].value = !!users[i]._id ? users[i]._id : "12345";
                    users[i].label = !!users[i].name ? users[i].name : "unknown";
                    users[i].name = !!users[i].name ? users[i].name : "unknown";
                    users[i].image = !!users[i].image ? users[i].image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///81NTUjIyMxMTEsLCwvLy8oKCgmJiYhISH6+voeHh7s7OwaGhrn5+c4ODjv7++AgIDc3Nz29vaioqJfX18+Pj6Xl5dkZGQVFRWLi4tDQ0O0tLTT09NUVFTIyMioqKi+vr54eHhKSkpsbGzDw8NVVVWampqtra1hYWG3t7eQkJCGhoYPDw90dHQPs613AAAH50lEQVR4nO2daXeqMBCGJQlhERTcF9yrVr3+/793ta2ttgkESDLAyfO9p7wnyWyZjK2WwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAxF6LXDMGx3PejvUED81o8Gs2HHwhhb1nC2v45OSVOEeslhHwSIkru2LzC2KfInw8upDf15ZWnPr8SnP9JewQQF+1Fc37X03q4E2Rx13yqpv++H0J9aiO5hhkiGvC+Rjr1LoD83N+2Lw92cDIi7WEJ/ci66U19s+Z4WMtjXaB1XmObU96lxU5PzmOxRAX13iN2H/ngRzpnmMwVnW/llDGdOcX3WfaseoSWkcyIlFvATf9ODVpHC2S+r7wat8E69FjUxr9hWRf1Gb1/ER7DAzhu0GBbdbV4nn4K/hpbzl55MgZblrqEF/caTK/C2ilWLU8eyzuA3JIbW9EIkx4o+gztVyv9XrnSBt0XcVyf5T+Sv4B10gRb2wOvkyHXzEKyhpX2xk2xGf6BdaG0fnGQEo2zIDlrcna6qPXoHnaDl3bhI94RP4CH8Po3V2NEHzghaYOu9dMqbTgCdLC4DtQItsgFWuFBoZj6ZwC5ionoJb4sYgSocKz6Fd2zICDxW6SkeOJBl4rMOhXgLl2P0ZsrtzB0XLt1fqkgL/0LgsqhIWVLxSgeqCu4NtWxSwKpUoi5teoWcgRQedFjSO3gLpHCgaZPeIjegHErXJr0lwjD3GNqOoWVRmCzxpDb3fQYPQBRONXnDD0AU6jM0t20Kkl909Am0HIhbYU/nJkUQUU1bl7//UDgHUBiXa5zJB4XIghOdCkEi06U+dwhUjjIK5SqEqAsbhXIVQuxSvbZ0CqBQSzX4AT0AKGx+TNNqfFza0lVLvAOSWyi//X0GJj88a9ymGEKgzjqN/Q6iMFZ///sAqNbW0ufyXaC+bx1X3J9A1bz7jb+30HYQoY5hy9vquj8Ee2GiqeqNZ2CtCpruZkBSp0889T1fd1zAZ1BarCnewwlshToOogP65nKjQyLoi8t4olwfmDP8Yqc8cvOBH83Gqh0GfKO36pOIwd89h2odhl+Bx+t9lWmiDdOE8YrSwIZW4lW3wujUgWrZ+8VIVUkKLPP9w0KRPQV/L/NNW83zNb8KD9e+WKqwpwguLWRwlN/TTivxuvIHKVNNniGAryzYSH6Rb4P15/O5yJRIZlUaN/DgIu8skooO4RnJqhDTBfzrXzbzQIpfRBWzos8kw/LRDUYVCUbZtMdl7Q2x1tAiMuhPSu1Ud1BNG/NMvC2+jPaE3RnUjWOd3sOLT+f3of/vH9pGc5bR69vFTiNGY8YC9uZjf+L7wWQ7nesYVxser1aAvibrYYL8HaOXpx05+TVid7tm/L+p85jDeJ/J29nMle7i7nFMf8+Vtf0xY6BTvMk5wBSj2ervAnkH+1ehiyAyPqryluGlwxxrSZht5nE0ER9Ca/vDIyMOTZhH2kZWpGJKVnvjclcFMQ1g9zBEREAkpmjA7LU4u7y/Ji5r45TCOwRpu87m9A4m0Qylr6Tt0AV7FHS8TUur7Ukk1bouMz2Av2NbgF4yGhCfstYSE+p3div2Ynh9P2P5CZZYLD6j7M1GrBXvz9vLw2brBy5yKPmAOsgN0CJaJTybITSp191JyiF772IuHC3SzoYXLuerwzTabKLLYTVfhimuzbuITeolQymnMeyI2n08iaTY8bngpPPbf5QxIzOx8gweJ/3SG2e5yJNJl7+5SUTs/RNodiwVWSVjrotgE3CPvxixnTdTwGhbvOs82Tm575TdUk3uhYrZ2LEYAZgAy71b5M68TGumV/RCwkHTvFauu5pleUAeJa7gouLFeuKPmZkVm95yQ5zCmXPxsXXzUnVsG3Wua5F/3VteZvyYVwRS8Ka4Xbo4SBAecKKyB/FxbAnF56m4xR7R7mW0ytiOHwwOa0YE48Xrw3vg5zeeLNwiwc1RWpX+lh4FdLu7jFbH03q9Ph37o8tuiwJEpbUb2Yv81lv2rSe2Cb1F3HccSkluP5sByr9PpzqfpkmA5E0XlXdzySb3K1N1s4FVMclnbDR0VcrGznefo76pUj65PEao8522LMg1h0Jdw/TkQsUXsQ39rcWg4g04K51P7SUyFC2haHooIh/h+eYaB7HJxR4LKqynnbkj2MzYq61A0WFLaz2TZVWAZ0IK9T3vlY/QePPeP+jPLIEjUh9e1zFieyA0QrKOQfcPODsR7kF/YzkEZrlqHf8kH4HZ31qnksoHZxfd9jWNSR/QLH+h5WWvSjKj7xoHNJ9kHsSaH0OB34qo+zG0LD/dI3Zrmt0/kXElXNvk94eM1+2rmt1WMMiYmqVlRoJiUKpCPT8co5YgtflM34AydaB1isLa3amxSJ0EqnGMnjpSa4ra5pMppZOisAmm9LZNU4r7usaTqcVJMaa1LtF8k1LJ6DZik1qUX1LUOt5ZHSkpYs2rUA9S3EWti8E/4AVXYV3vfn+BZ1x3oXP2sUo63DS/vlejrxCuQ6z3lcUPiKvwvREhTdpE1/oX2j7hZ4jNCEtvgSnvkYm2ucCq4TYsaPp5X/Vws/zuEPrTJMEtmTZGIfcXvto6f+9PJdzh0c1XGEJ/mSyMwvrDtTRhU84h11s0xtJwPX5jFHL79xrj8bkdJ41RyL3Kb0zkzf25iOZkT9wqRlMUYm5vW11fkvyG/z5f56+lKyRlSHadu/SfeG32/g+E0qzhGdjwagAAAABJRU5ErkJggg=="
                    users[i].style = {color: 'red'};
                }
            }
            return Object.assign({}, state, {
                getUsersPageLoading: false,
                getUsersStatus: 200,
                getUsersError: action.response.data.error,
                getUsersMessage: action.response.data.error ? action.response.data.message : "",
                users
            });
        case
        GET_USERS_FAILURE:
            return Object.assign({}, state, {
                getUsersPageLoading: false,
                getUsersStatus: action.response.status,
                getUsersError: true,
                getUsersMessage: action.response.data.message,
                users: []
            });
        case CLEAR_USERS_RESPONSE:
            return {
                ...state,
                getUsersStatus: "",
                getUsersError: false,
                getUsersMessage: "",
                users: []
            };
        case CHANGE_GROUP_SETTING_VALIDATION:
            return {
                ...state,
                validation: action.newState
            };
        case CREATE_GROUP_REQUEST:
            return Object.assign({}, state, {
                createGroupPageLoading: true
            });
        case CREATE_GROUP_SUCCESS:
            return Object.assign({}, state, {
                createGroupPageLoading: false,
                createGroupStatus: 200,
                createGroupError: action.response.data.error,
                createGroupMessage: action.response.data.message
            });
        case CREATE_GROUP_FAILURE:
            return Object.assign({}, state, {
                createGroupPageLoading: false,
                createGroupStatus: action.response.status,
                createGroupError: true,
                createGroupMessage: action.response.data.message
            });
        case CLEAR_CREATE_GROUP_RESPONSE:
            return {
                ...state,
                createGroupStatus: "",
                createGroupError: false,
                createGroupMessage: ""
            };
        case
        DISCOVER_GROUPS_REQUEST:
            return Object.assign({}, state, {
                discoverGroupsPageLoading: true
            });
        case
        DISCOVER_GROUPS_SUCCESS:
            return Object.assign({}, state, {
                discoverGroupsPageLoading: false,
                discoverGroupsStatus: 200,
                discoverGroupsError: action.response.data.error,
                discoverGroupsMessage: action.response.data.error ? action.response.data.message : "",
                discoverGroups: action.response.data.error ? [] : action.response.data.groups
            });
        case
        DISCOVER_GROUPS_FAILURE:
            return Object.assign({}, state, {
                discoverGroupsPageLoading: false,
                discoverGroupsStatus: action.response.status,
                discoverGroupsError: true,
                discoverGroupsMessage: action.response.data.message,
                discoverGroups: []
            });
        case
        MY_GROUPS_REQUEST:
            return Object.assign({}, state, {
                myGroupsPageLoading: true
            });
        case
        MY_GROUPS_SUCCESS:
            const previousMyGroups = state.myGroups;
            // for page switching
            let responseMyGroups = [];
            /*** update the groups starts***/
            if (!action.response.data.error) {
                responseMyGroups = action.response.data.groups;
                responseMyGroups.reverse();
                // add both groups... and update existing one
                let matchedMyGroups = []; // list of just groups id's....
                for (let l in responseMyGroups) {
                    for (let k in previousMyGroups) {
                        if (previousMyGroups[k]._id === responseMyGroups[l]._id) {
                            matchedMyGroups.unshift(previousMyGroups[k]._id);
                            //update existing one done here
                            let pageNumber = previousMyGroups[k].pageNumber;
                            previousMyGroups[k] = responseMyGroups[l];
                            previousMyGroups[k].pageNumber = pageNumber
                        }
                    }
                }
                responseMyGroups.reverse();
                // access the unmatched id's from responseMyGroups and add them to previousMyGroups
                for (let r in responseMyGroups) {
                    let isThere = false;
                    for (let m in matchedMyGroups) {
                        if (matchedMyGroups[m] === responseMyGroups[r]._id) {
                            isThere = true;
                        }
                    }
                    if (!isThere) {
                        responseMyGroups[r].pageNumber = state.myGroupsPageNumber;
                        previousMyGroups.push(responseMyGroups[r]);
                    }
                }
            }
            return Object.assign({}, state, {
                myGroupsPageLoading: false,
                myGroupsStatus: 200,
                myGroupsError: action.response.data.error,
                myGroupsMessage: action.response.data.error ? action.response.data.message : "",
                myGroups: action.response.data.error ? state.myGroups : previousMyGroups
            });
        case
        MY_GROUPS_FAILURE:
            return Object.assign({}, state, {
                myGroupsPageLoading: false,
                myGroupsStatus: action.response.status,
                myGroupsError: true,
                myGroupsMessage: action.response.data.message,
                myGroups: state.myGroups
            });
        case CLEAR_GET_MY_GROUPS_RESPONSE:
            return {
                ...state,
                myGroupsStatus: "",
                myGroupsError: false,
                myGroupsMessage: "",
                myGroups: []
            };
        case CLEAR_GET_DISCOVER_GROUPS_RESPONSE:
            return {
                ...state,
                discoverGroupsStatus: "",
                discoverGroupsError: false,
                discoverGroupsMessage: "",
                discoverGroups: []
            };
        case
        DISCOVER_GROUP_DETAILS_REQUEST:
            return Object.assign({}, state, {
                discoverGroupDetailsPageLoading: true
            });
        case
        DISCOVER_GROUP_DETAILS_SUCCESS:
            let discoverGroupDetails = [];
            if (!action.response.data.error) {
                discoverGroupDetails = action.response.data.groups;
                let totalPost = action.response.data.groups[0].totalPost;
                let totalPostCount = 0;
                for (let i in totalPost) {
                    totalPostCount = totalPostCount + totalPost[i].counts
                }
                let todayPost = action.response.data.groups[0].todayPost;
                let todayPostCount = 0;
                for (let i in todayPost) {
                    todayPostCount = todayPostCount + todayPost[i].counts
                }
                discoverGroupDetails[0].totalPost = totalPostCount;
                discoverGroupDetails[0].todayPost = todayPostCount;
            }
            return Object.assign({}, state, {
                discoverGroupDetailsPageLoading: false,
                discoverGroupDetailsStatus: 200,
                discoverGroupDetailsError: action.response.data.error,
                discoverGroupDetailsMessage: action.response.data.error ? action.response.data.message : "",
                discoverGroupDetails: action.response.data.error ? [] : discoverGroupDetails
            });
        case
        DISCOVER_GROUP_DETAILS_FAILURE:
            return Object.assign({}, state, {
                discoverGroupDetailsPageLoading: false,
                discoverGroupDetailsStatus: action.response.status,
                discoverGroupDetailsError: true,
                discoverGroupDetailsMessage: "",
                discoverGroupDetails: []
            });
        case CLEAR_DISCOVER_GROUP_DETAILS_RESPONSE:
            return {
                ...state,
                discoverGroupDetailsStatus: "",
                discoverGroupDetailsError: false,
                discoverGroupDetailsMessage: "",
                discoverGroupDetails: []
            };
        case
        GET_MY_GROUP_DETAILS_REQUEST:
            return Object.assign({}, state, {
                getMyGroupDetailsPageLoading: true
            });
        case
        GET_MY_GROUP_DETAILS_SUCCESS:
            let getMyGroupDetails = [];
            if (!action.response.data.error) {
                getMyGroupDetails = action.response.data.groups;
                let totalPost = action.response.data.groups[0].totalPost;
                let totalPostCount = 0;
                for (let i in totalPost) {
                    totalPostCount = totalPostCount + totalPost[i].counts
                }
                let todayPost = action.response.data.groups[0].todayPost;
                let todayPostCount = 0;
                for (let i in todayPost) {
                    todayPostCount = todayPostCount + todayPost[i].counts
                }
                getMyGroupDetails[0].member_id.unshift(getMyGroupDetails[0].user_id);
                getMyGroupDetails[0].totalPost = totalPostCount;
                getMyGroupDetails[0].todayPost = todayPostCount;
            }
            return Object.assign({}, state, {
                getMyGroupDetailsPageLoading: false,
                getMyGroupDetailsStatus: 200,
                getMyGroupDetailsError: action.response.data.error,
                getMyGroupDetailsMessage: action.response.data.error ? action.response.data.message : "",
                getMyGroupDetails: action.response.data.error ? [] : getMyGroupDetails
            });
        case
        GET_MY_GROUP_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getMyGroupDetailsPageLoading: false,
                getMyGroupDetailsStatus: action.response.status,
                getMyGroupDetailsError: true,
                getMyGroupDetailsMessage: "",
                getMyGroupDetails: []
            });
        case CLEAR_GET_MY_GROUP_DETAILS_RESPONSE:
            return {
                ...state,
                getMyGroupDetailsStatus: "",
                getMyGroupDetailsError: false,
                getMyGroupDetailsMessage: "",
                getMyGroupDetails: []
            };
        case CLEAR_GET_MY_GROUP_DETAILS_STATUS_RESPONSE:
            return {
                ...state,
                getMyGroupDetailsStatus: ""
            };
        case
        GET_GROUP_TYPE_GROUPS_REQUEST:
            return Object.assign({}, state, {
                getGroupTypeGroupsPageLoading: true
            });
        case
        GET_GROUP_TYPE_GROUPS_SUCCESS:
            if (state.isDiscover) {
                return Object.assign({}, state, {
                    getGroupTypeGroupsPageLoading: false,
                    getGroupTypeGroupsStatus: 200,
                    getGroupTypeGroupsError: action.response.data.error,
                    getGroupTypeGroupsMessage: action.response.data.error ? action.response.data.message : "",
                    discoverGroups: action.response.data.error ? [] : action.response.data.groups
                });
            } else {
                return Object.assign({}, state, {
                    getGroupTypeGroupsPageLoading: false,
                    getGroupTypeGroupsStatus: 200,
                    getGroupTypeGroupsError: action.response.data.error,
                    getGroupTypeGroupsMessage: action.response.data.error ? action.response.data.message : "",
                    myGroups: action.response.data.error ? [] : action.response.data.groups
                });
            }
        case
        GET_GROUP_TYPE_GROUPS_FAILURE:
            return Object.assign({}, state, {
                getGroupTypeGroupsPageLoading: false,
                getGroupTypeGroupsStatus: action.response.status,
                getGroupTypeGroupsError: true,
                getGroupTypeGroupsMessage: action.response.data.message,
                groupTypeGroups: []
            });
        case CLEAR_GET_GROUP_TYPE_GROUPS_RESPONSE:
            return {
                ...state,
                getGroupTypeGroupsStatus: "",
                getGroupTypeGroupsError: false,
                getGroupTypeGroupsMessage: ""
            };
        case CHANGE_IS_DISCOVER_STATUS:
            return {
                ...state,
                isDiscover: action.status
            };
        case
        GET_GROUP_SETTINGS_REQUEST:
            return Object.assign({}, state, {
                groupSettingsPageLoading: true
            });
        case
        GET_GROUP_SETTINGS_SUCCESS:
            let groupForm = {
                name: "",
                description: "",
                photo: "",
                group_type: "1",
                inviteMembers: [],
                // permanentInviteMembers: []
            };

            if (!action.response.data.error) {
                let inviteMembers = [];
                const groupFormResponse = action.response.data.group;
                if (!!groupFormResponse) {
                    const groupFormResponseInviteMembers = groupFormResponse.member_id;
                    const allMembers = state.users;
                    for (let i in groupFormResponseInviteMembers) {
                        for (let j in allMembers) {
                            if (groupFormResponseInviteMembers[i] === allMembers[j]["_id"]) {
                                inviteMembers.push(allMembers[j]);
                            }
                        }
                    }
                    groupForm.name = groupFormResponse.group_name;
                    groupForm.description = groupFormResponse.description;
                    groupForm.photo = groupFormResponse.group_image;
                    groupForm.group_type = groupFormResponse.privacy.toString();
                    groupForm.inviteMembers = inviteMembers;
                    // groupForm.permanentInviteMembers = inviteMembers;
                    groupForm.group_name = groupFormResponse.group_type;
                }
            }
            return Object.assign({}, state, {
                groupSettingsPageLoading: false,
                groupSettingsStatus: 200,
                groupSettingsError: action.response.data.error,
                groupSettingsMessage: action.response.data.error ? action.response.data.message : "",
                groupForm
            });
        case
        GET_GROUP_SETTINGS_FAILURE:
            return Object.assign({}, state, {
                groupSettingsPageLoading: false,
                groupSettingsStatus: action.response.status,
                groupSettingsError: true,
                groupSettingsMessage: action.response.data.message,
                groupForm: {
                    name: "",
                    description: "",
                    photo: "",
                    group_type: "1",
                    inviteMembers: [],
                    // permanentInviteMembers: []
                }
            });
        case CLEAR_USERS_AND_TYPES_STATUS:
            return {
                ...state,
                getUsersStatus: "",
                getGroupTypesStatus: ""
            };
        case CLEAR_GET_GROUP_SETTINGS_STATUS:
            return {
                ...state,
                groupSettingsStatus: ""
            };

        case DELETE_MY_GROUP_REQUEST:
            return Object.assign({}, state, {
                deleteMyGroupPageLoading: true
            });
        case
        DELETE_MY_GROUP_SUCCESS:
            return Object.assign({}, state, {
                deleteMyGroupPageLoading: false,
                deleteMyGroupStatus: 200,
                deleteMyGroupError: action.response.data.error,
                deleteMyGroupMessage: action.response.data.message
            });
        case
        DELETE_MY_GROUP_FAILURE:
            return Object.assign({}, state, {
                deleteMyGroupPageLoading: false,
                deleteMyGroupStatus: action.response.status,
                deleteMyGroupError: true,
                deleteMyGroupMessage: action.response.data.message
            });

        case LEAVE_MY_GROUP_REQUEST:
            return Object.assign({}, state, {
                leaveMyGroupPageLoading: true
            });
        case
        LEAVE_MY_GROUP_SUCCESS:
            return Object.assign({}, state, {
                leaveMyGroupPageLoading: false,
                leaveMyGroupStatus: 200,
                leaveMyGroupError: action.response.data.error,
                leaveMyGroupMessage: action.response.data.message
            });
        case
        LEAVE_MY_GROUP_FAILURE:
            return Object.assign({}, state, {
                leaveMyGroupPageLoading: false,
                leaveMyGroupStatus: action.response.status,
                leaveMyGroupError: true,
                leaveMyGroupMessage: action.response.data.message
            });
        case CLEAR_DELETE_MY_GROUP_STATUS:
            return {
                ...state,
                deleteMyGroupStatus: ""
            };
        case CLEAR_LEAVE_MY_GROUP_STATUS:
            return {
                ...state,
                leaveMyGroupStatus: ""
            };

        case REQUEST_JOIN_GROUP_REQUEST:
            return Object.assign({}, state, {
                requestJoinGroupPageLoading: true
            });
        case
        REQUEST_JOIN_GROUP_SUCCESS:
            return Object.assign({}, state, {
                requestJoinGroupPageLoading: false,
                requestJoinGroupStatus: 200,
                requestJoinGroupError: action.response.data.error,
                requestJoinGroupMessage: action.response.data.message
            });
        case
        REQUEST_JOIN_GROUP_FAILURE:
            return Object.assign({}, state, {
                requestJoinGroupPageLoading: false,
                requestJoinGroupStatus: action.response.status,
                requestJoinGroupError: true,
                requestJoinGroupMessage: action.response.data.message
            });
        case CLEAR_REQUEST_JOIN_GROUP_STATUS:
            return {
                ...state,
                requestJoinGroupStatus: ""
            };
        case ACCEPT_REJECT_GROUP_REQUEST:
            return Object.assign({}, state, {
                acceptRejectGroupPageLoading: true
            });
        case
        ACCEPT_REJECT_GROUP_SUCCESS:
            return Object.assign({}, state, {
                acceptRejectGroupPageLoading: false,
                acceptRejectGroupStatus: 200,
                acceptRejectGroupError: action.response.data.error,
                acceptRejectGroupMessage: action.response.data.message
            });
        case
        ACCEPT_REJECT_GROUP_FAILURE:
            return Object.assign({}, state, {
                acceptRejectGroupPageLoading: false,
                acceptRejectGroupStatus: action.response.status,
                acceptRejectGroupError: true,
                acceptRejectGroupMessage: action.response.data.message
            });
        case CHANGE_CREATE_CHANNEL_FORM:
            return {
                ...state,
                createChannelForm: action.nextState
            };
        case CLEAR_CREATE_CHANNEL_RESPONSE:
            return {
                ...state,
                createChannelStatus: "",
                createChannelError: false,
                createChannelMessage: ""
            };
        case CREATE_CHANNEL_REQUEST:
            return Object.assign({}, state, {
                createChannelPageLoading: true
            });
        case
        CREATE_CHANNEL_SUCCESS:
            return Object.assign({}, state, {
                createChannelPageLoading: false,
                createChannelStatus: 200,
                createChannelError: action.response.data.error,
                createChannelMessage: action.response.data.message
            });
        case
        CREATE_CHANNEL_FAILURE:
            return Object.assign({}, state, {
                createChannelPageLoading: false,
                createChannelStatus: action.response.status,
                createChannelError: true,
                createChannelMessage: action.response.data.message
            });
        case ACCEPT_DECLINE_GROUP_REQUEST:
            return Object.assign({}, state, {
                acceptDeclineGroupPageLoading: true
            });
        case
        ACCEPT_DECLINE_GROUP_SUCCESS:
            return Object.assign({}, state, {
                acceptDeclineGroupPageLoading: false,
                acceptDeclineGroupStatus: 200,
                acceptDeclineGroupError: action.response.data.error,
                acceptDeclineGroupMessage: action.response.data.message
            });
        case
        ACCEPT_DECLINE_GROUP_FAILURE:
            return Object.assign({}, state, {
                acceptDeclineGroupPageLoading: false,
                acceptDeclineGroupStatus: action.response.status,
                acceptDeclineGroupError: true,
                acceptDeclineGroupMessage: action.response.data.message
            });
        case CLEAR_ACCEPT_DECLINE_GROUP_STATUS:
            return {
                ...state,
                acceptDeclineGroupStatus: ""
            };
        case CHANGE_SOCKET_CONFIG:
            return {
                ...state,
                isChannel: action.config.isChannel,
                socketChannelId: action.config.socketChannelId,
                OneToOneChatId: action.config.OneToOneChatId,
                socketChannelName: action.config.socketChannelName,
                OneToOneChatName: action.config.OneToOneChatName,
                getMessages: action.config.getMessages
            };
        case SEND_NO_CHANNEL_AND_MEMBERS_ERROR:
            return {
                ...state,
                getMyGroupDetailsError: true,
                getMyGroupDetailsMessage: "No previous chats. Either create channel or add members to your group."
            };
        case CHANGE_CHAT_MESSAGE:
            return {
                ...state,
                chatMessage: action.msg
            };
        case STOP_CHAT_CONNECTION:
            return {
                ...state,
                stopConn: action.status
            };

        /**
         *  INVITE A USER....
         */
        case CHANGE_INVITE_USER_FORM:
            return {
                ...state,
                inviteUserForm: action.nextState
            };
        case CLEAR_INVITE_USER_RESPONSE:
            return {
                ...state,
                inviteUserStatus: "",
                inviteUserError: false,
                inviteUserMessage: ""
            };
        case INVITE_USER_REQUEST:
            return Object.assign({}, state, {
                inviteUserPageLoading: true
            });
        case
        INVITE_USER_SUCCESS:
            return Object.assign({}, state, {
                inviteUserPageLoading: false,
                inviteUserStatus: 200,
                inviteUserError: action.response.data.error,
                inviteUserMessage: action.response.data.message
            });
        case
        INVITE_USER_FAILURE:
            return Object.assign({}, state, {
                inviteUserPageLoading: false,
                inviteUserStatus: action.response.status,
                inviteUserError: true,
                inviteUserMessage: action.response.data.message
            });
        case CHANGE_MY_GROUPS_PAGE:
            return {
                ...state,
                myGroupsPageNumber: action.page
            };
        case TARGET_MY_GROUPS_PAGE:
            return {
                ...state,
                myGroupsTargetPageNumber: action.page
            };
        default:
            return state
    }
}
