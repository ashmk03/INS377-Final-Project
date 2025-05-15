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

    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch('https://opensky-network.org/api/states/all');
        const data = await response.json();
        const planes = data.states;

        let found = false;

        // Loop through each plane
        planes.forEach(function (plane) {
            const callsign = plane[1]?.trim(); 
            const longitude = plane[5];
            const latitude = plane[6];
            const altitude = plane[7];

            if (callsign && callsign === flightNumber) {
                found = true;

                if (latitude !== null && longitude !== null) {
                    L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup("Flight: " + callsign + "<br>Altitude: " + Math.round(altitude) + " meters")
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