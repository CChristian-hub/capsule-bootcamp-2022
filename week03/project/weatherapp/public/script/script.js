
var mymap = L.map('worldmap',
    {
        center: [48.866667, 2.333333],
        zoom: 4
    }
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

var cities = $(".cities");

console.log(cities.length);


var markerIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize: [38, 95],
    shadowSize: [50, 64],

    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],

    popupAnchor: [-3, -76]

})
console.log($(".cities"))

$(".cities").each(function () {
    var marker = L.marker([$(this).data('lat'), $(this).data('lon')], { icon: markerIcon })
    marker.bindPopup($(this).data('name')).openPopup();
    marker.addTo(mymap);
})