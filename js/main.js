var visLayers;
var clearbutton;

var monitorClearAll;
var setVisibilities;
var allFalse; 

var satellite;
var carto;
var hybrid;

var map;
var webmap;
var aerial_webmap;
var cad_webmap;
var terrain_map;
var poster_webmap;
var stamen_webmap;
var newspaper_webmap;

var view;
var viewD;
var homeBtn;
var app_popup;
var searchWidget;
var searchWidget2;

var params;
var query;

var foodLabelClass;
var buildingsLabelClass;
var zonesLabelClass;
var parkingLabelClass;
var metroLabelClass;
var shuttleLabelClass;
var academicsLabelClass;
var recLabelClass;

var poi_lyr;
var rec_lyr;
var stops_lyr;
var zones_lyr;
var cafes_lyr;
var perks_lyr;
var labels_lyr;
var gardens_lyr;
var parking_lyr;
var shuttles_lyr;
var colleges_lyr;
var metro_bus_lyr;
var buildings_lyr;
var libraries_lyr;
var bus_route_lyr;
var food_trucks_lyr;
var bike_repair_lyr;
var dining_halls_lyr;
var bike_parking_lyr;
var genderinclusive_lyr;
var emergency_phones_lyr;
var lactation_lyr;
var buildingsLayerView;

var foods = [];
var transportations = [];
var academics = [];
var facilities = [];
var recreations = [];
var allLayers = [];
var everyLayer = [];

var pinkMarker;
var sizeVisVar;
var greenMarker;
var yellowMarker;
var defaultMarker;
var lightBlueMarker;

function setBuildingLabels() {
	$(document).ready(function(){
		var buildingLabelsVisible = $("input[type='radio'][name='building-label-toggle']");
		buildingLabelsVisible.click(function(){
			var radioValue = $("input[type='radio'][name='building-label-toggle']:checked").val();
			if(radioValue == 'on'){
			    buildings_lyr.labelsVisible = true;
			} else {
				buildings_lyr.labelsVisible = false;
			}
		});
	});
}

function setBasemap() {
  $(document).ready(function(){
		var basemapSelector = $("input[type='radio'][name='basemap-selector']");
		basemapSelector.click(function() {
			var radioValue = $("input[type='radio'][name='basemap-selector']:checked").val();
			if(radioValue == 'satellite') {
			  	switchBasemap(satellite);
			} else if (radioValue == 'carto') {
				switchBasemap(carto);			
			} else {
			  if(radioValue == 'hybrid') {
			  	switchBasemap(hybrid)				
			}};
		})
  });
}

function switchBasemap(basemap){
  	console.log("view.map = " + basemap.title)
	view.map = basemap
  	allLayers.forEach(function(layers){
	    layers.forEach(function(lyr){
		  basemap.add(lyr)
		})  
	})
}

function isNotVisible(lyr){
  return lyr.visible == false
}

function groupToggle(layer_list) {	
  if (layer_list.some(isNotVisible)){
	  layer_list.forEach(function(lyr) {
	      lyr.visible = true
	  })
  } else {
	  layer_list.forEach(function(lyr) {
	  	  lyr.visible = false
  	  })
  }
}

function showLegend() {
    $('#legend-button').bind('click', function(){
        $('.legend').toggleClass('hidden');
    })
}
function toggleVisibility() {
    $('.visibility-toggle-pink').bind('click', function() {
        $(this).toggleClass('pink');
    });
    $('.visibility-toggle-gold').bind('click', function() {
        $(this).toggleClass('gold');
    });
    $('.visibility-toggle-purple').bind('click', function() {
        $(this).toggleClass('purple');
    });
    $('.visibility-toggle-blue').bind('click', function() {
        $(this).toggleClass('blue');
    });
    $('.visibility-toggle-orange').bind('click', function() {
        $(this).toggleClass('orange');
    });
    $('.visibility-toggle-green').bind('click', function() {
        $(this).toggleClass('green');
    });
};

function toggleMenu() {
    $("#menu-icon-div").bind('click', function() {
        $("#mobile-menu").toggleClass("hidden")
        $("#viewDiv").toggleClass("hidden")
    	$("#footer").toggleClass("hidden")
    });
    $(".menu-bottom-border").bind('click', function() {
        $("#mobile-menu").toggleClass("hidden")
        $("#viewDiv").toggleClass("hidden")
    	$("#footer").toggleClass("hidden")
    });
}

//Layer functions
function turnOnExploreMode() {
    $('#explore-button').bind('click', function() {
        $(this).toggleClass('explore-mode-on');
    })
}

function changeVisibility(lyr){
    console.log("visible was: " + lyr.visible)
    if (lyr.visible == false){
        lyr.visible = true;
        /*lyr.queryExtent().then(function(results) {
            view.goTo(results.extent);
        });*/
    } else {
        lyr.visible = false;
    }
    console.log("visible is: " + lyr.visible)
}

function indicateVisibility() {
	document.addEventListener('click', function (event) {
	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.side-nav-link')) return;
		if (event.target.childNodes[1].className == "icon-ui-radio-checked") {
			event.target.childNodes[1].className = "icon-ui-radio-unchecked"
		} else {
			event.target.childNodes[1].className = "icon-ui-radio-checked"
		}
	}, false);
}

function allLayersOn(side_nav_title) {
	for (i=0; i < side_nav_title.nextElementSibling.children.length; i++) {
		if (side_nav_title.nextElementSibling.children[i].children[0].getAttribute('class') == 'icon-ui-radio-checked') {
			console.log(side_nav_title.nextElementSibling.children[i].children[0].getAttribute('class'))
			//pass
		} else {
			console.log(side_nav_title.nextElementSibling.children[i].children[0].getAttribute('class'))
			return false
		}
	}
	return true
}

function indicateAll() {
	//event handler
	//when side-nav-title is clicked, get all children layers
	//if one is checked, make all checked, else, make all unchecked
	document.addEventListener('click', function (event) {
	if (!event.target.matches('.side-nav-title')) return;
		if (allLayersOn(event.target)){
			for (i=0; i < event.target.nextElementSibling.children.length; i++){
				event.target.nextElementSibling.children[i].children[0].setAttribute('class','icon-ui-radio-unchecked')
			}
		} else {
			for (i=0; i < event.target.nextElementSibling.children.length; i++){
				event.target.nextElementSibling.children[i].children[0].setAttribute('class','icon-ui-radio-checked')
			}
		}
	}, false);
}

//Drop down functions
function showMobileAmenities() {
    var x = document.getElementById("mobile-amenities");
        if (x.style.display == "") {
            x.style.display = "flex";
        } else { 
            x.style.display = "";
        }
}
function showMobileTransportation() {
    var x = document.getElementById("mobile-transportation");
        if (x.style.display == "") {
            x.style.display = "flex";
        } else { 
            x.style.display = "";
        }
}
function showMobileSafety() {
    var x = document.getElementById("mobile-safety");
        if (x.style.display == "") {
            x.style.display = "flex";
        } else { 
            x.style.display = "";
        }
}
function showMobileAcademics() {
    var x = document.getElementById("mobile-academics");
        if (x.style.display == "") {
            x.style.display = "flex";
        } else { 
            x.style.display = "";
        }
}
function showMobileRecreation() {
    var x = document.getElementById("mobile-recreation");
        if (x.style.display == "") {
            x.style.display = "flex";
        } else { 
            x.style.display = "";
        }
}

//Extra Functions
function showIcon() {
    var x = document.getElementById("connectivity-list");
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else { 
            x.className = x.className.replace(" w3-show", "");
        }
}
function highlightAmenities() {
    var x = document.getElementById("amenities");
        if (x.style.borderBottom == "") {
            x.style.borderBottom = "1px solid #5E84A0";
        } else { 
            x.style.borderBottom = "";
        }
}
function highlightTransportation() {
    var x = document.getElementById("transportation");
        if (x.style.borderBottom == "") {
            x.style.borderBottom = "1px solid #5E84A0";
        } else { 
            x.style.borderBottom = "";
        }
}
function highlightSafety() {
    var x = document.getElementById("safety");
        if (x.style.borderBottom == "") {
            x.style.borderBottom = "1px solid #5E84A0";
        } else { 
            x.style.borderBottom = "";
        }
}
function highlightAcademics() {
    var x = document.getElementById("academics");
        if (x.style.borderBottom == "") {
            x.style.borderBottom = "1px solid #5E84A0";
        } else { 
            x.style.borderBottom = "";
        }
}
function highlightRecreation() {
    var x = document.getElementById("recreation");
        if (x.style.borderBottom == "") {
            x.style.borderBottom = "1px solid #5E84A0";
        } else { 
            x.style.borderBottom = "";
        }
}

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/WebMap",
    "esri/layers/Layer",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "esri/widgets/Locate",
    "esri/widgets/Home",
    "esri/widgets/Popup",
    "esri/layers/support/LabelClass",
    "esri/layers/MapImageLayer",
    "esri/core/promiseUtils",
    "esri/core/watchUtils",
	"esri/core/urlUtils",
	"esri/tasks/support/Query",
	"esri/core/Collection",
    "dojo/domReady!"], function(
        esriConfig, 
		Map,
		MapView,
		Basemap,
		WebMap,
		Layer,
		FeatureLayer,
		Search,
		Locate,
		Home,
		Popup,
		LabelClass,
		MapImageLayer,
		promiseUtils,
		watchUtils,
		urlUtils,
		Query,
		Collection
        ) {
	
    //POPUP
    var app_popup = new Popup({
        dockEnabled: true,
        dockOptions:{
            position: "bottom-right"
        }
    });
    
    //FEATURE RENDERERS
    var defaultMarker = {
        type: "simple",
        symbol:{
            type: "simple-marker",
            size: "13px",
            color: [92,125,159,1.0],
            outline: {
                color: "white",
                width: 1
            }
        }
    };
    var pinkMarker = {
        type: "simple",
        symbol:{
            type: "simple-marker",
            size: "13px",
            color: [218,33,109, 1.0],
            outline: {
                color: "white",
                width: 1
            }
        }
    };
    var yellowMarker = {
        type: "simple",
        symbol:{
            type: "simple-marker",
            size: "13px",
            color: [255,191,0,1.0],
            outline: {
                color: "white",
                width: 1
            }
        }
    };
    var greenMarker = {
        type: "simple",
        symbol:{
            type: "simple-marker",
            size: "13px",
            color: "#93c02d",
            outline: {
                color: "white",
                width: 1
            }
        }
    };
    var lightBlueMarker = {
        type: "simple",
        symbol:{
            type: "simple-marker",
            size: "13px",
            color: [19, 165, 220, 1.0],
            outline: {
                color: "white",
                width: 1
            }
        }
    };
    
    
    //LABEL CLASSES
    var buildingsLabelClass = {
        symbol: {
            type: "text",
            color: "white",
            haloColor: [0, 0, 0, 1.0],
            haloSize: 0.75,
            font: {
                family: "Arial Unicode MS",
                size: 9,
                style:"normal",
                weight: "bold"
            }
        },
        labelPlacement: "always-horizontal",
        labelExpressionInfo: {
            expression: "$feature.LABELNAME"
        }
    };
    var zonesLabelClass = {
        symbol: {
            type: "text",
            color: [255,255,255,1.0],
            haloColor: [0,0,0,0.6],
            haloSize: 1,
            font: {
                family: "Arial Unicode MS",
                size: 14,
                style:"normal",
                weight: "bold"
            }
        },
        labelPlacement: "always-horizontal",
        labelExpressionInfo: {
            expression: "$feature.Name"
        }
    };
    var parkingLabelClass = {
        symbol: {
            type: "text",
            color: "white",
            haloColor: [0, 0, 0, 1.0],
            haloSize: 0.85,
            font: {
                family: "Arial Unicode MS",
                size: 10,
                style: "normal",
                weight: "normal"
            }
        },
        labelPlacement: "always-horizontal",
        labelExpressionInfo: {
            expression: "'LOT# ' + $feature.NUM"
        }
    };
    var metroLabelClass = {
        symbol: {
            type: "text",
            color: [204,153,51],
            haloColor: [255,255,255],
            haloSize: 1.0,
            font: {
                family: "Arial Unicode MS",
                size: 10,
                style: "normal",
                weight: "bold"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.NAME"
        }
    };
	var shuttleLabelClass = {
        symbol: {
            type: "text",
            color: [204,153,51],
            haloColor: [255,255,255],
            haloSize: 1.0,
            font: {
                family: "Arial Unicode MS",
                size: 10,
                style: "normal",
                weight: "bold"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.NAME"
        }
    };
    var foodLabelClass = {
        symbol: {
            type: "text",
            color: [228,69,75],
            haloColor: [255,255,255],
            haloSize: 1.0,
            font: {
                family: "Arial Unicode MS",
                size: 10,
                style: "normal",
                weight: "bold"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.Name"
        }
    };
	var academicsLabelClass = {
        symbol: {
            type: "text",
            color: [102,0,204],
            haloColor: [255,255,255],
            haloSize: 1.0,
            font: {
                family: "Arial Unicode MS",
                size: 10,
                style: "normal",
                weight: "bold"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.Name"
        }
    };
	var recLabelClass = {
        symbol: {
            type: "text",
            color: [78,152,34],
            haloColor: [255,255,255],
            haloSize: 1.0,
            font: {
                family: "Arial Unicode MS",
                size: 10,
                style: "normal",
                weight: "bold"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.Name"
        }
    };
    
	
	
    ///////    BASEMAPS     \\\\\\\
   
	
	carto = new WebMap({
        portalItem: {
		  	id:"09112c9e929a4f4588007f3791aac99e"
        }
    });
	carto.when(function(carto) {
        carto.addMany(everyLayer)
    })
	//795020303530467f8d096fca5f4d022c
	
  	satellite = new WebMap({
        portalItem: {
            id:"515d7e26cfb64c42824a97a46ce439ca"
        }
    });
	satellite.when(function(satellite) {
        satellite.addMany(everyLayer)
    })
	
	hybrid = new WebMap({
        portalItem: {
			id:"62c4794e40e14c94a4bf3a7258f40878"
        }
    });
	hybrid.when(function(hybrid) {
        hybrid.addMany(everyLayer)
    })
   
    //89f67154356949c8b147bfe0421482f2
	
    /////////////    MAP VIEW    \\\\\\\\\\\\\
	view = new MapView({
        container: "viewDiv",
        map: hybrid,
        zoom: 14,
        center: [-122.068564,36.999662],
		layerViews:everyLayer,
		popup:{
            highlightEnabled: true,
            dockEnabled: true,
            dockOptions:{
				buttonEnabled: false,
                position: "bottom-center"
            }
        }
    })
	
	
	////////////     WIDGETS      \\\\\\\\\\\\\	
    view.ui.remove("attribution");
    
    homeBtn = new Home({
        view: view
    })
    view.ui.add(homeBtn, "top-left")
    
    var locateBtn = new Locate({
        view: view
      });
    view.ui.add(locateBtn, {position: "top-left"});
    
	view.ui.add("map-options-footer", "top-right")
    
	searchWidget = new Search({
        view: view,
        maxSuggestions: 35,
		allPlaceholder: "Begin typing and select an option from the suggestions...",
        sources: [
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/colleges/FeatureServer/0"},
            searchFields: ["NAME"],
            displayField: "NAME",
            exactMatch: false,
            outFields: ["*"],
            name: "Campus Colleges",
            placeholder: "enter a campus college",
        	},
			{featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/ActiveConstruction/FeatureServer/0"},
            searchFields: ["NAME"],
            displayField: "NAME",
            exactMatch: false,
            outFields: ["NAME"],
            name: "Campus Zones",
            placeholder: "enter a campus zone",
        	},
			{featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/buildings_app/FeatureServer/0"},
            searchFields: ["BUILDINGNAME", "ABBREVSHORT", "ALIAS", "LABELNAME", "DEPARTMENTS"],
            displayField: "BUILDINGNAME",
            exactMatch: false,
            outFields: ["BUILDINGNAME"],
            name: "Buildings",
            placeholder: "enter a building name or departments",
            },
        	{featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Parking_Lots/FeatureServer/0"},
            searchFields: ["NUM", "Permit_Type"],
            suggestionTemplate: "Parking Lot {NUM} for {NAME}",
            displayField: "NUM",
            exactMatch: false,
            outFields: ["NAME", "NUM","Location","Permit_Type","Handicapped","Meters","Comments", "Paystations", "Paystation_Limit","Meter_Limit","Permit_Days","Permit_Period"],
            name: "Parking Lots",
            placeholder: "enter parking lot information"
            },
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/BusStops/FeatureServer/0"},
            searchFields: ["NAME", "STOPTYPE", "label_name"],
            displayField: "label_name",
            exactMatch: false,
            outFields: ["label_name", "STOPTYPE"],
            name: "BusStops",
            placeholder: "enter transit stop name or type"
            },
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/1"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Cafes and Restaurants",
            placeholder: "enter a caffe or restaurant",
			},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/2"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Dining Halls",
            placeholder: "enter a dining hall location",
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/3"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Perk Coffee Houses",
            placeholder: "enter a perk location",
			},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/4"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Food Trucks",
            placeholder: "enter a food truck name",
        	}        
        ]
    });
    searchWidget.includeDefaultSources = false //remove ArcGIS World Geocoding Service
	searchWidget.on("select-result", function(event){
	  searchWidget.clear();
	  buildings_lyr.labelsVisible = true
	  view.zoom = 19
	  var viewD = document.getElementById('viewDiv');
	  var mobile_menu = document.getElementById('mobile-menu');
	  var menu_icon = document.getElementById('menu-icon');
	  var close_menu_icon = document.getElementById('close-menu-icon');
	  if (viewD.style.display == 'none'){
		viewD.style.display = 'flex'
		mobile_menu.style.display = 'none'
		menu_icon.style.display = 'flex'
		close_menu_icon.style.display = 'none'
	  }
	});
    view.ui.add(searchWidget, {position: "top-right"});

	//LOAD ALL MAP LAYERS
	buildings_lyr = new FeatureLayer({
        portalItem:{
            id:"9f17f4aed3554b15a189f89b13f36b58"
        },
        definitionExpression: "OBJECTID not in (703)",
        visible: true,
	  	renderer: {
			type: "simple",  // autocasts as new SimpleRenderer()
			symbol: {
			  type: "simple-fill",  // autocasts as new SimpleMarkerSymbol()
			  color: [255,255,255,0.1],
			  outline: {  // autocasts as new SimpleLineSymbol()
				width: 0.5,
				color: null
			  }
			}
		  },
        labelingInfo: [buildingsLabelClass]
    })
	buildings_lyr.labelsVisible = false;	
    
	colleges_lyr = new FeatureLayer({
        portalItem:{
            id:"de8c23622c384eb6968a7e77d6ba68d9"
        },
        visible: false,
        labelingInfo:[zonesLabelClass]
    })
    zones_lyr = new FeatureLayer({
        portalItem:{
            id: "b32de48939334c9eb0a02aac90ef0fc4"
        },
        visible: false
    })
    parking_lyr = new FeatureLayer({
        portalItem:{
            id: "f795b2c9af644ac190cec4d72b767041"
        },
        visible: false,
        labelingInfo:[parkingLabelClass],
        definitionExpression: "NUMBER is not null"
    })
    poi_lyr = new FeatureLayer({
        portalItem:{
            id:"b255a3ac03bf4bda812305f105e6b65c"
        },
        visible: false,
        labelingInfo:[recLabelClass]
    })
    rec_lyr = new FeatureLayer({
        portalItem:{
            id:"30ba437201bd4a16b90ca8b34ea65a4a"
        },
        visible: false,
        labelingInfo:[recLabelClass]
    })
    libraries_lyr = new FeatureLayer({
        portalItem:{
            id:"b82d703a18bc469392089b91b413a5f5"
        },
        visible: false,
        labelingInfo:[academicsLabelClass]
    })
    cafes_lyr = new FeatureLayer({
        portalItem:{
            id: "02955b4e54374e619acfe592edb4a2f1"
        },
        layerId:1,
        visible: false,
        labelingInfo:[foodLabelClass],
    })
    dining_halls_lyr = new FeatureLayer({
        portalItem:{
            id: "02955b4e54374e619acfe592edb4a2f1"
        },
        layerId:2,
        visible: false,
        labelingInfo:[foodLabelClass]
    })
    perks_lyr = new FeatureLayer({
        portalItem:{
            id: "02955b4e54374e619acfe592edb4a2f1"
        },
        layerId:3,
        visible: false,
        labelingInfo:[foodLabelClass]
    })
    food_trucks_lyr = new FeatureLayer({
        portalItem:{
            id: "02955b4e54374e619acfe592edb4a2f1"
        },
        layerId:4,
        visible: false,
        labelingInfo:[foodLabelClass]
    })
    bike_parking_lyr = new FeatureLayer({
        portalItem:{
            id: "0e9e0292dce44979a933cb7ca825a740"
        },
        visible: false
    })
    bike_repair_lyr = new FeatureLayer({
        portalItem:{
            id: "1a518677568d424499f17e545aecdd62"
        },
        visible: false
    })
    shuttles_lyr = new FeatureLayer({
        portalItem:{
            id: "9684474d787e4b45b08d9bba098cf7c3"
        },
        visible: false,
        labelingInfo:[shuttleLabelClass],
        definitionExpression: "STOPTYPE = 'Campus Shuttle'"
    })
    metro_bus_lyr = new FeatureLayer({
        portalItem:{
            id: "9684474d787e4b45b08d9bba098cf7c3"
        },
        visible: false,
        labelingInfo:[metroLabelClass],
        definitionExpression: "STOPTYPE = 'Santa Cruz Metro'"
    })
    gardens_lyr = new FeatureLayer({
        portalItem:{
            id: "2ccfa63e4d764460adcb1f4ea2aff61c"
        },
        visible: false,
        labelingInfo:[recLabelClass]
    })
    genderinclusive_lyr = new FeatureLayer({
        portalItem:{
            id: "914973a703f743d5b73eb99a2835ecf4"
        },
        visible: false
    })
	lactation_lyr = new FeatureLayer({
        portalItem:{
            id: "38160cfa13ca4f83b555af4bb72e1205"
        },
        visible: false,
		labelsVisible: true,
		definitionExpression: "ADVERTISE = 'True'"
    })
    emergency_phones_lyr = new FeatureLayer({
        portalItem:{
            id: "c67599ead669443dbbb3a5eaa0e376de"
        },
        visible: false
    })
    bus_route_lyr = new FeatureLayer({
        portalItem:{
            id: "2280263859654b5e9902a17dc9a195f0"
        },
        visible: false,
    })
	labels_lyr = new FeatureLayer({
        portalItem:{
            id: "a3bb6a92e1ff46ac82beea01c05f9673"
        },
        visible: false,
        labelingInfo:[foodLabelClass],
        definitionExpression: "CampusZoneType in ('Primary', 'Secondary')"
    })
    
    //Layer Groups  
  	foods = [cafes_lyr, perks_lyr, dining_halls_lyr, food_trucks_lyr]
  	transportations = [shuttles_lyr, metro_bus_lyr, bus_route_lyr, parking_lyr, bike_parking_lyr, bike_repair_lyr]
  	academics = [colleges_lyr, libraries_lyr]
  	facilities = [emergency_phones_lyr, genderinclusive_lyr, lactation_lyr]
  	recreations = [rec_lyr, gardens_lyr, poi_lyr]
  	allLayers = [foods, transportations, academics, facilities, recreations] 
  	
	everyLayer = [buildings_lyr, parking_lyr, bus_route_lyr, zones_lyr, libraries_lyr, shuttles_lyr, metro_bus_lyr, cafes_lyr, perks_lyr, food_trucks_lyr, bike_repair_lyr, dining_halls_lyr, bike_parking_lyr, bike_repair_lyr, genderinclusive_lyr, emergency_phones_lyr, lactation_lyr, gardens_lyr, poi_lyr, rec_lyr, colleges_lyr, labels_lyr]
	
	
	//---- FUNCTIONS --
	
	//All the logic for detecting mouse position and changing cursor to pointer on feature hover (only works for buildings and parking lots currently)
	function changeCursor(response){
		if (response.results.length > 0 && (response.results[0].graphic.layer.title == 'buildings_app' || response.results[0].graphic.layer.title == 'Parking Lots')){
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
		
		view.hitTest(screenPoint)
			.then(function (response) {
				if (response.results.length > 0) {
					changeCursor(response);
				} else {
					changeCursor(response)
				}
		});
	});
	
	//URL params for buildings
	view.when(function(){
		console.log("adding layers...")
		//hybrid.addMany(everyLayer)
		console.log("parsing URL for params...")
        u = document.URL
        params = urlUtils.urlToObject(u);
        query = new Query();
        query.where = "BUILDINGNAME = '" + params.query.building + "'";
        query.returnGeometry = true;
        console.log(query.where)
        buildings_lyr.queryExtent(query).then(function(results){
            setTimeout(function(){
                view.goTo(results.extent).then(function(){
	            	var newZoom = view.zoom - 2.5
    	            view.zoom = newZoom
                	toggleBuildingLabels()
                })
            }, 2000);
        });
    });
	
	//toggle menu icon and close icon on mobile
	var click = calcite.click();
	var menu_icon_node = document.getElementById('menu-icon-div');
	function toggleMobileMenu (event) {
	  var viewD = document.getElementById('viewDiv');
	  var mobile_menu = document.getElementById('mobile-menu');
	  var menu_icon = document.getElementById('menu-icon');
	  var close_menu_icon = document.getElementById('close-menu-icon');
	  
	  if (viewD.style.display == 'none'){
		viewD.style.display = 'flex'
		mobile_menu.style.display = 'none'
		menu_icon.style.display = 'flex'
		close_menu_icon.style.display = 'none'
	  } else {
		viewD.style.display = 'none'
		mobile_menu.style.display = 'flex'
		menu_icon.style.display = 'none'
		close_menu_icon.style.display = 'flex'  
	  }
	};
	calcite.addEvent(menu_icon_node, click, toggleMobileMenu);
	
	//toggle Building Labels on click of radio button
	var labels_icon_node = document.getElementById('labels-icon');
	function toggleBuildingLabels (event) {
	  if (buildings_lyr.labelsVisible == false){
		  labels_icon_node.style.backgroundColor = '#01589d'
	  	  buildings_lyr.labelsVisible = true
	  } else {
		  labels_icon_node.style.backgroundColor = 'transparent'
	  	  buildings_lyr.labelsVisible = false
	  }
	};
	calcite.addEvent(labels_icon_node, click, toggleBuildingLabels);
	
	//toggle basemaps on click of the button
	var basemap_icon_node = document.getElementById('basemaps-icon');
	
	function toggleBasemap (event) {
	  var basemap_text = document.getElementById('basemaps-icon').innerText;
	  if (view.map == carto) {
		  switchBasemap(hybrid)
		  basemap_text = "Cartographic"
	  } else {
		  switchBasemap(carto)
		  basemap_text = "Hybrid"
	  }		
	};
	calcite.addEvent(basemap_icon_node, click, toggleBasemap);
	
	//Adjust zoom property of the view depending on Mobile or Desktop
	function setZoom(){
		if (window.innerWidth < 480) {
			view.zoom = 13
			
			view.ui.remove(searchWidget)
			
			searchWidget2 = new Search({
				view: view,
				maxSuggestions: 35,
				container: "mobile-search-bar",
				allPlaceholder: " Search for campus features",
				sources: [
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/colleges/FeatureServer/0"},
					searchFields: ["NAME"],
					displayField: "NAME",
					exactMatch: false,
					outFields: ["*"],
					name: "Campus Colleges",
					placeholder: "enter a campus college",
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/ActiveConstruction/FeatureServer/0"},
					searchFields: ["NAME"],
					displayField: "NAME",
					exactMatch: false,
					outFields: ["NAME"],
					name: "Campus Zones",
					placeholder: "enter a campus zone",
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/buildings_app/FeatureServer/0"},
					searchFields: ["BUILDINGNAME", "ABBREVSHORT", "ALIAS", "LABELNAME", "DEPARTMENTS"],
					displayField: "BUILDINGNAME",
					exactMatch: false,
					outFields: ["BUILDINGNAME"],
					name: "Buildings",
					placeholder: "enter a building name or departments",
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Parking_Lots/FeatureServer/0"},
					searchFields: ["NUM", "Permit_Type"],
					suggestionTemplate: "Parking Lot {NUM} for {NAME}",
					displayField: "NUM",
					exactMatch: false,
					outFields: ["NAME", "NUM","Location","Permit_Type","Handicapped","Meters","Comments", "Paystations", "Paystation_Limit","Meter_Limit","Permit_Days","Permit_Period"],
					name: "Parking Lots",
					placeholder: "enter parking lot information"
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/BusStops/FeatureServer/0"},
					searchFields: ["NAME", "STOPTYPE", "label_name"],
					displayField: "label_name",
					exactMatch: false,
					outFields: ["label_name", "STOPTYPE"],
					name: "BusStops",
					placeholder: "enter transit stop name or type"
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/1"},
					searchFields: ["Name"],
					displayField: "Name",
					exactMatch: false,
					outFields: ["Name"],
					name: "Cafes and Restaurants",
					placeholder: "enter a caffe or restaurant",
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/2"},
					searchFields: ["Name"],
					displayField: "Name",
					exactMatch: false,
					outFields: ["Name"],
					name: "Dining Halls",
					placeholder: "enter a dining hall location",
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/3"},
					searchFields: ["Name"],
					displayField: "Name",
					exactMatch: false,
					outFields: ["Name"],
					name: "Perk Coffee Houses",
					placeholder: "enter a perk location",
					},
					{featureLayer: {
						url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/4"},
					searchFields: ["Name"],
					displayField: "Name",
					exactMatch: false,
					outFields: ["Name"],
					name: "Food Trucks",
					placeholder: "enter a food truck name",
					}        
				]
			});
			searchWidget2.includeDefaultSources = false //remove ArcGIS World Geocoding Service
			searchWidget2.on("select-result", function(event){
			  searchWidget2.clear();
			  buildings_lyr.labelsVisible = true
			  view.zoom = 19
			  var viewD = document.getElementById('viewDiv');
			  var mobile_menu = document.getElementById('mobile-menu');
			  var menu_icon = document.getElementById('menu-icon');
			  var close_menu_icon = document.getElementById('close-menu-icon');
			  if (viewD.style.display == 'none'){
				viewD.style.display = 'flex'
				mobile_menu.style.display = 'none'
				menu_icon.style.display = 'flex'
				close_menu_icon.style.display = 'none'
			  }
			});
		}
	}
	
	//Loading spinner
	function loader() {
		view.when(function() {
			setTimeout(function() {
				$(".loading").toggleClass('hidden')
			}, 2000)
		})
	}
	
	//All the logic for 'Clear All' functionalty
	view.on("pointer-move", function (evt) {
		monitorClearAll()
	});
	visLayers = everyLayer.slice(1)
	clearbutton = document.getElementById("clear-all")
	var setVisibilities = function(){
		let visibilities = visLayers.map(lyr => lyr.visible)
		return visibilities
	}
	function allFalse(arr) {
		if (arr.includes(true)) {
			return false
		} else {
			return true
		}
	}
	function monitorClearAll() {
		visibilities = setVisibilities()
	
		if (allFalse(visibilities)) {
			clearbutton.style.display = "none" 
		} else {
			clearbutton.style.display = "grid"
		}
	}
	var clear_all_node = document.getElementById("clear-all");
	function clearAll() {
		clear_all_node.style.display = 'none'
		visLayers.forEach(function(lyr){
			lyr.visible = false	
		})
		var checked = document.querySelectorAll(".icon-ui-radio-checked")
		checked.forEach(function(element){
			element.setAttribute('class', 'icon-ui-radio-unchecked') 
		})
	};
	calcite.addEvent(clear_all_node, click, clearAll);
	
	//Building Labels Toggle Watcher
	function watchBuildingLabels() {
		ON = document.getElementById("On")
		OFF = document.getElementById("Off")
		MOBILE = document.getElementById("labels-icon")
		
		buildings_lyr.watch('labelsVisible', function(newValue, oldValue, property, object) {
			if (newValue == true) {
				ON.checked = true
				OFF.checked = false
				MOBILE.style.backgroundColor = '#01589d'
			} else {
				ON.checked = false
				OFF.checked = true
				MOBILE.style.backgroundColor = 'transparent'
			}
		})  
	}
	
	//FUNCTIONS TO RUN
	indicateVisibility();
    toggleVisibility();
    toggleMenu();
  	setBasemap();
  	setBuildingLabels();
    showLegend();
	setZoom();
	loader();
	indicateAll();
	watchBuildingLabels();

});