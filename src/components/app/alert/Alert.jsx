import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Alert.css';

class Alert extends Component {
    render() {
        const {error, errorMessage, closeAlert} = this.props;
        return (
            <div
                className={error ? "alert alert-danger-outline alert-dismissible alert_icon fade show" : "alert alert-success-outline alert-dismissible alert_icon fade show"}
                role="alert">
                <div className="d-flex align-items-center">
                    <div className="alert-icon-col">
                        <span className="fa fa-warning"></span>
                    </div>
                    <div className="alert_text">
                        {errorMessage}
                    </div>
                    <a href={"#/"} className="close alert_close" data-dismiss="alert"
                       aria-label="close"><i onClick={closeAlert.bind(this)} className="fa fa-close"></i></a>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null)(Alert))
