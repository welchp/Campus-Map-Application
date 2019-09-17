const mega_header_links = {
    "MyUCSC":{
		"class":"mega-header-link",
        "href":"https://my.ucsc.edu",
        "target":"_blank"
    },
    "People":{
		"class":"mega-header-link",
        "href":"https://www.ucsc.edu/tools/people.html",
        "target":"_blank"
    },
    "Calendars":{
		"class":"mega-header-link",
        "href":"https://www.ucsc.edu/tools/calendars.html",
        "target":"_blank"
    },
	"A-Z Index":{
		"class":"mega-header-link",
        "href":"https://www.ucsc.edu/tools/azindex.html",
        "target":"_blank"
    }
};

$(document).ready(function() {
	
	buildMegaHeader();
	
	// MEGAHEADER
	function buildMegaHeader() {
		var mega_header = document.getElementById("mega-header-nav")
		for (var key in mega_header_links) {
			if (mega_header_links.hasOwnProperty(key)) {
				var new_h6 = document.createElement("h6")
				new_h6.textContent = key
				var new_a = document.createElement("a")
				for (var k in mega_header_links[key]) {
					console.log(key + " -> " + k + " -> " + mega_header_links[key][k]);
					new_a.setAttribute(k, mega_header_links[key][k])
				}
				new_a.appendChild(new_h6)
				mega_header.appendChild(new_a)
				var new_h6 = document.createElement("h6")
				var new_i = document.createElement("i")
				new_i.setAttribute("class", "fas fa-circle")
				new_i.setAttribute("style", "font-size:6px;color:#FDC700;")
				new_h6.appendChild(new_i)
				mega_header.appendChild(new_h6)
			}
		}
		var new_input = document.createElement("input")
		new_input.setAttribute("placeholder", "Search this site")
		mega_header.append(new_input)
	}	

})