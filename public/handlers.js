var handlers = {

	newClock: function(type) {
		var newClock = new Clock(type);
		view.refreshClocks();
	},
	
	addHarmClock: function() {
		type = document.getElementById('addHarmClockSelect').value;
		var newClock = new Clock(type);
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
		view.refreshClocks();
	},

	updateTitle: function(clock) {
		var newName = document.getElementById('newClockTitleUpdateInput_'+clock).value;
		if (newName !== '') {clocks[clock].updateName(newName);};
		view.refreshClocks();
	},
	
	pickupClock: function(e) {
		view.focus.clock = this;
		window.addEventListener('mousemove',handlers.moveClock,true);
	},
	
	moveClock: function(e) {
		var clockX = e.x - 0.3 * document.documentElement.clientHeight;
		var clockY = e.y - 0.1 * document.documentElement.clientHeight;
		view.focus.clock.style.top = clockY + 'px';
		view.focus.clock.style.left = clockX + 'px';
		var clock = view.focus.clock.id.substr(view.focus.clock.id.indexOf('_')+1);
		clocks[clock].position.x = clockX;
		clocks[clock].position.y = clockY;
	},
	
	dropClock: function(clock) {
		window.removeEventListener('mousemove',handlers.moveClock,true);
	},
	
	displayColorPanel: function(clock) {
		view.displayColorPanel(clock);
	},
	
	updateColorInput: function(clock,color) {
		document.getElementById('colorInput_'+clock).value = color;
	},
	
	updateColor: function(clock) {
		view.updateClockColor(clock,document.getElementById('colorInput_'+clock).value);
	},
	
};

window.addEventListener('mouseup',handlers.dropClock,false);