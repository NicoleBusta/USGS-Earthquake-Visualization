// Leveraged code from in-class Activity 15.1.10

// Store our API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request and send response to the createFeatures function
d3.json(queryUrl).then(function (data) {
  createFeatures(data.features);
});

// Create function for markerSize and markerColor
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

// Create function for earthquakeData
function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "</h3><hr><p>" + "Magnitude: " + (feature.properties.mag) + "</p>");
  }

  // Create GeoJSON layer with features array for earthquakeData and run onEachFeature 
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.properties.mag),
            color: "#000",
            weight: 0.3,
            opacity: 0.5,
            fillOpacity: 1
        });
    },
    onEachFeature: onEachFeature
  });

  // Send layer to createMap function
  createMap(earthquakes);
}

// Create map layers
function createMap(earthquakes) {

  // Create the base layer
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create map to display layers on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create legend
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    magnitudes = [0, 1, 2, 3, 4, 5];
    labels = [];
    legendInfo = "<strong>Magnitude</strong>";
    div.innerHTML = legendInfo;
    // push to labels array as list item
    for (var i = 0; i < magnitudes.length; i++) {
        labels.push('<li style="background-color:' + markerColor(magnitudes[i] + 1) + '"> <span>' + magnitudes[i] + (magnitudes[i + 1]
             ? '&ndash;' + magnitudes[i + 1] + '' : '+') + '</span></li>');
    }
    // add label items to the div under the <ul> tag
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};

  // Add legend to map
  legend.addTo(myMap);
};

  // Create a layer control, pass it baseMaps and overlayMaps...add control layer to map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  