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

let ArrayID = DB.map((x) => x.id);
let ROUTEMAP = [0];
let i = 0;
let count = 0;
let S = [];

/**
 *
 * @param {int} i Doi tuong tiep theo
 * @param {Array} ROUTEMAP
 * @param {Array} S Danh sach cac quang duong da di
 */
const timkiem = (i, ROUTEMAP, S) => {
  const KKO = DB.map((x) => x[i]);
  for (i = 0; i < ROUTEMAP.length; i++) {
    KKO[ROUTEMAP[i]] = 0;
  }

  const reducer = (accumulator, currentValue) => {
    if (accumulator > currentValue && currentValue !== 0) {
      return currentValue;
    }
    return accumulator;
  };
  let Min = KKO.reduce(reducer, Number.MAX_VALUE);
  S.push(Min);
  let ID = KKO.indexOf(Min);
  return ID;
};

while (i >= 0 && count < DB.length - 1) {
  const ID = timkiem(i, ROUTEMAP, S);
  ROUTEMAP.push(ID);
  count++;
  i = ID;

  if (count === DB.length - 1) {
    S.push(DB.map((x) => x[ID])[0]);
  }
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(`[${ROUTEMAP}] => ${S.reduce(reducer)}`);
