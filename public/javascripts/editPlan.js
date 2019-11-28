$(document).ready(function () {

    let lat = +$("#lat").val()
    let lng = +$("#lng").val()

    console.log(lat, lng)

    let latLong = { lat, lng }

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: latLong
    })

    let marker = new google.maps.Marker({
        position: latLong,
        map: map
    })


    var geocoder = new google.maps.Geocoder();


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
                document.getElementById('lng').value = results[0].geometry.location.lng();

            } else {
                alert('Geocoder was not successful for the following reason: ' + status);
            }
        });
    }

    var markers = [];




})