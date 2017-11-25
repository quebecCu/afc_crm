var express = require('express');
var router = express.Router();
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

router.get('/aga', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /aga');
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

/**
 * Route serving specific Client
 * @method GET
 * @URL /clients/:id
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} auth token
 * @SuccessResponse { status: 200, client(selected by id) }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get('/:idClient', expressJwtIp.ip(), function (req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	let wantedClientRows;

	if (!!decoded && (_ip === _ipReceived)) {

		console.log("Starting /clients/:idClient");

		db.query(getOptionnalClientRowsById(req.params.idClient))
			.then((optionnalRows) => {

				wantedClientRows = buildClientObject(optionnalRows);

				console.log(JSON.stringify(wantedClientRows));

				res.status(200);
				sendResponse(wantedClientRows, res, 'success');
			})
			.catch(error => {
				console.log('ERROR:', error);
				res.status(404);
				sendResponse('NOT FOUND', res, 'fail')
			});
	} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}

	console.log("end post /clients/:id");
});

const buildClientObject = (optionnalRows) => {
	let clientRowsToReturn = [];
	let columnName;
	let columnValue;
	let clientRow = {};

	optionnalRows.forEach((optionnalRow) => {
		clientRow = {
			idRow : optionnalRow.idattr
		};
		columnName = optionnalRow.label;
		columnValue = optionnalRow.valeur;
		clientRow[columnName] = columnValue;
		clientRowsToReturn.push(clientRow);
	});

	return clientRowsToReturn;
};

const getClientById = (idClient) => {
};

const getOptionnalClientRowsById = (idClient) => {
	return squel.select()
		.field('label')
		.field('valeur')
		.field('facul.idattrentreprise', 'idattr')
		.from('"ENTREPRISE"', 'entp')
		.left_join('"ENTREPRISE_FACUL"', 'facul', 'entp.idclient = facul.identreprise')
		.left_join('"ENTREPRISE_ATTR"', 'attr', 'attr.idattrentreprise = facul.idattrentreprise')
		.where('entp.idclient = ?', idClient)
		.toString();
};

/**
 * Send a response to Front-End
 * @param message
 * @param response
 * @param status
 */
const sendResponse = (message, response, status) => {
	response.send({
		status: status,
		message: message
	});
}

module.exports = router;
