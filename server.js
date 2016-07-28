////////////
// set up //
////////////

var express         = require('express');
var app             = express();                      // create the app w/ express
var mongoose        = require('mongoose');            // mongoose for mongodb
var port            = process.env.PORT || 3000;       // set the port
var database        = require('./config/database');   // load the db config
var morgan          = require('morgan');              // log requests to the console (express4)
var bodyParser      = require('body-parser');         // pull information from HTML POST (express4)
// var methodOverride  = require('method-override');     // simulate DELETE and PUT (express4)
var User            = require('./app/models/user');
var Reminder        = require('./app/models/reminder');
var Student         = require('./app/models/student');
var jwt             = require('jsonwebtoken');
var superSecret     = 'thisappisgonnabeawesome';

///////////////////
// configuration //
///////////////////

mongoose.connect(database.remoteUrl, function(err) {                  // connect to our mongoDB database
  if(err) {
    console.log('Failed connecting to Mongodb!');
  } else {
    console.log('Successfully connected to Mongodb!');
  };
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(function(req, res, next) {                              // configure app to handle cross-origin (CORS) requests
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
});
// app.use(methodOverride('X-HTTP-Method-Override'));              // override with X-HTTP-Method-Override header in request. simulate DELETE/PUT


////////////
// routes //
////////////

require('./app/routes.js')(app); // load routes


///////////////
// start app //
///////////////

// startup our app at http://localhost:3000
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);
