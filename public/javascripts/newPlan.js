$(document).ready(function () {


    // var input = /** @type {!HTMLInputElement} */(
    //     document.getElementById('pac-input'));

    // var types = document.getElementById('type-selector');
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    // var autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.bindTo('bounds', map);

    // var infowindow = new google.maps.InfoWindow();
    // var marker = new google.maps.Marker({
    //     map: map,
    //     anchorPoint: new google.maps.Point(0, -29)
    // });

    // autocomplete.addListener('place_changed', function () {
    //     infowindow.close();
    //     marker.setVisible(false);
    //     var place = autocomplete.getPlace();
    //     if (!place.geometry) {
    //         // User entered the name of a Place that was not suggested and
    //         // pressed the Enter key, or the Place Details request failed.
    //         window.alert("No details available for input: '" + place.name + "'");
    //         return;
    //     }

    //     // If the place has a geometry, then present it on a map.
    //     if (place.geometry.viewport) {
    //         map.fitBounds(place.geometry.viewport);
    //     } else {
    //         map.setCenter(place.geometry.location);
    //         map.setZoom(17);  // Why 17? Because it looks good.
    //     }
    //     marker.setIcon(/** @type {google.maps.Icon} */({
    //         url: place.icon,
    //         size: new google.maps.Size(71, 71),
    //         origin: new google.maps.Point(0, 0),
    //         anchor: new google.maps.Point(17, 34),
    //         scaledSize: new google.maps.Size(35, 35)
    //     }));
    //     marker.setPosition(place.geometry.location);
    //     marker.setVisible(true);

    //     var address = '';
    //     if (place.address_components) {
    //         address = [
    //             (place.address_components[0] && place.address_components[0].short_name || ''),
    //             (place.address_components[1] && place.address_components[1].short_name || ''),
    //             (place.address_components[2] && place.address_components[2].short_name || '')
    //         ].join(' ');
    //     }

    //     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    //     infowindow.open(map, marker);
    // });


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
            center: { lat: 43.5293101, lng: -5.6773233 },
            zoom: 13
        });
    }


    initMap()

});
