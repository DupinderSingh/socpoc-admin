import {
    CHANGE_PAGENUMBER,
    CLEAR_USERS_API_RESPONSE,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    ACTIVE_INACTIVE_USER_REQUEST, ACTIVE_INACTIVE_USER_SUCCESS, ACTIVE_INACTIVE_USER_FAILURE,
    CLEAR_ACTIVE_INACTIVE_USER_RESPONSE
} from "../../types/dashboard/dashboard";
import {authApi, getCookie} from "../app";
import {GET_API} from "../../middleware/token/get-api";
import {PUT_API} from "../../middleware/token/put_api/put-api-with-body";
import {PUT_API_WITHOUT_BODY} from "../../middleware/token/put_api/put-api-without-body";

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

export function activeInactivePerson(id) {
    return {
        [PUT_API_WITHOUT_BODY]: {
            endpoint: AUTH_API + '/admin/user-inactive/' + id,
            types: [ACTIVE_INACTIVE_USER_REQUEST, ACTIVE_INACTIVE_USER_SUCCESS, ACTIVE_INACTIVE_USER_FAILURE],
        }
    }
}
export function clearActiveInactiveUserResponse() {
    return {
        type: CLEAR_ACTIVE_INACTIVE_USER_RESPONSE
    }
}
