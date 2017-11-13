var express = require('express');
var router = express.Router();
var app = express();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
//Load the bcrypt module
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var {hashSync , genSaltSync} = require ('bcryptjs');
var bcrypt = require ('bcryptjs');
var security = require('../security/security');

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
        .field('util.login')
        .field('pers.nom')
        .field('pers.prenom')
        .field('op.description',"opdesc")
        .field('ent.identite',"entid")
        .field('ent.description',"entdesc")
        .field('role.description',"roledesc")
        	.join('users."PERMISSIONUTIL_GLOB"', "perm", "perm.iduser = util.iduser")
        	.join('users."OPERATION"', "op", "op.idoperation = perm.idoperation")
        	.join('users."ROLEADM"', "role", "util.idrole = role.idrole")
        	.join('users."ENTITE"', "ent", "ent.identite = perm.identite")
        	.join('users."EMPLOYE_INT"', "emp", "emp.iduser = util.iduser")
        	.join('public."PERSONNE"', "pers", "pers.idpersonne = emp.idpersonne")
        	.where("util.iduser = " + id)
        .toString();
};

const getAllUsers = () =>
    squel.select()
        .from('users."UTILISATEUR"', 'u')
        .left_join('users."ROLEADM"', 'r', 'u.idrole = r.idrole')
		.order('iduser')
        .toString();

router.get('/list', function (req, res) {
    console.log('route GET /listUsers');

    db.query(getAllUsers())
        .then(allUsers => {

            res.send({
				status: 'success',
                users : allUsers
            });
        })
        .catch(error => {
            console.log('ERROR:', error);
        })

	console.log('end GET /listUsers');
});

router.get('/:id', function (req, res) {
    console.log('route GET /userById');
    let id = req.params.id;
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
	var entid;
	console.log(groups);
	for (var groupName in groups) {
		level = 0;
		entid = groups[groupName][0].entid;
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
		permissions.push({id : entid, group: groupName, level: level});
	}

	return {
		id : user[0].iduser,
		login : user[0].login,
		mail : user[0].mail,
		name : user[0].nom,
		lastname : user[0].prenom,
		role : user[0].roledesc,
		userPerms : permissions
		}
}

router.post('/create', function(req, res) {
	/*security.checkRights(1, "Gestion des utilisateurs", 7)
    .then(() => {*/
	    	var user={
	        role: req.body.role,
	        nom: req.body.nom,
	        prenom: req.body.prenom,
	        login: req.body.login,
	        mdpProv: req.body.mdpProv,
	        mail: req.body.mail,
	        permissionsUser: req.body.userPerms,
	    };

	    console.log(user);

	    var geExistingUser = squel.select()
	    .from('users."UTILISATEUR"')
	    .where("login ='" + user.login + "'");

	    var getIdRole = squel.select()
	    .from('users."ROLEADM"')
	    .where("description ='" + user.role + "'");

	    var getOp = squel.select()
	    .from('users."OPERATION"');

	    var getEntities = squel.select()
	    .from('users."ENTITE"');

	    function findUpdate(op) {
	    	  return op.description === 'UPDATE';
	    }

	    function findCreate(op) {
	    	  return op.description === 'CREATE';
	    }

	    function findRead(op) {
	    	  return op.description === 'READ';
	    }

	    function findEnt(desc, ent) {
	    	  return ent.description === desc;
	    }

	    db.any(geExistingUser.toString())
	    .then(existUser => {
	    	if(existUser.length === 0) {
	    		db.multi(getIdRole.toString() + ";" + getOp.toString() + ";" + getEntities.toString())
	    		.then(data => {
	    			console.log(data);
	    			var idRole = data[0][0].idrole;
	    			let updateObject = data[1].find(findUpdate);
	    			let readObject = data[1].find(findRead);
	    			let createObject = data[1].find(findCreate);
	    			var newRights = [];
	    			var right;
	    			var decrypted=  CryptoJS.AES.decrypt(user.mdpProv, 'secretKey13579');
	    			var mdpText = decrypted.toString(CryptoJS.enc.Utf8);

	    			let salt = genSaltSync (10);
	    			let hash = hashSync(mdpText, salt);
	    			console.log(hash);
	    			var addUser = squel.insert()
	    			.into('users."UTILISATEUR"')
	    			.set("login", user.login)
	    			.set("password", hash)
	    			.set("mail", user.mail)
	    			.set("idrole", idRole)
	    			.returning('*');

	    			console.log(mdpText);
	    			console.log(hash);

	    			db.tx(function (t) {
	    				return t.one(addUser.toString())
						.then(userCreated => {
			    		    		user.permissionsUser.forEach(function(element) {
			    			    		var entityObject = data[2].find(findEnt.bind(null, element.entite));
			    			    		if(element.level >= 1){
			    			    			right = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: readObject.idoperation };
			    			    			newRights.push(right);
			    			    			if(element.level >= 3){
			    			    				right = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: updateObject.idoperation };
			    			    				newRights.push(right);
			    			    				if(element.level === 7){
			    			    					right = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: createObject.idoperation };
					    			    			newRights.push(right);
			    			    				}
			    			    			}
			    			    		}
			    			    	});
			    			    	var addRights = squel.insert()
			    			    	.into('users."PERMISSIONUTIL_GLOB"')
			    			    	.setFieldsRows(newRights)
			    			    	.returning('*')
							.toParam();
			    			    return t.any(addRights)
			    			        .then(data => {
			    			        		return createEmployee (user, userCreated, t, res);
			    			        })
			    		    })
		    		})
		    		.then(data => {
		    			res.status(200);
	    				res.send({
			    			status : 'success',
			    			message : null
			    		});
	    	        })
	    	        .catch(error => {
	    	        		res.send({
			    			status : 'fail',
			    			message : error.toString()
			    		});
	    	        });
	    		})
	    		.catch(function (err) {
		    		  console.log(err);
		    	});

	    	} else {
	    		res.send({
					status : 'fail',
					message : 'Ce login n\'est pas disponible'
			});
	    	}
	    })
	    .catch(error => {
	        console.log('ERROR:', error); // print error;
	    });

	    console.log("end post /createUser");
   /* })
    .catch(error => {
	    	res.send({
				status : 'fail',
				message : 'Les droits accordés à l\'utilisateur ne sont pas suffisants'
		});
    });*/
});


router.post('/update', function(req, res) {
	/*security.checkRights(1, "Gestion des utilisateurs", 3)
    .then(() => {*/
	    	var user={
	    		id: req.body.id,
	        role: req.body.role,
	        nom: req.body.nom,
	        prenom: req.body.prenom,
	        mail: req.body.mail,
	        permissionsUser: req.body.userPerms,
	    };

	    console.log(user);

	    var getIdRole = squel.select()
	    .from('users."ROLEADM"')
	    .where("description ='" + user.role + "'");

	    var getOp = squel.select()
	    .from('users."OPERATION"');

	    var getEntities = squel.select()
	    .from('users."ENTITE"');

	    function findUpdate(op) {
	    	  return op.description === 'UPDATE';
	    }

	    function findCreate(op) {
	    	  return op.description === 'CREATE';
	    }

	    function findRead(op) {
	    	  return op.description === 'READ';
	    }

	    function findEnt(desc, ent) {
	    	  return ent.description === desc;
	    }

    		db.multi(getIdRole.toString() + ";" + getOp.toString() + ";" + getEntities.toString())
    		.then(data => {
    			var idRole = data[0][0].idrole;
    			let updateObject = data[1].find(findUpdate);
    			let readObject = data[1].find(findRead);
    			let createObject = data[1].find(findCreate);
    			var newRights = [];
    			var right;

    			var updateUser = squel.update()
    			.table('users."UTILISATEUR"')
    			.set("mail", user.mail)
    			.set("idrole", idRole)
    			.where("iduser = " + user.id)
    			.returning('*');

    			db.tx(function (t) {
    				return t.one(updateUser.toString())
					.then(userUpdated => {
		    		    		user.permissionsUser.forEach(function(element) {
		    			    		var entityObject = data[2].find(findEnt.bind(null, element.entite));
		    			    		if(element.level >= 1){
		    			    			right = { iduser: userUpdated.iduser, identite: entityObject.identite, idoperation: createObject.idoperation };
		    			    			newRights.push(right);
		    			    			if(element.level >= 3){
		    			    				right = { iduser: userUpdated.iduser, identite: entityObject.identite, idoperation: readObject.idoperation };
		    			    				newRights.push(right);
		    			    				if(element.level === 7){
		    			    					right = { iduser: userUpdated.iduser, identite: entityObject.identite, idoperation: updateObject.idoperation };
		    			    					newRights.push(right);
		    			    				}
		    			    			}
		    			    		}
		    			    	});
		    		    		var deleteRights = squel.delete()
		    			    	.from('users."PERMISSIONUTIL_GLOB"')
		    			    	.where("iduser = " + user.id);

		    			    	var addRights = squel.insert()
		    			    	.into('users."PERMISSIONUTIL_GLOB"')
		    			    	.setFieldsRows(newRights)
		    			    	.returning('*')
		    			    	.toParam();
		    			    	console.log(deleteRights.toString())
		    			    return t.none(deleteRights.toString())
		    			        .then(() => {
		    			        		return t.any(addRights)
				    			        .then(data => {
				    			        		return updateEmployee (user, t, res);
				    			        });
		    			        });
		    		    })
	    		})
	    		.then(data => {
	    			res.status(200);
    				res.send({
		    			status : 'success',
		    			message : null
		    		});
    	        })
    	        .catch(error => {
    	        		res.send({
		    			status : 'fail',
		    			message : error.toString()
		    		});
    	        });
    		})
    		.catch(function (err) {
	    		  console.log(err);
	    	});

	    	console.log("end post /createUser");
   /* })
    .catch(error => {
	    	res.send({
				status : 'fail',
				message : 'Les droits accordés à l\'utilisateur ne sont pas suffisants'
		});
    });*/
});

router.get('/getOperations', function(req,res){
	console.log("GET /getOperation");

    res.send({
        status : 'success',
		operations: [{id:0, label:"read", value:1},{id:1, label:"read + write",value:3}, {id:2, label:"read + write + create", value:7}]
    });
});

router.get('/getDefaultPerms', function(req,res){
    console.log("GET /getDefaultPerms");

    res.send({
        status : 'success',
        defaultPerms: [
            {role:"Utilisateur_All",
                droits: [{id: 0, entite: "Gestion des contrats - ACollectives", level:3},
                    {id:1, entite: "Gestion des fournisseurs", level:7},
                    {id:2, entite: "Gestion des clients - ACollectives", level:7}]
            },
            {
                role:"Utilisateur_Limited",
                droits: [{id:0, entite: "Gestion des contrats - ACollectives", level:7},
                    {id: 1, entite: "Gestion des fournisseurs", level:7},
                    {id: 2, entite: "Gestion des clients - ACollectives", level:7}]
            }
        ]
    });
});

router.get('/getRoles', function(req, res) {

    console.log('getting roles from database');

    db.query(squel.select()
        .from('users."ROLEADM"')
        .field('description')
        .where("description like 'Utilisateur%' OR description like 'Employe'")
        .toString())
        .then(roles => {

            res.send({
                status : 'success',
                roles : roles
            });
        })
        .catch(e => {
            console.error('query error', e.message, e.stack)
        })
    console.log('end get /getRoles');
});


function createEmployee(userInformations, userCreated, t, res) {
	 var addPersonne = squel.insert()
		.into('public."PERSONNE"')
		.set("nom", userInformations.nom)
		.set("prenom", userInformations.prenom)
		.set("titre", "Mr")
		.returning('*');

	return t.one(addPersonne.toString())
    .then(personCreated => {
    		var addEmployee = squel.insert()
		.into('users."EMPLOYE_INT"')
		.set("iduser", userCreated.iduser)
		.set("idpersonne", personCreated.idpersonne)
		.returning('*');

    		return t.one(addEmployee.toString())
    	    .then(employeeCreated => {
	    })
	})
}

function updateEmployee(userInformations, t, res) {
	var getPersonne = squel.select()
	.from('public."PERSONNE"', "pers")
	.join('users."EMPLOYE_INT"', "emp", "pers.idpersonne = emp.idpersonne")
	.join('users."UTILISATEUR"', "util", "util.iduser = emp.iduser")
	.where("util.iduser = " + userInformations.id);

	return t.one	(getPersonne.toString())
	.then(personExisting => {
		 var updatePersonne = squel.update()
			.table('public."PERSONNE"')
			.set("nom", userInformations.nom)
			.set("prenom", userInformations.prenom)
			.set("titre", "Mr")
			.where("idpersonne = " + personExisting.idpersonne)
			.returning('*');
		return t.one(updatePersonne.toString())
		   .then(personUpdated => {
			})
	})

}


module.exports = router;
