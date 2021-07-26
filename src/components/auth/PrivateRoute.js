import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from '../../services/auth';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            isLoggedIn(roles)
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )}
    />
);

export default PrivateRoute;
