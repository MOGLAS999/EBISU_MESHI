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

  // フォームのsubmitイベントに検索処理をセット
  document.getElementById("form").addEventListener('submit', function(e) {
    searchByAddress();
  });

  document.getElementById("initPos").addEventListener('click', function(e) {
    initMap();
  });
}

function searchByAddress() {
  // フォームに入力された住所情報を取得
  var address = document.getElementById("address").value;

  var geocoder = new google.maps.Geocoder();

  var opts = {
    zoom: 18,
    center: {lat: 35.642048, lng: 139.713459}
  };
  var map = new google.maps.Map(document.getElementById("map"), opts);

  var latlngFrom = new google.maps.LatLng(35.648579, 139.707181);
  var latlngTo   = new google.maps.LatLng(35.636827, 139.723617);
  //プレイスを優先的に検索する領域
  var bounds = new google.maps.LatLngBounds(latlngFrom, latlngTo);

  geocoder.geocode({
    address: address,
    bounds: bounds,
    componentRestrictions: {
      country: 'JP'
    } 
  }, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);

      placeMarkerAndPanTo(results[0].geometry.location, map);
      console.log('Geocode was successful: ' + status);
    } else {
      console.log('Geocode was not successful: ' + status);
    }
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