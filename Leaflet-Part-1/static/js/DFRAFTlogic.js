// Store our API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the queryURL
d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
});

// Create function for earthquake data w/popup info
function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
  // Create function for marker size and marker color
  function markerSize(magnitude) {
        return magnitude * 5;
    }
    function markerColor(magnitude){
        if (magnitude <= 1) {
        return "#daec92"
    } else if (magnitude <= 2) {
        return "#ecea92"
    } else if (magnitude <= 3) {
        return "#ecd592"
    } else if (magnitude <= 4) {
        return "#dfb778"
    } else if (magnitude <= 5) {
        return "#e5a05b"
    } else {
        return "#f58668"
    }
};

// Create layer and onEachFeature for data
var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng){
        return L.circleMarker(latlng, {
            radius: markerSize(earthquakeData.properties.mag),
            color: markerColor(earthquakeData.properties.mag)
        });
    },
    onEachFeature: onEachFeature
  });

  // Send layer to map
  createMap(earthquakes);




  // Create function for map
  function createMap(earthquakes) {

    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    
    // Create a baseMaps object
    var baseMaps = {
      "Street Map": street,
    };
  
    // Create an overlay object 
    var overlayMaps = {
      Earthquakes: earthquakes
    };

  // Create map w/the streetmap and earthquakes layers
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });
  
// Create legend
 var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
        magnitude = [0, 1, 2, 3, 4, 5]
       labels=[]
        div.innerHTML += "<h1>Magnitude</h1>" 
    for (var i = 0; i<magnitude.length; i++){
      div.innerHTML +=    
        '<i style="background:' + markerColor(magnitude[i]) + '"> ' +
        magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '</i><br>' : '+');
  }
};

// Add legend to map
legend.addTo(myMap)
};