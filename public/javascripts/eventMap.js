// const Group = require("../../models/Group")

window.onload = () => {
    startMap();
    // getMarkers();
    // placePlans();

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


// function getMarkers() {
//     console.log("holaaaaaaaa")
//     console.log(document.querySelectorAll(".coords"))
//     // const newPlace = {
    //     lat: document.getElementById('lat').value,
    //     lng: document.getElementById('lng').value
//     // };


    // document.querySelectorAll(".lat").forEach((el)=>{
        
    //     console.log(el.name)
    // })

    // let coords =Array.from(document.querySelectorAll(".lat")).map((el,idx)=>{
    //     ({lat:Array.from(document.querySelectorAll(".lat"))[idx].value , lng:Array.from(document.querySelectorAll(".long"))[idx].value})
    // })

    // console.log(coords)

    // plansMarkers.push(newPlace)
    // console.log(newPlace)
    // console.log(plansMarkers)
    // placePlans(plansMarkers)

    // document.querySelectorAll('.coords')
    //  .then( response => {
    //    placePlans(response.data.plans);
    //  })

// }

function placePlans() {

    document.querySelectorAll(".coords").forEach((marker)=> {
        
        // const center = {
        //     lat: document.getElementById('lat').value,
        //     lng: document.getElementById('lng').value

        // };
        // console.log(center)
        new google.maps.Marker({
            position: {
                lat: +marker.value.split(',')[0],
                lng: +marker.value.split(',')[1]
            },
            map: groupMap,
            title: marker.name
        });
        //   pins.push(pin);
    });
}