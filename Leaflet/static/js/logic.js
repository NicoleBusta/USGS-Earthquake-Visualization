// Code based on in-class Activity 15.1.10

// Store our API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create function for markerSize and markerColor
  function getMarkerSize(magnitude) {

    // Determine the marker size based on the magnitude
        if (magnitude > 90) {
      return 20;
    } else if (magnitude > 70) {
      return 17;
    } else if (magnitude > 50) {
      return 14;
    } else if (magnitude > 30) {
      return 11;
    } else if (magnitude > 10) {
      return 8;
    } else {
      return 5;
    }
  }

  // Determine the marker color based on the magnitude
  function getMarkerColor(magnitude) {
    // console.log(magnitude)

    if (magnitude > 90) {
      return "red";
    } else if (magnitude > 70) {
      return "tomato";
    } else if (magnitude > 50) {
            return "orange";
    } else if (magnitude > 30) {
      return "yellow";
    } else if (magnitude > 10) {
      return "yellow";
    } else {
      return "chartreuse";
    }
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {

    pointToLayer: function (feature, latlng) {
      // console.log(feature.geometry.coordinates[2])

      return L.circleMarker(latlng, {
        radius: getMarkerSize(feature.geometry.coordinates[2]),
        fillColor: getMarkerColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 0.3,
        opacity: 0.5,
        fillOpacity: 1
      });
    },
    onEachFeature: onEachFeature
  });

  // Send earthquakes layer to the createMap function
  createMap(earthquakes);

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
    var legend = L.control({
      position: "bottomright"
    });

    legend.onAdd = function(map){
      var div = L.DomUtil.create("div", "legend");
      var ranges = [-10, 10, 30, 50, 70, 90]
      var colors = ["chartreuse", "yellow", "wheat", "orange", "tomato", "red"]
            legend = "<strong>Magnitude</strong>";
      for (var i = 0; i < ranges.length; i++) {
        div.innerHTML += "<div style='background: "+ colors[i] + "; height: 10px; '></div>" + ranges[i-1] +"-"+ranges[i] + "<br/>"
      }
      return div
    };

    // Add legend to map
    legend.addTo(myMap);
  };

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
