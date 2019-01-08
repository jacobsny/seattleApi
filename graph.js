function loadGraph(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200){
                var graphParams = getGraphParams(this.response);
                var scatterParams = getScatterParams(this.response);
                Plotly.plot("graph", graphParams, {displayModeBar: false});
                Plotly.newPlot('myDiv', scatterParams.data, scatterParams.layout, {displayModeBar: false});
            }
    };
    xhttp.open("GET", "/tract");
    xhttp.send();

}

/*function loadGraph(){
    var param = [["Census Tract 0001", "Census Tract 0002", "Census Tract 0003", "Census Tract 0004.01", "Census Tract 0004.02", "Census Tract 0005", "Census Tract 0006", "Census Tract 0007", "Census Tract 0008", "Census Tract 0009", "Census Tract 0010", "Census Tract 0011", "Census Tract 0012", "Census Tract 0013", "Census Tract 0014", "Census Tract 0016", "Census Tract 0017.01", "Census Tract 0017.02", "Census Tract 0018", "Census Tract 0019", "Census Tract 0020", "Census Tract 0021", "Census Tract 0022", "Census Tract 0024", "Census Tract 0025", "Census Tract 0026", "Census Tract 0027", "Census Tract 0028", "Census Tract 0029", "Census Tract 0030", "Census Tract 0031", "Census Tract 0032", "Census Tract 0033", "Census Tract 0034", "Census Tract 0035", "Census Tract 0036", "Census Tract 0038", "Census Tract 0039", "Census Tract 0041", "Census Tract 0042", "Census Tract 0043.02", "Census Tract 0044", "Census Tract 0045", "Census Tract 0046", "Census Tract 0047", "Census Tract 0048", "Census Tract 0049", "Census Tract 0050", "Census Tract 0051", "Census Tract 0052", "Census Tract 0053.01", "Census Tract 0053.02", "Census Tract 0054", "Census Tract 0056", "Census Tract 0057", "Census Tract 0058.02", "Census Tract 0059", "Census Tract 0060", "Census Tract 0061", "Census Tract 0062", "Census Tract 0063", "Census Tract 0064", "Census Tract 0065", "Census Tract 0066", "Census Tract 0067", "Census Tract 0068", "Census Tract 0070", "Census Tract 0071", "Census Tract 0072", "Census Tract 0073", "Census Tract 0074.01", "Census Tract 0074.02", "Census Tract 0075", "Census Tract 0076", "Census Tract 0077", "Census Tract 0078", "Census Tract 0079", "Census Tract 0080.01", "Census Tract 0080.02", "Census Tract 0081", "Census Tract 0082", "Census Tract 0083", "Census Tract 0084", "Census Tract 0085", "Census Tract 0086", "Census Tract 0087", "Census Tract 0088", "Census Tract 0089", "Census Tract 0090", "Census Tract 0091", "Census Tract 0092", "Census Tract 0093", "Census Tract 0094", "Census Tract 0095", "Census Tract 0096", "Census Tract 0097.01", "Census Tract 0097.02", "Census Tract 0098", "Census Tract 0099", "Census Tract 0100.01", "Census Tract 0100.02", "Census Tract 0101", "Census Tract 0102", "Census Tract 0103", "Census Tract 0104.01", "Census Tract 0104.02", "Census Tract 0105", "Census Tract 0106", "Census Tract 0107.01", "Census Tract 0107.02", "Census Tract 0108", "Census Tract 0109", "Census Tract 0110.01", "Census Tract 0110.02", "Census Tract 0111.01", "Census Tract 0111.02", "Census Tract 0112", "Census Tract 0113", "Census Tract 0114.01", "Census Tract 0114.02", "Census Tract 0115", "Census Tract 0116", "Census Tract 0117", "Census Tract 0118", "Census Tract 0119", "Census Tract 0213"], [27, 2, 3, 18, 20, 1, 10, 8, 3, 2, 3, 9, 13, 7, 3, 4, 4, 3, 3,1, 2, 2, 2, 2, 3, 11, 3, 2, 1, 1, 1, 5, 3, 1, 2, 4, 1, 1, 9, 5, 17, 3, 1, 13, 18, 4, 4, 5, 4, 2, 8, 4, 3, 4, 6, 2, 3, 6, 3, 3, 8, 2, 3, 2, 6, 5, 5, 5, 25, 32, 2, 5, 12, 10, 7, 4, 10, 15, 13, 76, 12, 13, 11, 28, 17, 8, 6, 7, 1, 7, 17, 29, 23, 13, 8, 4, 3, 5, 12, 13, 5, 11, 3, 10, 2, 4, 9, 17, 14, 8, 9, 6, 9, 3, 3, 4, 16, 3, 3, 3, 3, 12, 7, 11, 12, 2]]
    var data = [{
    x: param[0],
    y: param[1],
    type: 'bar'
    }];

    Plotly.newPlot("graph", data);
}*/
function getGraphData(param){
    var data = [{
        x: param[0],
        y: param[1],
        type: 'bar'
    }];
    return data;
}


function getScatterData(param){
        var trace1 = {
            x: param[2],
            y: param[1],
            mode: 'markers',
            type: 'scatter',
            name: 'Income x 911 calls',
            text: param[0],
            marker: { size: 12 }
};
return [trace1];
}


function getScatterLayout(param){
   var xmax = Math.max.apply(null, param[2]);
   var xmin = Math.min.apply(null, param[2]);
   var ymax = Math.max.apply(null, param[1]);
   var ymin = Math.min.apply(null, param[1]);
    var layout = { 
  xaxis: {
    range: [ xmin-100, xmax+100 ] 
  },
  yaxis: {
    range: [ymin-10, ymax+10]
  },
  title:'Median Household Income versus Frequency of 911 Calls in Seattle Area'
};
return layout;
}


function getGraphParams(jsonstring){
    var param = JSON.parse(jsonstring);
    var data = getGraphData(param);
    return data;
}
function getScatterParams(jsonstring){
    var param = JSON.parse(jsonstring);
    var data = getScatterData(param);
    var layout = getScatterLayout(param);
    return {'data': data, 'layout': layout};
}

