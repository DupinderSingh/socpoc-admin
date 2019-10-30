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
} from '../../types/account/login';
import {getCookie, setCookie} from "../../actions/app";

const initialState = {
    auth: {
        isAuthenticated: !!getCookie("token")
    },
    loginForm: {
        email: "",
        password: ""
    },
    loginPageLoading: false,
    loginStatus: "",
    loginError: false,
    loginMessage: "",

    logoutPageLoading: false,
    logoutStatus: "",
    logoutError: false,
    logoutMessage: ""
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            localStorage.clear();
            sessionStorage.clear();
            setCookie("token", "", 0);
            setCookie("userId", "", 0);
            return Object.assign({}, state, {
                auth: {
                    isAuthenticated: false
                }
            });
        case CHANGE_LOGIN_FORM:
            return {...state, loginForm: action.newState};
        case LOGIN_REQUEST:
            return {...state, loginPageLoading: true};
        case LOGIN_SUCCESS:
            if (!action.response.data.error && !!action.response.data.token && !!action.response.data.user) {
                setCookie("token", action.response.data.token, 1440);
                setCookie("userId", action.response.data.user["_id"], 1440);
                localStorage.setItem("token", action.response.data.token);
                localStorage.setItem("userId", action.response.data.user["_id"]);
                sessionStorage.setItem("token", action.response.data.token);
                sessionStorage.setItem("userId", action.response.data.user["_id"]);
                localStorage.setItem("go_linkedin", "false");
                return {
                    ...state,
                    loginPageLoading: false,
                    loginStatus: 200,
                    loginError: false,
                    loginMessage: ""
                }
            } else {
                return {
                    ...state,
                    loginPageLoading: false,
                    loginStatus: 200,
                    loginError: true,
                    loginMessage: action.response.data.error ? action.response.data.message : "Couldn't get the required response to login user."
                }
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loginPageLoading: false,
                loginStatus: action.response.status,
                loginError: true,
                loginMessage: action.response.data.message
            };
        case CHANGE_AUTHANTICATION:
            return {
                ...state,
                auth: {isAuthenticated: action.status}
            };
        case CLEAR_LOGIN_API_RESPONSE:
            return {
                ...state,
                loginStatus: "",
                loginError: false,
                loginMessage: "",
                logoutStatus: "",
                logoutError: false,
                logoutMessage: ""
            };
        case LOGOUT_API_REQUEST:
            return {
                ...state,
                logoutPageLoading: true
            };
        case LOGOUT_API_SUCCESS:
            return {
                ...state,
                logoutPageLoading: false,
                logoutStatus: 200,
                logoutError: action.response.data.error,
                logoutMessage: action.response.data.message
            };
        case LOGOUT_API_FAILURE:
            return {
                ...state,
                logoutPageLoading: false,
                logoutStatus: action.response.status,
                logoutError: true,
                logoutMessage: action.response.data.message
            };
        default:
            return state
    }

}
