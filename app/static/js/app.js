$(document).ready(function () {
    if ($("#chart-covid-dark").length > 0) {
        var cBChart = document.getElementById('chart-covid-dark').getContext('2d');
        var myChart = new Chart(cBChart, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var cLChart = document.getElementById('chart2-covid-dark').getContext('2d');
        var myChart = new Chart(cLChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Month:',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var cRChart = document.getElementById('chart3-covid-dark').getContext('2d');
        var myChart = new Chart(cRChart, {
            type: 'radar',
            data: {
                labels: [
                    'New Cases',
                    'Recoveries',
                    'Deaths',
                    'Infection Rate'
                ],
                datasets: [{
                    label: 'March',
                    data: [395, 59, 90, 12],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'April',
                    data: [218, 78, 46, 7],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


    }
});


/* Map Stuff */

var mymap;

$(document).ready(function () {
    if ($("#mapid").length > 0) {
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
});

var route;
var flag = 0;

function addRoute(originLat, originLong, destLat, destLong) {
    if (flag == 1) {
        return;
    }
    route = L.Routing.control({
        waypoints: [
            L.latLng(originLat, originLong),
            L.latLng(destLat, destLong)
        ],
        routeWhileDragging: true
    }).addTo(mymap);
    flag = 1;
}

function addSingleMarker(lat, long) {
    var circle = L.circle([lat, long], {
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

function renderData() {
    $.getJSON("/cases/", function (obj) {
        var markers = obj.data.map(function (arr) {
            //addCurrentLocation(arr[0], arr[1]);
            //console.log(arr[0].toFixed(6), arr[1].toFixed(6));
            return L.marker([arr[0].toFixed(6), arr[1].toFixed(6)]);
        });

        layer = L.layerGroup(markers);
        mymap.addLayer(layer);
    });
}

function renderCenters() {
    $.getJSON("/centers/", function (obj) {
        var markers = obj.data.map(function (arr) {
            //addCurrentLocation(arr[0], arr[1]);
            console.log(arr[0]);
            addClusterMarker(arr[0], arr[1], arr[2] * 100000);
            console.log(arr[0], arr[1], arr[2]);

            //return L.circle([arr[0].toFixed(6), arr[1].toFixed(6)]);            
        });

        //layer = L.layerGroup(markers);
        //mymap.addLayer(layer);
    });
}

function deleteRoute() {
    mymap.removeControl(route);
    flag = 0;
}