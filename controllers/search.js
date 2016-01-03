var fs=require('fs');
var express=require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');
var settings=require('./settings.js');
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
exports.search=function(req,res,next){
    var filesI=fs.readdirSync('./public/bgimages/');
    var numberI=Math.floor(Math.random()*filesI.length);
    var imageUrl='/bgimages/'+filesI[numberI];
    console.log(req.params.condition)
    connection.query('SELECT * FROM diary WHERE content LIKE \'%'+req.params.condition+'%\' ORDER BY date DESC',function(err,result){
        if(err) throw (err);
        var id=new Array();
        for(var i=0;i<result.length;i++){
            id[i]=i+1;
        }
         res.render('search',{diary:result,id:id,imageURL:imageUrl});
    });
};
