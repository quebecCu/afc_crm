import React from 'react';
import {store} from "../store";
import {Redirect, Route} from "react-router-dom";


function checkAuthRouter() {
    let { loggedIn } = store.getState().crmLogin;
    //loggedIn =  true;
    return loggedIn
}


/*Only logged in user can acess this route, or they are redirected to '/login' */
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuthRouter() ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/"/>
        )
    )}/>
);


/*Only not logged in user can acess this route, or they are redirected to '/' */
export const PublicOnlyRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !checkAuthRouter() ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/"/>
        )
    )}/>
);
