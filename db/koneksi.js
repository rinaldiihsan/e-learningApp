const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_DATABASE,
});

module.exports = db;
