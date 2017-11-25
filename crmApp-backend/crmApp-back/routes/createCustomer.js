var express = require('express');
var router = express.Router();
var app = express();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
var security = require('../security/security');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');

let getStatementSendingModes = () =>
squel.select()
.from('public."RELEVE"')
.field("idreleve")
.field("modeenvoiereleve")
.toString();

let getChambersOfCommerce = () =>
squel.select()
.from('public."CHAMBRE_COMMERCE"')
.field("idchambrecommerce")
.field("libellechambrecommerce")
.toString();

let getActivities = () =>
squel.select()
.from('public."ACTIVITE"')
.field("idactivite")
.field("libelleactivite")
.toString();

let getProvenances = () =>
squel.select()
.from('public."PROVENANCE"')
.field("idprovenance")
.field("libelleprovenance")
.toString();

let getStates = () =>
squel.select()
.from('public."ETAT"')
.field("idetat")
.field("libelleetat")
.toString();

router.get('/statementSendingModes', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /statementSendingModes');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getStatementSendingModes())
			.then((methods) => {
				console.log(JSON.stringify(methods));
				res.send({
					status: 'success',
					message: methods
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les modes d'envoi des relevés n\'ont pas pu être récupérés'
				});
			})
	//}
});

router.get('/chambers', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /chambers');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getChambersOfCommerce())
			.then((chambers) => {
				console.log(JSON.stringify(chambers));
				res.send({
					status: 'success',
					message: chambers
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les chambres de commerce disponibles n\'ont pas pu être récupérées'
				});
			})
	//}
});

router.get('/activities', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /chambers');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getActivities())
			.then((activities) => {
				console.log(JSON.stringify(activities));
				res.send({
					status: 'success',
					message: activities
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les activités disponibles n\'ont pas pu être récupérées'
				});
			})
	//}
});

router.get('/states', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /states');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getStates())
			.then((states) => {
				console.log(JSON.stringify(states));
				res.send({
					status: 'success',
					message: states
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les activités disponibles n\'ont pas pu être récupérées'
				});
			})
	//}
});

router.get('/provenances', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /provenances');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getProvenances())
			.then((provenances) => {
				console.log(JSON.stringify(provenances));
				res.send({
					status: 'success',
					message: provenances
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les activités disponibles n\'ont pas pu être récupérées'
				});
			})
	//}
});

/* GET home page. */
router.post('/getCustomerGrid', expressJwtIp.ip(), function(req, res) {

	
	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;
	
	//var query= '';
	if(!!decoded && (_ip === _ipReceived)){
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
	}
	else {

		res.send({
			status : 'fail',
			message : 'Erreur'
		});
	}	
});

router.post('/createCustomer', expressJwtIp.ip(), function(req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;
	
	//var query= '';
	if(!!decoded && (_ip === _ipReceived)){
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
}
else {
	res.send({
		status : 'fail',
		message : 'Erreur'
	});
		
	}	
});

router.post('/updateCustomer', expressJwtIp.ip(), function(req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;
	
	//var query= '';
	if(!!decoded && (_ip === _ipReceived)){
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


	console.log("end post /updateCustomer");
	}
else {
	res.send({
		status : 'fail',
		message : 'Erreur'
	});
		
	}	
});

module.exports = router;
