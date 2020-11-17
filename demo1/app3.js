const fs = require("fs");

let customers, orders;
let indexRouteMap = [];
let routeMap = [];
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

// orders = [
//   {
//     id: 142205,
//     distances: [0, 10, 15, 20],
//     order: { weight: 0 },
//   },
//   {
//     id: 142188,
//     distances: [10, 0, 35, 25],
//     order: { weight: 7 },
//   },
//   {
//     id: 142168,
//     distances: [15, 35, 0, 30],
//     order: { weight: 3 },
//   },
//   {
//     id: 142171,
//     distances: [20, 25, 30, 0],
//     order: { weight: 10 },
//   },
// ];

/**
 *
 * @param {int} id id cua dia diem bat dau (depot)
 */
const main = (firstId) => {
  let id = firstId;

  while (indexRouteMap.length < orders.length) {
    let shortestWay = Number.MAX_VALUE;

    const order = orders.find((e) => e.id === id);
    const arrDistance = order.distances;

    indexRouteMap.push(orders.indexOf(order));

    arrDistance.forEach((e, index) => {
      if (indexRouteMap.indexOf(index) < 0 && e < shortestWay) {
        id = orders[index].id;
        shortestWay = e;
      }
    });

    if (shortestWay !== Number.MAX_VALUE) bestRouter += shortestWay;
  }

  //Chay tu diem cuoi cung ve lai kho
  const indexFirstOrder = indexRouteMap[0];
  const lastIndexRoute = indexRouteMap[indexRouteMap.length - 1];
  bestRouter += orders[lastIndexRoute].distances[indexFirstOrder];
  indexRouteMap.push(indexFirstOrder);

  indexRouteMap.forEach((e) => routeMap.push(orders[e].id));
};
main(142205);
console.log("index routing", indexRouteMap);
console.log("routing", routeMap);
console.log("ditance", bestRouter);
