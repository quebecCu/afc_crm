var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var bcrypt = require('bcrypt');
var db = require('../models');

/* GET home page. */
router.post('/getCustomerGrid', function(req, res) {

	//var query= '';
	res.send({grid: [
		{key: '1', label: 'nomEntreprise', nom: "Nom de l'entreprise ", value: ''},
		{key: '2', label: 'date', nom: "Date ", value: ''},
		{key: '3', label: 'nombreEmployes', nom: "Nombre d'employés ", value: ''},
		{key: '4', label: 'rue', nom: "Rue ", value: ''},
		{key: '5', label: 'ville', nom: "Ville ", value: ''},
		{key: '6', label: 'province', nom: "Province ", value: ''},
		{key: '7', label: 'codePostal', nom: "Code postal ", value: ''},
		{key: '8', label: 'tel', nom: "Numéro de téléphone ", value: ''},
		{key: '9', label: 'extension', nom: "Extension ", value: ''},
		{key: '10', label: 'secteur', nom: "Secteur d'activité ", value: ''},
		{key: '11', label: 'division', nom: "Division (sous-groupe) ", value: ''},
		{key: '12', label: 'chambre', nom: "Chambre de commerce ", value: ''},
		{key: '13', label: 'aga', nom: "AGA ", value: ''},
		{key: '14', label: 'rver', nom: "RVER ", value: ''}
	]});


	console.log("end post /getCustomerGrid");
});

router.post('/createCustomer', function(req, res) {

	var customerFile={
		grid: req.body.grid,
		layout: req.body.layout

	};
	console.log(customerFile);

	res.status(200);
	res.send({
		status : 'success',
		message : null
	});
	//var query= '';


	console.log("end post /createCustomer");
});

module.exports = router;
