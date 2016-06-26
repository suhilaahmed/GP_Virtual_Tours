/**
 * Created by Suhila ahmed on 2/10/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var DBConn= require('../DatabaseConn/DBConnection');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

var FullName ;
var Email ;
var BirthDate ;
var Password ;
var PhoneNumber ;
var FacebookAcc ;
var FlickerAcc ;
var imagePath;

//===========================

var Test1 = function (){
    console.log("Here");
}

var Login = function (req,res ,next){

    res.setHeader("Content-Type", "text/html");

    /////===================================================\\\\\\
    var connection = DBConn.Conn;
    ///================================================================\\\\\\




    FullName= req.body.email_address;

    Password = req.body.newpassword1;


    var post  = {
        FullName: FullName,

        Password: Password,

    };
    console.log('Here');

    var EmailUser = {Email :Email };
    var querySelectUser = connection.query('Select * from user ', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');

        for (var i = 0; i < rows.length; i++) {

           if(rows[i].FullName==FullName||rows[i].Email==FullName){
               if(rows[i].Password==Password){
                   console.log(rows[i]);

                   req.session.user=rows[i];
                   console.log("Session : "+req.session.user.FullName);
               var error=req.session.ErrorLogin;
                   if(error) {
                       delete req.session['ErrorLogin'];
                   }
                   res.redirect('/');

                   return true;
               }
               else{
                   req.session.ErrorLogin="* Wrong email or password";
                   res.redirect('/');
                   return false;
               }

           }

        };



    });



}

module.exports.Login = Login;