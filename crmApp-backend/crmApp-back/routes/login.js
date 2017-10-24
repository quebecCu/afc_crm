var express = require('express');
var router = express.Router();
var app = express();
var client = require('../models/database');
//Load the bcrypt module
var bcrypt = require('bcrypt');


/* GET home page. */
router.post('/login', function(req, res) {

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
		else {
			console.log("else est faux");
			res.send({ 
				res: 'false'
			});
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
