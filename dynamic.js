var mymap;

window.addEventListener('DOMContentLoaded', (event) => {
   
    document.getElementById("temp").innerHTML = "semp kurei";
    createmap();
    var i = 0;
    var latt = 18.02;
    var longt = -76.80;
    //just a small rand loop to drop points for testing
    for (i = 0; i < 22; i++) {
        var temp = (Math.floor(Math.random() * 5)) / 100;
        if (i % 2 == 0) {
            latt = latt + temp;
        }
        else {
            latt = latt - temp;
        }
        temp = (Math.floor(Math.random() * 5)) / 100;
        if (i % 2 == 0) {
            longt = longt + temp;
        }
        else {
            longt = longt - temp;
        }
        addSingleMarker(latt, longt);
    }

})

function createmap() {
    mymap = L.map('mapid').setView([18.02, -76.80], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ3dtYXBib3giLCJhIjoiY2tscTl6MWVtMWFsMDJ3bTJucHdicndweCJ9.BNVUucYA8kkh2HePltwKwQ'
    }).addTo(mymap);

}

function addSingleMarker(lat,long) {
    var circle = L.circle([lat,long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 300
    }).addTo(mymap);
}

function addClusterMarker(lat, long, rad) {
    var circle = L.circle([lat, long], {
        color: 'orange',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: rad
    }).addTo(mymap);
}


function addCurrentLocation(lat, long) {
    var marker = L.marker([lat, long]).addTo(mymap);
    marker.bindPopup("Current location").openPopup();
}