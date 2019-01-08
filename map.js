function loadMap(){
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiamFjb2JzbnkiLCJhIjoiY2puYXhiejIwMDQ0cjNrbnl5ZnRheDRlZyJ9.tk7RUoUETwIYLKS5Ep1Z_Q'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout, {displayModeBar: false});
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();

}
function setupMapData(arrayOfItems){
  var lat = [];
  var lon = [];
  var des = [];
  for (var i of arrayOfItems){
    lat.push(i[0]);
    lon.push(i[1]);
    des.push(i[2]);
  }
  var data = [{
    type:'scattermapbox',
    mode:'markers',
    marker: {
      size:5,
      color:'rgb(255,0,0)'
    },
    lat:lat,
    lon:lon,
    text:des
  }];
  return data;
}


function findCenter(arrayOfItems){
  var lat = [];
  var lon = [];
  var data = 0;
  for (var i of arrayOfItems){
    lat.push(i[0]);
    lon.push(i[1]);
    data +=1;
}
var lat1 = (findMax(lat)+findMin(lat))/2;
var lon1 = (findMax(lon)+findMin(lon))/2;
return [lat1,lon1];
}
function findMax(a){
  var answer = a[0];
  var i = 1;
  for (i in a){
    if (a[i] > answer){
      answer = a[i];
    }
  }
  return answer;
}
function findMin(a){
  var answer = a[0];
  var i = 1;
  for (i in a){
    if (a[i] < answer){
      answer = a[i];
    }
  }
  return answer;
}
function setupMapLayout(arrayOfItems){
  var a = findCenter(arrayOfItems);
  var layout = {
    autosize: true,
    hovermode:'closest',
    mapbox: {
      style:'satellite-streets',
      center: {
        lat:a[0],
        lon:a[1]
      },
      zoom:11
    },
  };
  return layout;
}

function getMapParams(stringjson){
  var param = JSON.parse(stringjson);
  var data = setupMapData(param);
  var layout = setupMapLayout(param);
  return {'data': data, 'layout': layout};
}




