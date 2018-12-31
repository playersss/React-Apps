import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login';
import Home from './Home';

import './index.css';
import Register from './Register';

const Layout = () => {
    return <div className="container-fluid">
        <Router>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
            </Switch>
        </Router>
    </div>;
}

export default Layout;