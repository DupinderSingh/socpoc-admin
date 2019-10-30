import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {store} from './index';
import Header from "./components/app/header/Header";
import Dashboard from './container/dashboard/Dashboard';
import Login from "./container/account/login/Login";
import Signup from "./container/account/signup/Signup";
import Sidebar from "./components/dashboard/sidebar/Sidebar";

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
                <Redirect from="*" to='/dashboard'/>
            </Switch>
        </div>
    )
}

class RouteComponent extends Component {
    render() {
        return (
            <div className={this.props.auth.isAuthenticated ? "change-color sidebar-is-reduced" : ""}>
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
                    <ProtectedRoute path="/signup" component={Signup}/>
                    <BodyWrapper props={this.props}/>
                </Switch>
                {/*<Footer/>*/}
                {/*<NotificationContainer/>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {auth} = state.loginReducer;
    return {auth}
}

export default withRouter(connect(mapStateToProps)(RouteComponent));
