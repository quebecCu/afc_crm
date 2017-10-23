var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');

/* GET home page. */
router.get('/test2', function(req, res) {

	console.log("Test backend");
    /*db.sequelize.query('SELECT * FROM public."PERSONNE"',
        {
            type: db.sequelize.QueryTypes.SELECT
        }).then(function (results) {
        console.log(results);
    });*/
    db.User.findAll({
        attributes: ['idpersonne', 'nom', 'prenom']
	}).then(users => {
		//console.log(users);
        console.log("nom: " + users[0].dataValues.nom);
        console.log("prenom: " + users[0].dataValues.prenom);
    })
	res.send({
		name : 'CRM First Application',
		title : 'welcome to the CRM team',
		version : '0.0',
		utilisateur : [{}]
	});
	console.log("sortie backend");
});

module.exports = router;
