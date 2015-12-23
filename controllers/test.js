var express=require('express');
var bodyParser = require('body-parser');
var fs=require('fs');
exports.test=function(req,res,next){
  fs.readdir('./public/music',function(err,files){
      if(err) throw err;
      res.send(files)
  })
};