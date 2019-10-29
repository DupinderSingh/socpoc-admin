import React from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from 'react-router-dom';
import './Login.css';

let thi = null;

class Login extends React.Component {
    render() {
        return (
            <section className="login">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12 content">
                            <div className="form-content">
                                <div className="alert alert-success success">
                                    <strong>Success!</strong> Indicates a successful or positive action.
                                </div>
                                <h2>Hello! let's get started</h2>
                                <p>Enter your details below.</p>
                                <form className="login-form">
                                    <div className="form-group">
                                        <div className="icon"><img src={require("../../../images/profile_round.svg")}
                                                                   alt=""/></div>
                                        <input type="email" className="form-control border-red"
                                               placeholder="User name/Email address" id="exampleInputEmail1"/>
                                        <span className="error_msg" id="error">This field is required</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="icon"><img src={require("../../../images/padlock.png")} alt=""/>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password"
                                               id="exampleInputPassword1"/>
                                    </div>
                                    <div className="form-group custom-field">
                                        <label className="container1">Remember Me
                                            <input type="checkbox" checked="checked"/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <div className="forgot"><a href="forgot.html">Forgot Password?</a></div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block submit">LOGIN
                                    </button>
                                    <div className="menmber text-center mt-4"><p>Don’t have account? <Link to={"/signup"}>Sign Up </Link>here.</p></div>
                                </form>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-6 col-12 p-0 outer">
                            <div className="overlay">
                                <div className="logo text-center mb-4"><img src={require("../../../images/logo.svg")}
                                                                            alt=""/></div>
                                <h2>Welcome to<br/><span> Socpoc Admin</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

const mapStateToProps = (state) => {
    return {state}
};


export default withRouter(connect(mapStateToProps)(Login))
