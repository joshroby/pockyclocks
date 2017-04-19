var clocks = [];

function Clock(name) {

	if (name == undefined) {name = 'Clock #' + clocks.length;};

	this.name = name;

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
	
	clocks.push(this);
	
};