const left_nav_links = {
    "PPDO Homepage":{
        "href":"https://ppc.ucsc.edu",
        "target":"_blank"
    },
	"UCSC Homepage":{ 
        "href":"https://ucsc.edu",
        "target":"_blank",
    }    
};
const map_cards = {
    "Interactive Campus Map":{
        "href":"../index.html",
        "target":"_blank",
		"textContent":"Use this browser-based map to pan and zoom around the UCSC main campus to find features like dining options, buildings, hiking trails and more!",
		"thumb":"interactive-map-thumb.PNG"
    },
    "Printable Maps":{ 
        "href":"../printable-maps/",
		"textContent":"Static collection of printable and downloadable maps served in PDF format. Visit this page if you are looking for a digital version of the campus map poster, area-specific maps, or thematic maps, like parking or walking maps.",
		"thumb":"printable-maps-thumb.PNG"
    },
    "Detailed Directions":{
        "href":"../detailed-directions/",
        "target":"_blank",
		"textContent":"Static collection of browser-based maps served in HTML format. Visit this page if you are looking for a web page with an area map alongside narrative directions.",
		"thumb":"detailed-directions-thumb.PNG"
    }
};
const webpage_title = "UCSC | PPDO | Maps"
const title = "Campus Maps"
const subtitle = "UCSC / Physical Planning, Development & Operations / Maps"

$(document).ready(function() {
	
	buildLeftNav();
	buildMapCards();

	// WEBPAGE TITLE 
	function buildPageTitle() {
		document.title = webpage_title
	}
	// TITLE DIV
	function buildTitleDiv() {
		page_title = document.getElementById("page-title")
		page_title.textContent = title
		page_subtitle = document.getElementById("subtitle")
		page_subtitle.textContent = subtitle
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
		
})