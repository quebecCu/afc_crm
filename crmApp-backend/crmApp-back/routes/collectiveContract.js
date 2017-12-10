var express = require('express');
var router = express.Router();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
var security = require('../security/security');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');

// Create an update-join method for squel
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

// Squel request for getting the chambers of commerce available
let getChambersOfCommerce = () =>
squel.select()
.from('public."CHAMBRE_COMMERCE"')
.field("idchambrecommerce")
.field("libellechambrecommerce")
.toString();

/**
 * Route getting chambers of commerce available
 * @method GET
 * @URL /clients/aga
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idchambrecommerce, libellechambrecommerce } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
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
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

let getEmployes = () =>
	squel.select()
		.from('users."EMPLOYE_INT"', 'emp')
		.left_join('public."PERSONNE"', 'pers', 'emp.idpersonne = pers.idpersonne')
		.field('emp.idemploye')
		.field('pers.nom')
		.field('pers.prenom')
		.toString();

router.get('/employesafc',expressJwtIp.ip(), function(req,res){
	console.log('route /employesafc');
//on veut renvoyer {idemploye, nom, prenom}
	console.log(getEmployes());
	db.any(getEmployes())
		.then((response) => {
			console.log(response);
			res.send({
				status: 'success',
				message: response
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Les chambres de commerce disponibles n\'ont pas pu être récupérées'
			})
		});

});


let getModulesAndModalites = () =>
	squel.select()
		.from('public."MODALITE"', 'modalite')
		.left_join('public."DOMAINE_ASSURANCE"', 'domassu', 'domassu.iddomaineass = modalite.iddomaineass')
		.field('domassu.iddomaineass')
	//	.field('modalite.description')
		.field('domassu.libelledomaine')
		.field('modalite.idmodalite')
		.field('modalite.libelleavantage');

let addModalitesValues = () =>
	squel.select()
		.from(getModulesAndModalites(), 'modmod')
		.left_join('public."VALEUR_MODALITE_CONTRAT"', 'vmc', 'vmc.idmodalite = modmod.idmodalite')
		.left_join('public."MODALITES_VALEUR"', 'valmod', 'valmod.idmodvaleur = vmc.idmodvaleur')
		.field('modmod.iddomaineass')
		.field('modmod.libelledomaine')
		.field('modmod.idmodalite')
		.field('modmod.libelleavantage')
		//.field('modmod.description')
		.field('valmod.idmodvaleur')
		.field('valmod.valeur')
		.toString();

//ne pas oublier de rajouter les description qd c tt bon
function buildModulesObject(modules){
	let object = [];
	modules.forEach(element => {
		let containsModule = false;
		let containsModalite = false;
		let containsValeur = false;
		let indexModule = null;
		let indexModalite = null;
		object.forEach((obj, index) => {
			if(parseInt(element.iddomaineass) === parseInt(obj.idModule)){
				indexModule = index;
				containsModule = true;
				obj.modalites.forEach((eachMod, indMod) => {
					if(parseInt(element.idmodalite) === parseInt(eachMod.idModalite)){
						containsModalite = true;
						indexModalite = indMod;
						eachMod.valeurs.forEach((eachVal, indVal) => {
							if(parseInt(element.idvaleur) === parseInt(eachVal.idValeur)){
								containsValeur = true;

							}
						})
					}
				});
			}
		});
		if(!containsModule){
			let valeurs = [{idValeur:element.idmodvaleur, label:element.valeur}];
			let modalites = [{idModalite:element.idmodalite, nom: element.libelleavantage, valeurs:valeurs}];
			object.push({nom:element.libelledomaine, idModule:element.iddomaineass, modalites:modalites});
		}
		if(containsModule && !containsModalite){
			let valeurs2 = [{idValeur:element.idmodvaleur, label:element.valeur}];
			let modalites2 = {idModalite:element.idmodalite, nom: element.libelleavantage, valeurs:valeurs2};
			//push la modalite pour le bon module
			object[indexModule].modalites.push(modalites2);
		}
		if(containsModule && containsModalite && !containsValeur){
			let valeurs3 = {idValeur:element.idmodvaleur, label:element.valeur};
			object[indexModule].modalites[indexModalite].valeurs.push(valeurs3);
		}
	});
	return object;

}

router.get('/modules', expressJwtIp.ip(), function(req,res){
	console.log('route /modules');
	let getModules = addModalitesValues();
	console.log(getModules);
	db.any(getModules)
		.then((modules) => {
			let JSONToReturn = buildModulesObject(modules);
			res.send({
				status: 'success',
				message: JSONToReturn
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Les chambres de commerce disponibles n\'ont pas pu être récupérées'
			})
		});
});

/**
 * Route serving Contract module
 * @method GET
 * @URL /collectiveContracts
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} Auth token
 * @SuccessResponse { status: 200, message: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get('/', expressJwtIp.ip(), function (req, res) {

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;

	let clients;

	if (!!decoded && (_ip === _ipReceived)) {*/
		console.log(getContractsListRequest());
		// TODO: Refactor query
		db.any(getContractsListRequest())
			.then(function (contracts) {

				contractsMess = buildContractsArray(contracts);
				res.status(200);
				res.send({
					status : "success",
					message: contractsMess
				});
			})
			.catch(error => {
				console.log('ERROR:', error);
			});
	/*} else {
		res.send({
			status: 'fail',
			message: 'Erreur'
		});
	}*/

	console.log("end post /assurancesCollectives");
});

/**
 * Builds a Clients Array to send to Front-End
 *
 * @param entrepriseFromDB - DB response
 * @returns {Array} - Clients list (Shaped according to Front-end supported format)
 */
const buildContractsArray = (contractsFromDB) => {
	let contractsToSend = [];
	let contract;

	contractsFromDB.forEach((contract) => {
		console.log(JSON.stringify(contract));
		contract = {
			idcontrat: contract.idcontrat,
			nom_fournisseur: contract.nomfourn,
			nom_client: contract.nomclient,
			date_signature: contract.date_signature,
			mois_renouvellement: contract.mois_renouvellement,
			police: contract.police,
			idclient: contract.idclient,
			idfournisseur: contract.idfournisseur
		};

		contractsToSend.push(contract);
	});

	return contractsToSend;
};

/**
 * Returns SQL String to getClientsList
 *
 * @returns {String} - SQL Query
 */
const getContractsListRequest = () => {
	return squel.select()
		.from('public."CONTRAT"', 'contrat')
		.field('contrat.idcontrat', 'idcontrat')
		.field('contrat.date_signature', 'date_signature')
		.field('contrat.police','police')
		.field('contrat.mois_renouvellement', 'mois_renouvellement')
		.field('fourn.idfournisseur', 'idfournisseur')
		.field('client.idclient', 'idclient')
		.field('fourn.nom', 'nomfourn')
		.field('ent.nom', 'nomclient')
		.left_join('public."CONTRAT_COLLECTIF"', "coll", "contrat.idcontrat = coll.idcontrat")
		.left_join('public."CLIENT"', "client", "client.idclient = contrat.idclient")
		.left_join('public."ENTREPRISE"', "ent", "client.idclient = ent.idclient")
		.left_join('public."FOURNISSEUR"', "fourn", "fourn.idfournisseur = contrat.idfournisseur")
		/*.group('client.idclient')
		.group('entreprise.nom')
		.group('entreprise.date_creation')
		.group('activite.libelleactivite')
		.group('etat.libelleetat')
		.group('p.nom', 'nomresp')
		.group('p.prenom', 'prenomresp')
		.group('ctt.mois_renouvellement', 'renouvellement')
		.group('ctt.police', 'police')
		.group('f.nom', 'fnom')*/
		.toString();
};

/**
 * Route serving specific Contract
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
					let date = new Date(obligatoryRow.date_creation);
					obligatoryRow.date_creation = date.toLocaleDateString("fr-FR");
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

// Build optionnal values for a client, in order to serve them
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
		columnDesc = optionnalRow.description;
		clientRow["nom"] = columnName;
		clientRow["valeur"] = columnValue;
		clientRow["description"] = columnDesc;
		//A déterminer si on en a besoin ou non, suivant le traitement effectué en front-end
		clientRow["type"] = columnType;
		clientRow["forme"] = columnTemp;
		clientRowsToReturn.push(clientRow);
	});

	return clientRowsToReturn;
};

const getClientById = (idClient) => {
};

// Squel request getting the optionnal attributes of a specific client
const getOptionnalClientRowsById = (idClient) => {
	return squel.select()
		.field('label')
		.field('valeur')
		.field('attr.description', 'description')
		.field('type.libelletype', 'type')
		.field('type.forme', 'forme_type')
		.field('facul.idattrentreprise', 'idattr')
		.from('"ENTREPRISE"', 'entp')
		.join('"ENTREPRISE_FACUL"', 'facul', 'entp.idclient = facul.identreprise')
		.left_join('"ENTREPRISE_ATTR"', 'attr', 'attr.idattrentreprise = facul.idattrentreprise')
		.left_join('"TYPE"', 'type', 'type.idtype = attr.idtype')
		.where('entp.idclient = ?', idClient)
		.toString();
};

// Squel request getting the obligatory attributes of a specific client
const getObligatoryClientRowsById = (idClient) => {
	return squel.select()
		.field('cli.idclient', 'idclient')
		.field('libelleprovenance', 'provenance')
		.field('libelleetat', 'etat')
		.field('modeenvoiereleve', 'releve')
		.field('libelleactivite', 'forme_type')
		.field('nom')
		.field('tel_principal')
		.field('ext_tel_principal')
		.field('date_creation')
		.field('prospect')
		.field('notes')
		.field('rue')
		.field('province')
		.field('codepostal')
		.field('ville')
		.from('"CLIENT"', 'cli')
		.left_join('"ENTREPRISE"', 'entr', 'cli.idclient = entr.idclient')
		.left_join('"RELEVE"', 'rel', 'entr.idreleve = rel.idreleve')
		.left_join('"ACTIVITE"', 'act', 'entr.idactivite = act.idactivite')
		.left_join('"ADRESSE"', 'adr', 'adr.idadresse = entr.idadresse')
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

// Squel request creating an address for a client
let createAdresse = (client) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."ADRESSE"')
.set("rue", client.rue)
.set("ville", client.ville)
.set("province", client.province)
.set("codepostal", client.codepostal)
.returning("idadresse")
.toParam();

// Squel request creating a company
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

// Squel request creating a client
let createClientOblig = (client) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."CLIENT"')
.set("idetat", client.idetat)
.set("idprovenance", client.idprovenance)
.set("prospect", client.prospect)
.set("notes", client.notes)
.returning("idclient")
.toParam();

// Squel request filling optionnal attributes for a specific client
let createClientFacul = (idclient, idattr, valeur) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."ENTREPRISE_FACUL"')
.set("identreprise", idclient)
.set("idattrentreprise", idattr)
.set("valeur", valeur)
.toParam();

/**
 * Route creating a client
 * @method POST
 * @URL /clients/create
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idreleve, nom, tel_princ, ext_tel_princ, idactivite, ville, province,
 * codepostal, idetat, idprovenance, prospect, notes, facul, newcontacts} Client to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
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
				facul: req.body.facultatif,
				newcontacts: req.body.newcontacts
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
						    return t.batch(queries)
						    		.then(() => {
						    			const queriesContactNew = client.newcontacts.map(contact => {
						    				let person = {
						    						idclient: client.idclient,
						    						prenom: contact.prenom,
						    						nom: contact.nom,
						    						idposte: contact.idposte,
						    						titre: contact.titre,
						    						num_tel_principal: contact.num_tel_principal,
						    						ext_tel_principal: contact.ext_tel_principal,
						    						mail: contact.mail,
						    						estdecideur: contact.estdecideur
						    					}

					    					return t.one(getIdTitre(person.titre))
					    						.then(titre => {
					    							person.idtitre = titre.idtitre;
					    							return t.one(createPerson(person))
					    								.then(personCreated => {
					    									person.idpersonne = personCreated.idpersonne;
					    									return t.none(createContact(person));
					    								})
					    					})
					    				});
						    			return t.batch(queriesContactNew);
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
				message: error.toString() //'Le client n'a pas pu être créé'
			});
		});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end post /clients/create");
});

// Squel request for updating a client address
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

// Squel request for updating a company
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

// Squel request for updating a client obligatory attributes
let updateClientOblig = (client) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."CLIENT"')
.set("idetat", client.idetat)
.set("idprovenance", client.idprovenance)
.set("prospect", client.prospect)
.set("notes", client.notes)
.where("idclient = ?", client.idclient)
.toParam();

// Squel request for deleting a client facultative attributes
let deleteClientFacul = (idclient) =>
squel.delete({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.from('public."ENTREPRISE_FACUL"')
.where("identreprise = ?", idclient)
.toParam();

/**
 * Route updating a client
 * @method POST
 * @URL /clients/update
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idclient, idreleve, nom, tel_princ, ext_tel_princ, idactivite, ville, province,
 * codepostal, idetat, idprovenance, prospect, notes, facul, newcontacts, updtcontacts, delcontacts} Client to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
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
				facul: req.body.facultatif,
				updtcontacts: req.body.updtcontacts,
				newcontacts: req.body.newcontacts,
				delcontacts: req.body.delcontacts
			};

		db.tx(t => {
			return t.none(updateAdresse(client))
			.then(() => {
				return t.none(updateClientOblig(client))
				.then(() => {
					return t.none(updateEntrepriseOblig(client))
					.then(() => {
						return t.none(deleteClientFacul(client.idclient))
						.then(() => {
							const queries = client.facul.map(attribute => {
						        return t.none(createClientFacul(client.idclient, attribute.id, attribute.value));
							});
						    return t.batch(queries)
					    			.then(() => {
					    				const queriesContactNew = client.newcontacts.map(contact => {
						    				let person = {
						    						idclient: client.idclient,
						    						prenom: contact.prenom,
						    						nom: contact.nom,
						    						idposte: contact.idposte,
						    						titre: contact.titre,
						    						num_tel_principal: contact.num_tel_principal,
						    						ext_tel_principal: contact.ext_tel_principal,
						    						mail: contact.mail,
						    						estdecideur: contact.estdecideur
						    					}

					    					return t.one(getIdTitre(person.titre))
					    						.then(titre => {
					    							person.idtitre = titre.idtitre;
					    							return t.one(createPerson(person))
					    								.then(personCreated => {
					    									person.idpersonne = personCreated.idpersonne;
					    									return t.none(createContact(person));
					    								})
					    					})
					    				});

					    				const queriesContactUpdt = client.updtcontacts.map(contact => {
						    				let person = {
						    						idclient: client.idclient,
						    						idpersonne: contact.idpersonne,
						    						prenom: contact.prenom,
						    						nom: contact.nom,
						    						idposte: contact.idposte,
						    						titre: contact.titre,
						    						num_tel_principal: contact.num_tel_principal,
						    						ext_tel_principal: contact.ext_tel_principal,
						    						mail: contact.mail,
						    						estdecideur: contact.estdecideur
						    					}
				    						return t.one(getIdTitre(person.titre))
				    						.then(titre => {
				    							person.idtitre = titre.idtitre;
				    							return t.none(updatePerson(person))
				    								.then(() => {
				    									return t.none(updateContact(person));
				    								})
					    					})
					    				});

					    				const queriesContactDel = client.delcontacts.map(contact => {
					    				return t.none(deleteContact(contact.idpersonne, client.idclient))
						    				.then(() => {
						    					return t.none(deletePerson(contact.idpersonne));
						    				})
					    				})
					    				return t.batch(queriesContactNew.concat(queriesContactUpdt.concat(queriesContactDel)));
					    			});
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

// Squel request for getting the inactive state id
let getInactifState = () =>
squel.select()
.field('idetat')
.from('public."ETAT"')
.where('libelleetat LIKE ?', "Annulé")

// Squel request for deletting (state changement) a client
let deleteClient = (idclient) =>
squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."CLIENT"')
.set('idetat', getInactifState())
.where('idclient = ?', idclient)
.toParam();

/**
 * Route deleting a client (changement of state)
 * @method DELETE
 * @URL /clients/:idclient
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
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
