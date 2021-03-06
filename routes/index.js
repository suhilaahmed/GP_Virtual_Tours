var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var loadPanos= require('./GetPanoramaDB');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
loadPanos.Load();

//////////////////////Bring Images//////////////////

var CityImages=loadPanos.Cityimages;
var BuildingImages=loadPanos.Buildingsimages;
var MuseumsImages=loadPanos.MuseumImages;
var OtherImages = loadPanos.OtherImages;
var co = loadPanos.countries;
var ci = loadPanos.cities;
var bl = loadPanos.buildings;
var mu = loadPanos.museums;
var oth = loadPanos.others;

///////////////////////////////////////////////////////////////////////


router.get('/',urlencodedParser ,function(req, res, next) {
    for( var i=0;i<ci.length;i++){
        ci[i].ImagePath=CityImages[i];
    }
    for( var i=0;i<bl.length;i++){
        bl[i].ImagePath=BuildingImages[i];
    }
    for( var i=0;i<mu.length;i++){
        mu[i].ImagePath=MuseumsImages[i];
    }
    for( var i=0;i<oth.length;i++){
        oth[i].ImagePath=OtherImages[i];
    }
    req.session.countries = co;
    req.session.Cities=ci;
    req.session.buildings=bl;
    req.session.museums=mu;
    req.session.other=oth;
  res.render('index', { title: 'Express' ,req:req , res:res});
});
router.post('/',urlencodedParser ,function(req, res, next) {
    /*delete  req.session.countries;
     var loadPanos= require('./GetPanoramasDB');

     loadPanos.Load(req,res);*/

    var loginDB = require("./LoginDB");
    var Complete =loginDB.Login(req,res);
//var se=wait.forMethod( loginDB.Login(req,res));
    if(Complete==true) {
        res.render('index', {title: 'Home', req: req, res: res});
    }

});

router.get('/UserProfile', function(req, res, next) {

    res.render('UserProfile', { title: 'Profile' ,req:req,res:res});
});

module.exports = router;
