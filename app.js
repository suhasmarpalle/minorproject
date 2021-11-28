
const express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const connection = require("./database")
const app = express();
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//app.use(bodyParser.text({type:'text/html'}));

app.use(bodyParser.urlencoded({extended :true}));


app.listen(3000,function(req,res){
	console.log("server is running at port 3000");
	connection.connect((error) =>{ if(error) throw(err); console.log("db conn success!");
	})
});
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/create',function(req,res){
var insert_data = [];
for(const i in req.body){
	insert_data.push(req.body[i])
}
console.log(insert_data);
let sql="INSERT INTO account  (NAME,EMAIL_ID,PHONE_NO,AGE,GENDER,DOB,FATHER_NAME,MARITAL_STATUS,ADDRESS,CITY,STATE,COUNTRY,PINCODE) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

connection.query(sql,insert_data, (err,results, fields) => {
	if(err){return console.error(err.message);}
});



connection.end();

 });
 app.post('/signup',function(req,res){
	var signup_data = [];
	for(const i in req.body){
		signup_data.push(req.body[i])
	}
	console.log(signup_data);
	let sql="INSERT INTO CUSTOMER  (NAME,EMAIL_ID,PHONE_NO,USERNAME,PASSWORD) VALUES (?,?,?,?,?)";
	
	connection.query(sql,signup_data, (err,results, fields) => {
		if(err){return console.error(err.message);}
	});
	
	
	
	connection.end();
	
	 });
	
	 app.post('/FME',function(req,res){
		var fme_data = [];
		for(const i in req.body){
			fme_data.push(req.body[i])
		}
		console.log(fme_data);
		let sql="INSERT INTO fme (F_AMT,I_AMT,amount) VALUES (?,?,?)";
		
		connection.query(sql,fme_data, (err,results, fields) => {
			if(err){return console.error(err.message);}
		});
		
		
		
		connection.end();
		
		 });

		 app.post('/login',function(req,res){
			var login_data = [];
			for(const i in req.body){
				login_data.push(req.body[i])
			}
			console.log(login_data);
			 let sql='SELECT * FROM customer WHERE EMAIL_ID= ? AND password =?';
			
			connection.query(sql,login_data, (err,results, fields) => {
				if(results.length==0){console.log("INVALID inputs")
				
				 
			}
				else{
					console.log(results);
					 return res.redirect("http://localhost:3000/loanD");
					
				}
			});
			
	
		
	});

	app.post('/loan',function(req,res){
		var loan_data = [];
		for(const i in req.body){
			loan_data.push(req.body[i])
		}
		console.log(loan_data);
		let sql="INSERT INTO loan (USERNAME,SANCTION_AMT,TENURE)  VALUES(?,?,?)";
		
		connection.query(sql,loan_data, (err,results, fields) => {
			if(err){return console.error(err.message);}
		});
		
		
		
		connection.end();
		
		 });
	
	app.get('/Cus', function(req, res, next) {
		var sql='SELECT * FROM customer';
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
	    console.log(data);
		res.render('Cus', { title: 'Cus', userdata: data});
	  });
	  connection.end();
	});
	app.get('/account', function(req, res, next) {
		var sql='SELECT * FROM account' ;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
	    console.log(data);
		res.render('account', { title: 'account', userdata: data});
	  });
	  connection.end();
	});
	app.get('/loanD', function(req, res, next) {
		var sql='SELECT * FROM loan' ;
		var sql1='SELECT * FROM customer' ;
		var data1;
		connection.query(sql, function (err, data, fields) {
		if (err) throw err;
	    console.log(data);
		data1=data;
		//res.render('loanD', { title: 'loanD', userdata: data});
	  });
	  connection.query(sql1, function (err, data, fields) {
		if (err) throw err;
	    console.log(data);
		res.render('loanD', { title: 'loanD', loanData: data1,userdata:data});
	  });
	  //connection.end();
	});

	
	
	