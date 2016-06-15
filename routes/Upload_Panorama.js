var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var DBConn= require('../DatabaseConn/DBConnection');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();



router.get('/',urlencodedParser, function(req, res, next) {
    res.render('Upload_Panorama', { title: 'Upload Panorama' });
});

router.post('/',urlencodedParser, function(req, res, next) {
    res.render('Upload_Panorama', { title: 'Upload Panorama' });
});


module.exports = router;