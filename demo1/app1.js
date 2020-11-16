let arr_point = []; //mang diem [ 0, 1, 3, 2, 0 ]
let min_routing = 0; //doan duong ngan nhat

/**
 *
 * @param {array} graph [0, 10, 15, 20]
 * @param {array} arr mang diem [ 0, 1, 3, 2, 0 ]
 */
const funcMinPath = (graph, arr) => {
  let min_path = 0;

  let diff_distance = graph.filter((x) => {
    let i = graph.indexOf(x);
    return arr.indexOf(i) === -1;
  });

  min_path = Math.min(...diff_distance);
  return min_path;
};

/**
 *
 * @param {array} graph
 * @param {int depot} s depot
 */
const travellingSalesmanProblem = (graph, s) => {
  arr_point.push(s);

  // funcMinPath(graph[0], arr_point);

  do {
    let last_point = arr_point[arr_point.length - 1];
    let min_path = funcMinPath(graph[last_point], arr_point);
    arr_point.push(graph[last_point].indexOf(arr_point));
    min_routing += min_path;
  } while (arr_point.length < graph.length);

  console.log(arr_point, min_routing);
};

(function () {
  let s = 0;
  let graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
  ];
  let graph1 = [
    [0, 40, 60, 20, 30],
    [40, 0, 40, 45, 20],
    [60, 40, 0, 50, 35],
    [20, 45, 50, 0, 27],
    [30, 20, 35, 27, 0],
  ];
  travellingSalesmanProblem(graph, s);
  travellingSalesmanProblem(graph1, s);
})();
