"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
//-----------------------------bdname-----username-----password----
var sequelize = new Sequelize('postgres', 'postgres', 'password', {
    host: 'localhost',
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


db.Person = Person;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;

module.exports = db;
