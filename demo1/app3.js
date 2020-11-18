const fs = require("fs");

let customers, orders;
let indexRouteMap = [];
let routeMap = [];
let routeWeight = [];
let sumRouteWeight = [];
let bestRouter = 0;

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
 * @param {Array} arr indexRouteMap
 */
const funcSumRoute = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    bestRouter += orders[arr[i]].distances[arr[i + 1]];
  }
};

/**
 *
 * @param {int} id id cua dia diem bat dau (depot)
 * @param {int} capacityVehicle suc chua cua xe hang
 */
const main = (firstId, capacityVehicle) => {
  let id = firstId;
  let chayVongLap = true;
  let sumCapacity = 0;

  while (chayVongLap) {
    let shortestWay = Number.MAX_VALUE;
    let pointRemain = 0;

    let order = orders.find((e) => e.id === id);
    const arrDistance = order.distances;
    const weightOrder = order.order.weight;

    if (capacityVehicle) {
      sumCapacity += weightOrder;
      if (sumCapacity > capacityVehicle) {
        routeWeight.push(indexRouteMap[0]);
        id = firstId;
        sumCapacity = 0;
        order = orders.find((e) => e.id === id);
      } else {
        routeWeight.push(weightOrder);
      }
    }

    indexRouteMap.push(orders.indexOf(order));

    arrDistance.forEach((e, index) => {
      if (indexRouteMap.indexOf(index) < 0) {
        pointRemain++;
        if (e < shortestWay) {
          id = orders[index].id;
          shortestWay = e;
        }
      }
    });

    chayVongLap = pointRemain > 0 ? true : false;

    // if (shortestWay !== Number.MAX_VALUE) bestRouter += shortestWay;
  }

  //Update diem cuoi cung cua indexRouteMap array
  const firstIndexRoute = indexRouteMap[0];
  indexRouteMap.push(firstIndexRoute);

  //Update id cuoi cung cua routeMap array
  indexRouteMap.forEach((e) => routeMap.push(orders[e].id));

  //Update diem cuoi cung cua routeWeight array
  if (capacityVehicle) {
    routeWeight.push(firstIndexRoute);
  }

  //Tinh tong trong luong cho tung chuyen va get ket qua vao sumRouteWeight array
  sumCapacity = 0;
  for (let i = 1; i < routeWeight.length; i++) {
    if (routeWeight[i] === 0) {
      sumRouteWeight.push(sumCapacity);
      sumCapacity = 0;
    } else sumCapacity += routeWeight[i];
  }

  //Tong quang duong di duoc
  funcSumRoute(indexRouteMap);
};

main(142205);

console.log("index routing: ", indexRouteMap);
console.log("routing: ", routeMap);
console.log("route weight: ", routeWeight);
console.log("sum router weight: ", sumRouteWeight);
console.log("ditance: ", bestRouter);
