var express = require("express");
var http = require("http");
var morgan = require('morgan');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("./server/config/configurations");
var authenticateUser = require("./server/controllers/authentication-controller");
var authenticatedRoutes = require("./server/controllers/authenticatedRoutes.js")(passport);
var SocketIO = require("./server/socket/socket");

var app = express();

app.use(morgan('dev'));

//Initialize passport
app.use(passport.initialize());

//Creating the strategy
require("./server/config/passport")(passport);

//Creating the server
var server = http.createServer(app);

// Implementing the sockets require for chat to happen
SocketIO.addSocket(server);

//connection for localinstance String
var mongo_url = config.mongoLocalConn;

//Ip address and port for openshift via Environment variables
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            ipaddress = "127.0.0.1";
        };

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME;
}

//connecting to mongoose
mongoose.connect(mongo_url);

//Initializing body-parser
app.use(bodyParser.json());

app.use('/', express.static(__dirname+'/dist'));
app.use('/',express.static(__dirname+'/bower_components'));

//default index.html (Entry point)
app.get('/',function(req,res){
	//res.sendFile('index.html');
	res.sendFile(__dirname + '/dist/index.html');
});

//authentications Routes
app.use('/api/user',authenticateUser);

//authenticated routes and restricted user
app.use('/',authenticatedRoutes);

//Start listing 
server.listen(port, ipaddress,function(){
	console.log("Listening on host : "+ipaddress+" and port :"+port);
});
