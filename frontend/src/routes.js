import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Alert from './pages/alert/alert';
import Login from './pages/dashboard/login';
import Dashboard from './pages/dashboard/dashboard';
import newAlert from './pages/dashboard/newAlert';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
);

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Alert} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/dashboard/newAlert" exact component={newAlert} />
                <Route path="*" component={() => <div className="App">Página não existe!</div>} />
            </Switch>
        </BrowserRouter>
    );
}