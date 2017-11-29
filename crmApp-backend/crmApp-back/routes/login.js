const express = require('express');
const router = express.Router();
const {hashSync , genSaltSync} = require ('bcryptjs');
const db = require('../models');
const squelb = require('squel');
const squel = squelb.useFlavour('postgres');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const expressJwtIp = require('express-jwt-ip');



/* GET home page. */
router.post('/login', expressJwtIp.ip(), function(req, res) {

	var usernameText = req.body.username;
	var mdpText = req.body.password;
	var certKey = 'aplsszjknbndsj';
	var _ip = res.locals.ip;

	db.multi(squel.select()
			.from('users."UTILISATEUR"')
			.field('login')
			.field('password')
			.field('idrole')
			.field('iduser')
			.where('login like ?', usernameText)
			.toString() + ";"+ squel.select()
			.from('users."ROLEADM"', "adm")
			.field('isAdmin')
			.field('description')
			.join('users."UTILISATEUR"', "util", "adm.idrole = util.idrole")
			.where("util.login='"+ usernameText + "'")
			.toString())
			.spread(function (user, userAdm) {
				 let isAdmin = userAdm[0].isadmin;

				if(user[0] !== undefined) {
					var loginRetrieved = user[0].login;
					var iduser = user[0].iduser;
					var mdpRetrieved = user[0].password;
					var idroleRetrieved = user[0].idrole;

					bcrypt.compare(mdpText, mdpRetrieved, function(err, ress) {
						// ress === true
						if(!!ress) {

							// create a token
						    var token = jwt.sign({ iduser: user[0].iduser,
						    					   idrole: idroleRetrieved,
						    					   ip: res.locals.ip}, certKey , { expiresIn: '8h'});

							res.send({
								status : 'success',
								message : {	cookie: token,
									isAdmin: isAdmin
								}
							});
						} else {
							console.log("Mot de passe saisi incorrect");

							res.send({
								status : 'error',
								message : 'L\'identification n\'a pas pu être réalisée'
							});
						}
					});
				} else {
					console.log('Le username ' +usernameText+ ' n\'existe pas')
					res.send({
						status : 'fail',
						message : 'Le login est incorrect'
					});
				}
			});

	console.log("end post /login");
});

router.post('/login/add', (req, res, next) => {
	var usernameText = req.body.username;
	var mdpText = req.body.password;

	let salt = genSaltSync (10);
	let hash = hashSync(mdpText, salt);
	console.log(hash);

	db.User.findCreateFind({where: {login: usernameText}, defaults: {password: hash}})
	.spread(function(user, created) {
		console.log(user.get({
			plain: true
		}));
		console.log(created);
		if (!created) {
			res.send({
				status : 'fail',
				message : 'Ce login n\'est pas disponible'
			});
		} else {
			res.send({
				status : 'success',
				message : null
			});
			/*security.addDefaultRights(user.login, 2, function() {
				    	res.send({
						status : 'success',
						message : null
					});
			    	});	*/
		}
	});
});

module.exports = router;
