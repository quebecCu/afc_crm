var express = require('express');
var router = express.Router();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
var security = require('../security/security');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');

//Create an update-join method for squel
squel.updateJoin = function(options) {
    return squel.update(options, [
        new squel.cls.StringBlock(options, 'UPDATE'),
        new squel.cls.UpdateTableBlock(options),
        new squel.cls.SetFieldBlock(options),
        new squel.cls.FromTableBlock(options),
        new squel.cls.JoinBlock(options),
        new squel.cls.WhereBlock(options),
        new squel.cls.OrderByBlock(options),
        new squel.cls.LimitBlock(options),
    ]);
};

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
	console.log('route GET /activities');
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

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;*/

	let wantedClientRows;

	//if (!!decoded && (_ip === _ipReceived)) {

		console.log("Starting /clients/:idClient");

		db.query(getOptionnalClientRowsById(req.params.idClient))
			.then((optionnalRows) => {

				wantedClientRows = buildClientObject(optionnalRows);
				
				db.one(getObligatoryClientRowsById(req.params.idClient))
				.then((obligatoryRow) => {
					obligatoryRow.facultatif = wantedClientRows;
					
					console.log(JSON.stringify(obligatoryRow));

					res.status(200);
					sendResponse(obligatoryRow, res, 'success');
				})
				.catch(error => {
					console.log('ERROR:', error);
					res.status(404);
					sendResponse('NOT FOUND', res, 'fail')
				});
			})
			.catch(error => {
				console.log('ERROR:', error);
				res.status(404);
				sendResponse('NOT FOUND', res, 'fail')
			});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end get /clients/:id");
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
		columnTemp = optionnalRow.forme_type;
		columnType = optionnalRow.type;
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
		.field('type.libelletype', 'type')
		.field('type.forme', 'forme_type')
		.field('facul.idattrentreprise', 'idattr')
		.from('"ENTREPRISE"', 'entp')
		.left_join('"ENTREPRISE_FACUL"', 'facul', 'entp.idclient = facul.identreprise')
		.left_join('"ENTREPRISE_ATTR"', 'attr', 'attr.idattrentreprise = facul.idattrentreprise')	
		.left_join('"TYPE"', 'type', 'type.idtype = attr.idtype')
		.where('entp.idclient = ?', idClient)
		.toString();
};

const getObligatoryClientRowsById = (idClient) => {
	return squel.select()
		.field('cli.idclient', 'idclient')
		.field('libelleprovenance', 'provenance')
		.field('libelleetat', 'etat')		
		.field('modeenvoiereleve', 'releve')
		.field('libelleactivite', 'forme_type')
		.field('nom')
		.field('nom')
		.field('tel_principal')
		.field('ext_tel_principal')
		.field('date_creation')
		.field('prospect')
		.field('notes')
		.from('"CLIENT"', 'cli')
		.left_join('"ENTREPRISE"', 'entr', 'cli.idclient = entr.idclient')
		.left_join('"RELEVE"', 'rel', 'entr.idreleve = rel.idreleve')		
		.left_join('"ACTIVITE"', 'act', 'entr.idactivite = act.idactivite')			
		.left_join('"ETAT"', 'etat', 'cli.idetat = etat.idetat')			
		.left_join('"PROVENANCE"', 'prov', 'cli.idprovenance = prov.idprovenance')	
		.where('cli.idclient = ?', idClient)
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

let createAdresse = (client) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."ADRESSE"')
.set("rue", client.rue)
.set("ville", client.ville)
.set("province", client.province)
.set("codepostal", client.codepostal)
.returning("idadresse")
.toParam();

let createEntrepriseOblig = (client) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."ENTREPRISE"')
.set("idclient", client.idclient)
.set("idadresse", client.idadresse)
.set("idreleve", client.idreleve)
.set("nom", client.nom)
.set("tel_principal", client.tel_princ)
.set("ext_tel_principal", client.ext_tel_princ)
.set("idactivite", client.idactivite)
.toParam();

let createClientOblig = (client) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."CLIENT"')
.set("idetat", client.idetat)
.set("idprovenance", client.idprovenance)
.set("prospect", client.prospect)
.set("notes", client.notes)
.returning("idclient")
.toParam();

let createClientFacul = (idclient, idattr, valeur) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."ENTREPRISE_FACUL"')
.set("identreprise", idclient)
.set("idattrentreprise", idattr)
.set("valeur", valeur)
.toParam();

router.post('/create', expressJwtIp.ip(), function (req, res) {

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

		console.log("Starting /clients/create");
		
		var client = {
				idreleve: req.body.idreleve,
				nom: req.body.nom,
				tel_princ: req.body.tel_princ,
				ext_tel_princ: req.body.ext_tel_princ,
				idactivite: req.body.idactivite,
				rue: req.body.rue,
				ville: req.body.ville,
				province: req.body.province,
				codepostal: req.body.codepostal,
				idetat: req.body.idetat,
				idprovenance: req.body.idprovenance,
				prospect: req.body.prospect,
				notes: req.body.notes,
				facul: req.body.facultatif
			};

		db.tx(t => {
			return t.one(createAdresse(client))
				.then((newAdress) => {
					client.idadresse = newAdress.idadresse;
					return t.one(createClientOblig(client))
					.then((newClient) => {
						client.idclient = newClient.idclient;
						return t.none(createEntrepriseOblig(client))
						.then(() => {
							const queries = client.facul.map(attribute => {
						        return t.none(createClientFacul(client.idclient, attribute.id, attribute.value));
							});
						    return t.batch(queries);
						})
					})
				})
		})
		.then(() => {
			res.send({
				status: 'success',
				message:  null
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Le client n'a pas pu être créé'
			});
		});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end post /clients/create");
});

let updateAdresse = (client) =>
squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."ADRESSE"', "adr")
.set("rue", client.rue)
.set("ville", client.ville)
.set("province", client.province)
.set("codepostal", client.codepostal)
.from('public."ENTREPRISE"', "entr")
.where("adr.idadresse = entr.idadresse")
.where("entr.idclient = ?", client.idclient)
.toParam();

let updateEntrepriseOblig = (client) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."ENTREPRISE"')
.set("idreleve", client.idreleve)
.set("nom", client.nom)
.set("tel_principal", client.tel_princ)
.set("ext_tel_principal", client.ext_tel_princ)
.set("idactivite", client.idactivite)
.where("idclient = ?", client.idclient)
.toParam();

let updateClientOblig = (client) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."CLIENT"')
.set("idetat", client.idetat)
.set("idprovenance", client.idprovenance)
.set("prospect", client.prospect)
.set("notes", client.notes)
.where("idclient = ?", client.idclient)
.toParam();

let deleteClientFacul = (idclient) =>
squel.delete({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.from('public."ENTREPRISE_FACUL"')
.where("identreprise = ?", idclient)
.toParam();

router.post('/update', expressJwtIp.ip(), function (req, res) {

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

		console.log("Starting /clients/update");
		
		var client = {
				idclient: req.body.idclient,
				idreleve: req.body.idreleve,
				nom: req.body.nom,
				tel_princ: req.body.tel_princ,
				ext_tel_princ: req.body.ext_tel_princ,
				idactivite: req.body.idactivite,
				rue: req.body.rue,
				ville: req.body.ville,
				province: req.body.province,
				codepostal: req.body.codepostal,
				idetat: req.body.idetat,
				idprovenance: req.body.idprovenance,
				prospect: req.body.prospect,
				notes: req.body.notes,
				facul: req.body.facultatif
			};

		db.tx(t => {
			return t.none(updateAdresse(client))
			.then(() => {	
				console.log("1");
				return t.none(updateClientOblig(client))
				.then(() => {
					console.log("2");
					return t.none(updateEntrepriseOblig(client))
					.then(() => {
						console.log("3");
						return t.none(deleteClientFacul(client.idclient))
						.then(() => {
							console.log("4");
							const queries = client.facul.map(attribute => {
						        return t.none(createClientFacul(client.idclient, attribute.id, attribute.value));
							});
						    return t.batch(queries);
						})
					})
				})
			})
		})
		.then(() => {
			res.send({
				status: 'success',
				message:  null
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Le client n'a pas pu être mis à jour'
			});
		});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end post /clients/update");
});

let getInactifState = () =>
squel.select()
.field('idetat')
.from('public."ETAT"')
.where('libelleetat LIKE ?', "Annulé")

let deleteClient = (idclient) =>
squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."CLIENT"')
.set('idetat', getInactifState())
.where('idclient = ?', idclient)
.toParam();

router.delete('/:idClient', expressJwtIp.ip(), function (req, res) {

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

		console.log("Starting /clients/:idClient");
		let idClient = req.params.idClient;
		db.none(deleteClient(idClient))
		.then(() => {
			res.send({
				status: 'success',
				message:  null
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Le client n'a pas pu être supprimé'
			});
		});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end delete /clients/:id");
});


module.exports = router;
