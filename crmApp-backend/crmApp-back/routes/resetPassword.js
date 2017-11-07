'use strict';

const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");

/* GET Email reset logic && send email. */
router.post('/ResetPassword', function (req, res) {

    let newPasswordReceived = req.body.newPassword;
    let confirmPasswordReceived = req.body.confirmPassword;

    let decryptedPass = CryptoJS.AES.decrypt(newPasswordReceived, 'secretKey24680');
    let decryptedConf = CryptoJS.AES.decrypt(confirmPasswordReceived, 'secretKey24680');

    let mdpText = decryptedPass.toString(CryptoJS.enc.Utf8);
    let mdpTextConf = decryptedConf.toString(CryptoJS.enc.Utf8);

    if (mdpText === mdpTextConf && mdpText.length === mdpTextConf.length) {

        console.log("mdpText :", mdpText);
        console.log("mdpTextConf : ", mdpTextConf);

        res.send({
            status : 'fail',
            message : "DEBUG|resetPassword"
        });

    } else {
        console.log("Les deux mots de passe saisis ne se correspondent pas");

        res.send({
            status : 'fail',
            message : "DEBUG|resetPassword"
        });

        //	gestion derreurs
    }

});

module.exports = router;
