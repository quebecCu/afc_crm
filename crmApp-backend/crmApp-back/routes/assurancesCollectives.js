var express = require('express');
var router = express.Router();
var app = express();



/* GET home page. */
router.post('/assurancesCollectives', function(req, res) {
    //var query= '';
	  res.send({clients: [
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
	    ]});

	console.log("end post /assurancesCollectives");
});

module.exports = router;
