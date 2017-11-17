var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');
var db = require('../models');
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');

/**
 * Route serving Clients module
 * @method POST
 * @URL /assurancesCollectives
 * @param expressJwtIp.ip() -- Doc à compléter par ceux qui ont le détail
 * @DataParams {authorization} -- Doc à compléter par ceux qui ont le détail
 * @SuccessResponse { status: 200, clients: {Array} }
 * @ErrorResponse { status: 'fail', message: 'Erreur' }
 * **/
router.post('/assurancesCollectives', expressJwtIp.ip(), function(req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;

	let clients;

	if(!!decoded && (_ip === _ipReceived)) {

		//construire la requete
		/*
		 * nom entreprise
		 * id client entreprise
		 * idcontrat contrat
		 * numero de police    police
		 * mois de renouvellement : mois_renouvellement
		 * nom fournisseur   : fournisseur.nom
		 */
		db.multi(squel.select()
				.from('public."ENTREPRISE"', "entreprise")
				.field('entreprise.nom')
				.field('client.idclient')
				.field('entreprise.nb_employes')
				.field('activite.libelleactivite')
				.field('client.prospect')
				.field('etat.libelleetat')
				.join('public."ACTIVITE"', "activite", "activite.idactivite = entreprise.idactivite")
				.join('public."CLIENT"', "client", "client.idclient = entreprise.idclient")
				.join('public."ETAT"', "etat", "etat.idetat = client.idetat")
				.toString()	+ ";"+ squel.select()
				.from('public."CONTRAT"', "contrat")
				.field('contrat.idcontrat')
				.field('contrat.police')
				.field('contrat.idfournisseur')
				.field('contrat.mois_renouvellement')
				.field('contrat.idrepresentant')
				.join('public."ENTREPRISE"', "entreprise", "contrat.idclient = entreprise.idclient")
				
				.toString()	+ ";"+ squel.select()
				.from('public."FOURNISSEUR"', "fournisseur")
				.field('fournisseur.nom')
				.field('fournisseur.idfournisseur')
				.join('public."CONTRAT"', "contrat", "contrat.idfournisseur = fournisseur.idfournisseur")
				.toString()
				+ ";"+ squel.select()
				.from('public."CLIENT"', "client")
				.field('client.idclient')
				.field('client.prospect')
				.join('public."ENTREPRISE"', "entreprise", "client.idclient = entreprise.idclient")
				.toString()	
				+ ";"+ squel.select()
				.from('public."PERSONNE"', "personne")
				.field('personne.idpersonne')
				.field('personne.nom')
				.field('personne.prenom')
				.join('public."CONTRAT"', "contrat", "personne.idpersonne = contrat.idrepresentant")

				.toString()	
				
		
		)
				.spread(function (entreprise, contrat,fournisseur,client,personne) {
					let _entreprise,_nomEmploye, _police, _moisRenouvellement, _nomAssureur, _prospect, _statut, _fullName
					for (var i=0; i <entreprise.length; i++){
						 _entreprise = entreprise[i].nom;
						 _nomEmploye = personne[i].nom;
						 _prenomEmploye = personne[i].prenom;
						 _police = contrat[i].police;
						 _moisRenouvellement = contrat[i].mois_renouvellement;
						 _nomAssureur = fournisseur[i].nom;
						 _prospect = entreprise[i].prospect;
						 _statut = entreprise[i].libelleetat;
						
						 _fullName = _nomEmploye + " " + _prenomEmploye;
						console.log("REQUETE BD   nom entreprise  "+  _entreprise);
						console.log("REQUETE BD   _nomEmploye  "+  _nomEmploye);
						console.log("REQUETE BD   _prenomEmploye  "+  _prenomEmploye);
						console.log("REQUETE BD   _police  "+ _police);
						console.log("REQUETE BD   _moisRenouvellement  "+ _moisRenouvellement);
						console.log("REQUETE BD   _nomAssureur  "+ _nomAssureur);
						console.log("REQUETE BD   _prospect  "+ _prospect);
						console.log("REQUETE BD   _statut  "+ _statut);
						console.log("REQUETE BD   _fullName   "+ _fullName);
					}
					
					/*
					 *  
					 * rajouter boucle for pour iterer sur tous les elements retournés par la BD
					 */
					
//					clients = buildClientsArray(entreprise);

					res.status(200);
					res.send({
						
						clients: 
						[
							{nom_entreprise: _entreprise, nom_employe: _fullName , no_police:_police, mois_renouvellement: _moisRenouvellement, nom_assureur: _nomAssureur, status: _statut, prospect: _prospect}
							]
					});
				});
	} else {
        res.send({
            status : 'fail',
            message : 'Erreur'
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

	entrepriseFromDB.forEach((entreprise) => {
		if(entreprise.prospect)
			isProspect = 'Oui';
		else
			isProspect = 'Non';

		client = {
			nom_groupe : entreprise.nom,
			nb_employes : entreprise.nb_employes,
			activite : entreprise.libelleactivite,
			etat : entreprise.libelleetat,
			prospect : isProspect 
		};

		clientsToSend.push(client);
	});

	return clientsToSend;
}

module.exports = router;
