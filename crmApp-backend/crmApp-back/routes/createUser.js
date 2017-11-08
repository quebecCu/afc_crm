var express = require('express');
var router = express.Router();
var app = express();
//Load the bcrypt module
var db = require('../models/index');
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var {hashSync , genSaltSync} = require ('bcryptjs');
var bcrypt = require ('bcryptjs');
var security = require('../security/security');

/* GET home page. */
router.post('/createUser', function(req, res) {
	/*security.checkRights(1, "Gestion des utilisateurs", 7)
    .then(() => {*/
	    	var user={
	        role: req.body.role,
	        nom: req.body.nom,
	        login: req.body.login,
	        mdpProv: req.body.mdpProv,
	        mail: req.body.mail,
	        permissionsUser: req.body.permissionsUser,
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
	    			.set("name", user.nom)
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
			    			    			right = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: createObject.idoperation };
			    			    			newRights.push(right);
			    			    			if(element.level >= 3){
			    			    				right = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: readObject.idoperation };
			    			    				newRights.push(right);
			    			    				if(element.level === 7){
			    			    					right = { iduser: userCreated.iduser, identite: entityObject.identite, idoperation: updateObject.idoperation };
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

function createEmployee(userInformations, userCreated, t, res) {
	 var addPersonne = squel.insert()
		.into('public."PERSONNE"')
		.set("nom", userInformations.nom.split(" ")[1])
		.set("prenom", userInformations.nom.split(" ")[0])
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

module.exports = router;