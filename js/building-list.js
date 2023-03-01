

buildings_lyr.queryFeatures().then(function(results){
	var people_list = results.features
	people_list.forEach(function(person){
		makeCard(person)
	})
});