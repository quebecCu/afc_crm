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

let getUserById = (id) => {
    return squel.select()
        .from('users."UTILISATEUR"', "util")
        .field('util.iduser')
        .field('util.mail')
        .field('util.name')
        .field('op.description',"opdesc")
        .field('ent.description',"entdesc")
        .field('role.description',"roledesc")
        	.join('users."PERMISSIONUTIL_GLOB"', "perm", "perm.iduser = util.iduser")
        	.join('users."OPERATION"', "op", "op.idoperation = perm.idoperation")
        	.join('users."ROLEADM"', "role", "util.idrole = role.idrole")
        	.join('users."ENTITE"', "ent", "ent.identite = perm.identite")
        	.where("util.iduser = " + id)	
        .toString();
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

router.get('/id', function (req, res) {
    console.log('route GET /userById');
    let id = req.query.id;
    db.any(getUserById(id))
        .then(userRetrieved => {
            res.status(200);
            var resp = buildPermissions (userRetrieved);
            res.send({
            	   status : 'success',
               message : resp
            }); 
        })
        .catch(error => {
            console.log('ERROR:', error);
        })
});

function buildPermissions (user) {
	var groups = {};
	for (var i = 0; i < user.length; i++) {
	  var groupName = user[i].entdesc;
	  if (!groups[groupName]) {
	    groups[groupName] = [];
	  }
	  groups[groupName].push(user[i]);
	}
	var permissions = [];
	var level;
	console.log(groups);
	for (var groupName in groups) {
		level = 0;
		groups[groupName].forEach(function(op) {
	    		switch(op.opdesc) {
		    		case "READ" :
		    			level += 1;
		    			break;
		    		case "UPDATE" :
		    			level += 2;
		    			break;
		    		case "CREATE" :
		    			level += 4;
		    			break;
		    		default :
		    			break;
	    		}
		});
		permissions.push({group: groupName, right: level});
	}
	
	return {
		id : user[0].iduser,
		mail : user[0].mail,
		name : user[0].name,
		role : user[0].roledesc,
		userPerms : permissions
		}
}

module.exports = router;
