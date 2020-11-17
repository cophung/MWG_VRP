const a = [9, 8, 7, 6, 5];
const b = [9, 8];
let c = a.filter((e) => b.indexOf(e) < 0);
console.log(c);
