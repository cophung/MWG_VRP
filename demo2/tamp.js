const fs = require("fs");
let customers, orders;

(function () {
  try {
    // customers = JSON.parse(fs.readFileSync("../DB/id.json"));
    orders = JSON.parse(fs.readFileSync("../DB/Timewindows.json"));
  } catch (err) {
    console.log(err);
    return;
  }
})();

const calTotalRoute = (arr) => {
  let routeTotal = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    const arrDistances = orders[arr[i]];
    const distance = arrDistances.distances[arr[i + 1]];
    routeTotal += distance;
  }
  return routeTotal;
};

// const RomevedRoute = (arrRemoveRoute,arrTotal) => {
//   let routeTotal = 0;
//   arr.push();
//   return routeTotal;
// };

const getRoutific= (routes)=>
{
    let routific = [];
    for(let i = 0; i < routes.length;i++)
    {
        let routeSpecs = [0];
        while(routes[i+1] > 0 && i < routes.length){
            routeSpecs.push(routes[i+1])
            i++;
        }
        routeSpecs.push(0)
        routific.push(routeSpecs)
    }
    return routific.filter(x => x.length > 2);
}
const findNextPoint = (arr,arrayTempt,orders1) => {
  let shortestWay = Number.MAX_VALUE;
  let lastIndex = arr[arr.length - 1];
  let distances = orders1[lastIndex].distances;
  let nextIndex;

  distances.forEach((e, index) => {
    if (arr.indexOf(index) < 0 && e < shortestWay && arrayTempt.indexOf(index) < 0) {
      shortestWay = e;
      nextIndex = index;
    }
  });

  return nextIndex;
};



const calIndexPoint = (arr) => {
  return arr.length;
};

const funcGetLocation = (arr) => {
  let routeLocation = [];
  arr.forEach((e) => {
    const long = orders[e].order.long;
    const lat = orders[e].order.lat;
    routeLocation.push([long, lat]);
  });
  return routeLocation;
};

const funcIndexRoute = (firstId, capacity, time,orders1) => {
  let routeIndex = [];
  let routeTempt = [];
  let runWhile = true;
  let cargoVolume = 0;
  let totalTimeTravel = 0;
  let arrayTempt = [];
  let arraytime = [8,23];
  let count = 0;
  let firstIndex = orders1.findIndex((e) => e.id === firstId);
  routeIndex.push(firstIndex);

  while (runWhile) {
    let nextIndex = findNextPoint(routeIndex,arrayTempt,orders1);

    if (nextIndex) {
      function funcHandleConditions() {
        if (time) {
          console.log("arrayTempt",arrayTempt);
          console.log("nextIndex",nextIndex);
          const timeTravle =Math.round((orders1[nextIndex].timetravels[routeIndex[routeIndex.length - 1]]) * 100) / 100;
          ;
          const timeService = 
          Math.round((orders1[nextIndex].order["ServiceTime"]) * 100) / 100;
          let indexATimewindows =  Math.round(( orders1[nextIndex].order["timeWindow"][0]+timeService ) * 100) / 100;
          
          console.log("indexATimewindows",indexATimewindows);
          let indexBTimewindows = 
          Math.round((orders1[nextIndex].order["timeWindow"][1]-timeService) * 100) / 100;
          ;
          console.log("indexBTimewindows:",  indexBTimewindows);
          let a =Math.round((arraytime[0]+timeTravle) * 100) / 100;
          let b= Math.round((arraytime[1]-timeTravle) * 100) / 100;
          let c = 0.00;
          let d = 0.00;
          if(a > indexATimewindows){
            c = a;
            console.log("c",c);
          }
          else{
            console.log("timeService[0]",timeService);
            c= indexATimewindows;
            console.log("elsearraytime[0]",arraytime[0]);
          } 
          if(b < indexBTimewindows){
              d = b;
          }
          else {
            d = indexBTimewindows;
          }
          console.log("ccccccc",c);
          console.log("dddddddd",d);
          console.log("b < indexATimewindows",b );
          console.log("b < indexATimewindows",indexATimewindows );
          console.log("b < indexATimewindows",b < indexATimewindows);
          if( ( a > indexATimewindows &&  a > indexBTimewindows) || ( b < indexATimewindows &&  b < indexBTimewindows) )
          { 
         
            arrayTempt.push(nextIndex);
            const result = routeIndex.filter(x => x!= 0);
            if(arrayTempt.length+ result.length === 16){
              console.log("hahahahhaa");
              console.log("firstIndexfirstIndexfirstIndex",firstIndex);
              // nextIndex = firstIndex;
              // arrayTempt=[];
              // arraytime=[8,23];
              routeIndex.push(0);
              arrayTempt = [];
              nextIndex = firstIndex;
              totalTimeTravel = 0;
              cargoVolume = 0;
              console.log("sdada",routeIndex);
              arraytime = [8,23]
            }
            console.log("arraytime",arraytime);
            console.log("arrayrouteIndexrouteIndexrouteIndexrouteIndextime",routeIndex);
            console.log("arrayTempt.length+ result.length",arrayTempt.length+ result.length );
            console.log("arrayTempt.length+ result.length+arraytime",arraytime )
          }
          else {
            if (capacity) {
              const orderWeight = orders1[nextIndex].order.weight;
              cargoVolume += orderWeight;
              console.log("capacity");
              if (cargoVolume > capacity) {
                routeIndex.push(0);
                nextIndex = firstIndex;
                totalTimeTravel = 0;
                cargoVolume = 0;
                console.log("capacity2");
                arrayTempt = [];
                arraytime = [8,23]
              }
              else {
                routeIndex.push(nextIndex);
                arrayTempt = [];
                if(c>d){
                 
                  console.log("capacity3");
                  arrayTempt = [];
                  nextIndex = firstIndex;
                  console.log("nextIndex",nextIndex);
                  console.log("firstIndex",firstIndex);
                  totalTimeTravel = 0;
                  cargoVolume = 0;
                  console.log("sdada",routeIndex);
                  arraytime = [8,23]
                }
                else{
                  // routeIndex.push(nextIndex);
                  console.log("capacity3");
                  arraytime = [c,d]
                  
                }

                
            }
           
            }


          }
          
        
        }
     
      }

      funcHandleConditions();
    } else {
      runWhile = false;
      routeIndex.push(0);
    }
  }

  // routeIndex.push(routeIndex[0]);

  return routeIndex;
};
const findMinRoute = (arrRoutelength) => {
  let shortestWay = Number.MAX_VALUE;
  arrRoutelength.forEach((e) => {
    if (e < shortestWay) {
      shortestWay = e;
    }
  });

  return shortestWay;
};

const findIndexRoute = (arrRoutelength,D,arraycalTotalRoute) => {
  let findIndexRoute =arrRoutelength.indexOf(D);
  let E =arraycalTotalRoute[findIndexRoute];

  arrRoutelength.forEach((e,index) => {
    if (e === D && arraycalTotalRoute[index]>E) {
      routelenghtIndexMin = e;
    }
  });

  return findIndexRoute;
};


const findOrderRoute = (arr,order) => {
  let ordernew =[];
  arr.forEach((e, index) => {
      ordernew.push(order[e]);
    });

  return ordernew;
};


const  INSERT= (ordernew) => {
  const routeIndex = funcIndexRoute(142205, 30, 5,ordernew);
  
  return ordernew;
};


const main = (orders) => {
  let orders1 =orders;
  const routeIndex = funcIndexRoute(142205, 30, 5,orders1);
  // console.log("index routing: ", routeIndex);
  // console.log("location:", funcGetLocation(routeIndex));
  // console.log("total route: ", calTotalRoute(routeIndex));
  let Routific= getRoutific(routeIndex);
  console.log("total route: ", Routific);
  let arraycalTotalRoute = Routific.map(x=>calTotalRoute(x));
  let z = Routific.map(x=>x.length);
  // console.log("z",z);
  console.log(arraycalTotalRoute);
  let MinRoute = findMinRoute(z);
  let IndexMinRouter = findIndexRoute(z,MinRoute,arraycalTotalRoute);
  // console.log("IndexMinRouter",IndexMinRouter);
  let Route=Routific[IndexMinRouter];
  console.log("Route",Route);
  let Route2 = Route.filter((item, index) => Route.indexOf(item) !== 0);
  // console.log("Route2",Route2);
  let ARRAYremoved = Routific.filter((item, index) => Routific.indexOf(item) !== IndexMinRouter);
  let Removed = [];
  Removed.push(MinRoute);
  // console.log(Removed,"Removed");
  // console.log(ARRAYremoved,"ARRAYremoved");
  // console.log(Routific,"Routific");
  ARRAYremoved.forEach((e, index) => {
      e.push(...Route2);
    });
    // ARRAYremoved.forEach((e, index) => {
    //   ordernew.push(order[e]);
    // });
  
  console.log(ARRAYremoved,"ARRAYremoved");
  // ARRAYremoved.forEach((e, index) => {
  //   e = funcIndexRoute(142205,30,5,e);
  //   console.log("eeeeeeeee",eeeee)
  // });

    // Routific.forEach((e, index) => {
    //     // const routeIndex = funcIndexRoute(142205, 30, 5);
    // });
  

};

main([
  {
    "id": 142205,
    "distances": [
      0,
      8,
      6,
      1,
      5,
      7,
      1,
      4,
      7,
      3,
      5,
      6,
      6,
      6,
      4,
      7,
      1
    ],
    "timetravels": [
      0,
      0.26,
      0.2,
      0.03,
      0.16,
      0.23,
      0.03,
      0.13,
      0.23,
      0.1,
      0.16,
      0.2,
      0.2,
      0.2,
      0.13,
      0.23,
      0.03
    ],
    "order": {
      "weight": 14,
      "long": 106.775174,
      "lat": 10.847981,
      "ServiceTime": 1.61,
      "timeWindow": [
        8.06,
        19.12
      ]
    }
  },
  {
    "id": 142188,
    "distances": [
      8,
      0,
      6,
      8,
      3,
      5,
      6,
      5,
      8,
      8,
      9,
      9,
      8,
      3,
      3,
      8,
      5
    ],
    "timetravels": [
      0.26,
      0,
      0.19,
      0.26,
      0.1,
      0.16,
      0.2,
      0.17,
      0.27,
      0.26,
      0.3,
      0.29,
      0.26,
      0.1,
      0.1,
      0.26,
      0.16
    ],
    "order": {
      "weight": 6,
      "long": 106.77441,
      "lat": 10.841086,
      "ServiceTime": 1.64,
      "timeWindow": [
        18.56,
        21.77
      ]
    }
  },
  {
    "id": 142168,
    "distances": [
      6,
      6,
      0,
      7,
      2,
      3,
      1,
      7,
      6,
      9,
      1,
      6,
      5,
      6,
      1,
      6,
      4
    ],
    "timetravels": [
      0.2,
      0.19,
      0,
      0.23,
      0.07,
      0.1,
      0.03,
      0.23,
      0.2,
      0.3,
      0.03,
      0.2,
      0.16,
      0.2,
      0.03,
      0.2,
      0.13
    ],
    "order": {
      "weight": 7,
      "long": 106.773538,
      "lat": 10.844492,
      "ServiceTime": 2.69,
      "timeWindow": [
        8.12,
        16.19
      ]
    }
  },
  {
    "id": 142171,
    "distances": [
      1,
      8,
      7,
      0,
      2,
      2,
      7,
      4,
      1,
      8,
      5,
      9,
      2,
      2,
      4,
      9,
      9
    ],
    "timetravels": [
      0.03,
      0.26,
      0.23,
      0,
      0.07,
      0.07,
      0.23,
      0.13,
      0.03,
      0.26,
      0.16,
      0.29,
      0.06,
      0.07,
      0.13,
      0.3,
      0.3
    ],
    "order": {
      "weight": 6,
      "long": 106.763187,
      "lat": 10.852758,
      "ServiceTime": 0.02,
      "timeWindow": [
        8.71,
        16.16
      ]
    }
  },
  {
    "id": 142173,
    "distances": [
      5,
      3,
      2,
      2,
      0,
      6,
      8,
      4,
      4,
      4,
      7,
      6,
      4,
      6,
      8,
      1,
      5
    ],
    "timetravels": [
      0.16,
      0.1,
      0.07,
      0.07,
      0,
      0.2,
      0.26,
      0.13,
      0.13,
      0.13,
      0.23,
      0.2,
      0.13,
      0.19,
      0.26,
      0.03,
      0.16
    ],
    "order": {
      "weight": 14,
      "long": 106.768171,
      "lat": 10.85033,
      "ServiceTime": 1.98,
      "timeWindow": [
        16.55,
        21.56
      ]
    }
  },
  {
    "id": 142186,
    "distances": [
      7,
      5,
      3,
      2,
      6,
      0,
      2,
      8,
      4,
      5,
      7,
      9,
      2,
      7,
      2,
      2,
      3
    ],
    "timetravels": [
      0.23,
      0.16,
      0.1,
      0.07,
      0.2,
      0,
      0.06,
      0.26,
      0.13,
      0.17,
      0.23,
      0.29,
      0.07,
      0.23,
      0.06,
      0.06,
      0.1
    ],
    "order": {
      "weight": 10,
      "long": 106.770891,
      "lat": 10.849677,
      "ServiceTime": 1.88,
      "timeWindow": [
        15.61,
        22.7
      ]
    }
  },
  {
    "id": 142169,
    "distances": [
      1,
      6,
      1,
      7,
      8,
      2,
      0,
      1,
      5,
      1,
      2,
      7,
      9,
      6,
      8,
      4,
      9
    ],
    "timetravels": [
      0.03,
      0.2,
      0.03,
      0.23,
      0.26,
      0.06,
      0,
      0.03,
      0.16,
      0.03,
      0.07,
      0.23,
      0.3,
      0.2,
      0.27,
      0.13,
      0.3
    ],
    "order": {
      "weight": 9,
      "long": 106.776231,
      "lat": 10.874757,
      "ServiceTime": 2.5,
      "timeWindow": [
        21.61,
        23.31
      ]
    }
  },
  {
    "id": 142179,
    "distances": [
      4,
      5,
      7,
      4,
      4,
      8,
      1,
      0,
      3,
      1,
      2,
      3,
      5,
      3,
      9,
      9,
      2
    ],
    "timetravels": [
      0.13,
      0.17,
      0.23,
      0.13,
      0.13,
      0.26,
      0.03,
      0,
      0.1,
      0.03,
      0.06,
      0.1,
      0.17,
      0.1,
      0.3,
      0.29,
      0.07
    ],
    "order": {
      "weight": 11,
      "long": 106.778244,
      "lat": 10.870165,
      "ServiceTime": 1.84,
      "timeWindow": [
        19.24,
        21.91
      ]
    }
  },
  {
    "id": 142198,
    "distances": [
      7,
      8,
      6,
      1,
      4,
      4,
      5,
      3,
      0,
      9,
      4,
      7,
      4,
      7,
      7,
      6,
      5
    ],
    "timetravels": [
      0.23,
      0.27,
      0.2,
      0.03,
      0.13,
      0.13,
      0.16,
      0.1,
      0,
      0.3,
      0.13,
      0.23,
      0.13,
      0.23,
      0.23,
      0.19,
      0.16
    ],
    "order": {
      "weight": 11,
      "long": 106.761178,
      "lat": 10.858531,
      "ServiceTime": 0.56,
      "timeWindow": [
        15.86,
        22.26
      ]
    }
  },
  {
    "id": 16901,
    "distances": [
      3,
      8,
      9,
      8,
      4,
      5,
      1,
      1,
      9,
      0,
      4,
      9,
      8,
      5,
      2,
      7,
      4
    ],
    "timetravels": [
      0.1,
      0.26,
      0.3,
      0.26,
      0.13,
      0.17,
      0.03,
      0.03,
      0.3,
      0,
      0.13,
      0.3,
      0.26,
      0.16,
      0.07,
      0.23,
      0.13
    ],
    "order": {
      "weight": 6,
      "long": 106.763545,
      "lat": 10.856093,
      "ServiceTime": 0.84,
      "timeWindow": [
        14.57,
        18.3
      ]
    }
  },
  {
    "id": 1125,
    "distances": [
      5,
      9,
      1,
      5,
      7,
      7,
      2,
      2,
      4,
      4,
      0,
      2,
      9,
      5,
      6,
      1,
      6
    ],
    "timetravels": [
      0.16,
      0.3,
      0.03,
      0.16,
      0.23,
      0.23,
      0.07,
      0.06,
      0.13,
      0.13,
      0,
      0.07,
      0.29,
      0.16,
      0.2,
      0.03,
      0.2
    ],
    "order": {
      "weight": 8,
      "long": 106.761683,
      "lat": 10.86049,
      "ServiceTime": 0.92,
      "timeWindow": [
        11.25,
        22.94
      ]
    }
  },
  {
    "id": 3306,
    "distances": [
      6,
      9,
      6,
      9,
      6,
      9,
      7,
      3,
      7,
      9,
      2,
      0,
      5,
      1,
      4,
      9,
      9
    ],
    "timetravels": [
      0.2,
      0.29,
      0.2,
      0.29,
      0.2,
      0.29,
      0.23,
      0.1,
      0.23,
      0.3,
      0.07,
      0,
      0.16,
      0.03,
      0.13,
      0.29,
      0.29
    ],
    "order": {
      "weight": 6,
      "long": 106.762352,
      "lat": 10.862985,
      "ServiceTime": 1.4,
      "timeWindow": [
        16.7,
        20.22
      ]
    }
  },
  {
    "id": 16058,
    "distances": [
      6,
      8,
      5,
      2,
      4,
      2,
      9,
      5,
      4,
      8,
      9,
      5,
      0,
      2,
      6,
      4,
      4
    ],
    "timetravels": [
      0.2,
      0.26,
      0.16,
      0.06,
      0.13,
      0.07,
      0.3,
      0.17,
      0.13,
      0.26,
      0.29,
      0.16,
      0,
      0.07,
      0.2,
      0.13,
      0.13
    ],
    "order": {
      "weight": 8,
      "long": 106.772033,
      "lat": 10.860827,
      "ServiceTime": 0.73,
      "timeWindow": [
        14.27,
        19.24
      ]
    }
  },
  {
    "id": 17113,
    "distances": [
      6,
      3,
      6,
      2,
      6,
      7,
      6,
      3,
      7,
      5,
      5,
      1,
      2,
      0,
      8,
      3,
      3
    ],
    "timetravels": [
      0.2,
      0.1,
      0.2,
      0.07,
      0.19,
      0.23,
      0.2,
      0.1,
      0.23,
      0.16,
      0.16,
      0.03,
      0.07,
      0,
      0.27,
      0.1,
      0.1
    ],
    "order": {
      "weight": 10,
      "long": 106.772033,
      "lat": 10.860827,
      "ServiceTime": 1.36,
      "timeWindow": [
        14.92,
        21.54
      ]
    }
  },
  {
    "id": 2061,
    "distances": [
      4,
      3,
      1,
      4,
      8,
      2,
      8,
      9,
      7,
      2,
      6,
      4,
      6,
      8,
      0,
      8,
      2
    ],
    "timetravels": [
      0.13,
      0.1,
      0.03,
      0.13,
      0.26,
      0.06,
      0.27,
      0.3,
      0.23,
      0.07,
      0.2,
      0.13,
      0.2,
      0.27,
      0,
      0.26,
      0.06
    ],
    "order": {
      "weight": 8,
      "long": 106.773386,
      "lat": 10.860449,
      "ServiceTime": 2.92,
      "timeWindow": [
        8.11,
        16.01
      ]
    }
  },
  {
    "id": 11653,
    "distances": [
      7,
      8,
      6,
      9,
      1,
      2,
      4,
      9,
      6,
      7,
      1,
      9,
      4,
      3,
      8,
      0,
      9
    ],
    "timetravels": [
      0.23,
      0.26,
      0.2,
      0.3,
      0.03,
      0.06,
      0.13,
      0.29,
      0.19,
      0.23,
      0.03,
      0.29,
      0.13,
      0.1,
      0.26,
      0,
      0.29
    ],
    "order": {
      "weight": 6,
      "long": 106.781517,
      "lat": 10.850289,
      "ServiceTime": 2.81,
      "timeWindow": [
        18.56,
        21.03
      ]
    }
  },
  {
    "id": 70445,
    "distances": [
      1,
      5,
      4,
      9,
      5,
      3,
      9,
      2,
      5,
      4,
      6,
      9,
      4,
      3,
      2,
      9,
      0
    ],
    "timetravels": [
      0.03,
      0.16,
      0.13,
      0.3,
      0.16,
      0.1,
      0.3,
      0.07,
      0.16,
      0.13,
      0.2,
      0.29,
      0.13,
      0.1,
      0.06,
      0.29,
      0
    ],
    "order": {
      "weight": 14,
      "long": 106.813917,
      "lat": 10.848794,
      "ServiceTime": 0.45,
      "timeWindow": [
        20.99,
        22.99
      ]
    }
  }
]);

