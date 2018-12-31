import React from 'react';
import { getBaseUrl, setUserName } from './common';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    login() {
        if (this.state.username && this.state.password) {
            fetch(getBaseUrl() + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    password: this.state.password
                })
            })
                .then(result => result.json())
                .then(body => {
                    if (body.isValid) {
                        setUserName(this.state.username);
                        this.props.history.replace('/home');
                    } else {
                        this.setState({
                            error: body.error
                        });
                    }
                });
        } else {
            let errorObj = {};
            if (!this.state.username) {
                errorObj = {
                    username: 'User Name is Required'
                };
            }
            if (!this.state.password) {
                errorObj = {
                    ...errorObj,
                    password: 'Password is Required'
                };
            }

            if (JSON.stringify(errorObj) !== '{}') {
                this.setState({
                    error: errorObj
                });
            }
        }
    }

    signup() {
        this.props.history.replace('/register');
    }

    removeError() {
        if (this.state.error && JSON.stringify(this.state.error) !== '{}') {
            this.setState({
                error: {}
            });
        }
    }

    render() {
        return <div className="row row-login-margin">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                <div className="welcome-header">
                    <h2>Welcome Back !</h2>
                </div>
                <div className="login-form">
                    <span className="error-class">
                        {this.state.error.apiFailure}
                    </span>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onFocus={this.removeError}
                            onChange={this.handleChange}
                        />
                        <span
                            className="error-class"
                        >
                            {this.state.error.username}
                        </span>
                    </div>
                    <div className="inputs">
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={this.state.password}
                            onFocus={this.removeError}
                            onChange={this.handleChange}
                        />
                        <span
                            className="error-class"
                        >
                            {this.state.error.password}
                        </span>
                    </div>
                    <button onClick={this.login}>login</button>
                </div>
                <div className="content-below-form">
                    <span className="pull-right">Don't have account ?
                    <a className="hand-cursor color-white" onClick={this.signup}> Get Started</a>
                    </span>
                </div>
            </div>
            <div className="col-lg-3"></div>
        </div>;
    }
}