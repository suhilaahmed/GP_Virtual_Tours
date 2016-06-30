var express = require('express');
var router = express.Router();
var GetUplo= require('./GetUploaderDB');
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
    var link=req.query.link;
    var type=req.query.Type;

    if(req.body.like=="Follow"){
        console.log(req.body.like);
 folo.FollowDB(req,res);
        req.session.AlreadyFollowed=true;
    res.render('TestUnity', { title: 'View',req:req,res:res});}
    if(req.body.like=="Unfollow"){
        console.log(req.body.like);
        folo.unFollowDB(req,res);
        req.session.AlreadyFollowed=false;
        res.render('TestUnity', { title: 'View',req:req,res:res});}
    if(req.body.like=="Like"){
        Like.LikeDB(req,res);
        res.render('TestUnity', { title: 'View',req:req,res:res});}
    if(req.body.share=="Share"){
        Like.ShareDB(req,res);
        res.render('TestUnity', { title: 'View',req:req,res:res});}

    /*else{
        res.render('TestUnity', { title: 'View',req:req,res:res});}*/

});

module.exports = router;