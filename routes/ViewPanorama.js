var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var loadPanos= require('./GetPanoramaDB');
var GetUplo= require('./GetUploaderDB');
var DBConn= require('../DatabaseConn/DBConnection');
var async = require('async');
var step = require('step');
var Sync = require('sync');
var Q = require('q');
var sunc=require('synchronize');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var Uploader={};
var LoadPanorms=function(req,res){
    if(!req.session.countries||!req.session.cities){
    loadPanos.Load();
    var CityImages=loadPanos.Cityimages;
    var BuildingImages=loadPanos.Buildingsimages;
    var MuseumsImages=loadPanos.MuseumImages;
    var OtherImages = loadPanos.OtherImages;

    var co = loadPanos.countries;
    var ci = loadPanos.cities;
    var bl = loadPanos.buildings;
    var mu = loadPanos.museums;
    var oth = loadPanos.others;
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
    req.session.other=oth;}

}

var Get= function (req,res) {
    var link=req.query.link;
    var type=req.query.Type;
    GetUplo.GetUploader(req,res,link,type);
};

router.get('/',urlencodedParser ,function(req, res, next) {
   // var data=sunc.sync(res, 'render');
    Get(req,res);

    res.render('ViewPanorama', { title: 'View',req:req,res:res},function(err, data){});



});
module.exports = router;


