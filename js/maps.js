const left_nav_links = {
    "About PPDO Maps":{
        "href":"https://maps.ucsc.edu/about",
        "target":"_blank"
    },
    "Map Products":{ 
        "href":"https://maps.ucsc.edu",
        "target":"_blank",
    },
    "PPDO Home":{
        "href":"https://ppc.ucsc.edu",
        "target":"_blank"
    },
	"Contact":{
        "href":"mailto:maps@ucsc.edu",
        "target":"_blank"
    }
};
const map_cards = {
    "Interactive Campus Map":{
        "href":"/index.html",
        "target":"_blank",
		"textContent":"Use this map to pan and zoom around the UCSC main campus to find features, including dining options, coffee shops, restooms, hiking trails and more!",
		"thumb":"interactive-map-thumb.PNG"
    },
    "Printable Area Maps":{ 
        "href":"/printable-maps/index2.html",
		"textContent":"Static collection of printable maps served in PDF format. Visit this page if you are looking for a digital version of the campus map poster, other thematic campus-wide maps, like parking maps and walking maps, or area-specific maps, e.g. Oakes College or Lower Campus",
		"thumb":"printable-maps-thumb.PNG"
    },
    "Detailed Directions":{
        "href":"https://maps.ucsc.edu/detailed-directions",
        "target":"_blank",
		"textContent":"Static collection of browser-based maps served in HTML format. Visit this page if you are looking for a web page with an area map alongside narrative directions.",
		"thumb":"detailed-directions-thumb.PNG"
    },
	"Active Construction":{
        "href":"https://maps.ucsc.edu/nothereyet",
        "target":"_blank",
		"textContent":"Browser-based webmap showing active construction projects and their associated impacts to campus life.",
		"thumb":"active-construction-thumb.PNG"
    },
    "Parking Locator":{
        "href":"https://ucsc.maps.arcgis.com/apps/webappviewer/index.html?id=8367f9db865545e29e093fef910249ad",
        "target":"_blank",
		"textContent":"Browser-based webmap to help you find the nearest parking lots from anywhere on campus.",
		"thumb":"parking-lot-thumb.PNG"
    }
};
const webpage_title = "UCSC | PPDO | Maps"
const title = "Campus Maps"
const subtitle = "UCSC / Physical Planning, Development & Operations / Maps"

$(document).ready(function() {
	
    buildPageTitle();
	buildLeftNav();
	buildMapCards();
	buildTitleDiv();

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