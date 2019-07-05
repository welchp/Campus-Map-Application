var map;
var webmap;
var cad_webmap;
var terrain_map;
var poster_webmap;
var hybrid_webmap;
var newspaper_webmap;

var view;
var homeBtn;
var app_popup;
var searchWidget;

var params;
var query;

var foodLabelClass;
var bldgLabelClass;
var zonesLabelClass;
var parkingLabelClass;
var transitLabelClass;

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

var pinkMarker;
var sizeVisVar;
var greenMarker;
var yellowMarker;
var defaultMarker;
var lightBlueMarker;



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
    "dojo/domReady!"], function(
        esriConfig, Map, MapView, Basemap, WebMap, Layer, FeatureLayer, Search, Locate, Home, Popup, LabelClass, MapImageLayer, promiseUtils, watchUtils, urlUtils, Query
        ) {

    //POPUP
    
    var app_popup = new Popup({
        dockEnabled: true,
        dockOptions:{
            position: "top-right"
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
    
    
    //TESTING REFERENCE SCALE FOR POINT SYMBOLS
    /*
    var sizeVisVar = {
        type: "size",
        valueExpression: "$view.scale",
        stops: [
            {
                value: 1128, 
                size: 28
            },{
                value: 2256,
                size: 24
            },{
                value: 4514,
                size: 20
            },{ 
                value: 9028,
                size: 14
            }
        ]};
    
    defaultMarker.visualVariables.push(sizeVisVar);
    */
    
    
    //LABEL CLASSES
    
    var buildingsLabelClass = {
        symbol: {
            type: "text",
            color: "black",
            haloColor: [255, 255, 255, 1.0],
            haloSize: 0.5,
            font: {
                family: "Arial Unicode MS",
                size: 9,
                style:"normal",
                weight: "bold"
            }
        },
        labelPlacement: "always-horizontal",
        labelExpressionInfo: {
            expression: "$feature.ABBREVSHORT"
        }
    };
    var zonesLabelClass = {
        symbol: {
            type: "text",
            color: [255,255,255,1.0],
            haloColor: [0,0,0,1.0],
            haloSize: 1,
            font: {
                family: "Baloo Chettan",
                size: 12,
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
                weight: "bold"
            }
        },
        labelPlacement: "always-horizontal",
        labelExpressionInfo: {
            expression: "'LOT# ' + $feature.NUM" 
        }
    };
    var transitLabelClass = {
        symbol: {
            type: "text",
            color: "white",
            haloColor: [0, 0, 0, 1.0],
            haloSize: 0.85,
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
    var foodLabelClass = {
        symbol: {
            verticalOffset: {
                screenLength: 150,
                maxWorldLength: 2000,
                minWorldLength: 30
              },
              callout: {
                type: "line", // autocasts as new LineCallout3D()
                size: 0.5,
                color: [0, 0, 0],
                border: {
                  color: [255, 255, 255]
                }},
            type: "text",
            color: "white",
            haloColor: [0, 0, 0, 1.0],
            haloSize: 0.85,
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
    
    
    
    //MAPS TO USE AS BASEMAPS
    
    webmap = new WebMap({
        portalItem: {
            id:"4fb6663a73744a789b219418bc9ec7a4"
        }
    });
    poster_webmap = new WebMap({
        portalItem: {
            id:"75c6c947af6f4a69b18c45a91d18123e"
        }
    });
    cad_webmap = new WebMap({
        portalItem: {
            id:"aef98fd8151d4ab8aea88671f8e81832"
        }
    });
    hybrid_webmap = new WebMap({
        portalItem: {
            id:"3031bba063774177844fd05b2a788177"
        }
    });
    newspaper_webmap = new WebMap({
        portalItem: {
            id:"75a3ce8990674a5ebd5b9ab66bdab893"
        }
    });
    terrain_map = new WebMap({
        portalItem: {
            id:"5f68957c846942f19d2ac5cb191842c8"
        }
    });
    
    
    
    //MAP VIEW
    
    view = new MapView({
        container: "viewDiv",
        map: hybrid_webmap,
        zoom: 14.25,
        center: [-122.0651608,37.0005721],
        popup:{
            highlightEnabled: false,
            dockEnabled: true,
            dockOptions:{
                position: "bottom-right"
            }
        }
    })
    
    
    //WIDGETS
    view.ui.remove("attribution");
    
    homeBtn = new Home({
        view: view
    })
    view.ui.add(homeBtn, "top-left")
    
    var locateBtn = new Locate({
        view: view
      });
    view.ui.add(locateBtn, {position: "top-left"});
    
    searchWidget = new Search({
        view: view,
        maxSuggestions: 35,
        sources: [
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/BusStops/FeatureServer/0"},
            searchFields: ["NAME", "STOPTYPE", "label_name"],
            displayField: "label_name",
            exactMatch: false,
            outFields: ["label_name", "STOPTYPE"],
            name: "BusStops",
            placeholder: "Search features..."
            },
        	{featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/buildings_app/FeatureServer/0"},
            searchFields: ["BUILDINGNAME", "ABBREVSHORT"],
            displayField: "BUILDINGNAME",
            exactMatch: false,
            outFields: ["BUILDINGNAME", "ABBREVSHORT"],
            name: "Buildings",
            placeholder: "e.g. ISB or Humanities Lecture Hall"
            },
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/BicycleRepair/FeatureServer/0"},
            searchFields: ["amenity"],
            displayField: "amenity",
            exactMatch: false,
            outFields: ["amenity"],
            name: "Bicycle Infrastructure",
            placeholder: "e.g. Fix-It or Bike Racks"
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/GenderInclusiveRestrooms/FeatureServer/0"},
            searchFields: ["PopupInfo"],
            displayField: "PopupInfo",
            exactMatch: false,
            outFields: ["PopupInfo"],
            name: "Facilities",
            placeholder: "..."
            },
        	{featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/rooms/FeatureServer/0"},
            searchFields: ["rooms_lookup_ROOM_NUMBER"],
            displayField: "rooms_lookup_ROOM_NUMBER",
            suggestionTemplate: "{rooms_lookup_ROOM_NUMBER} in {buildings_OfficialBuildingName}",
            exactMatch: false,
            outFields: ["rooms_lookup_ROOM_NUMBER", "buildings_OfficialBuildingName"],
            name: "Rooms",
            placeholder: "e.g. 151C or 234"
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/ActiveConstruction/FeatureServer/0"},
            searchFields: ["NAME"],
            displayField: "NAME",
            exactMatch: false,
            outFields: ["NAME"],
            name: "Campus Zones",
            placeholder: "e.g. Science Hill or Oakes College"
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/0"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Cafes and Restaurants",
            placeholder: "e.g. Vivas or Owl's Nest"
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/1"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Dining Halls",
            placeholder: "e.g. Porter or Oakes"
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/2"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Perk Coffee Houses",
            placeholder: "e.g. Engineering"
        	},
            {featureLayer: {
                url: "https://services3.arcgis.com/21H3muniXm83m5hZ/arcgis/rest/services/Dining/FeatureServer/3"},
            searchFields: ["Name"],
            displayField: "Name",
            exactMatch: false,
            outFields: ["Name"],
            name: "Food Trucks",
            placeholder: "e.g. Raymond's"
        	}]
    });
    searchWidget.includeDefaultSources = false //remove ArcGIS World Geocoding Service
    view.ui.add(searchWidget, {position: "top-right"});
    
    
    //LOAD ALL MAP LAYERS
    
	labels_lyr = new FeatureLayer({
        portalItem:{
            id: "a3bb6a92e1ff46ac82beea01c05f9673"
        },
        visible: false,
        labelingInfo:[transitLabelClass],
        definitionExpression: "CampusZoneType in ('Primary', 'Secondary')"
    })

    buildings_lyr = new FeatureLayer({
        portalItem:{
            id:"9f17f4aed3554b15a189f89b13f36b58"
        },
        visible: true,
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
        labelingInfo:[foodLabelClass]
    })
    rec_lyr = new FeatureLayer({
        portalItem:{
            id:"30ba437201bd4a16b90ca8b34ea65a4a"
        },
        visible: false,
        labelingInfo:[foodLabelClass]
    })
    libraries_lyr = new FeatureLayer({
        portalItem:{
            id:"b82d703a18bc469392089b91b413a5f5"
        },
        visible: false,
        labelingInfo:[foodLabelClass]
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
        labelingInfo:[transitLabelClass],
        definitionExpression: "STOPTYPE = 'Campus Shuttle'"
    })
    metro_bus_lyr = new FeatureLayer({
        portalItem:{
            id: "9684474d787e4b45b08d9bba098cf7c3"
        },
        visible: false,
        labelingInfo:[transitLabelClass],
        definitionExpression: "STOPTYPE = 'Santa Cruz Metro'"
    })
    gardens_lyr = new FeatureLayer({
        portalItem:{
            id: "2ccfa63e4d764460adcb1f4ea2aff61c"
        },
        visible: false,
        labelingInfo:[transitLabelClass],
    })
    genderinclusive_lyr = new FeatureLayer({
        portalItem:{
            id: "914973a703f743d5b73eb99a2835ecf4"
        },
        visible: false
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
    
    
    
    //add all layers that were just loaded so they can quickly be toggled on/off
    
    view.when(function() {
        hybrid_webmap.addMany([
            parking_lyr,
            bus_route_lyr,
            zones_lyr,
        	labels_lyr,
            buildings_lyr,
            colleges_lyr,
            libraries_lyr,
            shuttles_lyr,
            metro_bus_lyr,
            cafes_lyr,
            perks_lyr,
            food_trucks_lyr,
            bike_repair_lyr,
            dining_halls_lyr,
            bike_parking_lyr,
            bike_repair_lyr,
            genderinclusive_lyr,
            emergency_phones_lyr,
            gardens_lyr,
            poi_lyr,
            rec_lyr
        ])
        
        view.popup.dockEnabled = true;
    })
    .catch(function(){
        alert('ERROR LOADING LAYERS')
    })

	view.when(function(){
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
    
    toggleVisibility();
    toggleMenu();
    showLegend();
    
});

function toggleBasemap() {
        if (view.map == webmap) {
            
            view.map = hybrid_webmap
            view.when( function() {
	            hybrid_webmap.addMany([
    	            parking_lyr,
        	        bus_route_lyr,
            	    zones_lyr,
        			labels_lyr,
                	buildings_lyr,
                	colleges_lyr,
                	libraries_lyr,
                	shuttles_lyr,
                	metro_bus_lyr,
                	cafes_lyr,
                	perks_lyr,
                	food_trucks_lyr,
                	bike_repair_lyr,
                	dining_halls_lyr,
                	bike_parking_lyr,
                	bike_repair_lyr,
                	genderinclusive_lyr,
                	emergency_phones_lyr,
                	gardens_lyr,
                	poi_lyr,
                	rec_lyr
            	]);
            })
        } else {
            
            view.map = webmap;
        	view.when( function() {
            	webmap.addMany([
                	parking_lyr,
                	bus_route_lyr,
                	zones_lyr,
                	labels_lyr,
                	buildings_lyr,
                	colleges_lyr,
                	libraries_lyr,
                	shuttles_lyr,
                	metro_bus_lyr,
                	cafes_lyr,
                	perks_lyr,
                	food_trucks_lyr,
                	bike_repair_lyr,
                	dining_halls_lyr,
                	bike_parking_lyr,
                	bike_repair_lyr,
                	genderinclusive_lyr,
                	emergency_phones_lyr,
                	gardens_lyr,
                	poi_lyr,
                	rec_lyr
            	]);
            })
        };
}

function toggleBuildingLabels() {
    if (buildings_lyr.labelsVisible == true) {
        buildings_lyr.labelsVisible = false;
    } else {
        buildings_lyr.labelsVisible = true;
    }
}
            
        
       