const map = new google.maps.Map(document.getElementById("google_map"), {
    zoom: 8,
    center: { lat: 39.9334, lng: 32.8597 }
});

const geocoder = new google.maps.Geocoder();
const infowindow = new google.maps.InfoWindow();

document.getElementById("get_coordinates").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
});

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
                map.setZoom(11);
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


