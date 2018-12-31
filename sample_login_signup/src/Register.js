import React from 'react';
import { getBaseUrl, setUserName } from './common';

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            cnfrmPassword: "",
            error: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    signup() {
        if (this.state.username && this.state.password && this.state.cnfrmPassword &&
            this.state.password === this.state.cnfrmPassword) {

            fetch(getBaseUrl() + '/register', {
                method: "POST",
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
            if (!this.state.cnfrmPassword) {
                errorObj = {
                    ...errorObj,
                    cnfrmPassword: 'Confirm Password is Required'
                };
            }

            if (this.state.password && this.state.cnfrmPassword && this.state.password !== this.state.cnfrmPassword) {
                errorObj = {
                    ...errorObj,
                    passwordMatch: "Password & Confirm Password doesn't match"
                };
            }

            if (JSON.stringify(errorObj) !== '{}') {
                this.setState({
                    error: errorObj
                });
            }
        }
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
                    <h2>Register</h2>
                    <div className="login-form">
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
                                placeholder="Password"
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
                        <div className="inputs">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="cnfrmPassword"
                                value={this.state.cnfrmPassword}
                                onFocus={this.removeError}
                                onChange={this.handleChange}
                            />
                            <span
                                className="error-class"
                            >
                                {this.state.error.cnfrmPassword}
                                {this.state.error.passwordMatch}
                            </span>
                        </div>
                        <button onClick={this.signup}>signup</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-3"></div>
        </div>;
    }
}