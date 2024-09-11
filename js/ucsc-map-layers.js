var __variables = {
	"group_input_class": "vis-toggle eyeball",
	"single_input_class": "vis-toggle",
	"group_class": "toc-layer toc-layer-group",
	"single_class": "toc-layer vis-check"
}

var layer_config = {
	"1": {
		"input_id":"dining-group-toggle",
		"input_class":__variables["group_input_class"],
		"input_onclick":"groupToggle(foods)",
		"input_value":"Dining",
		"calcite_icon_id":"dining-eyeball",
		"label_for":"dining-group-toggle",
		"img_src":"https://img.icons8.com/small/16/CC3535/restaurant.png",
		"text": "Dining",
		"group": "",
		"type": "group",
		"class":"toc-layer toc-layer-group"
	},
	"2": {
		"input_id":"cafes-toggle",
		"input_class":__variables["single_input_class"],
		"input_onclick":"changeVisibility(cafes_lyr)",
		"input_value":"Restaurants",
		"calcite_icon_id":"",
		"label_for":"cafes-toggle",
		"img_src":"https://img.icons8.com/small/16/CC3535/restaurant.png",
		"text": "Restaurants & Cafes",
		"group": "Dining",
		"type": "single",
		"class":"toc-layer vis-check"
	},
	"3": {
		"input_id":"perks-toggle",
		"input_class":__variables["single_input_class"],
		"input_onclick":"changeVisibility(perks_lyr)",
		"input_value":"Perks",
		"calcite_icon_id":"",
		"label_for":"perks-toggle",
		"img_src":"https://img.icons8.com/small/16/CC3535/coffee.png",
		"text": "The Perk Coffee Shops",
		"group": "Dining",
		"type": "single",
		"class":"toc-layer vis-check"
	},
	"4": {
		"input_id":"dining-halls-toggle",
		"input_class":__variables["single_input_class"],
		"input_onclick":"changeVisibility(dining_lyr)",
		"input_value":"Dining Halls",
		"calcite_icon_id":"",
		"label_for":"dining-toggle",
		"img_src":"https://img.icons8.com/small/16/CC3535/empty-tray.png",
		"text": "Residential Dining Halls",
		"group": "Dining",
		"type": "single",
		"class":"toc-layer vis-check"
	},
	"5": {
		"input_id":"food-trucks-toggle",
		"input_class":__variables["single_input_class"],
		"input_onclick":"changeVisibility(foodtrucks_lyr)",
		"input_value":"Food Trucks",
		"calcite_icon_id":"",
		"label_for":"food-trucks-toggle",
		"img_src":"https://img.icons8.com/small/16/CC3535/food-truck.png",
		"text": "Food Trucks & Pop-ups",
		"group": "Dining",
		"type": "single",
		"class":"toc-layer vis-check"
	},
	"6": {
		"input_id":"transportation-group-toggle",
		"input_class":__variables["group_input_class"],
		"input_onclick":"groupToggle(transportations)",
		"input_value":"transportations",
		"calcite_icon_id":"dining-eyeball",
		"label_for":"transport-toggle",
		"img_src":"https://img.icons8.com/small/16/CC3535/transportation.png",
		"text": "Transportation",
		"group": "",
		"type": "group",
		"class":"toc-layer toc-layer-group"
	}
};


/*
li class="toc-layer toc-layer-group">
<input id="dining-group-toggle" class="vis-toggle eyeball" type="checkbox" onclick="groupToggle(foods)" value="Dining">
<calcite-icon id="dining-eyeball" class="vis" icon="view-hide"></calcite-icon>
<label class= "toc-layer toc-layer-label" for="dining-group-toggle">
	<img src="https://img.icons8.com/small/16/CC3535/restaurant.png" />
	Dining
</label>
</li>
<li class="toc-layer vis-check">
	<input id="cafes-toggle" class="vis-toggle" type="checkbox" onclick="changeVisibility(cafes_lyr)" value="Restaurants">
	<label class= "toc-layer toc-layer-label" for="cafes-toggle">
		<img src="https://img.icons8.com/small/16/CC3535/restaurant.png" />
		Restaurants & Cafes
	</label>
</li>
*/



// LAYERS
function buildLayerTOC() {
	var toc_list = document.getElementById("toc-list")
	for (var key in layer_config) {
		if (layer_config.hasOwnProperty(key)) {
			var new_li = document.createElement("li")
			new_li.setAttribute("class", layer_config[key].class)
			
			var new_input = document.createElement("input")
			new_input.setAttribute("id",layer_config[key].input_id)
			new_input.setAttribute("class", layer_config[key].input_class) 
			new_input.setAttribute("type", "checkbox")
			new_input.setAttribute("onclick", layer_config[key].input_onclick)
			new_input.setAttribute("value", layer_config[key].input_value)
			
			if (key == "calcite_icon_id") {
				if (layer_config[key].calcite_icon_id.length > 1) {
					var calcite_icon = document.createElement("calcite-icon")
					calcite_icon.setAttribute("id", "dining-eyeball")
					calcite_icon.setAttribute("class", "vis")
					calcite_icon.setAttribute("icon", "view-hide")
				}
			}
			
			var new_label = document.createElement("label")
			new_label.setAttribute("class", "toc-layer toc-layer-label")
			new_label.setAttribute("for", layer_config[key].label_for)
			new_label.textContent = layer_config[key].text
			
			var new_img = document.createElement("img")
			new_img.setAttribute("src", layer_config[key].img_src)
			
			new_label.appendChild(new_img)
			new_li.appendChild(new_input)
			//new_li.appendChild(calcite_icon)
			new_li.appendChild(new_label)
			
			toc_list.appendChild(new_li)
			
			//var new_a = document.createElement("a")
			/*
			for (var k in layer_config[key]) {
				console.log(key + " -> " + k + " -> " + layer_config[key][k]);
				//new_a.setAttribute(k, layer_config[key][k])
				//new_a.appendChild(new_ul)
				layer_list.appendChild(new_li)
			}
			*/
		}
	}
}

// LEFTNAV LINKS
function buildLeftNav() {
	var left_nav = document.getElementsByClassName("menu-content")[0]
	for (var key in left_nav_links) {
		if (left_nav_links.hasOwnProperty(key)) {
			var new_ul = document.createElement("ul")
			new_ul.textContent = key
			if (key == "Map Products") {
				new_ul.setAttribute("id", "current-page")
			}
			var new_a = document.createElement("a")
			for (var k in left_nav_links[key]) {
				console.log(key + " -> " + k + " -> " + left_nav_links[key][k]);
				new_a.setAttribute(k, left_nav_links[key][k])
				new_a.appendChild(new_ul)
				left_nav.appendChild(new_a)
			}
		}
	}
}

// MAP CARDS
function buildMapCards() {
	var cards = document.getElementById("cards")
	for (var key in map_cards) {
		if (map_cards.hasOwnProperty(key)) {
			var new_a = document.createElement("a")
			new_a.setAttribute("href", map_cards[key]["href"])
			new_a.setAttribute("target", map_cards[key]["target"])

			var new_span = document.createElement("span")
			new_span.setAttribute("class", "card")

			var thumb_div = document.createElement("div")
			thumb_div.setAttribute("class", "thumb")
			thumb_div.style.setProperty("background-image", "url(../images/" + map_cards[key]["thumb"] + ")")
			console.log("url(../images/" + map_cards[key]["thumb"] + ")")
			var desc_div = document.createElement("div")
			desc_div.setAttribute("class", "card-description")

			var new_h5 = document.createElement("h5")
			new_h5.setAttribute("class", "card-title")
			new_h5.textContent = key

			var new_p = document.createElement("p")
			new_p.textContent = map_cards[key]["textContent"]

			desc_div.appendChild(new_h5)
			desc_div.appendChild(new_p)
			new_span.appendChild(thumb_div)
			new_span.appendChild(desc_div)
			new_a.appendChild(new_span)
			cards.append(new_a)
		}
	}
}

//$(document).ready(function() {
//	//buildLeftNav();
//	//buildMapCards();
//	buildLayerTOC();
//	alert("yo")		
//})

document.addEventListener("DOMContentLoaded", function() {
 	//buildLayerTOC();
});