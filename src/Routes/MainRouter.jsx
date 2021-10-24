import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { SignIn } from '../Components/Signning/SignIn';
import { DashboardWHTP } from '../Components/MarcoGeneral/DashboardWHTP';
import { NotFound } from '../Components/MarcoGeneral/NotFound';

export const MainRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signin" component={SignIn}/>
                <PublicRoute exact path={'/'} component={DashboardWHTP}/>
                <PublicRoute path={'/*'} component={NotFound}/>
                
            </Switch>
        </Router>
    )
}