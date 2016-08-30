var islandDAL = require('./DAL/islandDAL.js'),
IslandBase = require('./BLL/IslandBase.js'),
islandBase = new IslandBase();

var IslandAdministrator = function() {
	
};


IslandAdministrator.prototype.getEnquiries = function(callback) {
	return islandBase.getEnquiries(callback);
};

IslandAdministrator.prototype.calcIsland = function(gridDto, callback) {
	return islandBase.calcIsland(gridDto, callback);
};


module.exports = IslandAdministrator;