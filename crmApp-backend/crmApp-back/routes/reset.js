var express = require('express');
var router = express.Router();
var app = express();


/* GET Email reset logic && send email. */
router.post('/reset', function(req, res) {

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
});

module.exports = router;
