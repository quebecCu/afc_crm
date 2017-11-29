const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwtIp = require('express-jwt-ip');
const db = require('../models');
const squelb = require('squel');
const squel = squelb.useFlavour('postgres');

/**
 * Route serving Clients module
 * @method POST
 * @URL /assurancesCollectives
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} Auth token
 * @SuccessResponse { status: 200, clients: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.post('/assurancesCollectives', expressJwtIp.ip(), function (req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	let clients;

	if (!!decoded && (_ip === _ipReceived)) {

		// TODO: Refactor query
		db.query(getClientsListRequest())
			.then(function (entreprise) {

				clients = buildClientsArray(entreprise);
				res.status(200);
				res.send({
					clients: clients
				});
			})
			.catch(error => {
				console.log('ERROR:', error);
			});
	} else {
		res.send({
			status: 'fail',
			message: 'Erreur'
		});
	}

	console.log("end post /assurancesCollectives");
});

/**
 * Builds a Clients Array to send to Front-End
 *
 * @param entrepriseFromDB - DB response
 * @returns {Array} - Clients list (Shaped according to Front-end supported format)
 */
const buildClientsArray = (entrepriseFromDB) => {
	let clientsToSend = [];
	let client;
	let isProspect;
	let etat;

	entrepriseFromDB.forEach((entreprise) => {
		entreprise.prospect === true ? isProspect = 'Oui' : isProspect = 'Non';
		entreprise.libelleetat === 'Actif' ? etat = 'Actif' : etat = 'Annulé';

		client = {
			id: entreprise.idclient,
			nom_groupe: entreprise.nomentp,
			responsable: entreprise.nomresp + ", " + entreprise.prenomresp,
			date_creation: entreprise.date_creation,
			activite: entreprise.libelleactivite,
			mois_renouvellement: entreprise.renouvellement,
			no_police: entreprise.no_police,
			etat: etat,
			prospect: isProspect
		};

		clientsToSend.push(client);
	});

	return clientsToSend;
};

/**
 * Returns SQL String to getClientsList
 *
 * @returns {String} - SQL Query
 */
const getClientsListRequest = () => {
	return squel.select()
		.from('public."ENTREPRISE"', "entreprise")
		.field('client.idclient')
		.field('entreprise.nom', 'nomentp')
		.field('entreprise.date_creation')
		.field('activite.libelleactivite')
		.field('client.prospect')
		.field('etat.libelleetat')
		.field('p.nom', 'nomresp')
		.field('p.prenom', 'prenomresp')
		.left_join('public."ACTIVITE"', "activite", "activite.idactivite = entreprise.idactivite")
		.left_join('public."CLIENT"', "client", "client.idclient = entreprise.idclient")
		.left_join('public."ETAT"', "etat", "etat.idetat = client.idetat")
		.left_join('public."CONTACT_CLIENT"', 'ccli', 'client.idclient = ccli.idclient')
		.left_join('public."PERSONNE"', 'p', 'p.idpersonne = ccli.idpersonne')
		.left_join('public."CONTRAT"', 'ctt', 'ctt.idclient = client.idclient')
		.where('estDecideur = true')
		.group('client.idclient')
		.group('entreprise.nom')
		.group('entreprise.date_creation')
		.group('activite.libelleactivite')
		.group('etat.libelleetat')
		.group('p.nom', 'nomresp')
		.group('p.prenom', 'prenomresp')
		.toString();
};

module.exports = router;
