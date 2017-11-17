var express = require('express');
var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');
var db = require('../models');
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');

/* GET home page. */
router.post('/assurancesCollectives', expressJwtIp.ip(), function(req, res) {
	//var query= '';
	
	var tokenReceived = req.get("authorization");

	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;

	if(!!decoded && (_ip === _ipReceived)){
		
		
		console.log("ICIIIIIIIIIIII")

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
				.from('public."ENTREPRISE"')
				.field('nom')
				.field('idclient')
				.toString()	+ ";"+ squel.select()
				.from('public."CONTRAT"', "contrat")
				.field('contrat.idcontrat')
				.field('contrat.police')
				.field('contrat.idfournisseur')
				.field('contrat.mois_renouvellement')
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
				.toString()	)
				.spread(function (entreprise, contrat,fournisseur,client) {
					
					console.log("REQUETE BD   entreprise  "+ JSON.stringify(entreprise)) 
					console.log("REQUETE BD   contrat  "+ JSON.stringify(contrat)) 
					console.log("REQUETE BD   fournisseur  "+ JSON.stringify(fournisseur)) 
					console.log("REQUETE BD   client  "+ JSON.stringify(client)) 

					/*
					 * * mettre les valeurs de BD extraites dans des variables locales
					 * les injecter dans le res.send
					 * let nom_entreprise = entreprise[0].nom_entreprise;
					 * rajouter boucle for pour iterer sur tous les elements retournés par la BD
					 */
					res.send({
						clients: [
							{nom_entreprise: 'ALFA ROMEO', nom_employe: 'TOTO', no_police:'123789', mois_renouvellement:'Octobre', nom_assureur:'Croix - bleue', status: 'actif', prospect: 'Oui'},
							{nom_entreprise: 'MERCEDES', nom_employe: 'zero', no_police:'37838', mois_renouvellement:'Juin', nom_assureur:'Croix - Rouge', status: 'annulé', prospect: 'non'},
							{nom_entreprise: 'LEXUS', nom_employe: 'plus', no_police:'4522285', mois_renouvellement:'Juillet', nom_assureur:'Croix - verte', status: 'actif', prospect: 'Oui'},
							{nom_entreprise: 'BMW', nom_employe: 'zero', no_police:'7774533', mois_renouvellement:'Janvier', nom_assureur:'Fifo', status: 'annulé', prospect: 'non'},
							{nom_entreprise: 'ALFA Blondie', nom_employe: 'TOTO', no_police:'123789', mois_renouvellement:'Octobre', nom_assureur:'Croix - bleue', status: 'actif', prospect: 'Oui'},
							{nom_entreprise: 'Azizou', nom_employe: 'zero', no_police:'37838', mois_renouvellement:'Juin', nom_assureur:'Croix - Rouge', status: 'annulé', prospect: 'non'},
							{nom_entreprise: 'Udes', nom_employe: 'plus', no_police:'4522285', mois_renouvellement:'Juillet', nom_assureur:'Croix - verte', status: 'actif', prospect: 'Oui'},
							{nom_entreprise: 'Devon', nom_employe: 'zero', no_police:'7774533', mois_renouvellement:'Janvier', nom_assureur:'Fifo', status: 'annulé', prospect: 'non'},
							{nom_entreprise: 'Vincent', nom_employe: 'TOTO', no_police:'123789', mois_renouvellement:'Octobre', nom_assureur:'Croix - bleue', status: 'actif', prospect: 'Oui'},
							{nom_entreprise: 'JeremStar', nom_employe: 'zero', no_police:'37838', mois_renouvellement:'Juin', nom_assureur:'Croix - Rouge', status: 'annulé', prospect: 'non'},
							{nom_entreprise: 'Mathieuwww', nom_employe: 'plus', no_police:'4522285', mois_renouvellement:'Juillet', nom_assureur:'Croix - verte', status: 'actif', prospect: 'Oui'},
							{nom_entreprise: 'Clara Lets go', nom_employe: 'zero', no_police:'7774533', mois_renouvellement:'Janvier', nom_assureur:'Fifo', status: 'annulé', prospect: 'non'}
							]
					});
				
				});

		
		

	console.log("end post /assurancesCollectives");
	}
	else {

        res.send({
            status : 'fail',
            message : 'Erreur'
        });

	}
});

module.exports = router;
