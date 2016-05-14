function createMap(){

    //create the map
    var map = L.map('map', {
        center: [0, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 13,
       
    });
       L.tileLayer('https://a.tiles.mapbox.com/v3/mapbox.world-bright/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://maps.stamen.com/toner-hybrid/#12/37.7707/-122.3783</a>'
    }).addTo(map);

    //call getData function
    // getData(map);
};

function processData(data) {
    //empty array
        var attributes = [];
     //properties of the first feature in the dataset
        var properties = data.features[0].properties;
     //push each attribute name into attributes array
             for (var attribute in properties) {
     //only take attributes with bike count values
             if (attribute.indexOf("Team Number") > -1) {
                 attributes.push(attribute);
                };
             };
         return attributes;
            };

function getData(map, attributes){
    //load the geoJSON data
    $.ajax("data/roboticsfrc.geojson", {
        dataType: "json",
        success: function(response){
            var attributes = processData (response);
            //call functions to create proportional symbols and sequencer
        //     createPropSymbols (response, map, attributes);
        //     createSequenceControls (map, attributes);
        //     createLegend (map, attributes);
        }
    });
};

// function createPropSymbols (map, attributes) {

// }

$(document).ready(createMap);