var mysql=require('mysql');
var settings=require('./settings.js');
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
exports.diary=function(req,res,next){
    var numberI=Math.floor(Math.random()*12 + 1);
    console.log(req.params.date);
    connection.query('SELECT * FROM diary WHERE ?',{date:req.params.date},function(err,result){
        if(err) throw (err);
        console.log(result);
        var diary;
        for(var i= 0;i<result.length;i++){
            if(result[i].publisherName==req.params.publisherName){
               diary=result[i];
            }
        }
        res.render('diary',{diary:diary,numberI:numberI});
    })
};