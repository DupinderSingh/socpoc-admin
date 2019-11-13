import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Pagination from "react-js-pagination";
import moment from "moment";
import './Dashboard.css';
import "../../styles/js/index";
import {
    activeInactivePerson,
    changePageNumber,
    clearActiveInactiveUserResponse,
    clearUsersApiResponse,
    getUsers
} from "../../actions/dashbaord/dashboard";

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(changePageNumber(1));
        this.props.dispatch(clearUsersApiResponse());
        this.props.dispatch(getUsers(1));
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(changePageNumber(pageNumber));
        this.props.dispatch(getUsers(pageNumber));
    }

    activeInactiveUser(id) {
        this.props.dispatch(activeInactivePerson(id));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.activeInactiveError && nextProps.activeInactiveUserStatus === 200) {
            this.props.dispatch(getUsers(nextProps.usersPageNumber));
            this.props.dispatch(clearActiveInactiveUserResponse());
        }
    }

    render() {
        return (
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <div className="top-header">
                        <h1 className="page-title">Dashboard</h1>
                        {/*<button type="button" className="btn btn-primary"><i className="fas fa-plus"></i><span>Add Member</span>*/}
                        {/*</button>*/}
                    </div>
                    <div className="table-outer table-responsive">
                        <table className="table table-borderless custom-table">
                            <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Country</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !this.props.usersError && this.props.users.length > 0 &&
                                this.props.users.map((user, index) => (
                                    <tr style={{backgroundColor: user.status !== 1 && "rgba(255, 0, 0, 0.36)"}}>
                                        <th scope="row"></th>
                                        <td><span className="image-user">
                                            <img
                                                src={!!user.image ? user.image : require("../../images/person-placeholder.jpg")}
                                                alt="Avatar"
                                                className="avatar"/></span>{user.name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>{moment(user.createdAt).fromNow()}</td>
                                        <td>
                                            <button type="button" style={{cursor: "pointer"}}
                                                    onClick={() => this.activeInactiveUser(user._id)}
                                                    className="btn btn-primary">
                                                <span>{user.status === 1 ? "Deactivate" : "Activate"}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="pagin">
                            <Pagination
                                activePage={this.props.usersPageNumber}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.totalUsersCount}
                                pageRangeDisplayed={3}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        usersPageNumber,
        usersPageLoading,
        usersStatus,
        usersError,
        usersMessage,
        users,
        totalUsersCount,
        activeInactiveUserPageLoading,
        activeInactiveUserStatus,
        activeInactiveError,
        activeInactiveMessage
    } = state.dashboardReducer;
    return {
        usersPageNumber,
        usersPageLoading,
        usersStatus,
        usersError,
        usersMessage,
        users,
        totalUsersCount,
        activeInactiveUserPageLoading,
        activeInactiveUserStatus,
        activeInactiveError,
        activeInactiveMessage
    }
};

export default withRouter(connect(mapStateToProps)(Dashboard))
