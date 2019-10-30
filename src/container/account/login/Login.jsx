import React from 'react';
import $ from "jquery";
import {connect} from "react-redux";
import {Link, withRouter} from 'react-router-dom';
import './Login.css';
import {getCookie, setCookie, windowTitle} from "../../../actions/app";
import Input from "../../../components/app/input/Input";
import Button from "../../../components/app/button/Button";
import Alert from "../../../components/app/alert/Alert";
import {changeAuthantication, changeLoginForm, clearLoginApiResponse, login} from '../../../actions/account/login';

let thi = null;

class Login extends React.Component {
    componentDidMount() {
        $("html,body").animate({scrollTop: 0});
        thi = this;
        windowTitle("Honey Comb | Login");
        this.props.dispatch(changeLoginForm({
            ...this.props.loginForm,
            email: "",
            password: ""
        }));
        this.props.dispatch(clearLoginApiResponse());
        window.setTimeout(() => {
            document.getElementsByName("email")[0].focus();
        }, 250);
        const loginEmailCookie = getCookie("loginEmail");
        const loginPasswordCookie = getCookie("loginPassword");
        if (loginEmailCookie && loginPasswordCookie) {
            document.getElementById("checkbox").classList.toggle("checked");
            this.props.dispatch(changeLoginForm({
                ...this.props.loginForm,
                email: loginEmailCookie,
                password: loginPasswordCookie
            }));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.loginStatus === 200 &&
            !nextProps.loginError &&
            !!getCookie("token") &&
            !!getCookie("userId")) {
            nextProps.dispatch(changeAuthantication(true));
            nextProps.history.push("/dashboard");
        }
    }

    handleChange(e) {
        const target = e.target;
        this.props.dispatch(changeLoginForm({...this.props.loginForm, [target.name]: target.value}))
    }

    handleSubmit(e) {
        e.preventDefault();
        const validElms = document.querySelectorAll(".login-form .form-group input:valid");
        for (let i = 0; i < validElms.length; i++) {
            validElms[i].parentElement.classList.remove("has-error");
        }
        // handling all error and success message here...
        if (e.target.checkValidity()) {
            if (document.getElementById("checkbox").classList.contains("checked")) {
                setCookie('loginEmail', this.props.email, 1440);
                setCookie('loginPassword', this.props.password, 1440);
            } else {
                setCookie('loginEmail', '', 0);
                setCookie('loginPassword', '', 0);
            }
            // call the register api here...
            this.props.dispatch(login(this.props.loginForm))
        } else {
            const invalidElms = document.querySelectorAll(".login-form .form-group input:invalid");
            for (let i = 0; i < invalidElms.length; i++) {
                invalidElms[i].parentElement.classList.add("has-error");
            }
            const validElms = document.querySelectorAll(".login-form .form-group input:valid");
            for (let i = 0; i < validElms.length; i++) {
                validElms[i].parentElement.classList.remove("has-error");
            }
        }
    }

    rememberMe(e) {
        if (!this.props.loginPageLoading) {
            const target = e.target;
            document.getElementById("checkbox").classList.toggle("checked");
            if (target.checked) {
                setCookie('loginEmail', this.props.email, 1440);
                setCookie('loginPassword', this.props.password, 1440);
            } else {
                setCookie('loginEmail', '', 0);
                setCookie('loginPassword', '', 0)
            }
        }
    }

    closeAlert() {
        thi.props.dispatch(clearLoginApiResponse())
    }

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
                                <form className="login-form" onSubmit={this.handleSubmit.bind(this)}
                                      noValidate={true}>
                                    {
                                        this.props.loginError && this.props.loginMessage &&
                                        <Alert errorMessage={this.props.loginMessage}
                                               error={true}
                                               closeAlert={this.closeAlert}/>
                                    }
                                    <div className="form-group">
                                        <div className="icon"><img src={require("../../../images/profile_round.svg")}
                                                                   alt=""/></div>
                                        <Input type="email" className="form-control border-red"
                                            /* eslint-disable-next-line no-useless-escape */
                                               pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"}
                                               required={true}
                                               name="email"
                                               onChange={this.handleChange.bind(this)}
                                               value={this.props.loginForm.email}
                                               placeholder="User name/Email address"
                                               id="exampleInputEmail1"/>
                                        <p className="with-error">Please enter valid User Name/Email Address.</p>
                                    </div>
                                    <div className="form-group">
                                        <div className="icon"><img src={require("../../../images/padlock.png")} alt=""/>
                                        </div>

                                        <Input type="password" className="form-control"
                                               required={true}
                                               name="password"
                                               onChange={this.handleChange.bind(this)}
                                               value={this.props.loginForm.password}
                                               id="exampleInputPassword1"
                                               placeholder="Enter your password"/>
                                        <p className="with-error">Please enter valid Password.</p>
                                    </div>
                                    <div className="form-group custom-field">
                                        <label className="container1">Remember Me
                                            <input
                                                type="checkbox"
                                                className="form-check-input form-check-custom" id="terms"
                                                style={{display: "none"}}/><a
                                                onClick={this.rememberMe.bind(this)} id="checkbox" href="#"
                                                className=""/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <Link to="/forgot-password">Forgot password?</Link>

                                    </div>
                                    <Button type="submit"
                                            className={this.props.loginPageLoading ? "btn btn-primary btn-lg btn-block submit m-loader" : "btn btn-primary btn-lg btn-block submit btn-icon-right"}
                                            disabled={!!this.props.loginPageLoading}>
                                        <span>Login</span> <img className="arrow"
                                                                src={require("../../../images/btn_arrow.svg")}
                                                                alt={"arrow"}/>
                                    </Button>
                                    <div className="menmber text-center mt-4"><p>Don’t have account? <Link
                                        to={"/signup"}>Sign
                                        Up </Link>here.</p></div>
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
    const {auth, loginForm, loginPageLoading, loginStatus, loginError, loginMessage} = state.loginReducer;
    const {isAuthenticated} = auth;
    const {email, password} = loginForm;
    return {
        isAuthenticated,
        loginForm, email, password,
        loginPageLoading, loginStatus, loginError, loginMessage
    }
};


export default withRouter(connect(mapStateToProps)(Login))
