/**

const Sequelize = require('sequelize');
// base de donnees
const sequelize = new Sequelize('postgres', 'postgres', '123456', {
	host: 'localhost',
    port: '5433',
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
///////////////////////////////////////////////////////////////////////
//partie creation de tables
// CREATION D'UNE TABLE USER 
///////////////////////////////////////////////////////////////////////

var Customer = sequelize.define('Customer', {
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING}
});

var Order = sequelize.define('Order', {
    amount: {type: Sequelize.FLOAT}
});

Customer.hasMany(Order, {constraints: true});
Order.belongsTo(Customer, {constraints: true});
//
var Users = sequelize.define('users', {
	username: {
		type: Sequelize.STRING,
		
	}, 
	password: {
		type: Sequelize.STRING
	}
});
//
//
////force: true will drop the table if it already exists
//Users.sync({force: true}).then(() => {
//	// Table created
//	return Users.create({
//		username: 'aziz',
//		password: 'aziz'
//	});
//});  

function displayResults(results) {
    results.forEach(function (c) {
        console.dir(c.toJSON());
    });
    console.log("------------------------------------");
}


var firstCustomer;
var secondCustomer;

sequelize.sync({force: true})
    .then(function () {
        return Customer
            .create({firstName: 'Test', lastName: 'Testerson'});
    })
       .then(function () {
        return Users
            .create({username: 'aziz', password: 'aziz'});
    })
    .then(function (user1) {
        firstCustomer = user1;
        return Customer
            .create({firstName: 'Invisible', lastName: 'Hand'});
    })
    .then(function (user2) {
        secondCustomer = user2;
        return Order
            .create({CustomerId: firstCustomer.id, amount: 5});
    })
    .then(function () {
        return Order
            .create({CustomerId: firstCustomer.id, amount: 10});
    })
    .then(function () {
        return Order
            .create({CustomerId: firstCustomer.id, amount: 20})
    })
    .then(function () {
        return Order
            .create({CustomerId: secondCustomer.id, amount: 99});
    })
    .then(function () {
    return Customer.findAll({
        attributes: Object.keys(Customer.attributes).concat([
            [
            sequelize.literal('(SELECT SUM("Orders"."amount") FROM "Orders" WHERE "Orders"."CustomerId" = "Customer"."id")'),
            'totalAmount'
            ]
        ])
    });
})
.then(displayResults)
    .then(function () {
        process.exit(0);
    }); 

//
//Users.findOne().then(user => {
//	  console.log(user.get('username'));
//	});
**/


//pour creer la table si celle ci n'existe pas deja
