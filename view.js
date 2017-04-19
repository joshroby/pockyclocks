var view = {

	refreshClocks: function() {
	
		var clocksDiv = document.getElementById('clocksDiv')
		clocksDiv.innerHTML = '';
	
		for (i in clocks) {
			var newClockDiv = document.createElement('div');
			newClockDiv.className = 'clockDiv';
			newClockDiv.id = 'clockDiv_' + i;
			
			var newClockTitle = document.createElement('h3');
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
			
			var newClockSVGDiv = document.createElement('div');
			newClockSVGDiv.className = 'clockSVGDiv';
			newClockDiv.appendChild(newClockSVGDiv);
			
			var newClockSVG  = document.createElementNS('http://www.w3.org/2000/svg','svg');
			newClockSVG.setAttribute('viewBox','0 0 100 100');
			newClockSVG.setAttribute('height',100);
			newClockSVG.setAttribute('width',100);
			newClockSVG.className = 'clockSVG';
			newClockSVGDiv.appendChild(newClockSVG);
			
			var segments = [
			
				'M52.502,47.506h44.935C96.175,23.302,76.706,3.833,52.502,2.571V47.506z',
				'M52.502,52.507v44.935c24.204-1.262,43.673-20.73,44.935-44.935H52.502z',
				'M2.567,52.507C3.829,76.711,23.298,96.18,47.502,97.441l0.001-44.935H2.567z',
				'M7.685,28.438c-3.027,5.938-4.775,12.446-5.123,19.069l38.115-0.001C19.955,35.543,11.321,30.556,7.685,28.438z',
				'M10.169,24.119l33.008,19.057L26.748,14.72c-1.162-2.012-2.005-3.473-2.618-4.548C18.544,13.8,13.78,18.559,10.169,24.119z',
				'M28.452,7.668l19.056,33.007V2.571C40.859,2.92,34.355,4.66,28.452,7.668z',
	
			];
			
			for (s in segments) {
				var fill = 'white';
				if (clocks[i].currentSegment > s) {fill = 'black'};
				var segment = document.createElementNS('http://www.w3.org/2000/svg','path');
				segment.setAttribute('stroke','black');
				segment.setAttribute('stroke-width','1');
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
			newClockRewindButton.setAttribute('onclick','handlers.rewindClock('+i+')');
			newClockControlsDiv.appendChild(newClockRewindButton);
			
			var newClockAdvanceButton = document.createElement('button');
			newClockAdvanceButton.innerHTML = '+';
			newClockAdvanceButton.setAttribute('onclick','handlers.advanceClock('+i+')');
			newClockControlsDiv.appendChild(newClockAdvanceButton);
			
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
		
		var labelInput = document.createElement('input');
		labelInput.setAttribute('type','text');
		labelInput.setAttribute('value',clocks[clock].labels[segment]);
		labelInput.id = 'labelInput_'+clock;
		
		var updateLabelButton = document.createElement('button');
		updateLabelButton.setAttribute('onclick','handlers.updateLabel('+clock+','+segment+')');
		updateLabelButton.innerHTML = 'update';
		
		var dismissLabelButton = document.createElement('button');
		dismissLabelButton.setAttribute('onclick','handlers.dismissLabelUpdate('+clock+')');
		dismissLabelButton.innerHTML = 'dismiss';
		
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
		console.log(segment);
	},

};