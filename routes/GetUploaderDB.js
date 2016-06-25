var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var loadPanos= require('./GetPanoramaDB');
var DBConn= require('../DatabaseConn/DBConnection');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var Uploader={};
var UserID;
var GetUploader = function(req,res,Link,type) {
    var connection = DBConn.Conn;

    if (type == "Buildings") {
        var querySelectImage = connection.query('Select * from building_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            GetUploaderDB(UserID,req,res);
            req.session.ImageObject=rows[0];
            req.session.ImageID=rows[0].BuildingImageID;
            console.log(req.session.ImageObject.BuildingImageID);
            //req.session.Uploader=Uploader;

            //res.render('TestUnity', { title: 'View',req:req,res:res});
        });
    }
   else if (type == "Cities") {
        var querySelectImage = connection.query('Select * from city_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            console.log(UserID);
            req.session.ImageObject=rows[0];
            req.session.ImageID=rows[0].CityImageID;
            GetUploaderDB(UserID,req,res);
           // req.session.Uploader=Uploader;
            console.log(Uploader.FullName+" FUU");
           // res.render('TestUnity', { title: 'View',req:req,res:res});

        });
    }
    if (type == "Museums") {
        var querySelectImage = connection.query('Select * from museum_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            GetUploaderDB(UserID,req,res);
            req.session.ImageObject=rows[0];
            req.session.ImageID=rows[0].MuseumImageID;
            //req.session.Uploader=Uploader;
           // res.render('TestUnity', { title: 'View',req:req,res:res});
        });
    }
    if (type == "Other") {
        var querySelectImage = connection.query('Select * from other_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            GetUploaderDB(UserID,req,res);
            req.session.ImageObject=rows[0];
            req.session.ImageID=rows[0].OtherImageID;
           // req.session.Uploader=Uploader;

        });
    }


};

function GetUploaderDB(UID,req,res){

    var connection = DBConn.Conn;

    var querySelectUser = connection.query('Select * from user where UserID = ?' ,UID, function(err,rows) {
        if (err) throw err;

        console.log(rows[0]);
        Uploader = {
            UserID: rows[0].UserID,
            FullName: rows[0].FullName,
            Email: rows[0].Email,
            BirthDate: rows[0].BirthDate,
            Password: rows[0].Password,
            PhoneNumber: rows[0].PhoneNumber,
            FacebookAcc: rows[0].FacebookAcc,
            FlickerAcc: rows[0].FlickerAcc,
            ImagePath: rows[0].ImagePath
        };

        req.session.Uploader=Uploader;
         //IFFollowLikeShare(req,res,Uploader);
        var querySelectUser = connection.query('Select * from following ', function(err,rows) {
            if (err) throw err;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].FollowerID == req.session.user.UserID && rows[i].FollowedID == Uploader.UserID) {
                    req.session.AlreadyFollowed = true;

                }
            }
            res.render('TestUnity', { title: 'View',req:req,res:res});
        });
        //res.render('TestUnity', { title: 'View',req:req,res:res});
    });

}
function IFFollowLikeShare(UID,req,res,Uploader){

    var connection = DBConn.Conn;

    var querySelectUser = connection.query('Select * from Likes ', function(err,rows) {
        if (err) throw err;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].LikerID == req.session.user.UserID && rows[i].LikedID == Uploader.UserID && rows[i].LikedImageID == req.session.ImageID) {
                req.session.AlreadyLiked = true;

            }
        }
    });
        var querySelectUser = connection.query('Select * from Shares', function(err,rows) {
            if (err) throw err;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].SharerID == req.session.user.UserID && rows[i].SharedID == Uploader.UserID && rows[i].LikedImageID == req.session.ImageID) {
                    req.session.AlreadyShared = true;

                }
            }
        });
         var querySelectUser = connection.query('Select * from following ', function(err,rows) {
             if (err) throw err;
             for (var i = 0; i < rows.length; i++) {
                 if (rows[i].FollowerID == req.session.user.UserID && rows[i].FollowedID == Uploader.UserID) {
                     req.session.AlreadyFollowed = true;

                 }
             }
             res.render('TestUnity', { title: 'View',req:req,res:res});
         });



}

module.exports.GetUploader=GetUploader;
