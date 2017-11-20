var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var bcrypt = require('bcrypt');
var db = require('../models');
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');

/**
 * Route serving Clients module
 * @method POST
 * @URL /fournisseurs
 * @param expressJwtIp.ip() server IP address
 * @DataParams {authorization} auth token
 * @SuccessResponse { status: 200, fournisseurs: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.post('/fournisseurs', expressJwtIp.ip(), function (req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;

	if (!!decoded && (_ip === _ipReceived)) {

		// TODO: Refactor query
		db.multi(squel.select()
				.from('public."FOURNISSEUR"', "fournisseur")
				.field('fournisseur.nom')
				.field('fournisseur.code')
				.field('fournisseur.idfournisseur')
				.field('contact_fournisseur.idfournisseur')
				.join('public."CONTACT_FOURNISSEUR"', "contact_fournisseur", "contact_fournisseur.idfournisseur = fournisseur.idfournisseur")
				.toString()
			+ ";" + squel.select()
				.from('public."PERSONNE"', "personne")
				.field('personne.idpersonne')
				.field('personne.nom')
				.field('personne.prenom')
				.join('public."CONTACT_FOURNISSEUR"', "contact_fournisseur", "personne.idpersonne = contact_fournisseur.idpersonne")
				.toString())
			.spread(function (fournisseur, personne) {
				var supplierToSend = [];
				let _nomFournisseur, _police, _minEmploye, _idFournisseur, _nomPersonne, _prenomPersonne

				//debugg
				console.log("fournisseur     " + JSON.stringify(fournisseur))
				console.log("personne     " + JSON.stringify(personne))

				// TODO: Refactor & fix supplierArrayBuilder
				//Le matching est incorrect
				//On utilise l'indice d'un premier array pour aller chercher l'info dans un autre array
				//Ont ils le même taille ?
				//what if fournisseur.length > personne.length ?
				for (var i = 0; i < fournisseur.length; i++) {

					//debugg
					console.log("fournisseur.length      " + fournisseur.length)
					console.log("BOUCLE NUMERO       " + i)

					_nomFournisseur = fournisseur[i].nom
					_code = fournisseur[i].code
					_minEmploye = fournisseur[i].min_emp1
					_idFournisseur = fournisseur[i].idfournisseur
					_nomPersonne = personne[i].nom
					_prenomPersonne = personne[i].prenom
					_fullName = _nomPersonne + " " + _prenomPersonne

					suppliersJSON = {nom: _nomFournisseur, min_emp1: _minEmploye, contact: _fullName, code: _code}
					supplierToSend.push(suppliersJSON);

					//debugg
					console.log("supplierToSend a envoyer " + JSON.stringify(supplierToSend))

				}

				res.send({fournisseur: supplierToSend});
			});

		// TODO: Error handler (fail state response?)

		console.log("end post /fournisseurs");
	}
});

module.exports = router;
