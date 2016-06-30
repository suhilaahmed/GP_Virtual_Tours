var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var DBConn= require('../DatabaseConn/DBConnection');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var LikeDB= function(req,res){
    var connection = DBConn.Conn;
    var like={
        LikerID:req.session.user.UserID,
        LikedID:req.session.Uploader.UserID,
        LikedImageID:req.session.ImageID
    }
    var queryInsert = connection.query('INSERT INTO Likes SET ?', like, function (err, result) {
    });
}
var unLikeDB= function(req,res){
    var connection = DBConn.Conn;
    var like={
        LikerID:req.session.user.UserID,
        LikedID:req.session.Uploader.UserID,
        LikedImageID:req.session.ImageID
    }
    var queryInsert = connection.query('delete from likes where LikerID= ? AND LikedID=? AND LikedImageID=?', [req.session.user.UserID,req.session.Uploader.UserID,req.session.ImageID],
        function (err, result) {
        });
}
var ShareDB= function(req,res){
    var connection = DBConn.Conn;
    var Share={
        SharerID:req.session.user.UserID,
        SharedID:req.session.Uploader.UserID,
        LikedImageID:req.session.ImageID
    }
    var queryInsert = connection.query('INSERT INTO shared SET ?', Share, function (err, result) {
    });
}

module.exports.LikeDB=LikeDB;
module.exports.unLikeDB=unLikeDB;
module.exports.ShareDB=ShareDB;