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


/* GET home page. */
router.post('/fournisseurs',  expressJwtIp.ip(), function(req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;

	if(!!decoded && (_ip === _ipReceived)) {

		db.multi(squel.select()
				.from('public."FOURNISSEUR"', "fournisseur")
				.field('fournisseur.nom')
				.field('fournisseur.code')		
				.field('fournisseur.min_emp1')
				.field('fournisseur.idfournisseur')
				.field('contact_fournisseur.idfournisseur')
				.join('public."CONTACT_FOURNISSEUR"', "contact_fournisseur", "contact_fournisseur.idfournisseur = fournisseur.idfournisseur")
				.toString()
				+ ";"+ squel.select()
				.from('public."PERSONNE"', "personne")
				.field('personne.idpersonne')
				.field('personne.nom')
				.field('personne.prenom')
				.join('public."CONTACT_FOURNISSEUR"', "contact_fournisseur", "personne.idpersonne = contact_fournisseur.idpersonne")
				.toString())
				.spread(function (fournisseur , personne) {
					var supplierToSend = [];
					let _nomFournisseur, _police, _minEmploye, _idFournisseur , _nomPersonne , _prenomPersonne
					console.log("fournisseur     " + JSON.stringify(fournisseur))
					console.log("personne     " + JSON.stringify(personne))
					for ( var i =0; i <fournisseur.length; i++){
						console.log("fournisseur.length      " + fournisseur.length)
						console.log("BOUCLE NUMERO       " + i)

						_nomFournisseur = fournisseur[i].nom
						_code = fournisseur[i].code
						_minEmploye = fournisseur[i].min_emp1
						_idFournisseur = fournisseur[i].idfournisseur
						_nomPersonne  = personne[i].nom
						_prenomPersonne =  personne[i].prenom
						_fullName = _nomPersonne + " " +  _prenomPersonne

						suppliersJSON =	{nom: _nomFournisseur , min_emp1: _minEmploye, contact: _fullName , code: _code }
						supplierToSend.push(suppliersJSON);


						console.log("supplierToSend a envoyer      " + JSON.stringify(supplierToSend))

					}

					
			        res.send({fournisseur: supplierToSend});

				})




				console.log("end post /fournisseurs");
	}});

module.exports = router;