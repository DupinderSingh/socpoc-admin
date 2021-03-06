import React from "react";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="l-sidebar">
                <div className="logo">
                    <div className="logo__txt"><img src={require("../../../images/logo.svg")} alt=""/><h5
                        className="sporti"
                        style={{display: "none"}}>Socpoc Admin</h5></div>
                </div>
                <div className="l-sidebar__content">
                    <nav className="c-menu js-menu">
                        <ul className="u-list">
                            <li className="c-menu__item is-active" data-toggle="tooltip" data-placement="right" title=""
                                onClick={() => this.props.history.push("/dashboard")}
                                data-original-title="Dashboard">
                                <a href={"#/"}>
                                    <div className="c-menu__item__inner">
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="18px" height="18px">
                                                <path fill-rule="evenodd" fill="rgb(191, 197, 209)"
                                                      d="M5.354,-0.005 L2.651,-0.005 C1.158,-0.005 -0.012,1.212 -0.012,2.703 L-0.012,5.403 C-0.012,6.894 1.158,8.094 2.651,8.094 L5.354,8.094 C6.847,8.094 8.097,6.894 8.097,5.403 L8.097,2.703 C8.097,1.212 6.847,-0.005 5.354,-0.005 ZM6.295,5.403 C6.295,5.899 5.851,6.294 5.354,6.294 L2.651,6.294 C2.154,6.294 1.790,5.899 1.790,5.403 L1.790,2.703 C1.790,2.207 2.154,1.795 2.651,1.795 L5.354,1.795 C5.851,1.795 6.295,2.207 6.295,2.703 L6.295,5.403 ZM15.265,-0.005 L12.562,-0.005 C11.069,-0.005 9.899,1.212 9.899,2.703 L9.899,5.403 C9.899,6.894 11.069,8.094 12.562,8.094 L15.265,8.094 C16.758,8.094 18.008,6.894 18.008,5.403 L18.008,2.703 C18.008,1.212 16.758,-0.005 15.265,-0.005 ZM16.206,5.403 C16.206,5.899 15.762,6.294 15.265,6.294 L12.562,6.294 C12.065,6.294 11.701,5.899 11.701,5.403 L11.701,2.703 C11.701,2.207 12.065,1.795 12.562,1.795 L15.265,1.795 C15.762,1.795 16.206,2.207 16.206,2.703 L16.206,5.403 ZM5.354,9.893 L2.651,9.893 C1.158,9.893 -0.012,11.110 -0.012,12.601 L-0.012,15.301 C-0.012,16.792 1.158,17.992 2.651,17.992 L5.354,17.992 C6.847,17.992 8.097,16.792 8.097,15.301 L8.097,12.601 C8.097,11.110 6.847,9.893 5.354,9.893 ZM6.295,15.301 C6.295,15.797 5.851,16.192 5.354,16.192 L2.651,16.192 C2.154,16.192 1.790,15.797 1.790,15.301 L1.790,12.601 C1.790,12.105 2.154,11.693 2.651,11.693 L5.354,11.693 C5.851,11.693 6.295,12.105 6.295,12.601 L6.295,15.301 ZM15.265,9.893 L12.562,9.893 C11.069,9.893 9.899,11.110 9.899,12.601 L9.899,15.301 C9.899,16.792 11.069,17.992 12.562,17.992 L15.265,17.992 C16.758,17.992 18.008,16.792 18.008,15.301 L18.008,12.601 C18.008,11.110 16.758,9.893 15.265,9.893 ZM16.206,15.301 C16.206,15.797 15.762,16.192 15.265,16.192 L12.562,16.192 C12.065,16.192 11.701,15.797 11.701,15.301 L11.701,12.601 C11.701,12.105 12.065,11.693 12.562,11.693 L15.265,11.693 C15.762,11.693 16.206,12.105 16.206,12.601 L16.206,15.301 Z"></path>
                                            </svg>
                                        </i>
                                        <div className="c-menu-item__title"><span>Dashboard</span></div>
                                    </div>
                                </a>
                            </li>
                            <li className="c-menu__item has-submenu"
                                onClick={() => this.props.history.push("/dashboard/groups")} data-toggle="tooltip" data-placement="right"
                                title=""
                                data-original-title="Settings">
                                <a href="javascript:;">
                                    <div className="c-menu__item__inner">
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 width="19px" height="19px">
                                                <path fill-rule="evenodd" fill="rgb(191, 197, 209)"
                                                      d="M18.274,10.557 C18.036,9.975 18.039,9.321 18.282,8.741 L18.797,7.515 C19.304,6.307 18.735,4.917 17.526,4.410 L16.299,3.896 C15.719,3.652 15.259,3.188 15.020,2.606 L14.618,1.624 C14.122,0.411 12.736,-0.170 11.522,0.325 L10.539,0.727 C9.956,0.965 9.302,0.962 8.722,0.719 L7.495,0.205 C6.286,-0.302 4.894,0.266 4.387,1.475 L3.872,2.700 C3.629,3.280 3.165,3.740 2.582,3.979 L1.598,4.380 C0.385,4.876 -0.197,6.261 0.300,7.474 L0.701,8.457 C0.940,9.039 0.937,9.692 0.693,10.272 L0.179,11.498 C-0.329,12.706 0.240,14.097 1.449,14.603 L2.676,15.118 C3.257,15.361 3.717,15.825 3.955,16.408 L4.357,17.390 C4.854,18.603 6.240,19.184 7.454,18.688 L8.437,18.286 C9.019,18.048 9.673,18.051 10.254,18.294 L11.481,18.809 C12.690,19.316 14.081,18.747 14.589,17.539 L15.103,16.313 C15.347,15.733 15.811,15.273 16.394,15.035 L17.377,14.633 C18.591,14.137 19.172,12.752 18.676,11.539 L18.274,10.557 ZM16.008,10.421 L16.009,10.421 C16.505,11.634 15.923,13.019 14.710,13.515 L14.710,13.515 L13.925,13.835 C13.765,14.218 13.654,14.481 13.494,14.863 C13.026,15.976 11.775,16.715 10.138,16.029 L9.357,15.702 L8.573,16.022 L8.573,16.022 C7.534,16.447 6.197,16.165 5.476,14.724 L5.156,13.941 C4.771,13.779 4.510,13.670 4.127,13.509 C3.013,13.043 2.274,11.792 2.960,10.157 L3.288,9.376 L2.967,8.593 L2.967,8.592 C2.471,7.379 3.052,5.994 4.266,5.498 L4.266,5.498 L5.050,5.178 C5.223,4.767 5.333,4.504 5.482,4.150 C5.952,3.030 7.208,2.301 8.837,2.984 L9.618,3.312 L10.403,2.991 L10.403,2.991 C11.617,2.495 13.003,3.076 13.499,4.289 L13.499,4.289 L13.820,5.073 C14.231,5.245 14.495,5.355 14.849,5.504 C15.970,5.974 16.699,7.229 16.016,8.857 L15.688,9.638 L16.008,10.421 ZM9.488,5.419 C7.228,5.419 5.397,7.249 5.397,9.507 C5.397,11.764 7.228,13.595 9.488,13.595 C11.747,13.595 13.579,11.764 13.579,9.507 C13.579,7.249 11.747,5.419 9.488,5.419 ZM9.488,11.551 C8.360,11.551 7.442,10.634 7.442,9.507 C7.442,8.380 8.360,7.463 9.488,7.463 C10.616,7.463 11.533,8.380 11.533,9.507 C11.533,10.634 10.616,11.551 9.488,11.551 Z"></path>
                                            </svg>
                                        </i>
                                        <div className="c-menu-item__title"><span>Groups</span></div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {state}
};

export default withRouter(connect(mapStateToProps)(Sidebar))
