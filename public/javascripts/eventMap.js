// const Group = require("../../models/Group")

window.onload = () => {
    startMap();
    selectWinner();

}

let plansMarkers = [];
let pins = [];
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
    placePlans();
}

function placePlans() {

    document.querySelectorAll(".coords").forEach((marker)=> {
        new google.maps.Marker({
            position: {
                lat: +marker.value.split(',')[0],
                lng: +marker.value.split(',')[1]
            },
            map: groupMap,
            title: marker.name
        });
        
    });
}



function selectWinner(){
    let plan= document.getElementsByClassName('.list');
    plan.style.border='1rem , solid, #ff794f'
}