import {combineReducers} from 'redux';
import loginReducer from "./account/login";
import dashboardReducer from "./dashboard/dashboard";
import postReducer from "./dashboard/post";
import groupsReducer from "./dashboard/groups/groups"

export default combineReducers({
    loginReducer,
    dashboardReducer,
    postReducer,
    groupsReducer
})
