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
	
	segmentClick: function(clock,segment) {
		view.viewSegment(clock,segment+1);
	},
	
	updateLabel: function(clock,segment) {
		var newLabel = document.getElementById('labelInput_'+clock).value;
		clocks[clock].updateLabel(segment,newLabel);
		view.refreshClocks();
	},
	
	revealTitleUpdate: function(clock) {
		document.getElementById('titleName_'+clock).style.display = 'none';
		document.getElementById('titleUpdate_'+clock).style.display = 'inline';
	},
	
	dismissLabelUpdate: function(clock) {
		document.getElementById('clockSegmentViewDiv_'+clock).innerHTML = '';
	},
	
	updateTitle: function(clock) {
		var newName = document.getElementById('newClockTitleUpdateInput_'+clock).value;
		clocks[clock].updateName(newName);
		view.refreshClocks();
	},

};