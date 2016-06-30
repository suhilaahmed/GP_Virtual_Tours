var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var DBConn= require('../DatabaseConn/DBConnection');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var FollowDB= function(req,res){
    var connection = DBConn.Conn;
    var follow={
        FollowerID:req.session.user.UserID,
        FollowedID:req.session.Uploader.UserID
    }
 var queryInsert = connection.query('INSERT INTO following SET ?', follow, function (err, result) {
 });
}
var unFollowDB= function(req,res){
    var connection = DBConn.Conn;
    var follow={

        FollowerID:req.session.user.UserID,
        FollowedID:req.session.Uploader.UserID

    }
    var queryInsert = connection.query('delete from following where FollowerID= ? AND FollowedID=?', [req.session.user.UserID,req.session.Uploader.UserID],
        function (err, result) {
    });
}

module.exports.FollowDB=FollowDB;
module.exports.unFollowDB=unFollowDB;