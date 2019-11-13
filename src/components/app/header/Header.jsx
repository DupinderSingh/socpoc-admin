import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeAuthantication, logout} from "../../../actions/account/login";
import {setCookie} from "../../../actions/app/index";

class Header extends React.Component {
    logoutAdmin() {
        this.props.dispatch(logout());
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.logoutError && nextProps.logoutStatus === 200) {
            localStorage.clear();
            sessionStorage.clear();
            setCookie("token", "", 0);
            setCookie("userId", "", 0);
            nextProps.dispatch(changeAuthantication(false));
            nextProps.history.push("/login");
        }
    }

    render() {
        return (
            <header className="l-header">
                <div className="l-header__inner clearfix">
                    {/*<div className="c-header-icon js-hamburger">*/}
                    {/*    <div className="hamburger-toggle"><span className="bar-top"></span><span*/}
                    {/*        className="bar-mid"></span><span className="bar-bot"></span></div>*/}
                    {/*</div>*/}
                    <div className="c-search">
                        {/*<span className="serch-icon"><i className="fas fa-search"></i></span><input*/}
                        {/*className="c-search__input u-input" placeholder="Search..." type="text"/>*/}
                    </div>
                    <div className="header-icons-group">
                        {/*<div className="c-header-icon basket"><span*/}
                        {/*    className="c-badge c-badge--header-icon animated shake"></span><i*/}
                        {/*    className="fa fa-bell"></i></div>*/}
                        <div className="logout">
                            <ul className="profile-wrapper">
                                <li className="dropdown">
                                    <div className="profile">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                                           aria-expanded="false"><img style={{borderRadius: "50px"}}
                                                                      src={require("../../../images/person-placeholder.jpg")}/>Admin <b
                                            className="caret"></b></a>
                                        <ul className="menu dropdown-menu" x-placement="bottom-start"
                                            style={{
                                                position: "absolute",
                                                transform: "translate3d(0px, 23px, 0px)",
                                                top: "0px",
                                                left: "0px",
                                                willChange: "transform"
                                            }}>
                                            {/*<li><a href="#">Edit</a></li>*/}
                                            {/*<li><a href="#">Change Password</a></li>*/}
                                            <li onClick={this.logoutAdmin.bind(this)}><a href="#">Log out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

        )
    }
}

const mapStateToProps = (state) => {
    const {
        logoutStatus,
        logoutError
    } = state.loginReducer;
    return {
        logoutStatus,
        logoutError
    }
};

export default withRouter(connect(mapStateToProps)(Header))
