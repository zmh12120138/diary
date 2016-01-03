var fs=require('fs');
var express=require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');
var settings=require('./settings.js');
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});

exports.getDiary=function(req,res,next){
    var pageNumber=req.params.pageNumber;
    var startNumber=(pageNumber-1)*7;
    connection.query('SELECT * FROM diary ORDER BY date DESC LIMIT '+startNumber+',7',function(err,result){
        if(err) throw (err);
         res.send(JSON.stringify(result));
    });
};
