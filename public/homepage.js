function createMap() {
    var map = L.map('map').setView([39, -95], 4);

    // Add the OpenStreetMap layer (the background map)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);

    // Get live airplane data from OpenSky
    fetch('https://opensky-network.org/api/states/all')
      .then(response => response.json())
      .then(data => {
        var planes = data.states;

        // Loop through each plane
        planes.forEach(function(plane) {
          var callsign = plane[1]; // Airline flight code
          var longitude = plane[5];
          var latitude = plane[6];
          var altitude = plane[7];
          var airline = plane[1].substring(0,3);

          const FAAcallsigns=["AAL", "AAY", "ACA", "AIJ", "AMX", "ANA", "ASA", "ASH", "ATN", "AWI", "BAW", "DAL", "DHL", "DLH", "EDV", "ENY", "FDX", "FFT", "GEC", "HAL", "JBU", "JIA", "KLM", "NKS", "PDT", "POE", "QTR", "QXE", "ROU", "RPA", "SCX", "SWA", "SWG", "TSC", "UAE", "UAL", "UCA", "UPS", "VIV", "VOI", "WJA"];

          //FAA call signs confirm if it is commerical
          if (callsign && latitude && longitude && (FAAcallsigns.includes(airline)))  {
            L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup("Flight: " + callsign + "<br>Altitude: " + Math.round(altitude) + " meters");
          }
        });
      });
}  

window.onload = createMap;