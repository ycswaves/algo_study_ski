module.exports = Node;

function Node(x, y) {
	this.x = x;
	this.y = y;
}

Node.prototype.getVal = function(map) {
	return parseInt(map[this.x][this.y]);
}

Node.prototype.getNeighbours = function(map) {
	var neighbours = [];
	
	if (typeof map[this.x-1] != 'undefined' && typeof map[this.x-1][this.y] != 'undefined') {
		neighbours.push(new Node(this.x-1, this.y));
	}
	
	if (typeof map[this.x][this.y-1] != 'undefined') {
		neighbours.push(new Node(this.x, this.y-1));
	}
	
	if (typeof map[this.x+1] != 'undefined' && typeof map[this.x+1][this.y] != 'undefined') {
		neighbours.push(new Node(this.x+1, this.y));
	}
	
	if (typeof map[this.x][this.y+1] != 'undefined') {
		neighbours.push(new Node(this.x, this.y+1));
	}
	
	return neighbours;		
}

Node.prototype.hasVisited = function (path) {
	for (var i = 0; i < path.length; i++) {
		if (path[i].x == this.x && path[i].y == this.y) {
			return true;
		}
	}
	return false;
}
