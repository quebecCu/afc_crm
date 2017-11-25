var express = require('express');
var router = express.Router();
var squelb = require('squel');
var squel = squelb.useFlavour('postgres');
var db = require('../models/index');
var express = require('express');
var security = require('../security/security');
var jwt = require('jsonwebtoken');
var expressJwtIp = require('express-jwt-ip');

let getCustomerAttributes = () => 
	squel.select()
	.from('users."ENTREPRISE_AFFICHAGE"', 'aff')
	.field("aff.idattrentreprise")
	.field("posx")
	.field("posy")
	.field("height")
	.field("width")
	.field("minwidth")
	.field("libelletype")
	//.field("type.forme", "secpattern")
	.field("label")
	.field("description")
	.field("valeur_defaut")
	.field("ext")
	.left_join('public."ENTREPRISE_ATTR"', "att", "aff.idattrentreprise = att.idattrentreprise")
	.left_join('public."TYPE"', "type", "att.idtype = type.idtype")
	.where("affichage = true")
	.toString();
	

let createCustomerAttribute = (attribute) =>
	squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
	.into('public."ENTREPRISE_ATTR"')
	.set("idtype", attribute.idtype)
	.set("label", attribute.label)
	.set("description", attribute.description)
	.set("forme", attribute.forme)
	.set("valeur_defaut", attribute.valeur_defaut)
	.set("ext", attribute.ext)
	.returning('*')
	.toString();
	
let createCustomerDis = (attribute) =>
	squel.insert({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
	.into('users."ENTREPRISE_AFFICHAGE"')
	.set("idattrentreprise", attribute.idattrentreprise)
	.set("posx", attribute.posx)
	.set("posy", attribute.posy)
	.set("height", attribute.height)
	.set("width", attribute.width)
	.set("minwidth", attribute.minwidth)
	.set("affichage", true)
	.toString();
	
let hideCustomerAttribute = (idattribute) =>
	squel.update()
	.table('users."ENTREPRISE_AFFICHAGE"')
	.set("affichage", false)
	.where("idattrentreprise = " + idattribute)
	.toString();
	
let updateCustomerAttribute = (idattribute) =>
	squel.update({replaceSingleQuotes: true, singleQuoteReplacement:"''"})
	.table('public."ENTREPRISE_ATTR"')
	.set("idtype", attribute.idtype)
	.set("label", attribute.label)
	.set("description", attribute.description)
	.set("forme", attribute.forme)
	.set("valeur_defaut", attribute.valeur_defaut)
	.set("ext", attribute.ext)
	.where("idattrentreprise = " + idattrentreprise)
	.toString();
	
let updateCustomerAttributeDis = (attribute) =>
	squel.update()
	.table('users."ENTREPRISE_AFFICHAGE"')
	.set("posx", attribute.posx)
	.set("posy", attribute.posy)
	.set("height", attribute.height)
	.set("width", attribute.width)
	.set("minwidth", attribute.minwidth)
	.where("idattrentreprise = " + attribute.idattrentreprise)
	.toString();

let getTypes = () =>
	squel.select()
	.from('public."TYPE"')
	.field("idtype")
	.field("libelletype")
	//.field("forme")
	.toString();

router.get('/customer', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /positions/customer');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getCustomerAttributes())
			.then((attributes) => {
				console.log(JSON.stringify(attributes));
				res.send({
					status: 'success',
					message: attributes
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les attributs de l\'entreprise n\'ont pas pu être récupérés'
				});
			})
	//}
});

router.get('/types', expressJwtIp.ip(), function (req, res) {
	console.log('route GET /positions/type');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		
		db.any(getTypes())
			.then((types) => {
				console.log(JSON.stringify(types));
				res.send({
					status: 'success',
					message: types
				});
			})
			.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Les types disponibles n\'ont pas pu être récupérés'
				});
			})
	//}
});

router.post('/create/customer', expressJwtIp.ip(), function (req, res) {
	console.log('route POST positions/create/customer');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		var attribute = {
			label: req.body.label,
			idtype: req.body.idtype,
			description: req.body.description,
			forme: req.body.forme,
			valeur_defaut: req.body.valeur_defaut,
			ext: req.body.ext,
			posx: req.body.posx,
			posy: req.body.posy,
			height: req.body.height,
			minwidth: req.body.minwidth,
			width: req.body.width
		};
		
		db.tx(function (t) {
			return t.one(createCustomerAttribute(attribute))
			.then((newAttribute) => {
				console.log(JSON.stringify(attribute));
				attribute.idattrentreprise = newAttribute.idattrentreprise;
				return t.none(createCustomerDis(attribute))
				.then(() => {
					res.send({
						status: 'success',
						message:  null
					});
				})
			})
		})
		.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'Le nouvel attribut de l\'entreprise n\'a pas pu être créé'
				});
		});
			
	//}
});

router.post('/update/customer', expressJwtIp.ip(), function (req, res) {
	console.log('route POST positions/update/customer');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		var attribute = {
			idattrentreprise: req.body.id,
			label: req.body.label,
			idtype: req.body.idtype,
			description: req.body.description,
			forme: req.body.forme,
			valeur_defaut: req.body.valeur_defaut,
			ext: req.body.ext
		};
		
		db.none(updateCustomerAttribute(attribute))
		.then(() => {
			res.send({
				status: 'success',
				message:  null
			});
		})
		.catch(error => {
				res.send({
					status: 'fail',
					message: error.toString() //'L'attribut n\'a pas pu être mis à jour'
				});
		});
			
	//}
});

router.post('/update/customer/display', expressJwtIp.ip(), function (req, res) {
	console.log('route POST positions/update/customer/display');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		var attributes = req.body.layout;
		
		db.tx(t => {
		    const queries = attributes.map(attribute => {			
				let newAttribute = {
					idattrentreprise: attribute.i,
					posx: attribute.x,
					posy: attribute.y,
					height: attribute.h,
					minwidth: attribute.minW,
					width: attribute.w
				};
		        return t.none(updateCustomerAttributeDis(newAttribute));
		    });
		    return t.batch(queries);
		})
		    .then(() => {
		    		res.send({
					status: 'success',
					message:  null
				});
		    })
		    .catch(error => {
		    		res.send({
					status: 'fail',
					message: error.toString() //'La position des attributs n\'a pas pu être mise à jour'
				});
		    });
			
	//}
});


router.delete('/customer/:id', expressJwtIp.ip(), function (req, res) {
	console.log('route DELETE positions/customer');
	/*var tokenReceived = req.get("authorization");
	var secret = 'aplsszjknbndsj';
	// decode
	var decoded = jwt.decode(tokenReceived, secret);
	var _ipReceived = decoded.ip;
	var _ip = res.locals.ip;*/

	//if (!!decoded && (_ip === _ipReceived)) {
		let id = req.params.id;
		
		db.none(hideCustomerAttribute(id))
				.then(() => {
					res.send({
						status: 'success',
						message:  null
					});
				})
				.catch(error => {
						res.send({
							status: 'fail',
							message: error.toString() //'L'attribut n\'a pas pu être supprimé'
						});
				});
			
	//}
});

/*db.multi(getUserById(id) + ";" + getEntitiesDisplayed())
	.spread((attributes) => {
		console.log(JSON.stringify(userRetrieved));
		console.log(JSON.stringify(entities));
		res.status(200);
		// We retrieve all of the permissions of a user
		var permissions = buildPermissions(userRetrieved, entities);
		var resp = {
			id: userRetrieved[0].iduser,
			login: userRetrieved[0].login,
			mail: userRetrieved[0].mail,
			name: userRetrieved[0].nom,
			lastname: userRetrieved[0].prenom,
			role: userRetrieved[0].roledesc,
			titre : userRetrieved[0].libelletitre,
			userPerms: permissions
		};

		res.send({
			status: 'success',
			message: resp
		});
	})
	.catch(error => {
		console.log('ERROR:', error);
	})
}
else {
res.send({
	status: 'fail',
	message: 'Erreur'
});

}*/

module.exports = router;
