import {
    CHANGE_PAGENUMBER,
    CLEAR_USERS_API_RESPONSE,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS
} from '../../types/dashboard/dashboard';

const initialState = {
    usersPageNumber: 1,
    usersPageLoading: false,
    usersStatus: "",
    usersError: false,
    usersMessage: "",
    users: [],
    totalUsersCount: 0
};

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                usersPageLoading: true
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                usersPageLoading: false,
                usersStatus: 200,
                usersError: action.response.data.error,
                users: !action.response.data.error ? action.response.data.users : [],
                totalUsersCount: !action.response.data.error ? action.response.data.counts : 0
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                usersPageLoading: false,
                usersStatus: action.response.status,
                usersError: true,
                users: [],
                totalUsersCount: 0
            };
        case CHANGE_PAGENUMBER:
            return {
                ...state,
                usersPageNumber: action.page
            };
        case CLEAR_USERS_API_RESPONSE:
            return {
                ...state,
                usersStatus: "",
                usersError: false,
                users: [],
                totalUsersCount: 0
            };
        default:
            return state
    }

}
