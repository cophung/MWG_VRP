function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  function getRoutific(routes)
  {
      let routific = [];
      for(let i = 0; i < routes.length;i++)
      {
          let routeSpecs = [0];
          while(routes[i+1] > 0 && i < routes.length){
              routeSpecs.push(routes[i+1])
              i++;
          }
          routeSpecs.push(0)
          routific.push(routeSpecs)
      }
      return routific.filter(x => x.length > 2);
  }
  function RankUsingRelatedness(arr,min, max) {
    //  let arraytempt = arr.filter((item, index)=>);
    let timtachtuyen = arr.slice();
    let a =[];
    let x = timtachtuyen.forEach(function(element,index){
      let y = 0;
      if(element===0);{ 
        a.push(index);      
      }
    console.log(a);
    });
    
    
    
  } 
  function hamnhan(x,v) {
      let i = 0;
    let muti = 1;
   while(i<v){
           muti *= x;
           i++;
   }
   return muti;
  }

  const calTotalRoute = (arr) => {
    let routeTotal = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      const arrDistances = orders[arr[i]];
      const distance = arrDistances.distances[arr[i + 1]];
      routeTotal += distance;
    }
    return routeTotal;
  };

  function RemovedVisit(RoutingPlan){
    let RoutingPlan = [0,2,4,5,0,1,2,2,4,0]
    let x= getRoutific(RoutingPlan);
    let y = x.map(x=>calTotalRoute(x));
    console.log(y);
    console.log(arr);
    const v = getRandomInt(1,arr.length);
    console.log(v);
    arr = RoutingPlan.filter((item, index) => RoutingPlan.indexOf(index) !== v); 
    console.log(arr);
    let removed = [];
    removed.push(arr[v]);
    console.log(removed);
    let toRemove = 3;
    i = 0;
    let arrayremoved = [];
    while(removed.length < toRemove)
    {
       let v = getRandomInt(0,removed.length);
       console.log("removed",v);
    //  let VisitList = RankUsingRelatedness(arr,v);
        let VisitList =[0,1]
       let random = Math.random();
       console.log("random",Math.ceil(1*hamnhan(random,6)));
       v  = VisitList[Math.ceil(1*hamnhan(random,6))];
       console.log("removed",v);
       removed.push(VisitList[v]);
        arrayremoved = arr.filter((item, index) => arr.indexOf(index) !== VisitList[v]);

    }
    console.log("arrayremoved",arrayremoved);
  }