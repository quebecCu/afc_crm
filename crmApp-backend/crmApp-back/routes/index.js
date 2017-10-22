var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');

/* GET home page. */
router.get('/test2', function(req, res) {

	console.log("Test backend");
    db.sequelize.query('SELECT * FROM public."PERSONNE"',
        {
            type: db.sequelize.QueryTypes.SELECT
        }).then(function (results) {
        console.log(results);
    });
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
