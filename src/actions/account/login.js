import {
    CHANGE_AUTHANTICATION,
    CHANGE_LOGIN_FORM,
    CLEAR_LOGIN_API_RESPONSE,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_API_FAILURE,
    LOGOUT_API_REQUEST,
    LOGOUT_API_SUCCESS,
    LOGOUT_SUCCESS
} from "../../types/account/login";
import {POST_WITHOUT_TOKEN} from "../../middleware/without_token/post-api";
import {authApi, getCookie} from '../../actions/app/index';
import {CALL_POST_API} from "../../middleware/token/post-api";

const AUTH_API = authApi();

export const changeLoginForm = (newState) => {
    return {type: CHANGE_LOGIN_FORM, newState}
};

export const login = (body) => {
    return {
        [POST_WITHOUT_TOKEN]: {
            endpoint: AUTH_API + "/admin/login",
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            body: JSON.stringify(body)
        }
    }
};

export const clearLoginApiResponse = () => {
    return {type: CLEAR_LOGIN_API_RESPONSE}
};

export const changeAuthantication = (status) => {
    return {type: CHANGE_AUTHANTICATION, status}
};
export const logout = () => {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/admin/logout',
            types: [LOGOUT_API_REQUEST, LOGOUT_API_SUCCESS, LOGOUT_API_FAILURE],
            token: getCookie("token")
        }
    }
};
export const logoutQuick = () => {
    return {type: LOGOUT_SUCCESS}
};
