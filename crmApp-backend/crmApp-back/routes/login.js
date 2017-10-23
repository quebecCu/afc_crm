var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var bcrypt = require('bcrypt');
var db = require('../models');


/* GET home page. */
router.post('/login', function(req, res) {

	var query= ''
	var usernameText = req.body.username;	
	var mdpText = req.body.password;
	db.sequelize.query('SELECT * FROM "UTILISATEUR"',
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

module.exports = router;
