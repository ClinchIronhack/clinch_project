// const Group = require("../../models/Group")

window.onload = () => {
    startMap();
}

let markers = [];
let groupMap;


function startMap() {
    const ironhack = {
        lat: 40.392303,
        lng: -3.699624
    };
    groupMap = new google.maps.Map(
        document.getElementById('groupMap'), {
            zoom: 13,
            center: ironhack
        }
    );

    const IronhackMarker = new google.maps.Marker({
        position: {
          lat: ironhack.lat,
          lng: ironhack.lng
        },
        map: groupMap,
        title: "Ironhack 😎"
      });
}


  