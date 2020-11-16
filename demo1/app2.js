const DB = [
  {
    id: "0",
    0: 0,
    1: 40,
    2: 60,
    3: 20,
    4: 30,
  },
  {
    id: "1",
    0: 40,
    1: 0,
    2: 40,
    3: 45,
    4: 20,
  },
  {
    id: "2",
    0: 60,
    1: 40,
    2: 0,
    3: 50,
    4: 35,
  },
  {
    id: "3",
    0: 20,
    1: 45,
    2: 50,
    3: 0,
    4: 27,
  },
  {
    id: "4",
    0: 30,
    1: 20,
    2: 35,
    3: 27,
    4: 0,
  },
];

const timkiem = (i, ROUTEMAP, S) => {
  //tim gia tri nho nhat//
  const KKO = DB.map((x) => x[i]);
  for (i = 0; i < ROUTEMAP.length; i++) {
    KKO[ROUTEMAP[i]] = 0;
  }

  console.log("mang gia tri can so sanh", KKO);
  const reducer = (accumulator, currentValue) => {
    if (accumulator > currentValue && currentValue !== 0) {
      return currentValue;
    }
    return accumulator;
  };
  let Min = KKO.reduce(reducer, 99);
  console.log("Min", Min);
  S.push(Min);
  console.log("S+ooooo", S);
  let ID = KKO.indexOf(Min);
  return ID;
};

let ArrayID = DB.map((x) => x.id);
let ROUTEMAP = [0];
let i = 0;
let count = 0;
var S = [];

while (i >= 0 && count < DB.length - 1) {
  console.log("i", i);
  console.log(ArrayID);

  const ID = timkiem(i, ROUTEMAP, S);
  console.log("iD", ID);
  ROUTEMAP.push(ID);
  count++;
  console.log(ROUTEMAP);
  i = ID;
  console.log("i+1", i);
}
console.log("Siii", S);
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(S.reduce(reducer));
