'use strict';

const CryptoJS = require("crypto-js");
const db = require('../models');
const express = require('express');
const router = express.Router();

/**
 * Route serving password reset
 * @method POST
 * @URL /ResetPassword
 * @DataParams { newPassword: [string], confirmPassword: [string], token: [string] }
 * @SuccessResponse { status: 'success', message: [string]}
 * @ErrorResponse { status: 'fail', message: [string] }
 * **/
router.post('/ResetPassword', async function (req, res) {

	const newPwd = req.body.newPassword;
	const newPwdConf = req.body.confirmPassword;
	const resetToken = req.body.resetToken;

	// Check all the params are NOT undefined
	if (!(!!newPwd && !!newPwdConf && !!resetToken)) {
		sendResponse("DEBUG|resetPassword|atLeastOneParamIsUndefined", res, "fail");
		return;
	}

	// Check if the token is NOT valid
	if (await !isTokenValid(req.body.resetToken)) {
		sendResponse("DEBUG|resetPassword|theTokenIsNotValid", res, "fail");
		return;
	}

	// Decrypt the password
	const decryptedPass = CryptoJS.AES.decrypt(newPwd, 'secretKey24680');
	const decryptedConf = CryptoJS.AES.decrypt(newPwdConf, 'secretKey24680');

	// Make the password into a encoded uft8 string
	const pwdText = decryptedPass.toString(CryptoJS.enc.Utf8);
	const pwdTextConf = decryptedConf.toString(CryptoJS.enc.Utf8);

	// Check if the password match
	if (pwdText !== pwdTextConf) {
		sendResponse("DEBUG|resetPassword|passwordDoesn'tMatches", res, "fail");
		return;
	}

	// The password match, update the pwd in the database

	// True code
	// TODO: Call the database and update the password of the user

	// sendResponse(res, 'success', 'DEBUG|resetPassword|passwordReset|STUB');

	// STUB
	// This is a STUB, remove when the request is working
	console.log('DEBUG|resetPassword|passwordMatch|STUB');

	sendResponse('DEBUG|resetPassword|passwordReset|STUB', res, 'success');
});

/**
 * Check if the token exist and is still valid
 * @param resetToken
 * @returns {boolean}
 */
async function isTokenValid(resetToken) {
	// True code
	// TODO: Make a request for the database
	// return aPromise;

	// STUB
	// This is a STUB, remove when the request is working. This STUB always return true
	console.log("DEBUG|resetPassword|isTokenValid|STUB");
	return true;
}

/**
 * Send a response to the POST
 * @param message
 * @param response
 * @param status
 */
function sendResponse(message, response, status) {
	response.send({
		status: status,
		message: message
	});
}

module.exports = router;
