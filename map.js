var markerList;

function initMap(){
  markerList = new google.maps.MVCArray();

  var opts = {
  	zoom: 15,
   	center: {lat: 35.642048, lng: 139.713459}
  };
  var map = new google.maps.Map(document.getElementById("map"), opts);

  var latlng1 = new google.maps.LatLng(35.646715,139.711003);
  var marker1 = new google.maps.Marker({
  	position: latlng1,
  	map: map
  });
  markerList.push(marker1);

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  // 全てのマーカーを削除
  markerList.forEach(function(marker, index) {
    marker.setMap(null);
  });

  // 新たにマーカーを作成
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  // 吹き出しの追加
  infoWindow = new google.maps.InfoWindow({ 
    content: '<div class="sample">TEST</div>'
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  markerList.push(marker);
  
  // クリックした位置に中心を移動
  //map.panTo(latLng);
}