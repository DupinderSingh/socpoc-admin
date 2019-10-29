import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import './Dashboard.css';

let thi = null;

class Dashboard extends React.Component {
    render() {
        return (
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <div className="top-header">
                        <h1 className="page-title">Dashboard</h1>
                        <button type="button" className="btn btn-primary"><i className="fas fa-plus"></i><span>Add Member</span>
                        </button>
                    </div>
                    <div className="table-outer table-responsive">
                        <table className="table table-borderless custom-table">
                            <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Location</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td><span className="image-user"><img src={require("../../images/user1.png")}
                                                                      alt="Avatar"
                                                                      className="avatar"/></span>Mark
                                </td>
                                <td>Otto</td>
                                <td>Athlete</td>
                                <td>Pune</td>
                                <td>Markotto@gmial.com</td>
                                <td>
                                    <span><i className="fas fa-eye"></i></span>
                                    <span><i className="fas fa-pen"></i></span>
                                    <button type="button" className="btn btn-primary btn-pop" data-toggle="modal"
                                            data-target="#exampleModalCenter"><span><i className="far fa-trash-alt"></i></span>
                                    </button>
                                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body text-center">
                                                    <h4 className="sure">Are you sure ?</h4>
                                                    <p>you want to delete John Smith</p>
                                                    <div className="text-center button_action">
                                                        <button type="button" className="btn btn-secondary yes">Yes
                                                        </button>
                                                        <button type="button" className="btn btn-primary no"
                                                                data-dismiss="modal">No
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td><span className="image-user"><img src={require("../../images/user2.png")}
                                                                      alt="Avatar"
                                                                      className="avatar"/></span>Jacob
                                </td>
                                <td>Thornton</td>
                                <td>Athlete</td>
                                <td>Pune</td>
                                <td>Thornton@gmial.com</td>
                                <td>
                                    <span><i className="fas fa-eye"></i></span>
                                    <span><i className="fas fa-pen"></i></span>
                                    <button type="button" className="btn btn-primary btn-pop" data-toggle="modal"
                                            data-target="#exampleModalCenter"><span><i className="far fa-trash-alt"></i></span>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {state}
};

export default withRouter(connect(mapStateToProps)(Dashboard))
