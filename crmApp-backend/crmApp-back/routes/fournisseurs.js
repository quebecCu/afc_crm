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
        {nom: 'Enterprise', employes: 20, contact: 'Gael Fou', code: 'AAAA'},
        {nom: 'Pomm', employes: 10, contact: 'Sasha Du', code: 'AAAA'},
        {nom: 'Med', employes: 34, contact: 'Elo Si', code: 'AAAA'},
        {nom: 'RE', employes: 15, contact: 'Maxime Tar', code: 'AAAA'}
        ]});


    console.log("end post /fournisseurs");
});

module.exports = router;