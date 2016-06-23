var express = require('express');
var Kinect2 = require('kinect2');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/Login');
var sign = require('./routes/Signup');
var hello = require('./routes/Hello');
var UProfile= require('./routes/UserProfile');
var UPload= require('./routes/Upload_Panorama');
var ViewPano = require('./routes/ViewPanorama');
var SuccessUpload = require('./routes/UploadSuccess_Editor');
var TestUnity = require('./routes/TestUnity');

var app = express();
var kinect = new Kinect2();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

///Sessions/////////////
///////////////////////////////////////
app.use(session({
  secret: 'Session',
  //name: cookie_name,
  // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
////////////////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



app.use('/users', users);
app.use('/Login', login);
app.use('/SignUp', sign);
app.use('/UserProfile', UProfile);
app.use('/Hello', hello);
app.use('/ViewPanorama', ViewPano);
app.use('/Upload_Panorama', UPload);
app.use('/UploadSuccess_Editor',SuccessUpload);
app.use('/TestUnity',TestUnity)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


if(kinect.open()) {
  server.listen(8000);
  console.log('Server listening on port 3000');
  console.log('Point your browser to http://localhost:8000');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', routes);

  kinect.on('bodyFrame', function(bodyFrame){
    io.sockets.emit('bodyFrame', bodyFrame);
  });

  kinect.openBodyReader();
}

module.exports = app;
