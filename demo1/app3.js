const fs = require("fs");

let customers, orders;
let indexRoute = [];
let routeMap = [];
let routeWeight = [];
let sumRouteWeight = [];
let bestRouter = 0;
let locationRoute = [];

/**
 * function read file json
 */
(function () {
  try {
    customers = JSON.parse(fs.readFileSync("../DB/id.json"));
    orders = JSON.parse(fs.readFileSync("../DB/db.json"));
  } catch (err) {
    console.log(err);
    return;
  }
})();

/**
 * @function {} tinh tong quang duong
 * @param {Array} arr indexRoute
 */
const funcSumRoute = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    bestRouter += orders[arr[i]].distances[arr[i + 1]];
  }
};

/**
 * @function {} tim diem tiep theo
 * @param {Array} arrIndex mang indexRoute
 */
const findNextPoint = (arrIndex) => {
  let shortestWay = Number.MAX_VALUE;
  let lastIndex = arrIndex[arrIndex.length - 1];
  let distances = orders[lastIndex].distances;
  let nextIndex;

  distances.forEach((e, index) => {
    if (arrIndex.indexOf(index) < 0 && e < shortestWay) {
      shortestWay = e;
      nextIndex = index;
    }
  });

  return nextIndex;
};

/**
 *
 * @param {Array} arr mang indexRoute
 */
const funcGetLocation = (arr) => {
  arr.forEach((e) => {
    const long = orders[e].order.long;
    const lat = orders[e].order.lat;
    locationRoute.push({ long: long, lat: lat });
  });
};

/**
 *
 * @param {int} id id cua dia diem bat dau (depot)
 * @param {int} capacity suc chua cua xe hang
 */
const funcIndexRoute = (firstId, capacity) => {
  let runWhile = true;
  let firstIndex = orders.findIndex((e) => e.id === firstId);
  indexRoute.push(firstIndex);
  let cargoVolume = 0;

  while (runWhile) {
    const nextIndex = findNextPoint(indexRoute);
    if (nextIndex) {
      if (capacity) {
        const orderWeight = orders[nextIndex].order.weight;
        cargoVolume += orderWeight;
        if (cargoVolume <= capacity) {
          routeWeight.push(orderWeight);
          indexRoute.push(nextIndex);
        } else {
          routeWeight.push(0);
          indexRoute.push(firstIndex);
          cargoVolume = 0;
        }
      } else {
        indexRoute.push(nextIndex);
      }
    } else {
      if (capacity) {
        routeWeight = [0, ...routeWeight, 0];
      }
      runWhile = false;
    }
  }
  indexRoute.push(indexRoute[0]);
  funcSumRoute(indexRoute);
};

funcIndexRoute(142205, 30);
funcGetLocation(indexRoute);

console.log("index routing: ", indexRoute);
console.log("routing: ", routeMap);
console.log("location:", locationRoute);
console.log("route weight: ", routeWeight);
console.log("sum router weight: ", sumRouteWeight);
console.log("ditance: ", bestRouter);
