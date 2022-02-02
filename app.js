const express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const connection = require("./database");
const app = express();
var fs = require("fs");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Connection = require("mysql/lib/Connection");
//app.use(bodyParser.text({type:'text/html'}));
let login_data = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function (req, res) {
  console.log("server is running at port 3000");
  connection.connect((error) => {
    if (error) throw err;
    console.log("db conn success!");
  });
});
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/create", function (req, res) {
  var insert_data = [];
  for (const i in req.body) {
    insert_data.push(req.body[i]);
  }
  console.log(insert_data);
  let sql =
    "INSERT INTO account  (NAME,EMAIL_ID,PHONE_NO,AGE,GENDER,DOB,FATHER_NAME,MARITAL_STATUS,ADDRESS,CITY,STATE,COUNTRY,PINCODE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

  connection.query(sql, insert_data, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });
});
app.post("/signup", function (req, res) {
  var signup_data = [];
  for (const i in req.body) {
    signup_data.push(req.body[i]);
  }
  console.log(signup_data);
  let sql =
    "INSERT INTO CUSTOMER  (NAME,EMAIL_ID,PHONE_NO,USERNAME,PASSWORD) VALUES (?,?,?,?,?)";

  connection.query(sql, signup_data, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

app.post("/FME", function (req, res) {
  var fme_data = [];
  for (const i in req.body) {
    fme_data.push(req.body[i]);
  }
  console.log(fme_data);
  let sql = "INSERT INTO fme (F_AMT,I_AMT,amount) VALUES (?,?,?)";

  connection.query(sql, fme_data, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

app.post("/login", function (req, res) {
  for (const i in req.body) {
    login_data.push(req.body[i]);
  }
  console.log(login_data);
  let sql = "SELECT * FROM customer WHERE USERNAME= ? AND password =?";
  let name1 = login_data[0];
  connection.query(sql, login_data, (err, results, fields) => {
    if (results.length == 0) {
      console.log("invalid input");
    } else {
      console.log(results);

      res.render("index", { title: "index", name: name1 });
    }
  });
});

app.post("/loan", function (req, res) {
  var loan_data = [];
  for (const i in req.body) {
    loan_data.push(req.body[i]);
  }
  console.log(loan_data);
  let sql = "INSERT INTO loan (USERNAME,SANCTION_AMT,TENURE)  VALUES(?,?,?)";

  connection.query(sql, loan_data, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

app.get("/Cus", function (req, res, next) {
  var sql = "SELECT * FROM customer";
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("Cus", { title: "Cus", userdata: data });
  });
});
app.get("/account", function (req, res, next) {
  var sql = "SELECT * FROM account ";
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("account", { title: "account", userdata: data });
  });
});
app.get("/loanD", function (req, res, next) {
  var sql = "SELECT * FROM loan";
  var sql1 = "SELECT * FROM customer";
  var data1;
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    data1 = data;
    //res.render('loanD', { title: 'loanD', userdata: data});
  });
  connection.query(sql1, function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render("loanD", { title: "loanD", loanData: data1, userdata: data });
  });
  //connection.end();
});

app.post("/trans", function (req, res) {
  var trans_data = [];
  for (const i in req.body) {
    trans_data.push(req.body[i]);
  }
  console.log(trans_data);
  let sql =
    "INSERT INTO TRANSCATION  (FROM_BANKACC,TO_BANKACC,TRANSACTION_AMOUNT) VALUES (?,?,?)";

  connection.query(sql, trans_data, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
  });

  var FROM_BANKACC = trans_data[0];
  var TO_BANKACC = trans_data[1];
  var amount = trans_data[2];
  var TRANSACTION_AMOUNT = parseInt(amount);
  console.log(typeof TRANSACTION_AMOUNT);
  let sql1 = "UPDATE MONEY SET AMOUNT= AMOUNT- ? WHERE NAME=?";

  let sql2 = "UPDATE MONEY SET AMOUNT= AMOUNT+ ? WHERE NAME=?";

  connection.query(
    sql1,
    [TRANSACTION_AMOUNT, FROM_BANKACC],
    (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );
  connection.query(
    sql2,
    [TRANSACTION_AMOUNT, TO_BANKACC],
    (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );
});
