//created by Grace Vriezen for FIRST Robotics

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
    createMarkers(map);
    // getData(map);
};

// function processData(data) {
//     //empty array
//         var attributes = [];
//      //properties of the first feature in the dataset
//         var properties = data.features[0].properties;
//      //push each attribute name into attributes array
//              for (var attribute in properties) {
//      //only take attributes with bike count values
//              if (attribute.indexOf("coordinates") > -1) {
//                  attributes.push(attribute);
//                 };
//              };
//          return attributes;
//             };

// function getData(map, attributes){
//     //load the geoJSON data
//     $.ajax("data/roboticsfrc.geojson", {
//         dataType: "json",
//         success: function(response){
//             // var attributes = processData (response);
//             //call functions to create proportional symbols and sequencer
//             // createPropSymbols (response, map, attributes);
//             createSequenceControls (map, attributes);
//             // createLegend (map, attributes);
//             // pointToLayer (feature,latlng, attributes);
//             createMarkers(map);
//             // onEachFeature;
//         }
//     });
// };



function createSequenceControls(map, attributes) {

     var SequenceControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function (map) {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'sequence-control-container');

            //kill any mouse event listeners on the map
            $(container).on('mousedown dblclick', function(e){
                L.DomEvent.stopPropagation(e);
            });

            // ... initialize other DOM elements, add listeners, etc.

             $(container).append('<input class="range-slider" type="range">');
            // //reverse and skip buttons
            $(container).append('<button class="skip" id="reverse"> Reverse </button>');
            $(container).append('<button class="skip" id="forward"> Skip </button>');

            return container;
        }
    });

      map.addControl(new SequenceControl());


    // //implement slider
    //set slider attributes
    $('.range-slider').attr({
        max: 7,
        min: 0,
        value: 0,
        step: 1
    });
    // replace reverse and skip with images instead//

    $('#reverse').html
    // ('<img src="img/left.png"> <id="left">');
    $('#forward').html
    // ('<img src="img/right.png"> <id="right">');
    //click listener

    $('.skip').click(function(){
        //sequence
        //get the old index value
        var index = $('.range-slider').val();
        // increment or decrement depending on button clicked
        if ($(this).attr('id')== 'forward'){
            index++
            //step 7: if past the last attribute, wrap aroudn to the first attribute
            index = index > 7 ? 0 : index;

        } else if ($(this).attr('id') == 'reverse'){
            index --;
            //if past the first attribute, wrap around to last
            index = index < 0 ? 7 : index; 
        };
        //update slider
        $('.range-slider').val(index);

        //pass new attribute to update symbols
        // updatePropSymbols (map, attributes [index]);
    });
    //input listener for slider
    $('.range-slider').on('input', function(){
        //get new index value
        var index = $(this).val();
        //pass new attribute to update symbols
        // updatePropSymbols (map, attributes[index]);

    });
};
//1992
function createMarkers (map) {
    var markers = $.ajax(
    "data/1992.geojson",
     {
          dataType: "json",
          success: function(response){
              var geojsonMarkerOptions = {
                radius: 3,
                fillColor: "#fff",
                fillOpacity: 1,
                color: "red",
                weight: 1.5, 
                opacity: 1
              };
  //create a Leaflet GeoJSON layer and add it to the map
              L.geoJson(response,{
                pointToLayer: function(feature, latlng) {
                  return L.circleMarker(latlng, geojsonMarkerOptions);
                }
              }).addTo(map);
            }
        });
    var dots = $.ajax(
    "data/1994.geojson",
     {
          dataType: "json",
          success: function(response){
              var geojsonMarkerOptions = {
                radius: 3,
                fillColor: "#fff",
                fillOpacity: 1,
                color: "blue",
                weight: 1.5, 
                opacity: 1
              };
  //create a Leaflet GeoJSON layer and add it to the map
              L.geoJson(response,{
                pointToLayer: function(feature, latlng) {
                  return L.circleMarker(latlng, geojsonMarkerOptions);
                }
              }).addTo(map);
            }
        });

};
//1993
//1994
//1995
//1996
//1997
//1998
//1999






// function onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//     }
// }

// var geojsonFeature = attributes;
// //  

// L.geoJson(geojsonFeature, {
//     onEachFeature: onEachFeature
// }).addTo(map);



// function pointToLayer (feature, latlng, attributes) {
//     var attribute = attributes [0];
//     //check console
//     console.log(attribute);

//          //create circle marker options
//             var options = {
//                 radius: 8,
//                 fillColor: "#4fb0ad",
//                 color: "#fff",
//                 weight: 2,
//                 opacity: 1,
//                 fillOpacity: 0.7
//             };
// //             //determine value for selected attribute
//             var attValue = Number(feature.properties[attribute]);
// //             //Step 6: Give circle markers radius based on attribute value
// //             options.radius = calcPropRadius (attValue);
// //             //create circle marker layer
//             var layer = L.marker (latlng, options);
// //             //build popup content string
// //             var popupContent = "<p><b>Location:&nbsp;&nbsp;</b>" +  feature.properties.Location + "</p><p><b>" +  "</b></p>";
// //             //add  formatted attribute to popup content string
// //             var year = attribute.split ("_") [1];
// //             popupContent += "<p><b>Bicyclist Counts in " + year + ":&nbsp;&nbsp;</b>" + feature.properties [attribute] + "</p>";
// //             //bind popup to circle marker
// //             layer.bindPopup (popupContent, {
// //                 offset: new L.Point (0, -options.radius)
// //             });
// //                // event listeners to open popup on hover
// //                 layer.on({
// //                     mouseover: function () {
// //                         this.openPopup();

// //                     },

// //                     mouseout: function () {
// //                         this.closePopup ();
// //                     }
// //                 });
// //             // return circle marker to L.geoJson pointToLayer option;
//             return layer;
//         };







$(document).ready(createMap);