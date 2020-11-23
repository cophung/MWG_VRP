const fs = require("fs");

let customers, orders;

(function () {
  try {
    customers = JSON.parse(fs.readFileSync("../DB/id.json"));
    orders = JSON.parse(fs.readFileSync("../DB/db.json"));
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

const findNextPoint = (arr) => {
  let shortestWay = Number.MAX_VALUE;
  let lastIndex = arr[arr.length - 1];
  let distances = orders[lastIndex].distances;
  let nextIndex;

  distances.forEach((e, index) => {
    if (arr.indexOf(index) < 0 && e < shortestWay) {
      shortestWay = e;
      nextIndex = index;
    }
  });

  return nextIndex;
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

const funcIndexRoute = (firstId, capacity, time, timeService = 1) => {
  let routeIndex = [];
  let runWhile = true;
  let cargoVolume = 0;
  let totalTimeTravel = 0;

  let firstIndex = orders.findIndex((e) => e.id === firstId);
  routeIndex.push(firstIndex);

  while (runWhile) {
    let nextIndex = findNextPoint(routeIndex);

    if (nextIndex) {
      function funcHandleConditions() {
        if (time) {
          const timeTravle =
            orders[nextIndex].timetravels[routeIndex[routeIndex.length - 1]];

          totalTimeTravel += timeTravle + timeService;

          if (totalTimeTravel > time) {
            nextIndex = firstIndex;
            totalTimeTravel = 0;
            cargoVolume = 0;
          }

          if (capacity) {
            const orderWeight = orders[nextIndex].order.weight;
            cargoVolume += orderWeight;

            if (cargoVolume > capacity) {
              nextIndex = firstIndex;
              totalTimeTravel = 0;
              cargoVolume = 0;
            }
          }
        }

        routeIndex.push(nextIndex);
      }
      funcHandleConditions();
    } else {
      runWhile = false;
    }
  }

  routeIndex.push(routeIndex[0]);

  return routeIndex;
};

const main = () => {
  const routeIndex = funcIndexRoute(142205, 30, 5);
  console.log("index routing: ", routeIndex);
  console.log("location:", funcGetLocation(routeIndex));
  console.log("total route: ", calTotalRoute(routeIndex));

  // const routeIndex1 = funcIndexRoute(142205, 30);
  // console.log("index routing 1: ", routeIndex1);
  // console.log("location 1:", funcGetLocation(routeIndex1));
  // console.log("total route 1: ", calTotalRoute(routeIndex1));
};

main();
