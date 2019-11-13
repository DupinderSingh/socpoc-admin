import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {store} from './index';
import Header from "./components/app/header/Header";
import Dashboard from './container/dashboard/Dashboard';
import Login from "./container/account/login/Login";
import Signup from "./container/account/signup/Signup";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import Posts from "./container/dashboard/posts/Posts";
import Groups from "./container/dashboard/groups/Groups";
import {NotificationContainer} from "react-notifications";

function checkAuth() {
    const {auth} = store.getState().loginReducer;
    const {isAuthenticated} = auth;
    return isAuthenticated
}

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return checkAuth() ?
            <Component {...props}/>
            : <Redirect to='/login'/>
    }
    }/>
);

export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return checkAuth() ?
            <Redirect to='/dashboard'/>
            : <Component {...props}/>
    }
    }/>
);

export function BodyWrapper(props) {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute path="/posts" component={Posts}/>
                {/*<PrivateRoute exact path="/dashboard/groups" component={Dashboard}/>*/}
                {/*<PrivateRoute exact path="/dashboard/groups/discover" component={Groups}/>*/}
                {/*<PrivateRoute path="/dashboard/groups/discover/join-group/:group" component={Groups}/>*/}
                <PrivateRoute exact path="/dashboard/groups" component={Groups}/>
                {/*<PrivateRoute path="/dashboard/groups/my-groups/:group/chat" component={Groups}/>*/} //change the name of the route
                <PrivateRoute path="/dashboard/groups/:group/settings" component={Groups}/>
                <Redirect from="*" to='/dashboard'/>
            </Switch>
        </div>
    )
}

class RouteComponent extends Component {
    render() {
        return (
            <div className={this.props.auth.isAuthenticated ? "change-color sidebar-is-expanded" : ""}>
                {
                    this.props.auth.isAuthenticated &&
                    <Header/>
                }
                {
                    this.props.auth.isAuthenticated &&
                    <Sidebar/>
                }
                <Switch>
                    <ProtectedRoute path="/login" component={Login}/>
                    {/*<ProtectedRoute path="/signup" component={Signup}/>*/}
                    <BodyWrapper props={this.props}/>
                </Switch>
                {/*<Footer/>*/}
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {auth} = state.loginReducer;
    return {auth}
}

export default withRouter(connect(mapStateToProps)(RouteComponent));
