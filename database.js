
const express = require("express");
const bodyParser = require("body-parser");

const mysql = require("mysql");





var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root',
  database: 'bank_management',
});

 module.exports= connection;