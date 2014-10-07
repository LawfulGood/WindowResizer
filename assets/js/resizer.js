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
	var customBtn = document.querySelector("#set-custom");
	var customWidth = document.querySelector("#custom-width");
	var customHeight = document.querySelector("#custom-height");
	var sizeInner = document.querySelector('#size-inner');

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
		// calculate height lost to window chrome
		heightDelta = outerHeight - innerHeight;

		// setup custom size button
		customBtn.onclick = function() {
			var w = Number(customWidth.value);
			var h = Number(customHeight.value);
			if(sizeInner.checked) {
				h += heightDelta;
			}

			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {width: w, height: h});
		}

		for(var k in sizes) {

			if(!sizes.hasOwnProperty(k)) continue;

			var newElement = document.createElement('button');
			newElement.className = 'btn btn-primary btn-small btn-block size';
			newElement.innerText = k;
			newElement.onclick = function () {
				var settingsObj = {};
				if(sizes[this.innerText].height) {
					settingsObj.width = sizes[this.innerText].width;
					settingsObj.height = sizes[this.innerText].height;
					if(sizeInner.checked) {
						settingsObj.height += heightDelta;
					}
				}
				else {
					settingsObj = sizes[this.innerText];
				}
				chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, settingsObj);
			};

			sizesDiv.appendChild(newElement);
		}
	}
})();
