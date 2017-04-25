var view = {

	focus: {},

	refreshClocks: function() {

		var clocksDiv = document.getElementById('clocksDiv')
		clocksDiv.innerHTML = '';

		for (i in clocks) {
			var newClockDiv = document.createElement('div');
			newClockDiv.className = 'clockDiv';
			newClockDiv.id = 'clockDiv_' + i;
			newClockDiv.style.top = clocks[i].position.y + 'px';
			newClockDiv.style.left = clocks[i].position.x + 'px';
			newClockDiv.style.backgroundColor = clocks[i].colors.background;
			newClockDiv.style.color = clocks[i].colors.text;

			var newClockTitle = document.createElement('h3');
			newClockTitle.style.backgroundColor = clocks[i].colors.headerBackground;
			newClockTitle.style.color = clocks[i].colors.header;
			newClockDiv.appendChild(newClockTitle);

			var newClockTitleName = document.createElement('span');
			newClockTitleName.id = 'titleName_'+i;
			newClockTitleName.innerHTML = clocks[i].name;
			newClockTitleName.setAttribute('onclick','handlers.revealTitleUpdate('+i+')');
			newClockTitle.appendChild(newClockTitleName);

			var newClockTitleUpdate = document.createElement('span');
			newClockTitleUpdate.className = 'titleUpdate';
			newClockTitleUpdate.id = 'titleUpdate_'+i;
			newClockTitle.appendChild(newClockTitleUpdate);
			var newClockTitleUpdateInput = document.createElement('input');
			newClockTitleUpdateInput.id = 'newClockTitleUpdateInput_'+i;
			newClockTitleUpdateInput.setAttribute('type','text');
			newClockTitleUpdate.appendChild(newClockTitleUpdateInput);
			var newClockTitleUpdateButton = document.createElement('button');
			newClockTitleUpdateButton.innerHTML = 'update';
			newClockTitleUpdateButton.setAttribute('onclick','handlers.updateTitle('+i+')');
			newClockTitleUpdate.appendChild(newClockTitleUpdateButton);

			var newClockMoveSpan = document.createElement('span');
			newClockMoveSpan.className = 'clockMoveSpan';
			newClockTitle.appendChild(newClockMoveSpan);

			var newClockMoveIcon = document.createElementNS('http://www.w3.org/2000/svg','svg');
			newClockMoveIcon.setAttribute('viewBox','0 0 10 10');
			newClockMoveIcon.setAttribute('height','2vh');
			newClockMoveIcon.setAttribute('width','2vh');
			newClockMoveIcon.addEventListener('mousedown',handlers.pickupClock.bind(newClockDiv),false);
			newClockMoveSpan.appendChild(newClockMoveIcon);

			var newClockMoveIconBackdrop = document.createElementNS('http://www.w3.org/2000/svg','rect');
			newClockMoveIconBackdrop.setAttribute('x',0);
			newClockMoveIconBackdrop.setAttribute('y',0);
			newClockMoveIconBackdrop.setAttribute('width',10);
			newClockMoveIconBackdrop.setAttribute('height',10);
			newClockMoveIconBackdrop.setAttribute('rx',2);
			newClockMoveIconBackdrop.setAttribute('rx',2);
			newClockMoveIconBackdrop.setAttribute('fill','gray');
			newClockMoveIcon.appendChild(newClockMoveIconBackdrop);

			var newClockMoveIconArrows = document.createElementNS('http://www.w3.org/2000/svg','path');
			newClockMoveIconArrows.setAttribute('stroke','#333333');
			newClockMoveIconArrows.setAttributeNS(null,'d','m 5,1 l-1,1 h1 v3 h-3 v-1 l-1,1 l1,1 v-1 h3 v3 h-1 l1,1 l1,-1 h-1 v-3 h3 v1 l1,-1 l-1,-1 v1 h-3 v-3 h1 l-1,-1 z');
			newClockMoveIcon.appendChild(newClockMoveIconArrows);

			var newClockSVGDiv = document.createElement('div');
			newClockSVGDiv.className = 'clockSVGDiv';
			newClockDiv.appendChild(newClockSVGDiv);

			var newClockSVG  = document.createElementNS('http://www.w3.org/2000/svg','svg');
			newClockSVG.className = 'clockSVG';
			newClockSVGDiv.appendChild(newClockSVG);

			var style = document.getElementById('clockStyleSelect').value;
			var segments = [];
			var strokeWidth = 1;
			if (style === 'Apocalypse World') {
				segments = [
					'M52.502,47.506h44.935C96.175,23.302,76.706,3.833,52.502,2.571V47.506z',
					'M52.502,52.507v44.935c24.204-1.262,43.673-20.73,44.935-44.935H52.502z',
					'M2.567,52.507C3.829,76.711,23.298,96.18,47.502,97.441l0.001-44.935H2.567z',
					'M7.685,28.438c-3.027,5.938-4.775,12.446-5.123,19.069l38.115-0.001C19.955,35.543,11.321,30.556,7.685,28.438z',
					'M10.169,24.119l33.008,19.057L26.748,14.72c-1.162-2.012-2.005-3.473-2.618-4.548C18.544,13.8,13.78,18.559,10.169,24.119z',
					'M28.452,7.668l19.056,33.007V2.571C40.859,2.92,34.355,4.66,28.452,7.668z',
				];
				newClockSVGDiv.style.cssFloat = 'left';
				newClockSVG.setAttribute('viewBox','0 0 100 100');
				newClockSVG.setAttribute('height','10vh');
				newClockSVG.setAttribute('width','10vh');
				strokeWidth = 1.5;
			} else if (style === 'Sprawl') {
				segments = [
					'M22.642,5.774 c-0.062,0.273-0.333,0.495-0.607,0.495H0.396c-0.273,0-0.444-0.222-0.383-0.495l1.194-5.279C1.268,0.222,1.54,0,1.813,0h21.639c0.274,0,0.445,0.222,0.383,0.495L22.642,5.774z',
					'M46.699,5.774 c-0.061,0.273-0.332,0.495-0.606,0.495H24.454c-0.274,0-0.445-0.222-0.384-0.495l1.194-5.279C25.326,0.222,25.597,0,25.871,0H47.51c0.274,0,0.444,0.222,0.383,0.495L46.699,5.774z',
					'M70.756,5.774 c-0.061,0.273-0.333,0.495-0.605,0.495H48.51c-0.272,0-0.444-0.222-0.383-0.495l1.194-5.279C49.383,0.222,49.655,0,49.929,0h21.638c0.274,0,0.444,0.222,0.383,0.495L70.756,5.774z',
					'M80.137,5.774 c-0.062,0.273-0.332,0.495-0.606,0.495h-6.93c-0.272,0-0.444-0.222-0.383-0.495l1.194-5.279C73.473,0.222,73.744,0,74.018,0h6.931c0.272,0,0.443,0.222,0.382,0.495L80.137,5.774z',
					'M89.438,5.774 c-0.062,0.273-0.332,0.495-0.606,0.495h-6.929c-0.273,0-0.445-0.222-0.384-0.495l1.193-5.279C82.774,0.222,83.047,0,83.319,0h6.93c0.274,0,0.444,0.222,0.383,0.495L89.438,5.774z',
					'M98.74,5.774 c-0.061,0.273-0.333,0.495-0.605,0.495h-6.93c-0.273,0-0.443-0.222-0.384-0.495l1.193-5.279C92.078,0.222,92.349,0,92.623,0h6.928c0.274,0,0.446,0.222,0.383,0.495L98.74,5.774z',
				];
				newClockSVG.setAttribute('viewBox','-5 0 105 10');
				newClockSVG.setAttribute('height','3vh');
				newClockSVG.setAttribute('width','28vh');
				strokeWidth = 0.5;
			} else if (style === 'Blades in the Dark') {
				segments = [
					'M47.5,56.035 M52.5,3.566v40.398l28.565-28.565 C73.138,8.263,63.151,4.126,52.5,3.566z',
					'M43.964,52.5 M56.035,47.5h40.399 c-0.561-10.651-4.697-20.638-11.834-28.566L56.035,47.5z',
					'M43.964,47.5 M56.035,52.501l28.565,28.565 c7.136-7.928,11.273-17.915,11.834-28.565H56.035z',
					'M47.5,43.964 M52.5,56.035v40.399 c10.651-0.561,20.638-4.697,28.566-11.834L52.5,56.035z',
					'M52.5,43.964 M18.934,84.601 c7.928,7.137,17.915,11.273,28.566,11.834V56.035L18.934,84.601z',
					'M56.035,47.5 M3.565,52.501 c0.561,10.651,4.698,20.638,11.833,28.565l28.565-28.565H3.565z',
					'M56.035,52.5 M3.565,47.5h40.398L15.398,18.935 C8.263,26.863,4.126,36.849,3.565,47.5z',
					'M52.5,56.035 M18.934,15.399L47.5,43.964V3.566 C36.848,4.126,26.862,8.263,18.934,15.399z',
				];
				newClockSVGDiv.style.cssFloat = 'left';
				newClockSVG.setAttribute('viewBox','0 0 100 100');
				newClockSVG.setAttribute('height','10vh');
				newClockSVG.setAttribute('width','10vh');
			} else if (style === 'MASHed') {
			};


			for (s in segments) {
				var fill = clocks[i].colors.empty;
				if (clocks[i].currentSegment > s) {fill = clocks[i].colors.fill};
				var segment = document.createElementNS('http://www.w3.org/2000/svg','path');
				segment.setAttribute('stroke',clocks[i].colors.stroke);
				segment.setAttribute('stroke-width',strokeWidth);
				segment.setAttribute('fill',fill);
				segment.setAttributeNS(null,'d',segments[s]);
				segment.setAttribute('onclick','handlers.segmentClick('+i+','+s+')');
				newClockSVG.appendChild(segment);
			};

			var newClockControlsDiv = document.createElement('div');
			newClockControlsDiv.className = 'clockControls';
			newClockDiv.appendChild(newClockControlsDiv);

			var newClockLabelCurrentlyP = document.createElement('p');
			newClockLabelCurrentlyP.innerHTML = "Currently:"
			newClockLabelCurrentlyP.className = 'newClockLabelCurrentlyP';
			var newClockLabelP = document.createElement('p');
			newClockLabelP.className = 'newClockLabelP';
			newClockLabelP.innerHTML =  clocks[i].labels[clocks[i].currentSegment];
			newClockControlsDiv.appendChild(newClockLabelCurrentlyP);
			newClockControlsDiv.appendChild(newClockLabelP);

			var newClockRewindButton = document.createElement('button');
			newClockRewindButton.innerHTML = '-';
			newClockRewindButton.className = 'newClockControlButton';
			newClockRewindButton.setAttribute('onclick','handlers.rewindClock('+i+')');
			newClockControlsDiv.appendChild(newClockRewindButton);

			var newClockAdvanceButton = document.createElement('button');
			newClockAdvanceButton.innerHTML = '+';
			newClockAdvanceButton.className = 'newClockControlButton';
			newClockAdvanceButton.setAttribute('onclick','handlers.advanceClock('+i+')');
			newClockControlsDiv.appendChild(newClockAdvanceButton);

			var newClockColorSVG = document.createElementNS('http://www.w3.org/2000/svg','svg');
			newClockColorSVG.setAttribute('viewBox','0 0 10 10');
			newClockColorSVG.setAttribute('height','1.2vh');
			newClockColorSVG.setAttribute('width','1.2vh');
			var rainbowGradient = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
			rainbowGradient.setAttribute('id','rainbowGradient');
			newClockColorSVG.appendChild(rainbowGradient);
			var redStop = document.createElementNS('http://www.w3.org/2000/svg','stop');
			redStop.setAttribute('offset','0%');
			redStop.setAttribute('stop-color','red');
			rainbowGradient.appendChild(redStop);
			var yellowStop = document.createElementNS('http://www.w3.org/2000/svg','stop');
			yellowStop.setAttribute('offset','50%');
			yellowStop.setAttribute('stop-color','yellow');
			rainbowGradient.appendChild(yellowStop);
			var blueStop = document.createElementNS('http://www.w3.org/2000/svg','stop');
			blueStop.setAttribute('offset','100%');
			blueStop.setAttribute('stop-color','blue');
			rainbowGradient.appendChild(blueStop);
			var rainbow = document.createElementNS('http://www.w3.org/2000/svg','rect');
			rainbow.setAttribute('x',0);
			rainbow.setAttribute('y',0);
			rainbow.setAttribute('width',10);
			rainbow.setAttribute('height',10);
			rainbow.setAttribute('rx',2);
			rainbow.setAttribute('rx',2);
			rainbow.setAttribute('fill','url(#rainbowGradient)');
			newClockColorSVG.appendChild(rainbow);

			var newClockColorButton = document.createElement('button');
			newClockColorButton.className = 'newClockControlButton';
			newClockColorButton.setAttribute('onclick','handlers.displayColorPanel('+i+')');
			newClockColorButton.appendChild(newClockColorSVG);
			newClockControlsDiv.appendChild(newClockColorButton);

			var newClockSegmentViewDiv = document.createElement('div');
			newClockSegmentViewDiv.className = 'newClockSegmentViewDiv';
			newClockSegmentViewDiv.id = 'clockSegmentViewDiv_' + i;
			newClockControlsDiv.appendChild(newClockSegmentViewDiv);

			clocksDiv.appendChild(newClockDiv);
		};

	},

	viewSegment: function(clock,segment) {
		var clockSegmentViewDiv = document.getElementById('clockSegmentViewDiv_'+clock);
		clockSegmentViewDiv.innerHTML = '';
		clockSegmentViewDiv.style.backgroundColor = clocks[clock].colors.background;

		var labelInput = document.createElement('input');
		labelInput.setAttribute('type','text');
		labelInput.setAttribute('value',clocks[clock].labels[segment]);
		labelInput.id = 'labelInput_'+clock;

		var updateLabelButton = document.createElement('button');
		updateLabelButton.setAttribute('onclick','handlers.updateLabel('+clock+','+segment+')');
		updateLabelButton.innerHTML = '&#10004;';

		var dismissLabelButton = document.createElement('button');
		dismissLabelButton.setAttribute('onclick','handlers.dismissLabelUpdate('+clock+')');
		dismissLabelButton.innerHTML = 'X';

		clockSegmentViewDiv.appendChild(labelInput);
		clockSegmentViewDiv.appendChild(updateLabelButton);
		clockSegmentViewDiv.appendChild(dismissLabelButton);

		var clockSVG = document.getElementById('clockDiv_'+clock).childNodes[1].childNodes[0];
		for (i=0; i < clockSVG.childNodes.length;i++) {
			clockSVG.childNodes[i].setAttribute('stroke','black');
			clockSVG.childNodes[i].setAttribute('stroke-width',1);
		};

		var segment = document.getElementById('clockDiv_'+clock).childNodes[1].childNodes[0].childNodes[segment-1];
		segment.setAttribute('stroke','red');
		segment.setAttribute('stroke-width',3);
	},

	displayColorPanel: function(clock) {
		var newClockSegmentViewDiv = document.getElementById('clockSegmentViewDiv_'+clock);
		newClockSegmentViewDiv.innerHTML = '';
		newClockSegmentViewDiv.style.backgroundColor = clocks[clock].colors.background;

		var redButton = document.createElement('button');
		redButton.style.backgroundColor = '#ff0000';
		redButton.className = 'dumbColorSelectButton';
		redButton.innerHTML = '&nbsp;';
		redButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#ff0000")');
		newClockSegmentViewDiv.appendChild(redButton);

		var orangeButton = document.createElement('button');
		orangeButton.style.backgroundColor = '#d2691e';
		orangeButton.className = 'dumbColorSelectButton';
		orangeButton.innerHTML = '&nbsp;';
		orangeButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#d2691e")');
		newClockSegmentViewDiv.appendChild(orangeButton);

		var yellowButton = document.createElement('button');
		yellowButton.style.backgroundColor = '#ffd700';
		yellowButton.className = 'dumbColorSelectButton';
		yellowButton.innerHTML = '&nbsp;';
		yellowButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#ffd700")');
		newClockSegmentViewDiv.appendChild(yellowButton);

		var greenButton = document.createElement('button');
		greenButton.style.backgroundColor = '#228b22';
		greenButton.className = 'dumbColorSelectButton';
		greenButton.innerHTML = '&nbsp;';
		greenButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#228b22")');
		newClockSegmentViewDiv.appendChild(greenButton);

		var blueButton = document.createElement('button');
		blueButton.style.backgroundColor = '#1e90ff';
		blueButton.className = 'dumbColorSelectButton';
		blueButton.innerHTML = '&nbsp;';
		blueButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#1e90ff")');
		newClockSegmentViewDiv.appendChild(blueButton);

		var indigoButton = document.createElement('button');
		indigoButton.style.backgroundColor = '#191970';
		indigoButton.className = 'dumbColorSelectButton';
		indigoButton.innerHTML = '&nbsp;';
		indigoButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#191970")');
		newClockSegmentViewDiv.appendChild(indigoButton);

		var violetButton = document.createElement('button');
		violetButton.style.backgroundColor = '#b155d3';
		violetButton.className = 'dumbColorSelectButton';
		violetButton.innerHTML = '&nbsp;';
		violetButton.setAttribute('onclick','handlers.updateColorInput('+clock+',"#b155d3")');
		newClockSegmentViewDiv.appendChild(violetButton);

		var colorInput = document.createElement('input');
		colorInput.id = 'colorInput_'+clock;
		colorInput.className = 'colorInput';
		colorInput.setAttribute('type','color');
		colorInput.setAttribute('value','#666666');
		newClockSegmentViewDiv.appendChild(colorInput);

		var updateColorButton = document.createElement('button');
		updateColorButton.setAttribute('onclick','handlers.updateColor('+clock+')');
		updateColorButton.innerHTML = '&#10004;';
		newClockSegmentViewDiv.appendChild(updateColorButton);

		var dismissColorButton = document.createElement('button');
		dismissColorButton.setAttribute('onclick','handlers.dismissLabelUpdate('+clock+')');
		dismissColorButton.innerHTML = 'X';
		newClockSegmentViewDiv.appendChild(dismissColorButton);
	},

	updateClockColor: function(clock,color) {
		var red = parseInt(color.substring(1,3),16);
		var green = parseInt(color.substring(3,5),16);
		var blue = parseInt(color.substring(5,7),16);

		if (red < 128 && green < 128 && blue < 128) {
			clocks[clock].colors.text = 'white';
			clocks[clock].colors.stroke = 'white';
		} else {
			clocks[clock].colors.text = 'black';
			clocks[clock].colors.stroke = 'black';
		};

		red /= 2;
		green /= 2;
		blue /= 2;

		var darkerColor = '#' + ("0" + Math.round(red).toString(16)).substr(-2) + ("0" + Math.round(green).toString(16)).substr(-2) + ("0" + Math.round(blue).toString(16)).substr(-2);

		if (red < 128 && green < 128 && blue < 128) {
			clocks[clock].colors.header = 'white';
		} else {
			clocks[clock].colors.header = 'black';
		};

		clocks[clock].colors.background = color;
		clocks[clock].colors.headerBackground = darkerColor;
		view.refreshClocks();
	},

};