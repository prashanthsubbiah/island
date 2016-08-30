var islandDAL = require('../DAL/islandDAL.js');

var IslandBase = function(){
	
};

IslandBase.prototype.calcIsland = function(gridDto, callback) {
	var grid = gridDto.grid,
	ROWS = gridDto.rows,
	COLS = gridDto.cols,
	visited = [];

	var checkRange = function(grid, index1, index2, visited) {
		return (index1 >= 0) && (index2 >= 0) && (index1 < ROWS) && (index2 < COLS) && (grid[index1][index2].toLowerCase() === 'l' && !visited[index1][index2]);
	};

	var checkSurroundings = function(grid, index1, index2, visited) {
		var rowNeighbours = [-1, -1, -1, 0, 0, 1, 1, 1],
		colNeighbours = [-1, 0, 1, -1, 1, -1, 0, 1];

		visited[index1][index2] = true;

		for (var i=0; i<8; ++i) {
			if (checkRange(grid, index1 + rowNeighbours[i], index2 + colNeighbours[i], visited)) {
				checkSurroundings(grid, index1 + rowNeighbours[i], index2 + colNeighbours[i], visited);
			}
		}
	};

	var doCalc = function(grid) {
		var islandCount = 0;
		for (var j = 0; j < ROWS; ++j) {
			for (var k = 0; k < COLS; ++k) {
				if (grid[j][k].toLowerCase() === 'l' && !visited[j][k]) {
					checkSurroundings(grid, j, k, visited);
					++islandCount;
				}
			}
		}
		return islandCount;
	}

	var initArray = function(arr, length) {
		arr = [];
		for (var z = 0; z < length; z++) {
			arr[z] = [];
		}
		return arr;
	}

	visited = initArray(visited, ROWS);

	gridDto.islands = doCalc(grid);

	console.log(gridDto);
	return islandDAL.addEnquiry(gridDto, callback);

};

IslandBase.prototype.getEnquiries = function(callback) {
	return islandDAL.getAllEnquiries(callback);
};

module.exports = IslandBase;