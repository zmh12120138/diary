var mysql=require('mysql');
var settings=require('./settings.js');
var fs=require('fs');
var sendMail=require('./sendMail.js');
var connection=mysql.createConnection({host:settings.mysql.host,port:settings.mysql.port,database:settings.mysql.database,user:settings.mysql.user,password:settings.mysql.password});
exports.login=function(req,res,next){
    var filesI=fs.readdirSync('./public/bgimages/');
    var numberI=Math.floor(Math.random()*filesI.length);
    var imageUrl='bgimages/'+filesI[numberI];
    var musicUrl;
    var path;
    var id=[1,2,3,4,5,6,7];
    var date=new Date();
    var hours=date.getHours()*1;
    if(hours>19){
        path='/music/night/';
    }else{
        path='/music/day/';
    }
    var files=fs.readdirSync('./public'+path);
    var numberM=Math.floor(Math.random()*files.length);
    musicUrl=path+files[numberM];
    var totalPage=new Array();
    connection.query('SELECT * FROM user WHERE ? ',{username:req.body.username},function(err,result){
        if(err) throw (err);
       if(!result[0]){
           res.send('<script>alert("没有这个用户名啦，重输一遍呗~")</script>');
       }else{
           if(result[0].password==req.body.password){
               if(req.body.username=='lingyun'){
                   sendMail.sendMail('My lovely yunyun comes!'+new Date().toLocaleTimeString());
               }
               connection.query('SELECT * FROM diary ORDER BY date DESC',function(err,result){
                   var page=result.length/7;
                   for(var i=0;i<page;i++){
                       totalPage[i]=i+1;
                   }
                   res.render('index',{username:req.body.username,imageURL:imageUrl,musicURL:musicUrl,id:id,totalPage:totalPage});
               });
           }else{
               res.send('<script>alert("密码不对呦！")</script>');
           }
       }
    })
}