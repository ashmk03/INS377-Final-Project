let map; 

function createMap() {

    map = L.map('map').setView([39, -95], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);

    document.getElementById('map').style.display = 'none';
}

async function flightSearch() {
    const flightNumberInput = document.getElementById("flight");
    const flightNumber = flightNumberInput.value.trim().toUpperCase(); 

    const match = /(?<airlineName>[A-Za-z]+) (?<code>[0-9]{0,4})$/.exec(flightNumber);

    if (!match) {
        alert("Invalid flight format. Use format like 'DELTA 1234'");
        return;
    }

    const {airlineName, code} = match.groups;

    let FAAcallsigns = {
        "AMERICAN": "AAL",
        "ALLEGIANT AIR": "AAY",
        "AIR CANADA": "ACA",
        "ABC AEROLINEAS": "AIJ",
        "AEROMEXICO": "AMX",
        "ALL NIPPON AIRWAYS": "ANA",
        "ALASKA": "ASA",
        "AIR SHUTTLE": "ASH",
        "AIR TRANSPORT": "ATN",
        "AIR WISCONSIN": "AWI",
        "BRITISH AIRWAYS": "BAW",
        "DELTA": "DAL",
        "LUFTHANSA": "DLH",
        "ENDEAVOR AIR": "EDV",
        "ENVOY AIR": "ENY",
        "FEDEX": "FDX",
        "FRONTIER": "FFT",
        "LUFTHANSA CARGO": "GEC",
        "HAWAIIAN AIRLINES": "HAL",
        "JETBLUE": "JBU",
        "PSA AIRLINES": "JIA",
        "KLM ROYAL DUTCH": "KLM",
        "SPIRIT": "NKS",
        "PIEDMONT": "PDT",
        "PORTER": "POE",
        "QATAR AIRWAYS": "QTR",
        "HORIZON AIR": "QXE",
        "AIR CANADA ROUGE": "ROU",
        "REPUBLIC": "RPA",
        "SUN COUNTRY": "SCX",
        "SOUTHWEST": "SWA",
        "SUNWING": "SWG",
        "AIR TRANSAT": "TSC",
        "EMIRATES": "UAE",
        "UNITED": "UAL",
        "COMMUTAIR": "UCA",
        "UPS": "UPS",
        "AEROENLACES NACIONALES": "VIV",
        "CONCESIONARIA VUELA COMPANIA DE AVIACION": "VOI",
        "WESTJET": "WJA"
    };

    let foundCallSign = FAAcallsigns[airlineName];
    if (!foundCallSign) {
        alert("Airline not recognized.");
        return;
    }

    let correctFormat = foundCallSign + code;
    

    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch('https://opensky-network.org/api/states/all');
        const data = await response.json();
        const planes = data.states;

        let found = false;

    function formatTimestamp(unix) {
    return new Date(unix * 1000).toLocaleString();
    }

        // Loop through each plane
        planes.forEach(function (plane) {
            const callsign = plane[1]?.trim();
            const origin_country = plane[2];
            const time_position = plane[3];
            const last_contact = plane[4];
            const longitude = plane[5];
            const latitude = plane[6];
            const altitude = plane[7];
            const velocity = plane[9];
            

            if (callsign && callsign === correctFormat) {
                found = true;

                if (latitude !== null && longitude !== null) {
                    let displayName = airlineName.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    var plane = L.icon({
                        iconUrl: 'plane.png',
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
                        "<br><b>Ground Speed: </b>" + velocity + " m/s" +
                        "<br><b>Country of Origin: </b>" + origin_country +
                        "<br><b>Last Contacted Air Traffic Control: </b>" + formatTimestamp(last_contact) +
                        "<br><b>Last Updated: </b>" + formatTimestamp(time_position)) 
                        .openPopup(); 
                }
            }
        });

        if (!found) {
            alert("Flight not found. Please check the callsign.");
        }
    } catch (error) {
        console.error("Error fetching flight data:", error);
        alert("There was an error retrieving flight data.");
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('map').style.display = 'block';
    }
}

window.onload = createMap;