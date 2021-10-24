//public route component for react project
import React from 'react';
import { Route } from 'react-router';

export const PublicRoute = ({...rest}) => {
    return (
        <Route {...rest} />
    );
};
