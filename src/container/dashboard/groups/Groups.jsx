import React from 'react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import './Groups.css';
import MyGroups from "./myGroups/MyGroups";
import GroupInfo from "./myGroups/groupChat/groupInfo/GroupInfo";
import GroupSettings from "./groupSettings/GroupSettings";
import $ from "jquery";
import {
    changeIsDiscoverStatus,
    clearGetMyGroupsResponse,
    clearGroupTypes,
    getGroupTypeGroups,
    getMyGroups
} from "../../../actions/dashbaord/groups/groups";

class Groups extends React.Component {
    componentDidMount() {
        $("html,body").animate({scrollTop: 0});
        this.props.dispatch(clearGroupTypes());
        if (this.props.location.pathname === "/dashboard/groups") {
            this.props.dispatch(clearGetMyGroupsResponse());
            this.props.dispatch(getMyGroups());
        }
        // if (this.props.location.pathname === "/dashboard/groups/my-groups/" + this.props.match.params.group + "/chat") {
        //     this.props.dispatch(clearGetMyGroupDetailsResponse());
        //     this.props.dispatch(getMyGroupDetails(this.props.match.params.group));
        // }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            if (nextProps.location.pathname === "/dashboard/groups") {
                this.props.dispatch(getMyGroups());
            }
            // if (nextProps.location.pathname.match("/dashboard/groups/my-groups/") && nextProps.location.pathname.match("/chat")) {
            //     this.props.dispatch(getMyGroupDetails(nextProps.match.params.group));
            // }
        }
    }

    changeGroupType(type) {
        if (type !== "") {
            const isGroups = this.props.location.pathname === "/dashboard/groups";
            this.props.dispatch(changeIsDiscoverStatus(isGroups));
            this.props.dispatch(getGroupTypeGroups(type, isGroups));
        } else {
            if (this.props.location.pathname !== "/dashboard/groups") {
                this.props.dispatch(getMyGroups());
            }
        }
    }

    render() {
        return (
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <div className="top-header">
                        <h1 className="page-title">Groups</h1>
                    </div>
                    <div className="container">
                        {
                            this.props.location.pathname.match("chat") &&
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="backto_grouplist">
                                        <Link to="/dashboard/groups/my-groups">
                                            <img src={require("../../../images/backto.svg")} alt="back"/> Back to groups
                                            list
                                        </Link>
                                    </div>
                                    <GroupInfo/>
                                </div>
                            </div>
                        }
                        <div className="row">
                            {/*{*/}
                            {/*    !this.props.location.pathname.match("/create") &&*/}
                            {/*    !this.props.location.pathname.match("/settings") &&*/}
                            {/*    <div className="col-12">*/}
                            {/*        <div className="group_row">*/}
                            {/*            <ul className="group_type">*/}
                            {/*                <li className={(this.props.location.pathname === "/dashboard/groups" || this.props.location.pathname === "/dashboard/groups/discover") ? "active" : ""}>*/}
                            {/*                    <Link to="/dashboard/groups/discover">Discover</Link>*/}
                            {/*                </li>*/}
                            {/*                <li className={this.props.location.pathname === "/dashboard/groups/my-groups" ? "active" : ""}>*/}
                            {/*                    <Link to="/dashboard/groups/my-groups">My Groups*/}
                            {/*                        {this.props.myGroups.length > 0 ? "(" + this.props.myGroups.length + ")" : ""}</Link>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*            /!*<div className="group_option">*!/*/}
                            {/*            /!*    <Link to={"/dashboard/groups/create"}>+ Create a group</Link>*!/*/}
                            {/*            /!*</div>*!/*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*}*/}
                            <Switch>
                                {/*<Route exact path="/dashboard/groups" component={Discover}/>*/}
                                {/*<Route exact path="/dashboard/groups/discover" component={Discover}/>*/}
                                {/*<Route path="/dashboard/groups/discover/join-group/:group" component={JoinGroup}/>*/}
                                <Route exact path="/dashboard/groups" component={MyGroups}/>
                                {/*<Route path="/dashboard/groups/my-groups/:group/chat" component={GroupChat}/>*/}
                                <Route path="/dashboard/groups/:group/settings" component={GroupSettings}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        groupTypes,
        myGroups
    } = state.groupsReducer;
    return {
        groupTypes,
        myGroups
    }
};
export default withRouter(connect(mapStateToProps)(Groups))
