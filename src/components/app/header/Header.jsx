import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header className="l-header">
                <div className="l-header__inner clearfix">
                    <div className="c-header-icon js-hamburger">
                        <div className="hamburger-toggle"><span className="bar-top"></span><span
                            className="bar-mid"></span><span className="bar-bot"></span></div>
                    </div>
                    <div className="c-search">
                        <span className="serch-icon"><i className="fas fa-search"></i></span><input
                        className="c-search__input u-input" placeholder="Search..." type="text"/>
                    </div>
                    <div className="header-icons-group">
                        <div className="c-header-icon basket"><span
                            className="c-badge c-badge--header-icon animated shake"></span><i
                            className="fa fa-bell"></i></div>
                        <div className="logout">
                            <ul className="profile-wrapper">
                                <li className="dropdown">
                                    <div className="profile">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                                           aria-expanded="false"><img src={require("../../../images/pro.png")}/>Allef
                                            Vinicius <b
                                                className="caret"></b></a>
                                        <ul className="menu dropdown-menu" x-placement="bottom-start"
                                            style={{
                                                position: "absolute",
                                                transform: "translate3d(0px, 23px, 0px)",
                                                top: "0px",
                                                left: "0px",
                                                willChange: "transform"
                                            }}>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Change Password</a></li>
                                            <li><a href="#">Log out</a></li>
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
    return {state}
};

export default withRouter(connect(mapStateToProps)(Header))
