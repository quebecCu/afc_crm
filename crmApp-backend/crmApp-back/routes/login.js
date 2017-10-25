var express = require('express');
var router = express.Router();
var app = express();
var client = require('../models/database');
//Load the bcrypt module
var {hashSync , genSaltSync} = require ('bcryptjs');
var db = require('../models');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var bcrypt = require ('bcryptjs');

/* GET home page. */
router.post('/login', function(req, res) {

	var query= ''
	var usernameText = req.body.username;	
	var encodedMdp = req.body.password;
	var decrypted=  CryptoJS.AES.decrypt(encodedMdp, 'secretKey13579');
	var mdpText = decrypted.toString(CryptoJS.enc.Utf8);
	 
	 db.User.findAll({
	        attributes: ['login', 'password'],
	 where: {
		    login: usernameText
		  }
	    }).then(function (users) {
				for (let  i=0; i < users.length; i++) {
	            	if (users[i].dataValues.login === usernameText){
						bcrypt.compare(users[i].dataValues.password, mdpText, function(err, ress) {
							// ress === true
							if(!!ress){
								/*var token = jwt.sign({ login: login, idrole: idrole}, 'aplsszjknbndsj', { expiresIn: '24h' });
								res.cookie('token', token, { maxAge: 900000, httpOnly: true });*/
								res.send({ 
									status : 'success',
									message : null
								});
							}
							else {
								console.log("else est faux");
								res.send({ 
									status : 'error',
									message : 'L\'identification n\'a pas pu être réalisée'
								});
							}
						});
					
						break;
					}

					else
					
					{
						console.log("Username n'existe pas")
						res.send({ 
							status : 'fail',
							message : 'Le login est incorrect'
						});
					}
				}
			});


	console.log("sortie backend");
});




router.post('/login/add', (req, res, next) => {
	var usernameText = req.body.username;
	console.log("username: ", usernameText);
	var mdpText = req.body.password;
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
			}
	  });
});

module.exports = router;
