var mongodb = require('mongodb').MongoClient,
dbConfig = require('../config/mongodb.js');

var DBConnect = function(){
	this.env = dbConfig[process.env.REGION];
	var self=this,
	user = this.env.user,
	pass = this.env.pass,
	host = this.env.host,
	port = this.env.port,
	database = this.env.database,
	url;
	if(user && pass){
		url = 'mongodb://'+user+':'+pass+'@'+host+':'+port+'/'+database;
	} else {
		url = 'mongodb://'+host+':'+port+'/'+database;
	}
	return mongodb.connect(url, function(err, db) {
		if(err){
			COREAPI.logger.error('Mongo connection error ',err, { 'module': 'config' });
			return;
		}
		COREAPI.logger.info('Mongo connection successful', { 'module': 'config' });
		self.db = db;
	});
};

DBConnect.prototype.getDBHandler = function(){
	return this.db;
};

DBConnect.prototype.getCollection = function(collectionName){
	return this.db.collection(collectionName);
};

DBConnect.prototype.closeDB = function(){
	this.db.close();
	COREAPI.logger.info('Connection closed!', { 'module': 'config' });
};

module.exports = DBConnect;