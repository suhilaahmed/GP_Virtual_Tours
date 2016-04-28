var express = require('express');
var session = require('express-session');
var DBConn= require('../DatabaseConn/DBConnection');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

var countries= [];
var citeis= [];
var buildings= [];
var museums= [];
var others= [];
var imgs= [];
var Cityim=[];
var Buildingim=[];
var Museumim=[];
var Otherim=[];

var LoadPanoramas = function () {
    var connection = DBConn.Conn;
    ////////////////////////////////// Countries////////////////////////////////////////

    var SelectCountries = connection.query('Select * from country ', function (err, rows) {
        if (err) throw err;


        for (var i = 0; i < rows.length; i++) {

            var obj = new Object();

            obj = rows[i];

            countries.push(obj);

        }


    });
/////////////////////////////////////////Cities///////////////////////////////////////

    var SelectCity = connection.query('Select * from city ', function (err, rows2) {
        if (err) throw err;



        for (var i = 0; i < rows2.length; i++) {

            var CityIDD= {CityID : rows2[i].CityID}

            var city = {
                CityID: rows2[i].CityID,
                Name: rows2[i].Name,
                CountryID: rows2[i].CountryID,
            }

            var SelectCityImage = connection.query('Select * from city_image where  ? ',CityIDD, function (err, rows3) {

                Cityim.push(rows3[0].ImagePath) ;

            });
            citeis.push(city);
        }

    });


    var SelectMuseum = connection.query('Select * from museum ', function (err, rows) {
        if (err) throw err;

        //  req.session.museum=rows;
        for (var i = 0; i < rows.length; i++) {


            var post2 = {MuseumID: rows[i].MuseumID};

            var obj2 = rows[i];
            var Museum = {
                MuseumID: obj2.MuseumID,
                Name: obj2.Name,
                CountryID: obj2.CountryID,
            }
            var SelectCityImage = connection.query('Select * from museum_image where ? ', post2, function (err, rows5) {
                Museumim.push(rows5[0].ImagePath);
            });
            museums.push(Museum);
        }

    });

//============================================ select buildings =======================================\\

    var SelectBuilding = connection.query('Select * from building ', function (err, rows) {
        if (err) throw err;


        for (var i = 0; i < rows.length; i++) {

            var post3 = {BuildingID: rows[i].BuildingID};

            var Building = {
                BuildingID: rows[i].BuildingID,
                Name: rows[i].Name,
                CountryID: rows[i].CountryID,
            }


            var SelectCityImage = connection.query('Select * from building_image where ? ', post3, function (err, rows6) {

                Buildingim.push(rows6[0].ImagePath);
            });



            buildings.push(Building);



        }

    });

//============================================ select others =======================================\\

    var SelectOther = connection.query('Select * from other ', function (err, rows) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        for (var i = 0; i < rows.length; i++) {

            var post5 = {OtherID: rows[i].OtherID};
            var Other = {
                OtherID: rows[i].OtherID,
                Name: rows[i].Name,
                CountryID: rows[i].CountryID}


            var SelectCityImage = connection.query('Select * from other_image where ? ', post5, function (err, rows7) {


                Otherim.push(rows7[0].ImagePath);



            });

            others.push(Other);
        }



    });


}

module.exports.Load = LoadPanoramas;

module.exports.countries=countries;
module.exports.cities=citeis;
module.exports.buildings=buildings;
module.exports.museums=museums;
module.exports.others=others;
//console.log(others);
module.exports.Cityimages=Cityim;
module.exports.Buildingsimages=Buildingim;
module.exports.MuseumImages=Museumim;
module.exports.OtherImages=Otherim;
module.exports.images=imgs;


