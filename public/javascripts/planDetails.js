$(document).ready(function () {

    console.log()

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
})