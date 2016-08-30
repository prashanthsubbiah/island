var IslandAdministrator = require('./modules/island/IslandAdministrator.js'),
islandAdmin = new IslandAdministrator();

module.exports = function(app) {
	// API
	app.get('/api', function(req, res) {
		res.end('Welcome to Island API');
	});

	app.get('/api/getEnquiries', function(req, res){
		//Get conversations for particular room name
		var respData = {},
		onFetch = function(err, data){
			if(err) {
				return res.status(500).end(err);
			}
			respData.success = true;
			respData.data = data;
			return res.json(respData);
		};
		return islandAdmin.getEnquiries(onFetch);
	});

	app.post('/api/calcIsland', function(req, res){
		var postBody = req.body,
		respData = {},
		onPostSuccess = function(err, data){
			if(err) {
				return res.status(500).end(err);
			} else if(data.result.ok){
				respData.success = true;
				if(data.ops.length) {
					respData.data = data.ops[0];
				}
				return res.json(respData);
			} else {
				err = 'Something wrong with the insert operation';
				return res.status(500).end(err);
			}
		};
		if(postBody.grid.length && postBody.rows && postBody.cols){
			return islandAdmin.calcIsland(postBody, onPostSuccess);
			// return res.json(postBody);
		} else {
			var err='Mandatory post body params are empty!';
			COREAPI.logger.error(err,{ module: 'users', route: 'registerUser' });
			return res.status(500).end(err);
		}
	});

	// Application Front End
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};