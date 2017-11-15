var express = require('express');
var router = express.Router();
var app = express();
var {hashSync , genSaltSync} = require ('bcryptjs');
var db = require('../models');
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var bcrypt = require ('bcryptjs');
var security = require ('../security/security');

/* GET home page. */
router.post('/login', function(req, res) {

	var usernameText = req.body.username;	
	var encodedMdp = req.body.password;
	var decrypted=  CryptoJS.AES.decrypt(encodedMdp, 'secretKey13579');
	var mdpText = decrypted.toString(CryptoJS.enc.Utf8);
	console.log("Starting query");
	var certKey = 'aplsszjknbndsj';
	
	db.multi(squel.select()
			.from('users."UTILISATEUR"')
			.field('login')
			.field('password')
			.where('login like ?', usernameText)
			.toString() + ";"+ squel.select()
			.from('users."ROLEADM"', "adm")
			.field('adm.idrole')
			.field('isAdmin')
			.field('description')
			.field('iduser')
			.join('users."UTILISATEUR"', "util", "adm.idrole = util.idrole")
			.where("util.login='"+ usernameText + "'")
			.toString())
			.spread(function (user, userAdm) {
				isAdmin = userAdm[0].isadmin;

				if(user[0] !== undefined) {
					var loginRetrieved = user[0].login;
					var iduser = user[0].iduser;
					var mdpRetrieved = user[0].password;
					var idroleRetrieved = user[0].idrole;

					bcrypt.compare(mdpText, mdpRetrieved, function(err, ress) {
						// ress === true
						if(!!ress) {
							token = jwt.sign({ iduser: iduser, idrole: idroleRetrieved}, certKey, { expiresIn: '24h'});
//							res.cookie('token', token, { maxAge: 900000, httpOnly: true });
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
	var encodedMdp = req.body.password;
	var decrypted=  CryptoJS.AES.decrypt(encodedMdp, 'secretKey13579');
	var mdpText = decrypted.toString(CryptoJS.enc.Utf8);

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
