require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/widgets/Locate",
  "esri/widgets/Directions",
], function (Map, MapView, Search, Locate, Directions) {
  var map = new Map({
    basemap: "streets-navigation-vector",
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80543, 34.027],
    zoom: 13,
    padding: {
      right: 320,
    },
  });

  var locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function (view, options) {
      options.target.scale = 1500; // Override the default map scale
      return view.goTo(options.target);
    },
  });

  view.ui.add(locate, "top-left");

  var directions = new Directions({
    view: view,
    routeServiceUrl:
      "https://utility.arcgis.com/usrsvcs/appservices/meWhQ4gDznOpA89e/rest/services/World/Route/NAServer/Route_World",
  });
  view.ui.add(directions, "top-right");
});
