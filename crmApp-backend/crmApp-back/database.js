
var express = require('express');
var router = express.Router();
var app = express();
var login 
const Sequelize = require('sequelize');
// base de donnees
const sequelize = new Sequelize('postgres', 'postgres', '123456', {
	host: 'localhost',
	dialect: 'postgres',

	pool: {
		max: 5,
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

const User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
	// Table created
	return User.create({
		username: 'aziz',
		password: 'aziz'
	});
});  

