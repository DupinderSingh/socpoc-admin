import {
    CHANGE_PAGENUMBER,
    CLEAR_USERS_API_RESPONSE,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS
} from "../../types/dashboard/dashboard";
import {authApi, getCookie} from "../app";
import {GET_API} from "../../middleware/token/get-api";

const AUTH_API = authApi();

export const changePageNumber = (page) => {
    return {type: CHANGE_PAGENUMBER, page}
};

export const clearUsersApiResponse = () => {
    return {type: CLEAR_USERS_API_RESPONSE}
};

export function getUsers(page) {
    return {
        [GET_API]: {
            endpoint: AUTH_API + '/admin/users/' + page,
            types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
            token: getCookie("token")
        }
    }
}
