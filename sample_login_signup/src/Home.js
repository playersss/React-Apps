import React from 'react';
import { getBaseUrl, getUserName, setUserName } from './common';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            userDetails: {}
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (getUserName()) {

            fetch(getBaseUrl() + '/home?username=' + getUserName())
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        userDetails: result
                    });
                });
        } else {
            this.props.history.replace('/');
        }
    }

    logout() {
        setUserName('');
        this.props.history.replace('/');
    }

    render() {
        return <div className="row row-login-margin">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                <div className="welcome-header">
                    <h2>Welcome To Test Website !</h2>
                </div>
                <div className="login-form">
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            defaultValue={this.state.userDetails.userName}
                        />
                    </div>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="password"
                            name="password"
                            defaultValue={this.state.userDetails.password}
                        />
                    </div>
                    <button onClick={this.logout}>logout</button>
                </div>
            </div>
            <div className="col-lg-3"></div>
        </div>;
    }
}