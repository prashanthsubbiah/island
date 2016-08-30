var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var cors = require('cors');
//var methodOverride = require('method-override');
process.env.REGION = app.get('env');
app.use(morgan('dev'));	
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'})); 			
app.use(bodyParser.json()); 									
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(cors());
//routes configuration
require('./app/routes.js')(app);

//Winston logger
var logger = require('./config/logger.js');

//DB Connect
var DBconnect = require('./app/DBConnect.js'),
dbconnect = new DBconnect();

COREAPI = {
	db: dbconnect,
	logger: logger
};

var server = http.createServer(app);
server.listen(port);
COREAPI.logger.info('server running at '+port,{ 'module': 'general' });