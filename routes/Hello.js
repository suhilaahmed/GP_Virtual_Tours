var express = require('express');
var session = require('express-session');
var DBConn= require('../DatabaseConn/DBConnection');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

/////User Paramaters//////////////////////
var FullName ;
var Email ;
var BirthDate ;
var Password ;
var PhoneNumber ;
var FacebookAcc ;
var FlickerAcc ;
var imagePath;
var UserArray={};
/////////////////////////////////////////////
var SignupDB = function(req,res){

    var day= req.body.day;
    var month= req.body.month;
    var year= req.body.year;
    var birth= year+'-'+month+'-'+day;

    console.log(req.body.day);

    FullName= req.body.Fname;
    Email = req.body.email;
    Password = req.body.newpassword1;
    PhoneNumber = req.body.phone;
    FacebookAcc = req.body.Face;
    FlickerAcc = req.body.Flickr;
    BirthDate = new Date(birth);


   /* if(req.param('Upload')!=""){
        imagePath = '/images/'+req.param('Upload');
    }
    else{
        imagePath='/images/default_profile.png';
    }*/



     UserArray   = {
        FullName: FullName,
        Email: Email,
        BirthDate: BirthDate,
        Password: Password,
        PhoneNumber : PhoneNumber,
        FacebookAcc :FacebookAcc,
        FlickerAcc : FlickerAcc
      //  ImagePath : imagePath
    };



        var coon = DBConn.Conn;
        // console.log(coon);
        var queryInsert = coon.query('INSERT INTO user SET ?', UserArray, function (err, result) {
        });

    var EmailUser = {Email :Email };
    var querySelectUser = coon.query('Select * from user where Email = ?' , Email, function(err,rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');
        //console.log(rows);
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i].FullName);
        }

        req.session.User = rows[0];
        res.redirect("/Hello");

    });
    }
router.post('/',urlencodedParser, function(req, res, next) {
     SignupDB(req,res);

   // res.render('Hello', { title: 'Hello ' , req:req  });

});
router.get('/',urlencodedParser, function(req, res, next) {

    res.render('Hello', { title: 'Hello ' , req:req  });

});

module.exports = router;