var db = require('../models');

var security = {};
security.checkRights = function (login, idrole, menu, operation, callback) {
	var rightValidated = false;
	db.PermissionUtil.findOne({ 
		where: { login : login, 'MENU.description' : menu, 'OPERATION.description' : operation}, 
				include: [db.User, db.Operation, db.Menu]})
	.then(function (permission) {
		if(permission !== null) {
			rightValidated = true;
			callback(rightValidated);
		}
	});
}

security.addDefaultRights = function (login, idrole, callback) {
	db.PermissionRole.findAll({ 
		where: { login : login, idrole : idrole }, 
				include: [db.User]})
	.then(function (permissions) {
		if(permissions !== null) {
			var bulk = [];
			permissions.forEach(function(permission) {
				var raw = {iduser: permission.iduser, idoperation: permission.idoperation, idmenu: permission.idmenu}
				bulk.add(raw);
			});
			PermissionUtil.bulkCreate(bulk).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
				  console.log("ouuuaaaiiiii !!!!");
				  callback();
			})
		}
	});
}

module.exports = security;