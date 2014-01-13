(function resizer() {

	var sizes = [
		'800x600',
		'1024x768',
		'1280x800',
		'1280x1024',
		'1366x768',
		'1600x900',
		'1920x1080',
	];


	populateSizes(sizes);

	var objSizes = document.getElementsByClassName('size');
	for(var i = 0; i < objSizes.length; i++) {
		objSizes[i].onclick = function() {
			var scrollbar = 0;
			if(window.innerWidth != window.outerWidth) {
				scrollbar = window.innerWidth - window.outerWidth;
			}

			var view = {
				width: parseInt(this.dataset.x) - scrollbar,
				height: parseInt(this.dataset.y)
			};
			console.log(view);
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, view);
		}
	}

	function populateSizes(sizes) {
		var source = document.getElementById('size-template').innerHTML;
		var template = Handlebars.compile(source);

		sizes.forEach(function displaySize(size) {
			document.getElementById('sizes').innerHTML += template(parseSize(size));
		});
	}

	function parseSize(size) {
		var split = size.split('x');
		return {human: size, x: split[0], y: split[1]};
	}

})();
