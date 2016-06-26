var express = require('express');
var router = express.Router();
var folo= require('./FollowDB');
var Like= require('./Like_ShareDB');
var GetUplo= require('./GetUploaderDB');
/* GET home page. */
router.get('/', function(req, res, next) {
    var link=req.query.link;
    var type=req.query.Type;
    GetUplo.GetUploader(req,res,link,type);
    //res.render('TestUnity', { title: 'Unity' });
});
router.post('/', function (req,res,next) {
    if(req.param('like')=="Follow"){
 folo.FollowDB(req,res);
    res.render('TestUnity', { title: 'View',req:req,res:res});}
    if(req.param('like')=="unFollow"){
        folo.unFollowDB(req,res);
        console.log(req.body.like);
        res.render('TestUnity', { title: 'View',req:req,res:res});}
    if(req.param('like')=="Like"){
        Like.LikeDB(req,res);
        res.render('TestUnity', { title: 'View',req:req,res:res});}
    if(req.param('share')=="Share"){
        Like.ShareDB(req,res);
        res.render('TestUnity', { title: 'View',req:req,res:res});}

    else{
        res.render('TestUnity', { title: 'View',req:req,res:res});}

});

module.exports = router;