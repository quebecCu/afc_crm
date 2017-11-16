var express = require('express');
var router = express.Router();
var app = express();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
//Load the bcrypt module
var CryptoJS = require("crypto-js");
var {hashSync , genSaltSync} = require ('bcryptjs');
var bcrypt = require ('bcryptjs');
var security = require('../security/security');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');



let getUserByLogin = (login) => {
	squel.select()
	.from('users."UTILISATEUR"')
	.where('login like ?', login)
	.toString()
};

let ignoredRole = ["Visiteur", "Administrateur"];

let getUserById = (id) => {
	return squel.select()
	.from('users."UTILISATEUR"', "util")
	.field('util.iduser')
	.field('util.mail')
	.field('util.login')
	.field('pers.nom')
	.field('pers.prenom')
	.field('op.description',"opdesc")
	.field('op.level',"oplevel")
	.field('ent.identite',"ident")
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

let getDefaultPermissions = (whereClause) => {
	return squel.select()
	.from('users."PERMISSIONROLE_GLOB"', "perm")
	.field('op.description',"opdesc")
	.field('op.level',"oplevel")
	.field('ent.identite',"ident")
	.field('ent.description',"entdesc")
	.field('role.description',"roledesc")
	.join('users."OPERATION"', "op", "op.idoperation = perm.idoperation")
	.join('users."ROLEADM"', "role", "perm.idrole = role.idrole")
	.join('users."ENTITE"', "ent", "ent.identite = perm.identite")
	.where(whereClause)
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

router.get('/user/:id', function (req, res) {
	console.log('route GET /userById');
	let id = req.params.id;
	db.any(getUserById(id))
	.then(userRetrieved => {
		res.status(200);
		var permissions = buildPermissions (userRetrieved);
		var resp = {
				id : userRetrieved[0].iduser,
				login : userRetrieved[0].login,
				mail : userRetrieved[0].mail,
				name : userRetrieved[0].nom,
				lastname : userRetrieved[0].prenom,
				role : userRetrieved[0].roledesc,
				userPerms : permissions
		};

		res.send({
			status : 'success',
			message : resp
		});
	})
	.catch(error => {
		console.log('ERROR:', error);
	})
});

function buildPermissions (entity) {
	var groups = {};
	for (var i = 0; i < entity.length; i++) {
		var groupName = entity[i].entdesc;
		if (!groups[groupName]) {
			groups[groupName] = [];
		}
		groups[groupName].push(entity[i]);
	}
	var permissions = [];
	var level;
	var ident;
	console.log(groups);
	for (var groupName in groups) {
		level = 0;
		ident = groups[groupName][0].ident;
		groups[groupName].forEach(function(op) {
			level += op.oplevel;
		});
		permissions.push({id : ident, group: groupName, level: level});
	}

	return permissions;
}

router.post('/create', expressJwtIp.ip(), function(req, res) {

	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;


	if(!!decoded && (_ip === _ipReceived)){
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
		.from('users."OPERATION"')
		.order("level");

		var getEntities = squel.select()
		.from('users."ENTITE"');

		function findEnt(desc, ent) {
			return ent.description === desc;
		}

		db.any(geExistingUser.toString())
		.then(existUser => {
			if(existUser.length === 0) {
				db.multi(getIdRole.toString() + ";" + getOp.toString() + ";" + getEntities.toString())
				.then(data => {
					if(data[0][0].isadmin === false) {
						console.log(data);
						var idRole = data[0][0].idrole;
						let rights = data[1];
						var newRights = [];
						var newRight;
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
									var entityObject = data[2].find(findEnt.bind(null, element.group));
									rights.forEach(function(right) {
										if(element.level >= right.level){
											newRight = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: right.idoperation };
											newRights.push(newRight);
										}
									})
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
					} else {
						res.send({
							status : 'fail',
							message : 'Il n\'est pas possible de créer un administrateur'
						});
					}
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
	}
	else {
		res.send({
			status : 'fail',
			message : 'Il n\'est pas possible de créer cet utilisateur'
		});
	}	
});

router.post('/update', expressJwtIp.ip(),function(req, res) {
	
	
	var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;
	console.log("tokenReceived   " + tokenReceived);
	if(!!decoded && (_ip === _ipReceived)){
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
		.from('users."OPERATION"')
		.order("level");

		var getEntities = squel.select()
		.from('users."ENTITE"');

		function findEnt(desc, ent) {
			return ent.description === desc;
		}

		db.multi(getIdRole.toString() + ";" + getOp.toString() + ";" + getEntities.toString())
		.then(data => {
			if(data[0][0].isadmin === false) {
				var idRole = data[0][0].idrole;
				let rights = data[1];
				var newRights = [];
				var newRight;

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
							var entityObject = data[2].find(findEnt.bind(null, element.group));
							rights.forEach(function(right) {
								if(element.level >= right.level){
									newRight = { iduser: userUpdated.iduser, identite: entityObject.identite, idoperation: right.idoperation };
									newRights.push(newRight);
								}
							})
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
			} else {
				res.send({
					status : 'fail',
					message : 'Il n\'est pas possible de définir un nouvel administrateur'
				});
			}
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
	}
	else{
		res.send({
			status : 'fail',
			message : 'Il n\'est pas possible de modifier cet utilisateur'
		});

	}
});

router.get('/operations', function(req,res){
	console.log("GET /getOperation");

	let operationRequest = squel.select()
	.from('users."OPERATION"')
	.order("level")
	.toString();

	let defaultOperations = [{id : 0, label : "Aucun droit n'est accordé", value : 0}];
	let id = 0;
	let label = [];
	let labelString;
	let value = 0;
	db.any(operationRequest)
	.then(operations => {
		operations.forEach(function(element) {
			id++;
			value += element.level;
			label.push(element.description);
			labelString = label.join(" + ");
			defaultOperations.push({id : id, label : labelString, value : value});
		});
		res.status(200);
		res.send({
			status : 'success',
			message : defaultOperations
		});
	})
	.catch(error => {
		console.log('ERROR:', error);
	})
});

router.get('/defaultPerms', function(req,res){
	console.log("GET /getDefaultPerms");

	let whereClauses = [];
	ignoredRole.forEach(function(element) {
		whereClauses.push("role.description <> \'" + element + "\'");
	});

	let whereClause = whereClauses.join(" AND ");
	console.log(getDefaultPermissions(whereClause));
	db.any(getDefaultPermissions(whereClause))
	.then(roleRetrieved => {

		var roles = {};
		for (var i = 0; i < roleRetrieved.length; i++) {
			var roleName = roleRetrieved[i].roledesc;
			if (!roles[roleName]) {
				roles[roleName] = [];
			}
			roles[roleName].push(roleRetrieved[i]);
		}
		var defaultPermissions = [];
		let permissions = {};
		for (var roleName in roles) {
			permissions = buildPermissions(roles[roleName]);
			defaultPermissions.push({role : roleName, droits: permissions});
		}

		res.status(200);
		res.send({
			status : 'success',
			message : defaultPermissions
		});
	})
	.catch(error => {
		console.log('ERROR:', error);
	})
});

router.delete('/user/:id', expressJwtIp.ip(),function(req,res){
	

	var tokenReceived = req.get("authorization");
	
	var secret = 'aplsszjknbndsj';
	// decode 
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;
	console.log("tokenReceived   " + tokenReceived);
	
	
	if(!!decoded && (_ip === _ipReceived)){
		
		console.log("OKKKKKKKKKK");

	console.log("DELETE /user/:id");
	let id = req.params.id;
	console.log('id: ', id);

	var deleteRights = squel.delete()
	.from('users."PERMISSIONUTIL_GLOB"')
	.where("iduser = " + id);

	var getUser = squel.select()
	.from('users."UTILISATEUR"', "util")
	.join('users."ROLEADM"', "adm", "util.idrole = adm.idrole")
	.where("iduser = " + id);

	var deleteUser = squel.delete()
	.from('users."UTILISATEUR"')
	.where("iduser = " + id);

	var updatePersonne = squel.update()
	.table('users."EMPLOYE_INT"')
	.set("iduser", null)
	.where("iduser = " + id);

	db.any(getUser.toString())
	.then(userRetrieved=> {
		if(userRetrieved.length === 0) {
			res.send({
				status : 'fail',
				message : "L'utilisateur que vous voulez supprimer n'est pas enregistré"
			});
		} else if (userRetrieved[0].isadmin === true){
			res.send({
				status : 'fail',
				message : "Vous ne pouvez pas supprimer un administrateur"
			});
		} else {
			db.tx(function (t1) {
				return this.batch([
					t1.none(updatePersonne.toString()),
					t1.none(deleteRights.toString()),
					t1.tx(t2 => {
						return t2.none(deleteUser.toString())
						.then(() => {
						});
					})
					]);
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
		}
	});
	}
	else{
		res.send({
			status : 'fail',
			message : 'Il n\'est pas possible de supprimer cet utilisateur'
		});
	}});

router.get('/getRoles', function(req, res) {

	console.log('Getting roles from database');
	let whereClauses = [];
	ignoredRole.forEach(function(element) {
		whereClauses.push("description <> \'" + element + "\'");
	});
	let whereClause = whereClauses.join(" AND ");
	db.query(squel.select()
			.from('users."ROLEADM"')
			.field('description')
			.where(whereClause)
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
