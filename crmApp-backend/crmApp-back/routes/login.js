var express = require('express');
var router = express.Router();
var app = express();

var database = require('../database.js');
/* GET home page. */
router.post('/login', function(req, res) {

	console.log("Test backend");
	console.log("Nom d'utilisateur", req.body.username); 
	
//	User.findAll().then(users => {
//		  console.log(users)
//		})
//	
	var usernameText = req.body.username;
	console.log(usernameText);
	var mdpText = req.body.password;
	var test2 = "aziz";
	var test4= "aziz";
	
//	User.findAll().then(users => {
//		  console.log(users)
//		})
//	
////	remplacer la condition par le test avec la BD	
//	if(usernameFront.length)
//		
//	
	
	if( (usernameText === test2)  && (mdpText === test4) ){
		console.log("Condition reussie pour cet utilisateur", req.body.username); 
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

	console.log("sortie backend");
});

module.exports = router;
