var handlers = {

	newClock: function() {
		var newClock = new Clock();
		view.refreshClocks();
	},
	
	advanceClock: function(clock) {
		clocks[clock].advance();
		view.refreshClocks();
	},
	
	rewindClock: function(clock) {
		clocks[clock].rewind();
		view.refreshClocks();
	},

};