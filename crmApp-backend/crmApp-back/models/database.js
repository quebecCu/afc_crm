//
//
//const Sequelize = require('sequelize');
//// base de donnees
//const sequelize = new Sequelize('postgres', 'postgres', '123456', {
//	host: 'localhost',
//	dialect: 'postgres',
//
//	pool: {
//		max: 5,
//		min: 0,
//		idle: 10000
//	},
//
//});
//
//sequelize 
//.authenticate()
//.then(() => {
//	console.log('Connection has been established successfully.');
//})
//.catch(err => {
//	console.error('Unable to connect to the database:', err);
//});
/////////////////////////////////////////////////////////////////////////
////partie creation de tables
//// CREATION D'UNE TABLE USER 
/////////////////////////////////////////////////////////////////////////
//
//
//
//
//const Users = sequelize.define('users', {
//	username: {
//		type: Sequelize.STRING
//	}, 
//	password: {
//		type: Sequelize.STRING
//	}
//});
//
//
////force: true will drop the table if it already exists
//Users.sync({force: true}).then(() => {
//	// Table created
//	return Users.create({
//		username: 'aziz',
//		password: 'zouaoui'
//	});
//});  
//
//Users.findOne().then(user => {
//	  console.log(user.get('firstName'));
//	});
//
//
//// pour creer la table si celle ci n'existe pas deja
//sequelize.sync();
//
//
//

const pg = require('pg');

const client = new pg.Client({
	  user: 'postgres',
	  host: 'localhost',
	  database: 'CRM',
	  password: 'password',
	  port: 5432,
	})

client.connect();

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/CRM';

module.exports = client;