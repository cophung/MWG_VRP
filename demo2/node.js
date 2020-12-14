const fs = require("fs");
let customers, orders;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
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

const getRoutific = (routes) => {
  let routific = [];
  for (let i = 0; i < routes.length; i++) {
    let routeSpecs = [0];
    while (routes[i + 1] > 0 && i < routes.length) {
      routeSpecs.push(routes[i + 1])
      i++;
    }
    routeSpecs.push(0)
    routific.push(routeSpecs)
  }
  return routific.filter(x => x.length > 2);
}
const findNextPoint = (arr, arrayTempt, orders1, arrorder) => {
  let shortestWay = Number.MAX_VALUE;
  let lastIndex = arr[arr.length - 1];
  let distances = orders1[lastIndex].distances;
 
  let distancesarray = distances;
  if (arrorder){
    distancesarray = distances.filter((x,index)=>arrorder.indexOf(index)!==-1);
  }
  console.log(distancesarray);
  // let distancesarray = distances.filter((x,index)=>arrorder.indexOf(index)!==-1);
  let nextIndex;

  distancesarray.forEach((e, index) => {
    if (arr.indexOf(index) < 0 && e < shortestWay && arrayTempt.indexOf(index) < 0) {
      shortestWay = e;
      nextIndex = index;
    }
  });
  // console.log("shortestWay",shortestWay);
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

const funcIndexRoute = (firstId, capacity, time, orders1,arrorder) => {
  let routeIndex = [];
  let routeTempt = [];
  let runWhile = true;
  let cargoVolume = 0;
  let totalTimeTravel = 0;
  let TimeTravel = [];
  let arrayTempt = [];
  console.log("orders1[0].order.timeWindow",orders1[0] )
  let arraytime = orders1[0].order.timeWindow;

  let firstIndex = orders1.findIndex((e) => e.id === firstId);
  routeIndex.push(firstIndex);

  while (runWhile) {
    let nextIndex = findNextPoint(routeIndex, arrayTempt, orders1,arrorder);

    if (nextIndex) {
      function funcHandleConditions() {
        if (time) {
          // console.log("arraytime", arraytime);
          // console.log("arrayTempt", arrayTempt);
          // console.log("nextIndex", nextIndex);
          // console.log("routeIndex", routeIndex);
          // console.log("timetravel",orders1[13]);
          const timeTravle = Math.round((orders1[nextIndex].timetravels[routeIndex[routeIndex.length - 1]]) * 100) / 100;
          ;

          const timeService =
            Math.round((orders1[nextIndex].order["ServiceTime"]) * 100) / 100;
          let indexATimewindows = Math.round((orders1[nextIndex].order["timeWindow"][0] + timeService) * 100) / 100;

          // console.log("indexATimewindows",indexATimewindows);
          let indexBTimewindows =
            Math.round((orders1[nextIndex].order["timeWindow"][1] + timeService) * 100) / 100;
          ;
          let indexCTimewindows =
            Math.round((orders1[nextIndex].order["timeWindow"][0]) * 100) / 100;
          ;
          let indexDTimewindows =
            Math.round((orders1[nextIndex].order["timeWindow"][1]) * 100) / 100;
          console.log("CD", indexCTimewindows, indexDTimewindows);
          // console.log("indexBTimewindows:",  indexBTimewindows);
          let a = Math.round((arraytime[0] + timeTravle) * 100) / 100;
          let b = Math.round((arraytime[1] - timeTravle) * 100) / 100;
          let c = 0.00;
          let d = 0.00;
          if (a > indexCTimewindows) {
            c = Math.round((a + timeService) * 100) / 100;;
            // console.log("c",c);
          }
          else {
            // console.log("timeService[0]",timeService);
            c = indexATimewindows;
            // console.log("elsearraytime[0]",arraytime[0]);
          }
          if (b < indexDTimewindows) {
            d = Math.round((b + timeService) * 100) / 100;;
          }
          else {
            d = indexBTimewindows;
          }
          console.log("cd", c, d);

          // console.log("ccccccc",c);
          // console.log("dddddddd",d);
          // console.log("b < indexATimewindows",b );
          // console.log("b < indexATimewindows",indexATimewindows );
          // console.log("b < indexATimewindows",b < indexATimewindows);
          if ((a > indexCTimewindows && a > indexDTimewindows) || (b < indexCTimewindows && b < indexDTimewindows)) {
            arrayTempt.push(nextIndex);
            TimeTravel.push(arraytime);
            const lastIndexRouter = routeIndex[routeIndex.length - 1];
            // console.log("lastIndexRouter",lastIndexRouter);
            const result = routeIndex.filter(x => x != 0);
            if (arrayTempt.length + result.length === orders1.length - 1) {
              if (lastIndexRouter === 0) {
                runWhile = false;
              }

              // console.log("firstIndexfirstIndexfirstIndex",firstIndex);
              // nextIndex = firstIndex;
              // arrayTempt=[];
              // arraytime=[8,23];
              routeIndex.push(0);
              arrayTempt = [];
              nextIndex = firstIndex;
              totalTimeTravel = 0;
              cargoVolume = 0;
              // console.log("sdada",routeIndex);
              arraytime = orders1[0].order.timeWindow;
            }
            // console.log("arraytime",arraytime);
            // console.log("arrayrouteIndexrouteIndexrouteIndexrouteIndextime",routeIndex);
            // console.log("arrayTempt.length+ result.length",arrayTempt.length+ result.length );
            // console.log("arrayTempt.length+ result.length+arraytime",arraytime )
          }
          else {
            if (capacity) {
              const orderWeight = orders1[nextIndex].order.weight;
              cargoVolume += orderWeight;
              // TimeTravel.push(arraytime);
              if (cargoVolume > capacity) {
                routeIndex.push(0);
                nextIndex = firstIndex;
                totalTimeTravel = 0;
                cargoVolume = 0;

                arrayTempt = [];
                arraytime = orders1[0].order.timeWindow;
              }
              else {
                routeIndex.push(nextIndex);
                arrayTempt = [];
                if (c > d) {

                  // console.log("capacity3");
                  arrayTempt = [];
                  routeIndex.push(0);
                  // console.log("nextIndex",nextIndex);
                  // console.log("firstIndex",firstIndex);
                  totalTimeTravel = 0;
                  cargoVolume = 0;
                  // console.log("sdada",routeIndex);
                  arraytime = orders1[0].order.timeWindow;
                }
                else {
                  // routeIndex.push(nextIndex);
                  // console.log("capacity3");
                  arraytime = [c, d]

                }


              }

            }


          }


        }

      }

      funcHandleConditions();
      // console.log("totalTimeTravel",TimeTravel);
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

const findIndexRoute = (arrRoutelength, D, arraycalTotalRoute,index2) => {
  let findIndexRoute = arrRoutelength.indexOf(D);
  // let E = arraycalTotalRoute[findIndexRoute];
  console.log("dddddddddddddd",D)
let E = 0;

  arrRoutelength.forEach((e, index) => {
    if (e === D && arraycalTotalRoute[index] > E && index !== index2 && index !== 4) {
      routelenghtIndexMin = index;
    }
  });
  console.log("findIndexRoutefindIndexRoutefindIndexRoute",routelenghtIndexMin)
  return routelenghtIndexMin;
};

const findOrderRoute = (arr, order) => {
  let ordernew = [];
  arr.forEach((e, index) => {
    ordernew.push(order[e]);
  });

  return ordernew;
};


const INSERT = (ordernew) => {
  const routeIndex = funcIndexRoute(142205, 30, 5, ordernew);

  return ordernew;
};

const TinhTime = (arr, orders1) => {

  let routeIndex = [0];
  let arraytime = [8, 23];
  for (let i = 0; i < arr.length - 1; i++) {
    console.log("arr[i]", arr[i]);
    const timeTravle = Math.round((orders1[arr[i]].timetravels[routeIndex[routeIndex.length - 1]]) * 100) / 100;
    ;
    const timeService =
      Math.round((orders1[i].order["ServiceTime"]) * 100) / 100;
    let indexATimewindows = Math.round((orders1[i].order["timeWindow"][0] + timeService) * 100) / 100;

    let indexBTimewindows =
      Math.round((orders1[i].order["timeWindow"][1] + timeService) * 100) / 100;
    ;
    let indexCTimewindows =
      Math.round((orders1[i].order["timeWindow"][0]) * 100) / 100;
    let indexDTimewindows =
      Math.round((orders1[i].order["timeWindow"][1]) * 100) / 100;
    // console.log("CD",indexCTimewindows,indexDTimewindows);
    // console.log("indexBTimewindows:",  indexBTimewindows);
    console.log("arraytime[0]+timeTravle:", arraytime[0]);
    let a = Math.round((arraytime[0] + timeTravle) * 100) / 100;
    console.log("a", a);
    console.log("indexCTimewindows", indexCTimewindows);
    let b = Math.round((arraytime[1] - timeTravle) * 100) / 100;
    let c = 0.00;
    let d = 0.00;
    if (a > indexCTimewindows) {
      c = Math.round((a + timeService) * 100) / 100;;
      // console.log("c",c);
    }
    else {
      // console.log("timeService[0]",timeService);
      c = indexATimewindows;
      // console.log("elsearraytime[0]",arraytime[0]);
    }
    console.log("indexCTimewindows", c);
    if (b < indexDTimewindows) {
      d = Math.round((b + timeService) * 100) / 100;;
    }
    else {
      d = indexBTimewindows;
    }
    console.log("cd", c, d);
    arraytime = [c, d];
    routeIndex.push(arr[i]);
  }
  return arraytime;

}
const main = (orders) => {

  let orders1 = orders;
  const routeIndex = funcIndexRoute(142205, 30, 5, orders1,null);
  console.log("index routing: ", routeIndex);
  // console.log("location:", funcGetLocation(roucleteIndex));
  // console.log("total route: ", calTotalRoute(routeIndex));
  let Routific = getRoutific(routeIndex);
  let RoutificDemo = Routific.slice();
  let RouteTrue = true;
  let b = 4;
  let c = 0;
  let ArrayRemoved = [];
  for (let i = 0; i < RoutificDemo.length; i++) {
    RoutificDemo[i].pop();
  }
  // for(let Ramdom = 0;Ramdom<320; i++){}
  while (RouteTrue){ 
    console.log("lan 1 nhe: ", c+1);
    // console.log("RoutificRoutific", RoutificDemo)
    let arraycalTotalRoute = RoutificDemo.map(x => calTotalRoute(x));
    let z = RoutificDemo.map(x => x.length);
    console.log("z",z);
    let MinRoute = findMinRoute(z);
    // console.log("MinRouteMinRouteMinRouteMinRouteMinRoute",MinRoute)
    let IndexMinRouter = findIndexRoute(z, MinRoute, arraycalTotalRoute,1);
    // console.log("IndexMinRouter",IndexMinRouter);
    let Route = RoutificDemo[IndexMinRouter];
    RoutificDemo = RoutificDemo.filter((item, index) => index !== IndexMinRouter);
    // console.log("Route",Route);
    let FFF =JSON.parse(JSON.stringify(RoutificDemo));
    let Route2 = Route.filter((item, index) => Route.indexOf(item) !== 0);
    // console.log("Route222222222222222222",Route2);
    ArrayRemoved.push(...Route2);
    console.log("ArrayRemovedArrayRemovedArrayRemovedArrayRemovedArrayRemoved",ArrayRemoved);
    let Removed =ArrayRemoved.slice();
    // Removed.push(Routific[IndexMinRouter]);
    // console.log(Routific,"Routific");

    
    
    console.log("Dsadadaddadad",FFF);
    while(0 < Removed.length){
      FFF = JSON.parse(JSON.stringify(RoutificDemo));
      let b = Removed[Removed.length-1];
      console.log("bvvvv",b)
      console.log("RoutificRoutific", RoutificDemo)
      for (let i = 0; i < RoutificDemo.length; i++) {
        RoutificDemo[i].push(b);
      }
      for (let i = 0; i < RoutificDemo.length; i++) {
        RoutificDemo[i].sort(function(a, b) {
          return a - b;
        });
      }
      let InsertRoute = [];
      for (let i = 0; i < RoutificDemo.length; i++) {
    
        const findOrder = findOrderRoute(RoutificDemo[i], orders1);
        InsertRoute.push(findOrder);
    
      }
      // console.log("InsertRoute", InsertRoute);
      let arrInsert = [];
      for (let i = 0; i < RoutificDemo.length; i++) {
        // let arrInsert = [];
        console.log("lan i", i,RoutificDemo[i]);
        const insertroute = funcIndexRoute(142205, 30, 5, InsertRoute[i], RoutificDemo[i]);
        
        let routeIndex22 = insertroute.map((x,index)=>RoutificDemo[i][x]);

        console.log("routeIndex22",routeIndex22);
        arrInsert.push(routeIndex22);
        
    
      }
      // console.log("InsertRoute", arrInsert);

      // console.log("Removed",Removed);
      Removed.pop();
      RoutificDemo = JSON.parse(JSON.stringify(FFF));
      // console.log("Removed",Removed);
      // console.log("RoutificDemo",RoutificDemo);
      // console.log("fffff",FFF);

      for (let i = 0; i < arrInsert.length; i++) {
        const X = getRoutific(arrInsert[i]);


        if(X.length === 1 ){
           
            let Tempt = JSON.parse(JSON.stringify(FFF));
            // console.log("XXXXXXX",X);
            console.log("TemptTemptTemptTemptTemptTemptTemptTemptTemptTempt",Tempt);
            X[0].pop()
            Tempt[i]= X[0];
            console.log("TemptTemptTemptTemptTemptTemptTemptTemptTemptTempt",Tempt)
            RoutificDemo =  JSON.parse(JSON.stringify(Tempt));
            ArrayRemoved = ArrayRemoved.slice().filter(x=>x !== b);
            // c = 0;
            console.log("RemovedRemovedRemovedRemoved",Removed);
            break;
        }
        console.log("Removed",Removed);
      }
    }
    c++;
    if(c===4){
      //  RouteTrue = false;
       console.log("RoutificDemo",RoutificDemo);
       RouteTrue = false;
    }
    console.log("RoutificDemoRoutificDemoRoutificDemoRoutificDemoRoutificDemo",RoutificDemo);
    
    // let arraycal = arrInsert.map(x => calTotalRoute(x));
    // console.log(arraycalTotalRoute);
    // console.log("arraycal",arraycal);
  }
    
  for (let i = 0; i < RoutificDemo.length; i++) {

    console.log("RoutificDemo[i][RoutificDemo[i].length-1].order",orders1[RoutificDemo[i][RoutificDemo[i].length-1]].order.timeWindow)
    orders1[RoutificDemo[i][RoutificDemo[i].length-1]].order.timeWindow[0] = + 0.5;
    orders1[RoutificDemo[i][RoutificDemo[i].length-1]].order.timeWindow[1] = + 0.5;
    // Routific[i].push(4);
  }
  Removed = ArrayRemoved.slice();
  while(0 < Removed.length){
    FFF = JSON.parse(JSON.stringify(RoutificDemo));
    let b = Removed[Removed.length-1];
    console.log("bvvvv",b)
    console.log("RoutificRoutific", RoutificDemo)
    for (let i = 0; i < RoutificDemo.length; i++) {
      RoutificDemo[i].push(b);
    }
    for (let i = 0; i < RoutificDemo.length; i++) {
      RoutificDemo[i].sort(function(a, b) {
        return a - b;
      });
    }
    let InsertRoute = [];
    for (let i = 0; i < RoutificDemo.length; i++) {
  
      const findOrder = findOrderRoute(RoutificDemo[i], orders1);
      InsertRoute.push(findOrder);
  
    }
    // console.log("InsertRoute", InsertRoute);
    let arrInsert = [];
    for (let i = 0; i < RoutificDemo.length; i++) {
      // let arrInsert = [];
      console.log("lan i", i,RoutificDemo[i]);
      const insertroute = funcIndexRoute(142205, 30, 5, InsertRoute[i], RoutificDemo[i]);
      
      let routeIndex22 = insertroute.map((x,index)=>RoutificDemo[i][x]);

      console.log("routeIndex22",routeIndex22);
      arrInsert.push(routeIndex22);
      
  
    }
    // console.log("InsertRoute", arrInsert);

    // console.log("Removed",Removed);
    Removed.pop();
    RoutificDemo = JSON.parse(JSON.stringify(FFF));
    // console.log("Removed",Removed);
    // console.log("RoutificDemo",RoutificDemo);
    // console.log("fffff",FFF);

    for (let i = 0; i < arrInsert.length; i++) {
      const X = getRoutific(arrInsert[i]);


      if(X.length === 1 ){
         
          let Tempt = JSON.parse(JSON.stringify(FFF));
          // console.log("XXXXXXX",X);
          console.log("TemptTemptTemptTemptTemptTemptTemptTemptTemptTempt",Tempt);
          X[0].pop()
          Tempt[i]= X[0];
          console.log("TemptTemptTemptTemptTemptTemptTemptTemptTemptTempt",Tempt)
          RoutificDemo =  JSON.parse(JSON.stringify(Tempt));
          ArrayRemoved = ArrayRemoved.slice().filter(x=>x !== b);
          // c = 0;
          console.log("RemovedRemovedRemovedRemoved",Removed);
          break;
      }
      console.log("Removed",Removed);
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  ArrayRemoved.push(0);
    ArrayRemoved.sort(function(a, b) {
      return a - b;
    });

   console.log("ArrayRemoved",ArrayRemoved)
    // let InsertRoute = [];
    const findOrder = findOrderRoute(ArrayRemoved, orders1);
    // InsertRoute.push(findOrder);
    // console.log("InsertRoute",InsertRoute)

    const insertroute = funcIndexRoute(142205, 30, 5, findOrder, ArrayRemoved);
    console.log("insertroute",insertroute)

    let insertrouterest = insertroute.map((x,index)=>ArrayRemoved[x]);

    console.log("insertrouterest",insertrouterest)
    





};

main(
  [
    {
      "id": 142205,
      "distances": [
        0,
        9,
        7,
        1,
        9,
        1,
        10,
        8,
        10,
        10,
        7,
        3,
        6,
        10,
        9,
        5
      ],
      "timetravels": [
        0,
        0.29,
        0.23,
        0.03,
        0.3,
        0.03,
        0.33,
        0.26,
        0.33,
        0.33,
        0.23,
        0.1,
        0.2,
        0.33,
        0.3,
        0.16
      ],
      "order": {
        "weight": 0,
        "long": 106.775174,
        "lat": 10.847981,
        "ServiceTime": 0,
        "timeWindow": [
          8,
          23
        ]
      }
    },
    {
      "id": 142188,
      "distances": [
        9,
        0,
        10,
        2,
        7,
        5,
        10,
        10,
        4,
        2,
        6,
        1,
        1,
        8,
        4,
        4
      ],
      "timetravels": [
        0.29,
        0,
        0.33,
        0.07,
        0.23,
        0.16,
        0.32,
        0.33,
        0.13,
        0.07,
        0.2,
        0.03,
        0.03,
        0.26,
        0.13,
        0.13
      ],
      "order": {
        "weight": 10,
        "long": 106.7471418,
        "lat": 10.8613802,
        "ServiceTime": 1,
        "timeWindow": [
          10.2,
          16.2
        ]
      }
    },
    {
      "id": 142168,
      "distances": [
        7,
        10,
        0,
        5,
        9,
        6,
        9,
        3,
        6,
        4,
        2,
        8,
        9,
        1,
        10,
        5
      ],
      "timetravels": [
        0.23,
        0.33,
        0,
        0.16,
        0.29,
        0.2,
        0.29,
        0.1,
        0.19,
        0.13,
        0.07,
        0.26,
        0.29,
        0.03,
        0.33,
        0.16
      ],
      "order": {
        "weight": 13,
        "long": 106.7817025,
        "lat": 10.8830014,
        "ServiceTime": 3.5,
        "timeWindow": [
          10.9,
          15
        ]
      }
    },
    {
      "id": 142171,
      "distances": [
        1,
        2,
        5,
        0,
        1,
        1,
        8,
        9,
        4,
        10,
        5,
        5,
        9,
        2,
        7,
        1
      ],
      "timetravels": [
        0.03,
        0.07,
        0.16,
        0,
        0.03,
        0.03,
        0.26,
        0.3,
        0.13,
        0.33,
        0.17,
        0.16,
        0.29,
        0.07,
        0.23,
        0.03
      ],
      "order": {
        "weight": 12,
        "long": 106.7808504,
        "lat": 10.86086,
        "ServiceTime": 3.9,
        "timeWindow": [
          15.6,
          21.4
        ]
      }
    },
    {
      "id": 142173,
      "distances": [
        9,
        7,
        9,
        1,
        0,
        8,
        2,
        4,
        1,
        1,
        1,
        10,
        2,
        3,
        5,
        5
      ],
      "timetravels": [
        0.3,
        0.23,
        0.29,
        0.03,
        0,
        0.27,
        0.06,
        0.13,
        0.03,
        0.03,
        0.03,
        0.32,
        0.07,
        0.1,
        0.16,
        0.16
      ],
      "order": {
        "weight": 5,
        "long": 106.8096988,
        "lat": 10.849055,
        "ServiceTime": 1.2,
        "timeWindow": [
          12.6,
          18.7
        ]
      }
    },
    {
      "id": 142186,
      "distances": [
        1,
        5,
        6,
        1,
        8,
        0,
        10,
        9,
        6,
        6,
        1,
        1,
        2,
        4,
        3,
        8
      ],
      "timetravels": [
        0.03,
        0.16,
        0.2,
        0.03,
        0.27,
        0,
        0.33,
        0.3,
        0.2,
        0.19,
        0.03,
        0.03,
        0.07,
        0.13,
        0.1,
        0.26
      ],
      "order": {
        "weight": 13,
        "long": 106.7919002,
        "lat": 10.8968842,
        "ServiceTime": 0.9,
        "timeWindow": [
          10.5,
          20.7
        ]
      }
    },
    {
      "id": 142169,
      "distances": [
        10,
        10,
        9,
        8,
        2,
        10,
        0,
        4,
        3,
        7,
        2,
        8,
        2,
        3,
        7,
        1
      ],
      "timetravels": [
        0.33,
        0.32,
        0.29,
        0.26,
        0.06,
        0.33,
        0,
        0.13,
        0.1,
        0.23,
        0.07,
        0.26,
        0.07,
        0.1,
        0.23,
        0.03
      ],
      "order": {
        "weight": 13,
        "long": 106.7466432,
        "lat": 10.8628654,
        "ServiceTime": 0.7,
        "timeWindow": [
          14.2,
          16.7
        ]
      }
    },
    {
      "id": 142179,
      "distances": [
        8,
        10,
        3,
        9,
        4,
        9,
        4,
        0,
        3,
        5,
        10,
        2,
        9,
        2,
        10,
        6
      ],
      "timetravels": [
        0.26,
        0.33,
        0.1,
        0.3,
        0.13,
        0.3,
        0.13,
        0,
        0.1,
        0.16,
        0.33,
        0.07,
        0.3,
        0.07,
        0.33,
        0.2
      ],
      "order": {
        "weight": 10,
        "long": 106.8151297,
        "lat": 10.8486701,
        "ServiceTime": 0.7,
        "timeWindow": [
          14.8,
          18
        ]
      }
    },
    {
      "id": 142198,
      "distances": [
        10,
        4,
        6,
        4,
        1,
        6,
        3,
        3,
        0,
        2,
        2,
        9,
        9,
        3,
        4,
        10
      ],
      "timetravels": [
        0.33,
        0.13,
        0.19,
        0.13,
        0.03,
        0.2,
        0.1,
        0.1,
        0,
        0.07,
        0.07,
        0.3,
        0.3,
        0.1,
        0.13,
        0.33
      ],
      "order": {
        "weight": 10,
        "long": 106.7824705,
        "lat": 10.8054577,
        "ServiceTime": 2.6,
        "timeWindow": [
          9.5,
          13.2
        ]
      }
    },
    {
      "id": 16901,
      "distances": [
        10,
        2,
        4,
        10,
        1,
        6,
        7,
        5,
        2,
        0,
        2,
        1,
        6,
        3,
        10,
        8
      ],
      "timetravels": [
        0.33,
        0.07,
        0.13,
        0.33,
        0.03,
        0.19,
        0.23,
        0.16,
        0.07,
        0,
        0.07,
        0.03,
        0.2,
        0.1,
        0.32,
        0.26
      ],
      "order": {
        "weight": 13,
        "long": 106.7283992,
        "lat": 10.8452113,
        "ServiceTime": 2,
        "timeWindow": [
          9.7,
          13
        ]
      }
    },
    {
      "id": 1125,
      "distances": [
        7,
        6,
        2,
        5,
        1,
        1,
        2,
        10,
        2,
        2,
        0,
        3,
        6,
        5,
        2,
        6
      ],
      "timetravels": [
        0.23,
        0.2,
        0.07,
        0.17,
        0.03,
        0.03,
        0.07,
        0.33,
        0.07,
        0.07,
        0,
        0.1,
        0.19,
        0.16,
        0.07,
        0.2
      ],
      "order": {
        "weight": 7,
        "long": 106.790147,
        "lat": 10.8449235,
        "ServiceTime": 2,
        "timeWindow": [
          10.5,
          18.6
        ]
      }
    },
    {
      "id": 3306,
      "distances": [
        3,
        1,
        8,
        5,
        10,
        1,
        8,
        2,
        9,
        1,
        3,
        0,
        8,
        5,
        1,
        9
      ],
      "timetravels": [
        0.1,
        0.03,
        0.26,
        0.16,
        0.32,
        0.03,
        0.26,
        0.07,
        0.3,
        0.03,
        0.1,
        0,
        0.27,
        0.16,
        0.03,
        0.3
      ],
      "order": {
        "weight": 14,
        "long": 106.7651,
        "lat": 10.8501,
        "ServiceTime": 2.7,
        "timeWindow": [
          11.2,
          17.6
        ]
      }
    },
    {
      "id": 16058,
      "distances": [
        6,
        1,
        9,
        9,
        2,
        2,
        2,
        9,
        9,
        6,
        6,
        8,
        0,
        3,
        7,
        9
      ],
      "timetravels": [
        0.2,
        0.03,
        0.29,
        0.29,
        0.07,
        0.07,
        0.07,
        0.3,
        0.3,
        0.2,
        0.19,
        0.27,
        0,
        0.1,
        0.23,
        0.29
      ],
      "order": {
        "weight": 15,
        "long": 106.7379834,
        "lat": 10.8560058,
        "ServiceTime": 3.6,
        "timeWindow": [
          12.4,
          19.5
        ]
      }
    },
    {
      "id": 17113,
      "distances": [
        10,
        8,
        1,
        2,
        3,
        4,
        3,
        2,
        3,
        3,
        5,
        5,
        3,
        0,
        10,
        1
      ],
      "timetravels": [
        0.33,
        0.26,
        0.03,
        0.07,
        0.1,
        0.13,
        0.1,
        0.07,
        0.1,
        0.1,
        0.16,
        0.16,
        0.1,
        0,
        0.33,
        0.03
      ],
      "order": {
        "weight": 5,
        "long": 106.7559488,
        "lat": 10.8554006,
        "ServiceTime": 3.5,
        "timeWindow": [
          16.8,
          21.5
        ]
      }
    },
    {
      "id": 2061,
      "distances": [
        9,
        4,
        10,
        7,
        5,
        3,
        7,
        10,
        4,
        10,
        2,
        1,
        7,
        10,
        0,
        9
      ],
      "timetravels": [
        0.3,
        0.13,
        0.33,
        0.23,
        0.16,
        0.1,
        0.23,
        0.33,
        0.13,
        0.32,
        0.07,
        0.03,
        0.23,
        0.33,
        0,
        0.29
      ],
      "order": {
        "weight": 5,
        "long": 106.8030792,
        "lat": 10.8013081,
        "ServiceTime": 3.2,
        "timeWindow": [
          9.3,
          19.2
        ]
      }
    },
    {
      "id": 11653,
      "distances": [
        5,
        4,
        5,
        1,
        5,
        8,
        1,
        6,
        10,
        8,
        6,
        9,
        9,
        1,
        9,
        0
      ],
      "timetravels": [
        0.16,
        0.13,
        0.16,
        0.03,
        0.16,
        0.26,
        0.03,
        0.2,
        0.33,
        0.26,
        0.2,
        0.3,
        0.29,
        0.03,
        0.29,
        0
      ],
      "order": {
        "weight": 15,
        "long": 106.7953719,
        "lat": 10.8500524,
        "ServiceTime": 2.2,
        "timeWindow": [
          13.5,
          15.6
        ]
      }
    }
  ]
);

