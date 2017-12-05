const express = require('express');
const router = express.Router();
//Load the bcrypt module
const bcrypt = require('bcrypt');
const db = require('../models');
const squelb = require('squel');
const squel = squelb.useFlavour('postgres');
const jwt = require('jsonwebtoken');
const expressJwtIp = require('express-jwt-ip');

//Squel request for getting the jobs available
let getJobs = () =>
squel.select()
	.from('public."POSTE_FOURNISSEUR"')	
	.field("idposte_fou", "idposte")
	.field("libelleposte")
	.toString();

/**
 * Route getting jobs available
 * @method GET
 * @URL /providers/jobs
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: [ { idposte, libelleposte } ] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get('/jobs', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /jobs');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getJobs())
			.then((jobs) => {
				console.log(JSON.stringify(jobs));
				res.send({
					status: 'success',
					message: jobs
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les postes disponibles n\'ont pas pu être récupérées'
				});
			})
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});


/**
 * Route serving Providers module
 * @method GET
 * @URL /providers
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 200, fournisseurs: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get('/', expressJwtIp.ip(), function (req, res) {

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {*/

		// TODO: Refactor query
		db.any(squel.select()
				.from('public."FOURNISSEUR"', "fournisseur")
				.field('fournisseur.nom')
				.field('fournisseur.code')
				.field('fournisseur.idfournisseur', 'idfournisseur')
				.field('personne.idpersonne')
				.field('personne.nom', 'p_nom')
				.field('personne.prenom', 'p_prenom')
				.left_join('public."CONTACT_FOURNISSEUR"', "contact_fournisseur", "contact_fournisseur.idfournisseur = fournisseur.idfournisseur")
				.left_join('public."PERSONNE"', "personne", "personne.idpersonne = contact_fournisseur.idpersonne")
				.toString())
			.then(function (fournisseurs) {
				var supplierToSend = [];
				let _nomFournisseur, _police, _minEmploye, _idFournisseur, _nomPersonne, _prenomPersonne

				// TODO: Refactor & fix supplierArrayBuilder
				//Le matching est incorrect
				//On utilise l'indice d'un premier array pour aller chercher l'info dans un autre array
				//Ont ils le même taille ?
				//what if fournisseur.length > personne.length ?
				for (var i = 0; i < fournisseurs.length; i++) {

					//debugg
					console.log("fournisseur.length      " + fournisseurs.length)
					console.log("BOUCLE NUMERO       " + i)

					_nomFournisseur = (!!fournisseurs[i].nom ? fournisseurs[i].nom : null)
					_code = (!!fournisseurs[i].code ? fournisseurs[i].code : null)
					_minEmploye = (!!fournisseurs[i].min_emp1 ? fournisseurs[i].min_emp1 : null)
					_idFournisseur = (!!fournisseurs[i].idfournisseur ? fournisseurs[i].idfournisseur : null)
					_nomPersonne = (!!fournisseurs[i].p_nom ? fournisseurs[i].p_nom : null)
					_prenomPersonne = (!!fournisseurs[i].p_prenom ? fournisseurs[i].p_prenom : null)
					_fullName = (!!_nomPersonne ?  _nomPersonne : "") + (!!_prenomPersonne ? " " + _prenomPersonne : "")

					suppliersJSON = {id : _idFournisseur, nom: _nomFournisseur, min_emp1: _minEmploye, contact: _fullName, code: _code}
					supplierToSend.push(suppliersJSON);

					//debugg
					console.log("supplierToSend a envoyer " + JSON.stringify(supplierToSend))

				}

				res.send({fournisseur: supplierToSend});
			});

		// TODO: Error handler (fail state response?)

		console.log("end post /fournisseurs");
	//}
});

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

// Squel request for getting contacts of a provider
let getContacts = (idfournisseur) =>
squel.select()
.field('pers.idpersonne', 'idpersonne')
.field('prenom')
.field('nom')
.field('libelleposte')
.field('libelletitre')
.field('num_tel_principal')
.field('ext_tel_principal')
.field('mail')
.from('public."CONTACT_FOURNISSEUR"', 'cont')
.left_join('public."PERSONNE"', 'pers', "pers.idpersonne = cont.idpersonne")
.left_join('public."POSTE_FOURNISSEUR"', 'poste', "poste.idposte_fou = cont.idposte_fou")
.left_join('public."TITRE"', 'titre', "pers.idtitre = titre.idtitre")
.where('cont.idfournisseur = ?', idfournisseur)
.toString();

// Squel request for getting a title id with its label
let getIdTitre = (titre) =>
squel.select()
	.from('public."TITRE"', 't')
	.field('t.idtitre')
	.where("t.libelletitre = ?", titre)
	.toString();

// Squel request for creating a person
let createPerson = (person) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."PERSONNE"')
.set("nom", person.nom)
.set("prenom", person.prenom)
.set("idtitre", person.idtitre)
.set("num_tel_principal", person.num_tel_principal)
.set("ext_tel_principal", person.ext_tel_principal)
.set("mail", person.mail)
.returning('idpersonne')
.toParam();

// Squel request for crating a contact for a provider
let createContact = (person) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."CONTACT_FOURNISSEUR"')
.set("idpersonne", person.idpersonne)
.set("idposte_fou", person.idposte)
.set("idfournisseur", person.idfournisseur)
.toParam();

// Squel request for updating a person (who is a provider contact)
let updatePerson = (person) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."PERSONNE"')
.set("nom", person.nom)
.set("prenom", person.prenom)
.set("idtitre", person.idtitre)
.set("num_tel_principal", person.num_tel_principal)
.set("ext_tel_principal", person.ext_tel_principal)
.set("mail", person.mail)
.where("idpersonne = ?", person.idpersonne)
.toParam();

// Squel request for updating a provider contact
let updateContact = (person) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."CONTACT_FOURNISSEUR"')
.set("idposte_fou", person.idposte)
.where("idpersonne = ?", person.idpersonne)
.where("idfournisseur = ?", person.idfournisseur)
.toParam();

// Squel request for deleting a person (who was a provider contact)
let deletePerson = (idpersonne) =>
squel.delete()
.from('public."PERSONNE"')
.where("idpersonne = ?", idpersonne)
.toParam();

// Squel request for deleting a provider contact
let deleteContact = (idpersonne, idfournisseur) =>
squel.delete()
.from('public."CONTACT_FOURNISSEUR"')
.where("idpersonne = ?", idpersonne)
.where("idfournisseur = ?", idfournisseur)
.toParam();

/**
 * Route retrieving contacts of a provider
 * @method GET
 * @URL /providers/contacts/:id
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: success, message: [{ idpersonne, prenom, nom, libelletitre, 
 * libelleposte, num_tel_principal, ext_tel_principal, mail}] }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.get('/contacts/:id', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /contacts/:id');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		let id = req.params.id;
		db.any(getContacts(id))
			.then((contacts) => {
				console.log(JSON.stringify(contacts));
				res.send({
					status: 'success',
					message: contacts
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les contacts n'ont pas pu être récupérés'
				});
			})
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route creating a contact for a provider
 * @method POST
 * @URL /providers/contact/create
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idfournisseur, prenom, idposte, titre, num_tel_principal, ext_tel_principal, mail} Contact to be created
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post('/contact/create', expressJwtIp.ip(), function (req, res) {
	console.log('route POST /create/contact');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
	let person = {
		idfournisseur: req.body.idfournisseur,
		prenom: req.body.prenom,
		nom: req.body.nom,
		idposte: req.body.idposte,
		titre: req.body.titre,
		num_tel_principal: req.body.num_tel_principal,
		ext_tel_principal: req.body.ext_tel_principal,
		mail: req.body.mail
	}
	
	db.tx(t => {
		return t.one(getIdTitre(person.titre))
		.then(titre => {
			person.idtitre = titre.idtitre;
			return t.one(createPerson(person))
				.then(personCreated => {
					person.idpersonne = personCreated.idpersonne;
					return t.none(createContact(person))
					.then(() => {
						res.send({
							status: 'success',
							message: null
						});
					})
				})
		})
	})
	.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Le contact client n'a pas pu être créé'
				});
	})
			
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route updating a contact for a provider
 * @method POST
 * @URL /providers/contact/update
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idfournisseur, idpersonne, prenom, idposte, titre, num_tel_principal, ext_tel_principal, mail} Contact to be updated
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.post('/contact/update', expressJwtIp.ip(), function (req, res) {
	console.log('route POST /contact/update');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
	let person = {
		idfournisseur: req.body.idfournisseur,
		idpersonne: req.body.idpersonne,
		prenom: req.body.prenom,
		nom: req.body.nom,
		idposte: req.body.idposte,
		titre: req.body.titre,
		num_tel_principal: req.body.num_tel_principal,
		ext_tel_principal: req.body.ext_tel_principal,
		mail: req.body.mail
	}
	
	db.tx(t => {
		return t.one(getIdTitre(person.titre))
		.then(titre => {
			person.idtitre = titre.idtitre;
			return t.none(updatePerson(person))
				.then(() => {
					return t.none(updateContact(person))
					.then(() => {
						res.send({
							status: 'success',
							message: null
						});
					})
				})
		})
	})
	.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Le contact client n'a pas pu être créé'
				});
	})
			
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route deleting a contact for a provider
 * @method DELETE
 * @URL /providers/contact/:idfournisseur/:idpersonne
 * @param expressJwtIp.ip() server IP address
 * @SuccessResponse { status: 'success', message: null }
 * @ErrorResponse { status: 'fail', message: error }
 * **/
router.delete('/contact/:idfournisseur/:idpersonne', expressJwtIp.ip(), function (req, res) {
	console.log('route DELETE /contact/:idfournisseur/:idpersonne');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
	let idfournisseur = req.params.idfournisseur;
	let idpersonne = req.params.idpersonne;
	
	db.tx(t => {
		return t.none(deleteContact(idpersonne, idfournisseur))
			.then(() => {
				return t.none(deletePerson(idpersonne))
				.then(() => {
					res.send({
						status: 'success',
						message: null
					});
				})
			})
	})
	.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Le contact client n'a pas pu être créé'
				});
	})
			
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/
});

/**
 * Route serving specific Provider
 * @method GET
 * @URL /providers/:idFournisseur
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} auth token
 * @SuccessResponse { status: 200, client(selected by id) }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.get('/:idFournisseur', expressJwtIp.ip(), function (req, res) {

	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	const _ip = res.locals.ip;*/

	let wantedClientRows;

	//if (!!decoded && (_ip === _ipReceived)) {

		console.log("Starting /providers/:idFournisseur");

		db.query(getOptionnalProviderRowsById(req.params.idFournisseur))
			.then((optionnalRows) => {
				wantedProviderRows = buildProviderObject(optionnalRows);
				db.one(getObligatoryProviderRowsById(req.params.idFournisseur))
				.then((obligatoryRow) => {
					obligatoryRow.facultatif = wantedProviderRows;
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
const buildProviderObject = (optionnalRows) => {
	let providerRowsToReturn = [];
	let columnName;
	let columnValue;
	let providerRow = {};

	optionnalRows.forEach((optionnalRow) => {
		providerRow = {
			idRow : optionnalRow.idattr
		};
		columnName = optionnalRow.label;
		columnValue = optionnalRow.valeur;
		columnTemp = optionnalRow.forme_type;
		columnType = optionnalRow.type;
		columnDesc = optionnalRow.description;
		providerRow["nom"] = columnName;
		providerRow["valeur"] = columnValue;
		providerRow["description"] = columnDesc;
		//A déterminer si on en a besoin ou non, suivant le traitement effectué en front-end
		providerRow["type"] = columnType;
		providerRow["forme"] = columnTemp;
		providerRowsToReturn.push(providerRow);
	});

	return providerRowsToReturn;
};

const getProviderById = (idProvider) => {
};

// Squel request getting the optionnal attributes of a specific client
const getOptionnalProviderRowsById = (idFournisseur) => {
	return squel.select()
		.field('label')
		.field('valeur')	
		.field('attr.description', 'description')
		.field('type.libelletype', 'type')
		.field('type.forme', 'forme_type')
		.field('facul.idattrfournisseur', 'idattr')
		.from('"FOURNISSEUR"', 'fourn')
		.left_join('"FOURNISSEUR_FACUL"', 'facul', 'fourn.idfournisseur = facul.idfournisseur')
		.left_join('"FOURNISSEUR_ATTR"', 'attr', 'attr.idattrfournisseur = facul.idattrfournisseur')	
		.left_join('"TYPE"', 'type', 'type.idtype = attr.idtype')
		.where('fourn.idfournisseur = ?', idFournisseur)
		.toString();
};

// Squel request getting the obligatory attributes of a specific client
const getObligatoryProviderRowsById = (idFournisseur) => {
	return squel.select()
		.field('fourn.idfournisseur', 'idfournisseur')
		.field('nom')
		.field('code')
		.field('tel_principal')
		.field('ext_tel_principal')
		.field('date_creation')
		.field('rue')
		.field('province')
		.field('codepostal')	
		.field('ville')
		.from('"FOURNISSEUR"', 'fourn')
		.left_join('"ADRESSE"', 'adr', 'adr.idadresse = fourn.idadresse')
		.where('fourn.idfournisseur = ?', idFournisseur)
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

// Squel request creating an address for a provider
let createAdresse = (provider) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."ADRESSE"')
.set("rue", provider.rue)
.set("ville", provider.ville)
.set("province", provider.province)
.set("codepostal", provider.codepostal)
.returning("idadresse")
.toParam();

// Squel request creating provider obligatory attributes
let createProviderOblig = (provider) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."FOURNISSEUR"')
.set("idadresse", provider.idadresse)
.set("nom", provider.nom)
.set("code", provider.code)
.set("tel_principal", provider.tel_princ)
.set("ext_tel_principal", provider.ext_tel_princ)
.returning("idfournisseur")
.toParam();

// Squel request filling optionnal attributes for a specific client
let createProviderFacul = (idfournisseur, idattr, valeur) =>
squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.into('public."FOURNISSEUR_FACUL"')
.set("idfournisseur", idfournisseur)
.set("idattrfournisseur", idattr)
.set("valeur", valeur)
.toParam();

/**
 * Route creating a provider
 * @method POST
 * @URL /providers/create
 * @param expressJwtIp.ip() server IP address
 * @DataParams {nom, tel_princ, ext_tel_princ, code, ville, province, 
 * codepostal, facul, newcontacts} Client to be created
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

		console.log("Starting /providers/create");
		
		var provider = {
				nom: req.body.nom,
				code: req.body.code,
				tel_princ: req.body.tel_princ,
				ext_tel_princ: req.body.ext_tel_princ,
				rue: req.body.rue,
				ville: req.body.ville,
				province: req.body.province,
				codepostal: req.body.codepostal,
				facul: req.body.facultatif,
				newcontacts: req.body.newcontacts
			};

		db.tx(t => {
			return t.one(createAdresse(provider))
				.then((newAdress) => {
					provider.idadresse = newAdress.idadresse;
					return t.one(createProviderOblig(provider))
					.then((newProvider) => {
						provider.idfournisseur = newProvider.idfournisseur;
						const queries = provider.facul.map(attribute => {
					        return t.none(createProviderFacul(provider.idfournisseur, attribute.id, attribute.value));
						});
					    return t.batch(queries)
					    		.then(() => {
					    			const queriesContactNew = provider.newcontacts.map(contact => {
					    				let person = {
					    						idfournisseur: provider.idfournisseur,
					    						prenom: contact.prenom,
					    						nom: contact.nom,
					    						idposte: contact.idposte,
					    						titre: contact.titre,
					    						num_tel_principal: contact.num_tel_principal,
					    						ext_tel_principal: contact.ext_tel_principal,
					    						mail: contact.mail
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
		.then(() => {
			res.send({
				status: 'success',
				message:  null
			});
		})
		.catch(error => {
			res.send({
				status: 'fail',
				message: error.toString() //'Le fournisseur n'a pas pu être créé'
			});
		});
	/*} else {
		res.status(403);
		sendResponse('Acces refusé', res, 'fail')
	}*/

	console.log("end post /clients/create");
});

// Squel request for updating a client address
let updateAdresse = (provider) =>
squel.updateJoin({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."ADRESSE"', "adr")
.set("rue", provider.rue)
.set("ville", provider.ville)
.set("province", provider.province)
.set("codepostal", provider.codepostal)
.from('public."FOURNISSEUR"', "fourn")
.where("adr.idadresse = fourn.idadresse")
.where("fourn.idfournisseur= ?", provider.idfournisseur)
.toParam();

// Squel request for updating a company
let updateProviderOblig = (provider) =>
squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.table('public."FOURNISSEUR"')
.set("nom", provider.nom)
.set("code", provider.code)
.set("tel_principal", provider.tel_princ)
.set("ext_tel_principal", provider.ext_tel_princ)
.where("idfournisseur = ?", provider.idfournisseur)
.toParam();

// Squel request for deleting a client facultative attributes
let deleteProviderFacul = (idfournisseur) =>
squel.delete({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
.from('public."FOURNISSEUR_FACUL"')
.where("idfournisseur = ?", idfournisseur)
.toParam();

/**
 * Route updating a provider
 * @method POST
 * @URL /providers/update
 * @param expressJwtIp.ip() server IP address
 * @DataParams {idfournisseur, code, nom, tel_princ, ext_tel_princ, ville, province, 
 * codepostal, facul, newcontacts, updtcontacts, delcontacts} Provider to be created
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

		console.log("Starting /providers/update");
		
		var provider = {
				idfournisseur: req.body.idfournisseur,
				code: req.body.code,
				nom: req.body.nom,
				tel_princ: req.body.tel_princ,
				ext_tel_princ: req.body.ext_tel_princ,
				rue: req.body.rue,
				ville: req.body.ville,
				province: req.body.province,
				codepostal: req.body.codepostal,
				facul: req.body.facultatif,
				updtcontacts: req.body.updtcontacts,
				newcontacts: req.body.newcontacts,
				delcontacts: req.body.delcontacts
			};

		db.tx(t => {
			return t.none(updateAdresse(provider))
			.then(() => {	
				return t.none(updateProviderOblig(provider))
				.then(() => {
					return t.none(deleteProviderFacul(provider.idfournisseur))
					.then(() => {
						const queries = provider.facul.map(attribute => {
					        return t.none(createProviderFacul(provider.idfournisseur, attribute.id, attribute.value));
						});
					    return t.batch(queries)
				    			.then(() => {
				    				const queriesContactNew = provider.newcontacts.map(contact => {
					    				let person = {
					    						idfournisseur: provider.idfournisseur,
					    						prenom: contact.prenom,
					    						nom: contact.nom,
					    						idposte: contact.idposte,
					    						titre: contact.titre,
					    						num_tel_principal: contact.num_tel_principal,
					    						ext_tel_principal: contact.ext_tel_principal,
					    						mail: contact.mail
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
				    				
				    				const queriesContactUpdt = provider.updtcontacts.map(contact => {
					    				let person = {
					    						idfournisseur: provider.idfournisseur,
					    						idpersonne: contact.idpersonne,
					    						prenom: contact.prenom,
					    						nom: contact.nom,
					    						idposte: contact.idposte,
					    						titre: contact.titre,
					    						num_tel_principal: contact.num_tel_principal,
					    						ext_tel_principal: contact.ext_tel_principal,
					    						mail: contact.mail
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
				    				
				    				const queriesContactDel = provider.delcontacts.map(contact => {
				    				return t.none(deleteContact(contact.idpersonne, provider.idfournisseur))
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

module.exports = router;
