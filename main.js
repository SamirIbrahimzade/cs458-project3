const map = new google.maps.Map(document.getElementById("google_map"), {
    zoom: 8,
    center: { lat: 39.9334, lng: 32.8597 }
});
const marker = new google.maps.Marker({
    position: { lat: 39.9334, lng: 32.8597 },
    map: map,
});
const geocoder = new google.maps.Geocoder();
const infowindow = new google.maps.InfoWindow();
marker.set(map);

document.getElementById("get_address").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
});
document.getElementById("get_coordinates").addEventListener("click", () => {
    getCoordinates(map, infowindow);
});
document.getElementById("distance_to_city").addEventListener("click", () => {
    distanceToCityCenter();
});
document.getElementById("distance_to_earth").addEventListener("click", () => {
    distanceToEarth();
});


function getCoordinates(map, infoWindow){
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("You are here");
            infoWindow.open(map);
            map.setCenter(pos);
            document.getElementById('latitude').value = pos.lat;
            document.getElementById('longitude').value = pos.lng;
        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
    );
    }
    else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
    }
}

function geocodeLatLng(geocoder, map, infowindow) {
    const lat = document.getElementById("latitude").value;
    const long = document.getElementById("longitude").value;
    const latlng = {
        lat: parseFloat(lat),
        lng: parseFloat(long),
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                map.setZoom(10);
                const marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert("No results found");
            }
        } else {
            window.alert("Geocoder failed due to: " + status);
        }
    });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
function distanceToCityCenter(){

    var x = document.getElementById("city");
    var str = "https://wft-geo-db.p.rapidapi.com/v1/geo/locations/"
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    function showPosition(position) {
        //x.innerHTML = "Latitude: " + position.coords.latitude + 
        //"<br>Longitude: " + position.coords.longitude;
        str = str + position.coords.latitude + "+";
        str = str + position.coords.longitude;
        str = str + "/nearbyCities?radius=100&limit=1";


        const data = null;
    
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                var obj = JSON.parse(this.responseText);
                //alert(obj.data[0].region);
                document.getElementById("city").innerHTML = obj.data[0].region + " " + (obj.data[0].distance);
            }
        });

        
        
        
        xhr.open("GET", str);
        xhr.setRequestHeader("x-rapidapi-key", "93f7edb557msh7bbbe0984ac5eedp1131c6jsnd72e92d0d647");
        xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
        
        xhr.send(data);
      }

}

function distanceToEarth(){
    var x = document.getElementById("earthDistance");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    function showPosition(position) {
        //x.innerHTML = "Latitude: " + position.coords.latitude + 
        //"<br>Longitude: " + position.coords.longitude;
        //str = str + position.coords.latitude + "+";
        //str = str + position.coords.longitude;
        
        var dist = position.coords.latitude*position.coords.latitude + position.coords.longitude*position.coords.longitude;
        dist = Math.sqrt(dist);

        alert(dist);
    }
}








