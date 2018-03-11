const showChart = function(chartId, title, dataProvider, sideBarTitle = '') {
  var graphBaseProperties = {
    "type": "serial",
    "categoryField": "category",
    "startDuration": 1,
    "theme": "light",
    "categoryAxis": {
      "gridPosition": "start"
    },
    "trendLines": [],
    "graphs": [
      {
        "balloonColor": "#C23636",
        "balloonText": "A",
        "fillAlphas": 0.81,
        "id": "AmGraph-1",
        "title": "A",
        "type": "column",
        "valueField": "column-1"
      },
      {
        "balloonText": "B",
        "fillAlphas": 1,
        "id": "AmGraph-2",
        "title": "B",
        "type": "column",
        "valueField": "column-2"
      },
      {
        "balloonText": "C",
        "id": "AmGraph-3",
        "title": "C",
        "type": "column",
        "valueField": "column-3"
      },
      {
        "balloonText": "D",
        "id": "AmGraph-4",
        "title": "D",
        "type": "column",
        "valueField": "column-4"
      },
      {
        "balloonText": "E",
        "id": "AmGraph-5",
        "title": "E",
        "type": "column",
        "valueField": "column-5"
      },
      {
        "balloonText": "TOTAL",
        "id": "AmGraph-6",
        "title": "TOTAL",
        "type": "column",
        "valueField": "column-6"
      }
    ],
    "guides": [],
    "valueAxes": [
      {
        "id": "ValueAxis-1",
        "title": sideBarTitle
      }
    ],
    "allLabels": [],
    "balloon": {},
    "legend": {
      "enabled": true,
      "useGraphSettings": true
    },
    "titles": [
      {
        "id": "Title-1",
        "size": 15,
        "text": title
      }
    ]};
    
    AmCharts.makeChart(chartId, $.extend(graphBaseProperties, dataProvider));
};
