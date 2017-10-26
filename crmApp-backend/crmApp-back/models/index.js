"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
//-----------------------------bdname-----username-----password----
var sequelize = new Sequelize('tboluoek', 'tboluoek', 'pl3bxNOTdACJyxSawxgeM1wtNcCgN9no', {
    host: 'horton.elephantsql.com',
    port: '5432',
    dialect: 'postgres',

    pool: {
        max: 3,
        min: 0,
        idle: 10000
    },

});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

var db = {};

//A suivre pour l'utilisation des Models
/*fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});*/

const Person = sequelize.define('PERSONNE', {
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING
}, {
    tableName: 'PERSONNE'});

const User = sequelize.define('UTILISATEUR', {
	iduser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    mail: Sequelize.STRING,
    name: Sequelize.STRING,
    idrole: Sequelize.INTEGER
}, {
	timestamps: false,
    schema: 'users',
    tableName: '"UTILISATEUR"'});

const PermissionUtil = sequelize.define('PERMISSIONUTIL', {
}, {
	timestamps: false,
    schema: 'users',
    tableName: '"PERMISSIONUTIL"'});

const Operation = sequelize.define('OPERATION', {
	idoperation: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
	timestamps: false,
    schema: 'users',
    tableName: '"OPERATION"'});

const Menu = sequelize.define('Menu', {
	idmenu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
	timestamps: false,
    schema: 'users',
    tableName: '"MENU"'});

const PermissionRole = sequelize.define('PERMISSIONUTIL', {
}, {
	timestamps: false,
    schema: 'users',
    tableName: '"PERMISSIONROLE"'});

const Role = sequelize.define('Menu', {
	idrole: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
	timestamps: false,
    schema: 'users',
    tableName: '"ROLEADM"'});

User.hasMany(PermissionUtil, {foreignKey: 'iduser'});
PermissionUtil.belongsTo(User, {foreignKey: 'iduser'});
Operation.hasMany(PermissionUtil, {foreignKey: 'idoperation'});
PermissionUtil.belongsTo(Operation, {foreignKey: 'idoperation'});
Menu.hasMany(PermissionUtil, {foreignKey: 'idmenu'});
PermissionUtil.belongsTo(Menu, {foreignKey: 'idmenu'});

Role.hasMany(PermissionRole, {foreignKey: 'idrole'});
PermissionRole.belongsTo(Role, {foreignKey: 'idrole'});
Operation.hasMany(PermissionRole, {foreignKey: 'idoperation'});
PermissionRole.belongsTo(Operation, {foreignKey: 'idoperation'});
Menu.hasMany(PermissionRole, {foreignKey: 'idmenu'});
PermissionRole.belongsTo(Menu, {foreignKey: 'idmenu'});

db.Person = Person;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Menu = Menu;
db.Operation = Operation;
db.PermissionUtil = PermissionUtil;
db.PermissionRole = PermissionRole;
db.Role = Role;

module.exports = db;
