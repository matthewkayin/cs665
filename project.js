var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var sqlserver = mysql.createConnection({

    host: 'localhost',
    user: 'mysql',
    password: 'kazuo',
    database: 'cs665'
});

// Test connection
sqlserver.connect(function(error){

    if(error){

        console.log("Failed to connect to mysql server.");
        throw error;
    }

    console.log("Connected to mysql server.");
});

app.get('/', function(request, response){

    response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/index.css', function(request, response){

    response.sendFile(path.join(__dirname + '/index.css'));
});
app.get('/search', function(request, response){

    
});

app.listen(8080);
