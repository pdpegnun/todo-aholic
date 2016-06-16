// server.js

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    morgan = require('morgan'),
    database = require('./config/database'), 			// load the database config;
    port = process.env.PORT || 3000; 				// set the port

// Connection to DB ============================================================
mongoose.connect(database.localUrl, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares ==================================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
//app.use(morgan('dev'));                                 // log every request to the console

app.use(bodyParser.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                             // parse application/json
app.use(methodOverride());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);