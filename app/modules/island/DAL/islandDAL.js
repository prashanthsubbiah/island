var islandCollection,
obtainIslandCollection = function(){
	if(!islandCollection) {
		islandCollection = COREAPI.db.getCollection('island');
	}	
};

var islandDAL = {
	addEnquiry: function(enquiryDto, callback){
		obtainIslandCollection();
		enquiryDto.createdTime = new Date().toISOString();
		return islandCollection.insert(enquiryDto, callback);
	},
	getAllEnquiries: function(callback){
		obtainIslandCollection();
		var conditions = {	
			},
			options = {
			},
			orderBy = {
				'createdTime': -1
			};
		islandCollection.find(conditions, options).sort(orderBy).toArray(callback);
	}
};

module.exports=islandDAL;