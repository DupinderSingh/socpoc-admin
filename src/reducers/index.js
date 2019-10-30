import {combineReducers} from 'redux';
import loginReducer from "./account/login";
import dashboardReducer from "./dashboard/dashboard";

export default combineReducers({
    loginReducer,
    dashboardReducer
})
