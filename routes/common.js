var util = require('util');
var Save= require('./UploadSuccess_Editor');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.imageForm = function(req, res) {
    res.render('upload', {
        title: 'Upload Images'
    });
};

exports.uploadImage = function(req, res) {
    console.log("here");

    Save.SavePho(req,res);
    res.render('UploadSuccess_Editor',{
        title: 'UploadSuccess_Editor',req:req,res:res
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