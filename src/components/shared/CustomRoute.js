import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { store } from "../../store";
import { take, fork, put } from 'redux-saga/effects';
import {
	LOGIN_REQUEST, SENDING_REQUEST, CLEAR_SESSION, LOGOUT, SET_AUTH, login, LOGIN, logout
} from '../../actions/crmLogin';
import { changeLoadingLogin } from "../../actions/crmDashboard";

import { changeLoading } from "../../actions/crmDashboard";

import {
	GET_DEFAULTPERMS, GET_OPERATIONS, SUBMIT_USER, GET_ROLES, UPDATE_USER,
	updateDefaultPerms, updateOperations, updateRoles,
} from '../../actions/crmCreateUser';

import {
	GET_LIST_USERS, REQUEST_USER_BY_ID, DELETE_USER, updateUsers, updateUserToDisplay, getListUser
} from '../../actions/crmUserManagement';

import axios from 'axios';



function checkAuthRouter() {
	return localStorage.getItem('cookieSession');
}


/*Only logged in user can acess this route, or they are redirected to '/login' */
export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		//Si l'utilisateur est connecté rester
		checkAuthRouter() ? (
			<Component {...props} />
		) : (
				//Sinon redirection vers la racine
				<Redirect to="/" />
			)
	)} />
);

/*Only not logged in user can acess this route, or they are redirected to '/' */
export const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		// Si l'utilisateur n'Est pas connecté :
		!checkAuthRouter() ? (
			<Component {...props} />
		) : (
				<Redirect to="/dashboard" />
			)
	)} />
);
