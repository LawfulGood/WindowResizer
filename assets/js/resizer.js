(function resizer() {

	var sizes = {
		'800x600': {
			width: 800,
			height: 600
		},
		'1024x768': {
			width: 1024,
			height: 768
		},
		'1280x800': {
			width: 1280,
			height: 800
		},
		'1280x1024': {
			width: 1280,
			height: 1024
		},
		'1366x768': {
			width: 1366,
			height: 768
		},
		'1600x900': {
			width: 1600,
			height: 900
		},
		'1920x1080': {
			width: 1920,
			height: 1080
		},
		'Fullscreen': {
			state: 'maximized'
		}
	};


	var sizesDiv = document.getElementById('sizes');
	var outerHeight, innerHeight, heightDelta;

	chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(w){
		outerHeight = w.height;
		if(innerHeight) {
			populatePopup();
		}
	});

	chrome.tabs.query({active: true},function(t){
		innerHeight = t[0].height;
		if(outerHeight) {
			populatePopup();
		}
	});


	function populatePopup() {
		// calculate the difference between inner and outer height to get chrome height
		heightDelta = outerHeight - innerHeight;

		for(var k in sizes) {
			// update height to fix vertical loss due to window chrome
			sizes[k].height += heightDelta;
			if(!sizes.hasOwnProperty(k)) continue;
			var newElement = document.createElement('button');
			newElement.className = 'btn btn-primary btn-small btn-block size';
			newElement.innerText = k;
			newElement.onclick = function () {
				chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, sizes[this.innerText]);
			};

			sizesDiv.appendChild(newElement);
		}

	}
})();
