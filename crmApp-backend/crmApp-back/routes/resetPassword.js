'use strict';

const CryptoJS = require("crypto-js");
const express = require('express');
const router = express.Router();
var db = require('../models');
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');


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
		//
		sendResponse("DEBUG|resetPassword|theTokenIsNotValid", res, "fail");
		return;
	}

	// Decrypt the password
	const decryptedPass = CryptoJS.AES.decrypt(newPwd, 'secretKey24680');
	const decryptedConf = CryptoJS.AES.decrypt(newPwdConf, 'secretKey24680');
	// Make the password into a encoded uft8 string
	const pwdText = decryptedPass.toString(CryptoJS.enc.Utf8);
	const pwdTextConf = decryptedConf.toString(CryptoJS.enc.Utf8);
	console.log(newPwd);
	// Check if the password match
	if (pwdText !== pwdTextConf) {
		sendResponse("DEBUG|resetPassword|passwordDoesn'tMatches", res, "fail");
		return;
	}

	// The password match, update the pwd in the database
	if (await !isTokenValid(req.body.resetToken)){
		db.multi(squel.select()
			.from('users."UTILISATEUR"')
			.field("resetpasswordexpires")
			.where("resetpasswordtoken = " + "'" + resetToken + "'")
			.toString())
			.spread(function (user) {
				let _userTime = user[0].resetpasswordexpires
				console.log("_checkChrono  " + _userTime)
				let _currentTime = Date.now();
				
				if( _currentTime < _userTime){
					
					let _updateBD = db.one(squel.update()
							.table('users."UTILISATEUR"')
							.set("password", newPwd)
							.where("resetpasswordtoken = " + "'" + resetToken + "'")
							.set("resetpasswordtoken", null)
							.set("resetpasswordexpires", null)
							.returning('*')
							.toString())
				}
			})

	sendResponse('DEBUG|resetPassword|passwordReset|STUB', res, 'success');
	}
	else {
		sendResponse("DEBUG|resetPassword|theTokenIsNotValid", res, "fail");
		return;
	}
});

/**
 * Check if the token exist and is still valid
 * @param resetToken
 * @returns {boolean}
 */
async function isTokenValid(resetToken) {
	console.log("test");
	db.multi(squel.select()
			.from('users."UTILISATEUR"')
			.field("resetpasswordexpires")
			.where("resetpasswordtoken = " + "'" + resetToken + "'")
			.toString())
			.spread(function (user) {
				console.log("valité  " + user[0].resetpasswordexpires);
				if(!user[0].resetpasswordexpires){
					console.log("FALSE");
					return false;
				}
				console.log("DEBUG|resetPassword|isTokenValid|STUB");
				return true;
			})
	 
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
