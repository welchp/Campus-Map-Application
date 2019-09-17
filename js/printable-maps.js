const left_nav_links = {
    "About PPDO Maps":{
        "href":"https://maps.ucsc.edu/about",
        "target":"_blank"
    },
    "Map Products":{ 
        "href":"https://maps.ucsc.edu",
        "target":"_blank",
    },
	"Physical & Environmental Planning":{
        "href":"https://ppc.ucsc.edu/planning/planningstudies.html",
        "target":"_blank"
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

const printable_map_sections = {
    "Overview Maps":{
        "href":"#overview-maps"
    },
    "Campus College Facilities":{ 
        "href":"#campus-college-facilities-maps"
    },
	"Driving and Parking":{
        "href":"#driving-parking-maps",
    }
};

const webpage_title = "UCSC | Printable Maps"
const title = "Printable Maps"
const subtitle = "UCSC / Physical Planning, Development & Operations / Maps / Printable Maps"

$(document).ready(function() {
	
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
	
	function buildLeftNav2() {
		var left_nav = document.getElementsByClassName("menu-content")[0]
		var new_span = document.createElement("span")
		var new_h5 = document.createElement("h5")
		new_span.appendChild(new_h5)
		new_span.setAttribute("class", "side-nav-header")
		left_nav.appendChild(new_span)
		for (var key in printable_map_sections) {
			if (printable_map_sections.hasOwnProperty(key)) {
				var new_ul = document.createElement("ul")
				new_ul.textContent = key
				if (key == "Map Products") {
					new_ul.setAttribute("id", "current-page")
				}
				var new_a = document.createElement("a")
				for (var k in printable_map_sections[key]) {
					console.log(key + " -> " + k + " -> " + printable_map_sections[key][k]);
					new_a.setAttribute(k, printable_map_sections[key][k])
					new_a.appendChild(new_ul)
					left_nav.appendChild(new_a)
				}
			}
		}
	}
})