"use strict";

var squel = require("squel");
var promise = require('bluebird');
var options = {
    promiseLib: promise
};
const dbConfig = {
    database: 'tboluoek',
    user: 'tboluoek',
    password: 'pl3bxNOTdACJyxSawxgeM1wtNcCgN9no',
    port: 5432,
    host: 'horton.elephantsql.com',
    ssl: true
}
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://'+dbConfig.user+':'+dbConfig.password+'@'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.database;
var db = pgp(connectionString);


db.query(squel.select()
    .field('NOW()')
    .toString())
    .then(res => {
        console.log('time is', res[0].now)
    })
    .catch(e => {
        console.error('query error', e.message, e.stack)
    })

module.exports = db;
