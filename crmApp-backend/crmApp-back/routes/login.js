var express = require('express');
var router = express.Router();
var app = express();
var client = require('../models/database');
//Load the bcrypt module
var bcrypt = require('bcrypt');
var db = require('../models');


/* GET home page. */
router.post('/login', function(req, res) {

	var query= ''
	var usernameText = req.body.username;	
	var mdpText = req.body.password;
	 db.User.findAll({
	        attributes: ['login', 'password'],
	 where: {
		    login: usernameText
		  }
	    }).then(function (users) {
	    	
				for (let  i=0; i < users.length; i++) {
	            	if (users[i].dataValues.login === usernameText){

						bcrypt.compare(users[i].password, mdpText, function(err, ress) {
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

router.post('/login/add', (req, res, next) => {
	var usernameText = req.body.username;
	console.log("username: ", usernameText);
	var mdpText = req.body.password;
	console.log("password recu hashed: ", mdpText);
	
	let salt = bcrypt.genSaltSync(2);
	console.log("lolillol");
	let hash = bcrypt.hashSync(password, salt);
	console.log("lolillol");
    client.query('INSERT INTO public."UTILISATEURS" VALUES (DEFAULT, ' + usernameText + ', ' + hash + ', 0);')
    .then(respg => res.send({ 
		name : 'CRM First Application',
		title : 'welcome to the CRM App',
		res: 'true',
		utilisateur : [{
			"id" : respg.rows[0].iduser,
			"first_name": respg.rows[0].login,
			"last_name": respg.rows[0].password
		} ]
	}))
    .catch(e => console.error(e.stack));
});

module.exports = router;
