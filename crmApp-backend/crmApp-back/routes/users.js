var express = require('express');
var router = express.Router();
var app = express();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');

let getUserByLogin = (login) => {
    squel.select()
        .from('users."UTILISATEUR"')
        .where('login like ?', login)
        .toString()
};

const getAllUsers = () =>
    squel.select()
        .from('users."UTILISATEUR"', 'u')
        .left_join('users."ROLEADM"', 'r', 'u.idrole = r.idrole')
        .toString();


router.get('/listUsers', function (req, res) {
    console.log('route GET /listUsers');

    db.query(getAllUsers())
        .then(allUsers => {

            res.send({
                users : allUsers
            });
            res.status(200);
        })
        .catch(error => {
            console.log('ERROR:', error);
        })
});

module.exports = router;
