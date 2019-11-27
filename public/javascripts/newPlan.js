$(document).ready(function () {

    var geocoder = new google.maps.Geocoder();

    // $('#submit').on('click', function (e) {
    //     e.preventDefault();
    //     geocodeAddress(geocoder, map);
    // });


    let button = document.querySelector('#getPos')
    button.addEventListener('click', function (event) { geocodeAddress(geocoder, map) })

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                if (markers.length == 0) {
                    var marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    });
                    markers.push(marker);
                    console.log(markers)
                } else {
                    setMapOnAll(null);
                    deleteMarkers();
                    var marker1 = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    });
                    markers.push(marker1);
                }
                document.getElementById('lat').value = results[0].geometry.location.lat();
                document.getElementById('lon').value = results[0].geometry.location.lng();

            } else {
                alert('Geocoder was not successful for the following reason: ' + status);
            }
        });
    }

    var markers = [];


    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.4183083, lng: -3.70275 },
            zoom: 15
        });
    }


    initMap()

});
