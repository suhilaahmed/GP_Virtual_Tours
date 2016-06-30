var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();

/* GET home page. */

router.get('/',urlencodedParser, function(req, res, next) {
    res.render('SignUp', { title: 'Sign up',req:req,res:res });
});
router.post('/',urlencodedParser, function(req, res, next) {
    res.render('SignUp', { title: 'Sign up',req:req,res:res });
});


module.exports = router;
