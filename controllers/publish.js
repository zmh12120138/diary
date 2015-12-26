var mysql=require('mysql');
var settings=require('./settings.js');
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
exports.publish=function(req,res,next){
    var strO=req.body.content;
    var str=strO.replace(/tinymce/g, "/tinymce")
   var status=0;
    connection.query('SELECT * FROM diary WHERE ?',{date:req.body.date},function(err,result){
       for(var i=0;i<result.length;i++){
           var publisherName=result[i].publisherName;
           if(publisherName=req.params.username){
               status=1;
               break;
           };
       }
        if(status==1){
            res.send('<script>alert("当天的日记已经存在了呦~~");window.history.back()</script>');
            res.end();
        }else{

            connection.query('INSERT INTO diary set ?',{
                date:req.body.date,
                week:req.body.week,
                weather:req.body.weather,
                content:str,
                publisherName:req.params.username,
                updateTime:new Date()
            },function(err,result){
                if(err) throw (err);
                res.send('<script>alert("发布成功了呦~~~");window.history.back();window.location.reload()</script>');
                res.end()
            })
        }
    })

};