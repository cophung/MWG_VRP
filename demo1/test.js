// const a = [9, 8, 7, 6, 5];
// const b = [0, 1, 0, 1];
// a.forEach((e, index) => {
//   if (b.indexOf(index) < 0) {
//     console.log(e);
//   }
// });

const fs = require("fs");
let sum = 0;
try {
  let orders = JSON.parse(fs.readFileSync("../DB/db.json"));
  orders.forEach((e, i) => {
    console.log(i, e.distances);
    // sum += e.order.weight;
  });
} catch (err) {
  console.log(err);
  return;
}
console.log(sum);

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
