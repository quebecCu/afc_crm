var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var bcrypt = require('bcrypt');
var db = require('../models');

/* GET home page. */
router.post('/fournisseurs', function(req, res) {

    //var query= '';
    res.send({fournisseur: [
        {nom: 'Enterprise', contact: 'Gael Fou'},
        {nom: 'Pomm', contact: 'Sasha Du'},
        {nom: 'Med', contact: 'Elo Si'},
        {nom: 'RE', contact: 'Maxime Tar'}
        ]});


    console.log("sortie backend pour les fournisseurs");
});

module.exports = router;