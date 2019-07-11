import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => {
    return (
        <Route render={props => (
            authenticated
            ? <Component {...rest} {...props} />
            : <Redirect to="/login" />
        )}/>
    )
}


export default PrivateRoute;