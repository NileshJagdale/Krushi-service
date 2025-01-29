const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.on('connection', function (connection) {
  console.log('MySQL DB Connection established');
});

connection.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

connection.on('enqueue', function () {
  console.log('Waiting for available connection slot...');
});

connection.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

module.exports = connection;