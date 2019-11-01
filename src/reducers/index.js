import {combineReducers} from 'redux';
import loginReducer from "./account/login";
import dashboardReducer from "./dashboard/dashboard";
import postReducer from "./dashboard/post";

export default combineReducers({
    loginReducer,
    dashboardReducer,
    postReducer
})
