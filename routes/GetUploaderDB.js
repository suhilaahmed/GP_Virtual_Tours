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
            GetUploaderDB(UserID);
            req.session.Uploader=Uploader;
            //console.log((req.session.Uploader)+"MMMMMMMMMM");

        });
    }
    if (type == "Cities") {
        var querySelectImage = connection.query('Select * from city_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            GetUploaderDB(UserID);
            req.session.Uploader=Uploader;
            console.log((req.session.Uploader)+"MMMMMMMMMM");

        });
    }
    if (type == "Museums") {
        var querySelectImage = connection.query('Select * from museum_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            GetUploaderDB(UserID);
            req.session.Uploader=Uploader;
            console.log((req.session.Uploader)+"MMMMMMMMMM");

        });
    }
    if (type == "Other") {
        var querySelectImage = connection.query('Select * from other_image where ImagePath = ?', Link, function (err, rows) {
            if (err) throw err;

            UserID = rows[0].UserID;
            GetUploaderDB(UserID);
            req.session.Uploader=Uploader;
            console.log((req.session.Uploader)+"MMMMMMMMMM");

        });
    }


};

var storeSession=function(req,res,Uploader){
    req.session.Uploader=Uploader;
}

function GetUploaderDB(UID){

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


    });

}

module.exports.GetUploader=GetUploader;
module.exports.Uploader=Uploader;