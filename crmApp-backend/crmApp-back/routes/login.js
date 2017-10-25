var express = require('express');
var router = express.Router();
var app = express();
var client = require('../models/database');
//Load the bcrypt module
var {hashSync , genSaltSync} = require ('bcryptjs');
var db = require('../models');


/* GET home page. */
router.post('/login', function(req, res) {

	var query= ''
	var usernameText = req.body.username;	
	var mdpText = req.body.password;
	db.sequelize.query('SELECT * FROM users."UTILISATEUR"',
			{ 
		type: db.sequelize.QueryTypes.SELECT
			}).then(function (results) {
				for (var i=0; i < results.length; i++) {
					if (results[i].login === usernameText){
						bcrypt.compare(results[i].password, mdpText, function(err, ress) {
							// ress === true
							if(!!ress){
								res.send({ 
									res: 'true',
								});
							}
							else {
								console.log("else est faux");
								res.send({ 
									res: 'false'
								});
							}
						});
					
						break;
					}

					else
					
					{
						console.log("Username n'existe pas")
						res.send({ 
							res: 'false'
						});
					}
				}
			});


	console.log("sortie backend");
});

/*router.post('/login/v2', (req, res, next) => {
	var usernameText = req.body.username;
	console.log("username: ", usernameText);
	var mdpText = req.body.password;
	console.log("password recu hashed: ", mdpText);
	
	bcrypt.compare("aziz", mdpText, function(err, ress) {
	    // ress === true
		if(!!ress){
			res.send({ 
				name : 'CRM First Application',
				title : 'welcome to the CRM App',
				res: 'true',
				utilisateur : [{
					"id" : "1",
					"first_name": "aziz",
					"last_name": "zouaoui"
				} ]
			});
		}
			
	});
	
	console.log("sortie backend");
	const results = [];
    console.log("Woow");
    client.query('SELECT * FROM public."UTILISATEUR" ORDER BY iduser ASC;')
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));
});*/

/*var jwt = require('jsonwebtoken');
var token = jwt.sign({ login: login, idrole: idrole}, 'aplsszjknbndsj', { expiresIn: '24h' });
res.cookie('token', token, { maxAge: 900000, httpOnly: true });*/

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
