var express = require('express');
var router = express.Router();
var login=require('../controllers/login.js');
var publish=require('../controllers/publish.js');
var diary=require('../controllers/diary.js');
var ajax=require('../controllers/ajax.js');
var test=require('../controllers/test.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
   res.render('login');
});
router.post('/login',login.login);
router.get('/instruction',function(req,res,next){
    res.render('instruction');
});
router.post('/publish/:username?',publish.publish);
router.get('/ajax/:pageNumber?/:randomNumber?',ajax.ajax);
router.get('/diary/:date?/:publisherName?',diary.diary);
router.get('/test',test.test);
module.exports = router;
