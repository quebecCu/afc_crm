const express = require('express');
const router = express.Router();
const db = require('../models');
const squelb = require('squel');
const squel = squelb.useFlavour('postgres');
const jwt = require('jsonwebtoken');
const expressJwtIp = require('express-jwt-ip');


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
