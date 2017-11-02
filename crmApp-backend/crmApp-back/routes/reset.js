var express = require('express');
var router = express.Router();
var app = express();
var nodemailer = require('nodemailer');
var db = require('../models');
var crypto = require('crypto');
var squel = require('squel');

/* GET Email reset logic && send email. */
router.post('/reset', function(req, res) {

	var emailReceived = req.body.email;
	var _token = Math.random().toString(36).slice(2);
	var chrono = Date.now() + 3600000;
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: false,
		auth: {
			user: 'crm.udes@gmail.com', 
			pass: 'CrmUdes2017'  
		},
		tls: {
			rejectUnauthorized: false

		}
	}); 
	var mailOptions = {
			from: 'crm.udes@gmail.com',
			to: emailReceived,
			subject: 'Récuperation de mot de passe oublié',
			text: 'Voici votre mot de passe oublié:\n\n  http://localhost:3000/Reset/' + _token + '\n\nÉquipe CRM',
	};
	db.query(
			squel.select()
			.from('users."UTILISATEUR" AS u')
			.field('iduser')
			.field('login')
			.field('password')
			.field('idrole')
			.field('mail')
			.field('name')
			.field('resetpasswordtoken')
			.field('resetpasswordexpires')
			.where('u.mail like ?', emailReceived)
			.toString())
			.then(function (user) {

				var resetPasswordToken = user[0].resetpasswordtoken;
				console.log("reset password token from " + user[0].mail +" is " + resetPasswordToken );
				if(!user[0]) {
					res.send({
						status : 'fail',
						message : 'Le courriel est incorrect'
					});
				} else {

					transporter.sendMail(mailOptions, function(error, info){
						if (error) {
							console.log('erreur du courriel   ' +error);
						} else {
							console.log('Email sent: ' + info.response);
						}
					});

					_updateFunction(_token, chrono);
					res.send({
						resetPasswordToken : _token,
						resetPasswordExpires : Date.now() + 3600000,
						status : 'success'
					});
				}
			});

	function _updateFunction (_token, chrono) {

		console.log("Trying to resetpasswordtoken " + _token);

		db.query(
				squel.update()
				.table('users."UTILISATEUR"')
				.set('resetpasswordtoken', _token)
				.set('resetpasswordexpires', chrono)
				.where('mail like ?', emailReceived)
				.toString())
				.then()
				.catch(e => {
					console.error('query error', e.message, e.stack)
				})
	}
});

module.exports = router;
