var clocks = [];

function Clock(name) {

	if (name == undefined) {name = 'Clock #' + clocks.length;};

	this.name = name;
	
	this.format = 'classic';
	
	this.priority = 'active';
	
	this.fillColor = 'black';
	this.emptyColor = 'white';

	this.currentSegment = 0;
	
	this.labels = [
		"Noon",
		"3 o'clock",
		"6 o'clock",
		"9 o'clock",
		"10 o'clock",
		"11 o'clock",
		"midnight!"
	];
	
	this.advance = function() {
		this.currentSegment = Math.min(this.currentSegment + 1,this.labels.length-1)
	};
	
	this.rewind = function() {
		this.currentSegment = Math.max(this.currentSegment - 1,0)
	};
	
	this.updateLabel = function(segment,newLabel) {
		this.labels[segment] = newLabel;
	};
	
	this.updateName = function(newName) {
		this.name = newName;
	};
	
	clocks.push(this);
	
};