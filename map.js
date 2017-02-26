function initMap(){
  var opts = {
  	zoom: 15,
   	center: new google.maps.LatLng(35.709984,139.810703)
  };
  var map = new google.maps.Map(document.getElementById("map"), opts);
}