var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var DBConn= require('../DatabaseConn/DBConnection');
var busboy = require('busboy-body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var router = express.Router();


var Savephoto = function(req,res) {

    var countryName = req.param('month');
    console.log(countryName);
    var TypeName=req.body['TypeName'];
    console.log(TypeName);
    var ImagePath = '/images/uploads/'+req.file.filename;
   console.log(ImagePath);
    var countryID;
    var connection = DBConn.Conn;
    var querySelectCountry = connection.query('Select CountryID from country where CountryName = ?' , countryName, function(err,rows) {
        if (err) throw err;
        countryID=rows[0].CountryID;


        if(TypeName=="Cities") {

            var CityName = req.param('Pname');
            console.log(CityName);
            var found = false;
            var querySelectCountry  = connection.query('Select * from city', function(err,rows1) {
                if (err) throw err;
                for (var i = 0; i < rows1.length; i++) {
                    if(rows1[i].Name==CityName){
                        found=true;
                        console.log(rows1[i].Name);
                    }
                }
                if(!found){
                    var CityArray={};
                    var Summery = req.param('Desc');
                    CityArray = {
                        CountryID : countryID,
                        Name : CityName

                    }

                    var NewCityID ;
                    var queryInsert = connection.query('INSERT INTO city SET ?', CityArray, function (err, result) {
                        NewCityID = result.insertId;
                        console.log(NewCityID);


                        var CityImageArray ={};
                        CityImageArray = {
                            Name : CityName,
                            CityID : NewCityID,
                            UserID : req.session.user.UserID,
                            ImagePath : ImagePath,
                            Summery : Summery
                        }
                        var queryInsert = connection.query('INSERT INTO city_image SET ?', CityImageArray, function (err, result) {
                        });
                    });
                }
            });
            console.log("Not Found");
        }

        if(TypeName=="Buildings"){

            var BuildingName = req.param('BuildingName');
            var found = false;
            var querySelectCountry  = connection.query('Select * from building', function(err,rows1) {
                if (err) throw err;
                for (var i = 0; i < rows1.length; i++) {
                    if(rows1[i].Name==BuildingName){
                        found=true;
                    }
                }
                if(!found){
                    var BuildingArray={};
                    var Summery = req.param('Desc');
                    BuildingArray = {
                        CountryID : countryID,
                        Name : BuildingName

                    }

                    var NewBuildingID ;
                    var queryInsert = connection.query('INSERT INTO building SET ?', BuildingArray, function (err, result) {
                        NewBuildingID = result.insertId;
                    });
                    var BuildingImageArray ={};
                    BuildingImageArray = {
                        Name : BuildingName,
                        CityID : NewBuildingID,
                        UserID : req.session.user.UserID,
                        ImagePath : ImagePath,
                        Summery : Summery
                    }
                    var queryInsert = connection.query('INSERT INTO building_image SET ?', BuildingImageArray, function (err, result) {
                    });

                }
            });

        }
        if(TypeName=="Museums"){

            var MuseumName = req.param('MuseumName');
            var found = false;
            var querySelectCountry  = connection.query('Select * from museum', function(err,rows1) {
                if (err) throw err;
                for (var i = 0; i < rows1.length; i++) {
                    if(rows1[i].Name==MuseumName){
                        found=true;
                    }
                }
                if(!found){
                    var MuseumArray={};
                    var Summery = req.param('Desc');
                    MuseumArray = {
                        CountryID : countryID,
                        Name : MuseumName

                    }

                    var NewMuseumID ;
                    var queryInsert = connection.query('INSERT INTO museum SET ?', MuseumArray, function (err, result) {
                        NewMuseumID = result.insertId;
                    });
                    var MuseumImageArray ={};
                    MuseumImageArray = {
                        Name : MuseumName,
                        CityID : NewMuseumID,
                        UserID : req.session.user.UserID,
                        ImagePath : ImagePath,
                        Summery : Summery
                    }
                    var queryInsert = connection.query('INSERT INTO museum_image SET ?', MuseumImageArray, function (err, result) {
                    });

                }
            });
        }
        if(TypeName=="Others"){

            var OtherName = req.param('OtherName');
            var found = false;
            var querySelectCountry  = connection.query('Select * from other', function(err,rows1) {
                if (err) throw err;
                for (var i = 0; i < rows1.length; i++) {
                    if(rows1[i].Name==OtherName){
                        found=true;
                    }
                }
                if(!found){
                    var OtherArray={};
                    var Summery = req.param('Desc');
                    OtherArray = {
                        CountryID : countryID,
                        Name : OtherName

                    }

                    var NewOtherID ;
                    var queryInsert = connection.query('INSERT INTO other SET ?', OtherArray, function (err, result) {
                        NewOtherID = result.insertId;
                    });
                    var OtherImageArray ={};
                    OtherImageArray = {
                        Name : OtherName,
                        CityID : NewOtherID,
                        UserID : req.session.user.UserID,
                        ImagePath : ImagePath,
                        Summery : Summery
                    }
                    var queryInsert = connection.query('INSERT INTO other_image SET ?', OtherImageArray, function (err, result) {
                    });

                }
            });
        }
        // res.render('UploadSuccess_Editor', { title: 'UploadSuccess_Editor', req:req , res:res});
    });

}

/*router.get('/',urlencodedParser,function(req, res, next) {
 Savephoto(req,res);
 // res.render('UploadSuccess_Editor', { title: 'UploadSuccess_Editor' , req:req});
 });

 /*router.post('/',urlencodedParser, function(req, res, next) {
 res.render('UploadSuccess_Editor', { title: 'UploadSuccess_Editor' });
 });*/

module.exports.SavePho=Savephoto;
//module.exports=router;
