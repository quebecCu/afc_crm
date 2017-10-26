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

module.exports = security;