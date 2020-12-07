const routes = [
  [0, 1, 11, 0],
  [0, 14, 7, 2, 3, 0],
  [0, 13, 10, 0],
  [0, 8, 4, 15, 0],
  [0, 16, 12, 0],
  [0, 6, 0],
  [0, 5, 9, 0],
];

const dbOrder = [
  {
    id: 142205,
    distances: [0, 4, 5, 2, 4, 9, 5, 5, 6, 7, 2, 1, 5, 3, 8, 3, 8],
    timeTravels: [
      0,
      0.17,
      0.21,
      0.1,
      0.17,
      0.34,
      0.23,
      0.21,
      0.24,
      0.26,
      0.1,
      0.05,
      0.21,
      0.14,
      0.3,
      0.14,
      0.3,
    ],
    place: "Coop quận 9",
    order: {
      weight: 0,
      long: 106.775174,
      lat: 10.847981,
      serviceTime: 0,
      timeWindow: [8, 23],
    },
  },
  {
    id: 142188,
    distances: [4, 0, 3, 3, 8, 5, 1, 9, 3, 4, 6, 4, 2, 8, 1, 8, 4],
    timeTravels: [
      0.17,
      0,
      0.14,
      0.19,
      0.3,
      0.21,
      0.05,
      0.34,
      0.14,
      0.17,
      0.25,
      0.17,
      0.1,
      0.3,
      0.05,
      0.32,
      0.17,
    ],
    place: "Coop-Food Tam Hà",
    order: {
      weight: 7,
      long: 106.7471418,
      lat: 10.8613802,
      serviceTime: 0.7,
      timeWindow: [8, 13],
    },
  },
  {
    id: 142168,
    distances: [5, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 6, 7, 5, 1],
    timeTravels: [
      0.21,
      0.14,
      0,
      0.05,
      0.1,
      0.14,
      0.17,
      0.21,
      0.24,
      0.26,
      0.3,
      0.34,
      0.14,
      0.24,
      0.26,
      0.21,
      0.05,
    ],
    place: "KTX Khu B",
    order: {
      weight: 3,
      long: 106.7817025,
      lat: 10.8830014,
      serviceTime: 0.2,
      timeWindow: [9, 11],
    },
  },
  {
    id: 142171,
    distances: [2, 3, 1, 0, 1, 4, 3, 7, 5, 6, 7, 8, 2, 5, 9, 2, 6],
    timeTravels: [
      0.1,
      0.19,
      0.05,
      0,
      0.05,
      0.17,
      0.14,
      0.26,
      0.21,
      0.24,
      0.26,
      0.3,
      0.1,
      0.21,
      0.4,
      0.11,
      0.24,
    ],
    place: "Cafe Sân Chim",
    order: {
      weight: 3,
      long: 106.7808504,
      lat: 10.86086,
      serviceTime: 3,
      timeWindow: [12, 15],
    },
  },
  {
    id: 142173,
    distances: [4, 8, 2, 1, 0, 5, 6, 6, 1, 5, 3, 3, 9, 2, 3, 1, 2],
    timeTravels: [
      0.17,
      0.3,
      0.1,
      0.05,
      0,
      0.21,
      0.26,
      0.24,
      0.09,
      0.21,
      0.14,
      0.14,
      0.34,
      0.1,
      0.14,
      0.07,
      0.1,
    ],
    place: "Cửa hàng hoa Phúc Lan Phương",
    order: {
      weight: 4,
      long: 106.8096988,
      lat: 10.849055,
      serviceTime: 1.5,
      timeWindow: [18, 20],
    },
  },
  {
    id: 142186,
    distances: [9, 5, 3, 4, 5, 0, 7, 3, 2, 6, 7, 5, 3, 1, 6, 3, 4],
    timeTravels: [
      0.34,
      0.21,
      0.14,
      0.17,
      0.21,
      0,
      0.26,
      0.14,
      0.11,
      0.24,
      0.27,
      0.21,
      0.14,
      0.05,
      0.32,
      0.14,
      0.17,
    ],
    place: "Bưu điện Bình An - Dĩ An",
    order: {
      weight: 8,
      long: 106.7919002,
      lat: 10.8968842,
      serviceTime: 2,
      timeWindow: [11, 14],
    },
  },
  {
    id: 142169,
    distances: [5, 1, 4, 3, 6, 7, 0, 1, 4, 8, 9, 5, 2, 4, 3, 2, 4],
    timeTravels: [
      0.23,
      0.05,
      0.17,
      0.14,
      0.26,
      0.26,
      0,
      0.05,
      0.18,
      0.3,
      0.34,
      0.21,
      0.1,
      0.17,
      0.14,
      0.1,
      0.17,
    ],
    place: "Quán Gà Rán 104 Tam Hà",
    order: {
      weight: 10,
      long: 106.7466432,
      lat: 10.8628654,
      serviceTime: 1.2,
      timeWindow: [10, 12],
    },
  },
  {
    id: 142179,
    distances: [5, 9, 5, 7, 6, 3, 1, 0, 7, 1, 5, 4, 7, 8, 7, 4, 3],
    timeTravels: [
      0.21,
      0.34,
      0.21,
      0.26,
      0.24,
      0.14,
      0.05,
      0,
      0.26,
      0.05,
      0.21,
      0.17,
      0.28,
      0.3,
      0.26,
      0.17,
      0.14,
    ],
    place: "Trường mầm non Sơn Ca",
    order: {
      weight: 5,
      long: 106.8151297,
      lat: 10.8486701,
      serviceTime: 0.5,
      timeWindow: [14, 18],
    },
  },
  {
    id: 142198,
    distances: [6, 3, 6, 5, 1, 2, 4, 7, 0, 6, 4, 6, 4, 2, 3, 6, 3],
    timeTravels: [
      0.24,
      0.14,
      0.24,
      0.21,
      0.09,
      0.11,
      0.18,
      0.26,
      0,
      0.24,
      0.17,
      0.24,
      0.17,
      0.12,
      0.16,
      0.24,
      0.14,
    ],
    place: "Trường Cao Đẳng Sư Phạm Trung Ương Tp Hcm",
    order: {
      weight: 1,
      long: 106.7824705,
      lat: 10.8054577,
      serviceTime: 0.8,
      timeWindow: [16, 17],
    },
  },
  {
    id: 16901,
    distances: [7, 4, 7, 6, 5, 6, 8, 1, 6, 0, 9, 1, 5, 1, 2, 8, 5],
    timeTravels: [
      0.26,
      0.17,
      0.26,
      0.24,
      0.21,
      0.24,
      0.3,
      0.05,
      0.24,
      0,
      0.34,
      0.05,
      0.21,
      0.05,
      0.1,
      0.3,
      0.21,
    ],
    place: "Y-26 Coffee",
    order: {
      weight: 2,
      long: 106.7283992,
      lat: 10.8452113,
      serviceTime: 1.3,
      timeWindow: [18.5, 21],
    },
  },
  {
    id: 1125,
    distances: [2, 6, 8, 7, 3, 7, 9, 5, 4, 9, 0, 2, 1, 7, 2, 7, 4],
    timeTravels: [
      0.1,
      0.25,
      0.3,
      0.26,
      0.14,
      0.27,
      0.34,
      0.21,
      0.17,
      0.34,
      0,
      0.1,
      0.07,
      0.26,
      0.1,
      0.26,
      0.17,
    ],
    place: "Bệnh Viện quận 9",
    order: {
      weight: 9,
      long: 106.790147,
      lat: 10.8449235,
      serviceTime: 2.3,
      timeWindow: [19, 22],
    },
  },
  {
    id: 3306,
    distances: [1, 4, 9, 8, 3, 5, 5, 4, 6, 1, 2, 0, 6, 5, 3, 9, 7],
    timeTravels: [
      0.05,
      0.17,
      0.34,
      0.3,
      0.14,
      0.21,
      0.21,
      0.17,
      0.24,
      0.05,
      0.1,
      0,
      0.24,
      0.21,
      0.14,
      0.36,
      0.26,
    ],
    place: "Vincom Thủ Đức",
    order: {
      weight: 3,
      long: 106.7651,
      lat: 10.8501,
      serviceTime: 0.1,
      timeWindow: [8, 9],
    },
  },
  {
    id: 16058,
    distances: [5, 2, 3, 2, 9, 3, 2, 7, 4, 5, 1, 6, 0, 4, 4, 7, 9],
    timeTravels: [
      0.21,
      0.1,
      0.14,
      0.1,
      0.34,
      0.14,
      0.1,
      0.28,
      0.17,
      0.21,
      0.07,
      0.24,
      0,
      0.17,
      0.17,
      0.26,
      0.44,
    ],
    place: "Hương Sen Quán",
    order: {
      weight: 8,
      long: 106.7379834,
      lat: 10.8560058,
      serviceTime: 1.1,
      timeWindow: [9, 15],
    },
  },
  {
    id: 17113,
    distances: [3, 8, 6, 5, 2, 1, 4, 8, 2, 1, 7, 5, 4, 0, 6, 4, 2],
    timeTravels: [
      0.14,
      0.3,
      0.24,
      0.21,
      0.1,
      0.05,
      0.17,
      0.3,
      0.12,
      0.05,
      0.26,
      0.21,
      0.17,
      0,
      0.24,
      0.17,
      0.1,
    ],
    place: "Phúc Long Kha Vạn Cân",
    order: {
      weight: 6,
      long: 106.7559488,
      lat: 10.8554006,
      serviceTime: 1.7,
      timeWindow: [14, 16],
    },
  },
  {
    id: 2061,
    distances: [8, 1, 7, 9, 3, 6, 3, 7, 3, 2, 2, 3, 4, 6, 0, 6, 1],
    timeTravels: [
      0.3,
      0.05,
      0.26,
      0.4,
      0.14,
      0.32,
      0.14,
      0.26,
      0.16,
      0.1,
      0.1,
      0.14,
      0.17,
      0.24,
      0,
      0.24,
      0.05,
    ],
    place: "Steel Box Coffee",
    order: {
      weight: 2,
      long: 106.8030792,
      lat: 10.8013081,
      serviceTime: 0.2,
      timeWindow: [8, 16],
    },
  },
  {
    id: 11653,
    distances: [3, 8, 5, 2, 1, 3, 2, 4, 6, 8, 7, 9, 7, 4, 6, 0, 8],
    timeTravels: [
      0.14,
      0.32,
      0.21,
      0.11,
      0.07,
      0.14,
      0.1,
      0.17,
      0.24,
      0.3,
      0.26,
      0.36,
      0.26,
      0.17,
      0.24,
      0,
      0.3,
    ],
    place: "Chợ Đêm Man Thiện",
    order: {
      weight: 7,
      long: 106.7953719,
      lat: 10.8500524,
      serviceTime: 1,
      timeWindow: [16, 21],
    },
  },
  {
    id: 70445,
    distances: [8, 4, 1, 6, 2, 4, 4, 3, 3, 5, 4, 7, 9, 2, 1, 8, 0],
    timeTravels: [
      0.3,
      0.17,
      0.05,
      0.24,
      0.1,
      0.17,
      0.17,
      0.14,
      0.14,
      0.21,
      0.17,
      0.26,
      0.44,
      0.1,
      0.05,
      0.3,
      0,
    ],
    place: "Trung tâm Giáo dục Quốc Phòng",
    order: {
      weight: 4,
      long: 106.8016819,
      lat: 10.8898564,
      serviceTime: 0.5,
      timeWindow: [10, 20],
    },
  },
];

const dbCustomer = [
  { id: 142205, name: "Nghiax" },
  { id: 142188, name: "Co" },
  { id: 142168, name: "Trang" },
  { id: 142171, name: "Thang" },
  { id: 142173, name: "Cuong" },
  { id: 142186, name: "Nga" },
  { id: 142169, name: "Long" },
  { id: 142179, name: "Tri" },
  { id: 142198, name: "Hung" },
  { id: 16901, name: "Anh Ruy" },
  { id: 1125, name: "Anh Hieu" },
  { id: 3306, name: "Anh Tin" },
  { id: 16058, name: "Chi Xuyen" },
  { id: 17113, name: "Chi Quyen" },
  { id: 2061, name: "Chi Thuy" },
  { id: 11653, name: "Anh Hoan" },
  { id: 70445, name: "Anh Ky Ky" },
];

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/tasks/RouteTask",
  "esri/tasks/support/RouteParameters",
  "esri/tasks/support/FeatureSet",
], function (
  Map,
  MapView,
  Graphic,
  GraphicsLayer,
  RouteTask,
  RouteParameters,
  FeatureSet
) {
  // Point the URL to a valid route service that uses an
  // ArcGIS Online hosted service proxy
  var routeTask = new RouteTask({
    url:
      "https://utility.arcgis.com/usrsvcs/appservices/srsKxBIxJZB0pTZ0/rest/services/World/Route/NAServer/Route_World",
  });

  // The stops and route result will be stored in this layer
  var routeLayer = new GraphicsLayer();

  var map = new Map({
    basemap: "streets-navigation-vector",
    layers: [routeLayer], // Add the route layer to the map
  });
  var view = new MapView({
    container: "viewDiv", // Reference to the scene div created in step 5
    map: map, // Reference to the map object created before the scene
    center: [106.775174, 10.847981],
    zoom: 13,
  });

  const getRandomRGB = () => (Math.random() * 256) >> 0;

  const addPointDepotOnLayer = () => {
    const serviceTimeDepot = dbOrder[0].order.timeWindow;
    const pointAtt = {
      Name: "Kho",
      ServiceTime: `${serviceTimeDepot[0]}h - ${serviceTimeDepot[1]}h`,
    };
    const stop = new Graphic({
      geometry: {
        type: "point", // autocasts as new Point()
        longitude: dbOrder[0].order.long,
        latitude: dbOrder[0].order.lat,
      },
      symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        style: "circle",
        color: "yellow",
        size: 8,
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: "blue",
          width: 3,
        },
      },
      attributes: pointAtt,
      popupTemplate: {
        // autocasts as new PopupTemplate()
        title: "{Name}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "ServiceTime",
                label: "Thời gian phục vụ",
              },
            ],
          },
        ],
      },
    });
    routeLayer.add(stop);
  };
  addPointDepotOnLayer();

  for (let i = 0; i < routes.length; i++) {
    const itemRoutes = routes[i];
    const colorLocation = [getRandomRGB(), getRandomRGB(), getRandomRGB()];
    const colorRoute = [...colorLocation, 0.3];
    let temporaryRouteLayer = [];
    let temporaryRouteParams = [];
    // Setup the route parameters
    let routeParams = new RouteParameters({
      stops: new FeatureSet(),
      outSpatialReference: {
        // autocasts as new SpatialReference()
        wkid: 3857,
      },
    });
    for (let j = 0; j < itemRoutes.length; j++) {
      const index = itemRoutes[j];
      const order = dbOrder[index].order;
      const longitude = order.long;
      const latitude = order.lat;
      const pointAtt = {
        Route: `${i + 1}/${routes.length}`,
        Name: dbCustomer[index].name,
        Weight: `${order.weight} kg`,
        ServiceTime: `${order.serviceTime}h`,
        TimeWindow: `${order.timeWindow[0]}h - ${order.timeWindow[1]}h`,
      };

      const stop = new Graphic({
        geometry: {
          type: "point", // autocasts as new Point()
          longitude,
          latitude,
        },
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          color: colorLocation,
          size: 8,
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 1,
          },
        },
        attributes: pointAtt,
        popupTemplate: {
          // autocasts as new PopupTemplate()
          title: "Route: {Route}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "Name",
                  label: "Tên khách hàng",
                },
                {
                  fieldName: "Weight",
                  label: "Cân nặng",
                },
                {
                  fieldName: "ServiceTime",
                  label: "Thời gian phục vụ",
                },
                {
                  fieldName: "TimeWindow",
                  label: "Thời gian khách nhận hàng",
                },
              ],
            },
          ],
        },
      });
      if (index !== 0) {
        temporaryRouteLayer.push(stop);
      }
      temporaryRouteParams.push(stop);
    }

    routeLayer.addMany(temporaryRouteLayer);
    routeParams.stops.features.push(...temporaryRouteParams);
    routeTask.solve(routeParams).then((data) => {
      let routeResult = data.routeResults[0].route;
      routeResult.symbol = {
        type: "simple-line",
        join: "bevel",
        cap: "butt",
        color: colorRoute,
        width: 5,
      };
      routeLayer.add(routeResult);
    });
  }
});
