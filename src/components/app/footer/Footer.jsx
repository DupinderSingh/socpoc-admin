import React from "react";
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Footer.css';
// import {logout} from "../../../actions/account/login";
import {getCookie} from "../../../actions/app";

class Footer extends React.Component {
    render() {
        const {isAuthenticated, isFirstTimeRegister} = this.props;
        return (
            <footer><p>Copyright © 2019 All Rights Reserved.</p></footer>
        )
    }
}

const mapStateToProps = (state) => {
    return {state}
};

export default withRouter(connect(mapStateToProps)(Footer))
