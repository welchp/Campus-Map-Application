function changeCursor(response){
	if (response.results.length > 0 && response.results[0].graphic.layer.title == 'buildings_app'){
		document.getElementById("viewDiv").style.cursor = "pointer";
	} else {
		document.getElementById("viewDiv").style.cursor = "default";
	}
}

view.on("pointer-move", function (evt) {
	var screenPoint = {
		x: evt.x,
		y: evt.y
	};

	// the hitTest() checks to see if any graphics in the view
	// intersect the given screen x, y coordinates
	view.hitTest(screenPoint)
		.then(function (response) {
			if (response.results.length > 0) {
				changeCursor(response);
			}
	});
});