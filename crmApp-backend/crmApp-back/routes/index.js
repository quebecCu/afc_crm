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
    db.Person.findAll({
        attributes: ['idpersonne', 'nom', 'prenom']
	}).then(person => {
        console.log("nom: " + person[0].dataValues.nom);
        console.log("prenom: " + person[0].dataValues.prenom);
    });
    db.User.findAll({
        attributes: ['iduser', 'login', 'password']
    }).then(users => {
		for(let i = 0; i < users.length; i++)
		{
            console.log("nom: " + users[i].dataValues.login);
            console.log("prenom: " + users[i].dataValues.password);
		}
    });
	res.send({
		name : 'CRM First Application',
		title : 'welcome to the CRM team',
		version : '0.0',
		utilisateur : [{}]
	});
	console.log("sortie backend");
});

module.exports = router;
