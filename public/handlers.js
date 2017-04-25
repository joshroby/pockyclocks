var handlers = {
  roomNameSet: function(ev) {
    var val = ev.target.value;
    if (val != "") {
      startSync(val)
    }
  },

	newClock: function(type) {
		var newClock = new Clock(type);
    handlers.sendRoom();
		view.refreshClocks();
	},

	addHarmClock: function() {
		type = document.getElementById('addHarmClockSelect').value;
		var newClock = new Clock(type);
    handlers.sendRoom();
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

  loadRoom: function(room) {
    clocks = room.clocks;
		view.refreshClocks();
  },

  sendRoom: function() {
  },

  fetcherReadyChange: function(ev) {
    var xhr = ev.target
    if (xhr.readyState == XMLHttpRequest.DONE) {
      switch (xhr.status) {
      case 200:
        handlers.loadRoom(xhr.response);
        break;
      case 404:
        handlers.sendRoom();
        break;
      default:
        console.log(xhr.status, xhr.responseText);
      }
    }
  },

  senderReadyChange: function(ev) {
    var xhr = ev.target
    if (xhr.readyState == XMLHttpRequest.DONE) {
      switch (xhr.status) {
      case 200:
        break;
      case 404:
        break;
      default:
        console.log(xhr.status, xhr.responseText);
      }
    }
  },
};

function startSync(name){
  var fetcher = new XMLHttpRequest();
  var sender = new XMLHttpRequest();

  fetcher.open("GET", "/room/"+name);
  fetcher.responseType = "json";
  fetcher.onreadystatechange = handlers.fetcherReadyChange;
  fetcher.send();

  sender.open("PUT", "/room/"+name);
  sender.onreadystatechange = handlers.senderReadyChange;
  sender.setRequestHeader("Content-type", "application/json");

  handlers.sendRoom = function() {
    sender.send(JSON.stringify({clocks: clocks}));
  };
};


(function(w){
    w.roomSync = null;

    function bindHandlers() {
      document.getElementById('roomInput').addEventListener('blur', handlers.roomNameSet, true);
    }

    w.addEventListener('mouseup',handlers.dropClock,false);
    w.addEventListener('load', bindHandlers);
  }(window));
