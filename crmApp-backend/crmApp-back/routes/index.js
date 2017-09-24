var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/test2', function(req, res) {

	console.log("Test backend");
	res.send({ 
		name : 'CRM First Application',
		title : 'welcome to the CRM team',
		version : '0.0',
		utilisateur : [{
			"id" : "1",
			"first_name": "aziz",
			"last_name": "zouaoui"
		} ]
	});
	console.log("sortie backend");
});

module.exports = router;
