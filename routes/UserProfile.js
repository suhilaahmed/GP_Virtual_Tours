var express = require('express');
var router = express.Router();
var util = require('util');
var Save= require('./UploadSuccess_Editor');
var DBConn= require('../DatabaseConn/DBConnection');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = new express();
exports.imageForm = function(req, res) {
    res.render('upload', {
        title: 'Upload Images'
    });
};

exports.uploadImage = function(req, res) {
    console.log("here");

    updatePhoto(req,res);
    req.session.user.ImagePath='/images/uploads/'+req.file.filename;
    res.render('UserProfile',{
        title: 'UserProfile',req:req,res:res
    });
    console.dir(req.headers['content-type']);



    //split the url into an array and then get the last chunk and render it out in the send req.
    // var pathArray = req.file.image.path.split( '/' );

    /*res.send(util.format(' Task Complete \n uploaded %s (%d Kb) to %s as %s'
     , req.file.image.name
     , req.file.image.size / 1024 | 0
     , req.file.image.path
     , req.body.title
     , req.file.image
     , '<img src="../public/images/uploads/' + pathArray[(pathArray.length - 1)] + '">'
     ));*/


};
/* GET home page. */
var updatePhoto = function(req,res){
    var connection = DBConn.Conn;
 connection.query('UPDATE user set ImagePath = ? where UserID = ?',["/images/uploads/"+req.file.filename, req.session.user.UserID],
        function (err, result) {
            if (err) throw err;


        }
    );
}
router.get('UserProfile', function(req, res, next) {

    res.render('UserProfile', { title: 'Profile' ,req:req,res:res});
});

