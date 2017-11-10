'use strict';

const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const db = require('../models');

/**
 * Route serving password reset
 * @method POST
 * @URL /ResetPassword
 * @DataParams { newPassword: [string], confirmPassword: [string], token: [string] }
 * @SuccessResponse { status: 'success', message: [string]}
 * @ErrorResponse { status: 'fail', message: [string] }
 * **/
router.post('/ResetPassword', function (req, res) {

	const newPwd = req.body.newPassword;
	const newPwdConf = req.body.confirmPassword;
	const resetToken = req.body.resetToken;

	// Make a few check before working on the request

	// Check all the params are NOT undefined
	if (!(!!newPwd && !!newPwdConf && !!resetToken)) {
		sendResponse(res, "fail", "DEBUG|resetPassword|atLeastOneParamIsUndefined");
		return;
	}

	// Check if the token is NOT valid
	if (!isTokenValid(req.body.resetToken)) {
		sendResponse(res, "fail", "DEBUG|resetPassword|theTokenIsNotValid");
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
		sendResponse(res, "fail", "DEBUG|resetPassword|passwordDoesn'tMatches");
		return;
	}

	// The password match, update the pwd in the database

	// True code
	// TODO: Call the database and update the password of the user

	// sendResponse(res, 'success', 'DEBUG|resetPassword|passwordReset|STUB');

	// STUB
	// This is a STUB, remove when the request is working
	console.log('DEBUG|resetPassword|passwordMatch|STUB');

	sendResponse(res, 'success', 'DEBUG|resetPassword|passwordReset|STUB');
});

/**
 * Check if the token exist and is still valid
 * @param resetToken
 * @returns {boolean}
 */
async function isTokenValid(resetToken) {
	// True code
	// TODO: Make a request for the database
	// return someting;

	// STUB
	// This is a STUB, remove when the request is working. This STUB always return true
	console.log("DEBUG|resetPassword|isTokenValid|STUB");
	return true;
}

/**
 * Send a response to the POST
 * @param response
 * @param status
 * @param message
 */
function sendResponse(response, status, message) {
	response.send({
		status: status,
		message: message
	});
}

module.exports = router;
