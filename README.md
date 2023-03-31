# USGS Earthquake Interactive Map

<img src = "images/1-Logo.png">


## Background
The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. The USGS collects massive amounts of data from all over the world each and every day.

The purpose of this project is to build a new tool for USGS that will allow them to visualize their data; specifically, earthquake data. This new visualization tool can then be shared with the public for educational purposes, as well as other governmental organizations for funding requests.


## Result
The Earthquake Visulization Map: 
<ul>
  <li>The interactive map visually depicts earthquakes within the past seven days.</li>
  <li>Each earthquake is represented by a marker (circle):
    <ul>
      <li>The size of the marker indicates the magnitude.</li>
      <li>The color (lighter to darker) indicates the depth.</li>
    </ul>
  </li>
  <li>Users can click on individual markers to get detailed information on each earthquake (location, date, and magnitude).</li>
</ul>
<i> Below is an image of the interactive map.</i>
<img src = "images/2-BasicMap.png">



## Resources
#### Data Sources:
http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php<br>
https://github.com/fraxen/tectonicplates
#### Software/Tools: 
JavaScript, Leaflet, VSCode, HTML, CSS, Chrome DevTool