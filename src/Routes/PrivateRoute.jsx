//a private route that checks if the user is logged in
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ ...rest }) => {

    const role = 'seller';

    return (
        <>
            {(role === "admin") ? <Route {...rest} /> : <Redirect to='/login' />};
        </>
    );
}
