var Node = require('NodeClass.js');

fs = require('fs')
fs.readFile('testData.txt', 'utf8', function (err,data) {
  if (err) {
      console.log(err);
  }

  var skiMap = getSkipMap(data);

	var Result = {
		finalPath: [],
		maxDrop: 0,
		maxLength: 0,
		addResult: function (path) {
			//check for duplicate path
			for (var i = 0; i < this.finalPath.length; i++) {
				if (path == this.finalPath[i]) {
					return;
				}
			}
			
			var length = path.length;
		    var drop = path[0].getVal(skiMap) - path[length-1].getVal(skiMap);
			
			if (length > this.maxLength || (length == this.maxLength && drop > this.maxDrop)) {
				//if find better path, clear all existing best paths
				// update max drop and max length
				this.finalPath = [path];	
				this.maxDrop = drop;
				this.maxLength = length;		
			} else if (length == this.maxLength && drop == this.maxDrop) {
				//add different and equivalently good path
				this.finalPath.push(path);
			}
			
		}
	};

	for (var i = 0; i < skiMap.length; i++) {
		for (var j = 0; j < skiMap[i].length; j++) {
			var thisNode = new Node(i,j);
			getPath(thisNode, [], skiMap, Result);
		}
	}


	for (var j = 0; j < Result.finalPath.length; j++) {
		printPath(Result.finalPath[j], skiMap);
	}
	
	console.log(Result.maxLength, Result.maxDrop);
});


function getPath(node, path, skiMap, result) {
	var pathClone = path.slice();
	if (node.hasVisited(pathClone)) {
		result.addResult(pathClone);
		return;
	}
	
	pathClone.push(node);
	
	var neighbours = node.getNeighbours(skiMap);
	
	for (var i = 0; i < neighbours.length; i++) {
		if (neighbours[i].hasVisited(pathClone)) {
			continue;
		}
		
		if (neighbours[i].getVal(skiMap) < node.getVal(skiMap)) {
			getPath(neighbours[i], pathClone, skiMap, result);
		} else {
			result.addResult(pathClone);
		}
	}
}

function printPath(path, skiMap) {
	var strArr = [];
	var geo = [];
	for (var i = 0; i < path.length; i++) {
		strArr.push(path[i].getVal(skiMap));
		geo.push([path[i].x, path[i].y]);
	}
	console.log(strArr.join(','));
	console.log(geo);
}

function getSkipMap(data) {
	var map = [];
	
	var inputData = data.split('\n');
    var dimension = parseInt(inputData[0].split(' ')[0]);
    
    for (var i = 1; i < dimension; i++) {
		map[i-1] = inputData[i].split(' ');
    }
	
	return map;
}





