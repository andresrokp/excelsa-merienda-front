import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { LogIn } from '../Components/Authentication/LogIn';
import { SignUp } from '../Components/Authentication/SignUp';
import { DashboardWHTP } from '../Components/MarcoGeneral/DashboardWHTP';
import { NotFound } from '../Components/MarcoGeneral/NotFound';
import { LayoutAuth } from '../Components/Authentication/LayoutAuth';

export const MainRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LayoutAuth>
                        <LogIn/>
                    </LayoutAuth>
                </Route>
                <Route path="/signup">
                    <LayoutAuth>
                        <SignUp/>
                    </LayoutAuth>
                </Route>
                <PrivateRoute exact path={'/'} component={DashboardWHTP}/>
                <PublicRoute path={'/:id/*'} component={DashboardWHTP}/>
                <PublicRoute path={'/*'} component={NotFound}/>
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}