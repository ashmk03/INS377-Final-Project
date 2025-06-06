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
    
    let FAAcallsigns = {
      "AAL": "AMERICAN",
      "AAY": "ALLEGIANT AIR",
      "ACA": "AIR CANADA",
      "AIJ": "ABC AEROLINEAS",
      "AMX": "AEROMEXICO",
      "ANA": "ALL NIPPON AIRWAYS",
      "ASA": "ALASKA",
      "ASH": "AIR SHUTTLE",
      "ATN": "AIR TRANSPORT",
      "AWI": "AIR WISCONSIN",
      "BAW": "BRITISH AIRWAYS",
      "DAL": "DELTA",
      "DLH": "LUFTHANSA",
      "EDV": "ENDEAVOR AIR",
      "ENY": "ENVOY AIR",
      "FDX": "FEDEX",
      "FFT": "FRONTIER",
      "GEC": "LUFTHANSA CARGO",
      "HAL": "HAWAIIAN AIRLINES",
      "JBU": "JETBLUE",
      "JIA": "PSA AIRLINES",
      "KLM": "KLM ROYAL DUTCH",
      "NKS": "SPIRIT",
      "PDT": "PIEDMONT",
      "POE": "PORTER",
      "QTR": "QATAR AIRWAYS",
      "QXE": "HORIZON AIR",
      "ROU": "AIR CANADA ROUGE",
      "RPA": "REPUBLIC",
      "SCX": "SUN COUNTRY",
      "SWA": "SOUTHWEST",
      "SWG": "SUNWING",
      "TSC": "AIR TRANSAT",
      "UAE": "EMIRATES",
      "UAL": "UNITED",
      "UCA": "COMMUTAIR",
      "UPS": "UPS",
      "VIV": "AEROENLACES NACIONALES",
      "VOI": "CONCESIONARIA VUELA COMPANIA DE AVIACION",
      "WJA" :"WESTJET",
    };

        // Loop through each plane
        planes.forEach(function(plane) {
          const callsign = plane[1]?.trim();
          const origin_country = plane[2];
          const time_position = plane[3];
          const last_contact = plane[4];
          const longitude = plane[5];
          const latitude = plane[6];
          const altitude = plane[7];
          const velocity = plane[9];
          
          const match = /^(?<airlineName>[A-Z]{3})(?<code>[0-9]{1,4})$/.exec(callsign);
          if (!match) return;
          
          const {airlineName, code} = match.groups;

          let foundAirlineName = FAAcallsigns[airlineName];
          if (!foundAirlineName) return;
          
          function formatTimestamp(unix) {
          return new Date(unix * 1000).toLocaleString();
          }

            if (latitude !== null && longitude !== null) {
                  let displayName = foundAirlineName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    var plane = L.icon({
                      iconUrl: 'plane.png', /*https://www.flaticon.com/free-icon/plane_870143?k=1747271725942&log-in=google */
                      shadowUrl: 'plane(2).png',

                      iconSize:     [38, 38], // size of the icon
                      shadowSize:   [38, 38], // size of the shadow
                      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                      shadowAnchor: [10, 80],  // the same for the shadow
                      popupAnchor:  [-50, -90] // point from which the popup should open relative to the iconAnchor
                    });

                    L.marker([latitude, longitude], {icon:plane})
                        .addTo(map)
                        .bindPopup("<b>Airline:</b> " + displayName +
                        "<br><b>Flight Number: </b>" + code +
                        "<br><b>Altitude: </b>" + Math.round(altitude) + " meters" +
                        "<br><b>Ground Speed: </b>" + velocity + " m/s"+
                        "<br><b>Country of Origin: </b>" + origin_country +
                        "<br><b>Last Contacted Air Traffic Control: </b>" + formatTimestamp(last_contact) +
                        "<br><b>Last Updated: </b>" + formatTimestamp(time_position)); 
                }
      });
  });
}

window.onload = createMap;