var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var db = require('../models');

/* GET home page. */
router.post('/createUser', function(req, res) {

    let user={
        role: req.body.role,
        nom: req.body.nom,
        login: req.body.login,
        mdpProv: req.body.mdpProv,
        mail: req.body.mail,
        permissionsUser: req.body.permissionsUser
    };
    console.log(user);
    //var query= '';
    res.send({
        status: "success"
    });


    console.log("end post /createUser");
});

module.exports = router;