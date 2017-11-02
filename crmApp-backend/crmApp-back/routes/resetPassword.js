var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');
var crypto = require('crypto');
var {hashSync , genSaltSync} = require ('bcryptjs');
var db = require('../models');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var bcrypt = require ('bcryptjs');
var security = require ('../security/security');

/* GET Email reset logic && send email. */



router.post('/ResetPassword', function(req, res) {

	var newPasswordReceived = req.body.newPassword;
	var confirmPasswordReceived = req.body.confirmPassword;

	var decryptedPass=  CryptoJS.AES.decrypt(newPasswordReceived, 'secretKey24680');
	var decryptedConf=  CryptoJS.AES.decrypt(confirmPasswordReceived, 'secretKey24680');

	var mdpText = decryptedPass.toString(CryptoJS.enc.Utf8);
	var mdpTextConf = decryptedConf.toString(CryptoJS.enc.Utf8);

if(mdpText === mdpTextConf && mdpText.length === mdpTextConf.length ) {
	
	console.log("mdpText :" ,mdpText)

	console.log("mdpTextConf : " ,mdpTextConf)
	
} else {
	console.log("Les deux mots de passe saisis ne se correspondent pas")

//	gestion derreurs
}

});

module.exports = router;
