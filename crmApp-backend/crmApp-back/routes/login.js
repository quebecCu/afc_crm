var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var {hashSync , genSaltSync} = require ('bcryptjs');
var db = require('../models');
var squel = require ('squel');
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
	db.query(squel.select()
		.from('users."UTILISATEUR"')
        .field('login', 'password', 'idrole')
		.where('login like ?', usernameText)
		.toString())
		.then(function (user) {
			if(user[0] !== undefined) {
				var loginRetrieved = user.login;
				var mdpRetrieved = user.password;
				var idroleRetrieved = user.idrole;

					bcrypt.compare(mdpText, mdpRetrieved, function(err, ress) {

						// ress === true
						if(!!ress) {
							var token = jwt.sign({ login: loginRetrieved, idrole: idroleRetrieved}, 'aplsszjknbndsj', { expiresIn: '24h'});
							res.cookie('token', token, { maxAge: 900000, httpOnly: true });
							res.send({ 
								status : 'success',
								message : null
							});
						} else {
							console.log("Mot de passe saisi incorrect");
							res.send({ 
								status : 'error',
								message : 'L\'identification n\'a pas pu être réalisée'
							});
						}
					});
					//A modifier. Je le laisse pour le debugg
				} else {
					console.log("Username n'existe pas")
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
	console.log("username: ", usernameText);
	var encodedMdp = req.body.password;
	var decrypted=  CryptoJS.AES.decrypt(encodedMdp, 'secretKey13579');
	var mdpText = decrypted.toString(CryptoJS.enc.Utf8);
    console.log("encrypted password: ", mdpText);
	
	/*var mail = req.body.mail;
	console.log("mail: ", mail);
	var idrole = req.body.idrole;
	console.log("idrole: ", idrole);*/

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
