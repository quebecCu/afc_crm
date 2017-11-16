var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var bcrypt = require('bcrypt');
var db = require('../models');
//
///* GET home page. */
//router.post('/clients', function(req, res) {
//
//    //var query= '';
//    res.send({clients: [
//        {nom_entreprise: 'ALFA ROMEO', nom_employe: 'TOTO', no_police:'123789', mois_renouvellement:'Octobre', nom_assureur:'Croix - bleue'},
//        {nom_entreprise: 'MERCEDES', nom_employe: 'zero', no_police:'37838', mois_renouvellement:'Juin', nom_assureur:'Croix - Rouge'},
//        {nom_entreprise: 'LEXUS', nom_employe: 'plus', no_police:'4522285', mois_renouvellement:'Juillet', nom_assureur:'Croix - verte'},
//        {nom_entreprise: 'BMW', nom_employe: 'zero', no_police:'7774533', mois_renouvellement:'Janvier', nom_assureur:'Fifo'}
//    ]});
//
//
//    console.log("end post /clients");
//});
//
//module.exports = router;