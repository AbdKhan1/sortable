async function getHeroes() {
    let url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
    console.log(res);
}
let sortHeroes 
async function renderHeroes() {
    let heroes = await getHeroes();
    sortHeroes = heroes
    var searchBar = document.createElement("input");
    searchBar.setAttribute('type', 'text')
    document.body.appendChild(searchBar);

    var size = document.getElementById("size-options");
    var value = size.options[size.selectedIndex].text;
    let pageSize = value;
    let curPage = 1;
    size.addEventListener('change', event => {
        value = event.target.value
        var oldTable = document.querySelector('tbody')
        if (oldTable != null) oldTable.remove()
        // var oldHeader = document.querySelector('thead')
        // oldHeader.remove()
        createTable(heroes,value)
         pageSize = value;
         curPage = 1
    });
    
    
    
    document.querySelector('#nextButton').addEventListener('click', nextPage, false);
    document.querySelector('#prevButton').addEventListener('click', previousPage, false);
    
    function previousPage() {
        if (curPage !== 1) {
        if(curPage >= 1) curPage--;
        console.log(curPage, pageSize)
        let newArr = heroes.slice((curPage * pageSize)-pageSize,(curPage *pageSize))
        var oldTable = document.querySelector('tbody')
        if (oldTable !== null) oldTable.remove()
        // var oldHeader = document.querySelector('thead')
        //     oldHeader.remove()
            value = pageSize
        createTable(newArr,value);
        }
    }
    function nextPage() {
        if(curPage <= heroes.length / pageSize) {
        if((curPage * pageSize) < heroes.length) curPage++;
        
        let newArr = heroes.slice((curPage * pageSize)-pageSize,(curPage*pageSize))
       console.log(curPage, pageSize)
        var oldTable = document.querySelector('tbody')
        if (oldTable !== null) oldTable.remove()
        // var oldHeader = document.querySelector('thead')
        //     oldHeader.remove()
            value = pageSize
             if (curPage > heroes.length / pageSize) value = heroes.length % pageSize
        createTable(newArr,value);
    }
}

    searchBar.addEventListener('keyup', event => {
        var characters = event.target.value.toLowerCase()
       
        var fHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(characters))
        
    
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
        //     var oldHeader = document.querySelector('thead')
        // oldHeader.remove()
        // let oldTab = document.querySelector('table')
        // if (oldTab !== null) oldTab.remove()
        value = fHeroes.length
        
        if (characters === '') {
            curPage = 1
            value = 20
            document.querySelector('#size-options').value = '20'
        }
        createTable(fHeroes, value)
        sortHeroes = fHeroes
            document.querySelectorAll('#heroesTable thead tr th')
    .forEach(e => e.addEventListener("click", sortTable));

            
        
    })
    value = pageSize
    createTable(heroes, value)

    var tableOne = document.querySelector('table')
    var headers = ["Icon", "name", "fullName", "intelligence", "strength", "speed", "durability", "power", "combat", "race", "gender", "height", "weight", "placeOfBirth", "alignment"];

    var header = tableOne.createTHead();
    var headerRow = header.insertRow(0);
    for (var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).outerHTML =`<th data-column=\"${headers[i]}\" data-order=desc>${headers[i]}</th>`;
    }
    
   
    document.querySelectorAll('th')
    .forEach(e => e.addEventListener("click", sortTable));

    function sortTable(x){
   

        var column =x.target.getAttribute('data-column');
        var order = x.target.getAttribute('data-order')
        console.log(column, order);

         if (order == 'desc' && column === 'name'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a[column] > b[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'name'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a[column] < b[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'fullName'){
            x.target.setAttribute('data-order', 'asc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.biography[column] === null || a.biography[column] === "-" || a.biography[column] === "") {
                
                  return 1;
                }else if (b.biography[column] === null || b.biography[column] === "-" || b.biography[column] === "") {
                  return -1;
                }else if (a.biography[column] === b.biography[column]) {
                  return 0;
                }else{
                    return a.biography[column] < b.biography[column] ? -1 : 1;
            }});
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
          
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'fullName'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.biography[column] === null || a.biography[column] === "-" || a.biography[column] === "") {
                  return 1;
                }else if (b.biography[column] === null || b.biography[column] === "-"|| b.biography[column] === "") {
                  return -1;
                }else if (a.biography[column] === b.biography[column]) {
                  return 0;
                }else{
                    return a.biography[column] < b.biography[column] ? 1 : -1;
            }});
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'intelligence'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'intelligence'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'strength'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'strength'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'speed'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'speed'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'durability'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'durability'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'power'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'power'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'combat'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'combat'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'race'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) => {
             if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "") {
            return 1;
          }else if (b.appearance[column] === null || b.appearance[column] === "-" || a.appearance[column] === "") {
            return -1;
          }else if (a.appearance[column] === b.appearance[column]) {
            return 0;
          }else{
              return a.appearance[column] < b.appearance[column] ? -1 : 1;
      }});
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'race'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "") {
                  return 1;
                }else if (b.appearance[column] === null || b.appearance[column] === "-" || b.appearance[column] === "") {
                  return -1;
                }else if (a.appearance[column] === b.appearance[column]) {
                  return 0;
                }else{
                    return a.appearance[column] < b.appearance[column] ? 1 : -1;
            }});
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'gender'){
            x.target.setAttribute('data-order', 'asc')
            sHeroes = sortHeroes.sort((a,b) => {
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "") {
               return 1;
             }else if (b.appearance[column] === null || b.appearance[column] === "-" || a.appearance[column] === "") {
               return -1;
             }else if (a.appearance[column] === b.appearance[column]) {
               return 0;
             }else{
                 return a.appearance[column] < b.appearance[column] ? -1 : 1;
         }});
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'gender'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "") {
                  return 1;
                }else if (b.appearance[column] === null || b.appearance[column] === "-" || b.appearance[column] === "") {
                  return -1;
                }else if (a.appearance[column] === b.appearance[column]) {
                  return 0;
                }else{
                    return a.appearance[column] < b.appearance[column] ? 1 : -1;
            }});
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'height'){
            x.target.setAttribute('data-order', 'asc')
            sHeroes = sortHeroes.sort((a,b) => {
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "" || a.appearance[column][1] === undefined) {
               return 1;
             }else if (b.appearance[column] === null || b.appearance[column] === "-" || a.appearance[column] === "" || b.appearance[column][1] === undefined) {
               return -1;
             }else if (heightConverter(a.appearance[column][1]) === heightConverter(b.appearance[column][1])) {
               return 0;
             }else{
                 return heightConverter(a.appearance[column][1]) < heightConverter(b.appearance[column][1]) ? -1 : 1;
         }});
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'height'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => {
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "" || a.appearance[column][1] === undefined) {
               return 1;
             }else if (b.appearance[column] === null || b.appearance[column] === "-" || a.appearance[column] === "" || b.appearance[column][1] === undefined) {
               return -1;
             }else if (heightConverter(a.appearance[column][1]) === heightConverter(b.appearance[column][1])) {
               return 0;
             }else{
                 return heightConverter(a.appearance[column][1]) < heightConverter(b.appearance[column][1]) ? 1 : -1;
         }});
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'weight'){
            x.target.setAttribute('data-order', 'asc')
            sHeroes = sortHeroes.sort((a,b) => {
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "" || a.appearance[column][1] === undefined) {
               return 1;
             }else if (b.appearance[column] === null || b.appearance[column] === "-" || a.appearance[column] === "" || b.appearance[column][1] === undefined) {
               return -1;
             }else if (weightConverter(a.appearance[column][1]) === weightConverter(b.appearance[column][1])) {
               return 0;
             }else{
                 return weightConverter(a.appearance[column][1]) < weightConverter(b.appearance[column][1]) ? -1 : 1;
         }});
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'weight'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) => {
                if (a.appearance[column] === null || a.appearance[column] === "-" || a.appearance[column] === "" || a.appearance[column][1] === undefined) {
               return 1;
             }else if (b.appearance[column] === null || b.appearance[column] === "-" || a.appearance[column] === "" || b.appearance[column][1] === undefined) {
               return -1;
             }else if (weightConverter(a.appearance[column][1]) === weightConverter(b.appearance[column][1])) {
               return 0;
             }else{
                 return weightConverter(a.appearance[column][1]) < weightConverter(b.appearance[column][1]) ? 1 : -1;
         }});
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'placeOfBirth'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = sortHeroes.sort((a,b) =>{
            if (a.biography[column] === null || a.biography[column] === "-" || a.biography[column] === "") {
              return 1;
            }else if (b.biography[column] === null || b.biography[column] === "-" || b.biography[column] === "") {
              return -1;
            }else if (a.biography[column] === b.biography[column]) {
              return 0;
            }else{
                return a.biography[column] < b.biography[column] ? -1 : 1;
        }});
          
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'placeOfBirth'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.biography[column] === null || a.biography[column] === "-" || a.biography[column] === "") {
                  return 1;
                }else if (b.biography[column] === null || b.biography[column] === "-" || b.biography[column] === "") {
                  return -1;
                }else if (a.biography[column] === b.biography[column]) {
                  return 0;
                }else{
                    return a.biography[column] < b.biography[column] ? 1 : -1;
            }});
            
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'alignment'){
            x.target.setAttribute('data-order', 'asc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.biography[column] === null || a.biography[column] === "-" || a.biography[column] === "") {
                  return 1;
                }else if (b.biography[column] === null || b.biography[column] === "-" || b.biography[column] === "") {
                  return -1;
                }else if (a.biography[column] === b.biography[column]) {
                  return 0;
                }else{
                    return a.biography[column] < b.biography[column] ? -1 : 1;
            }});
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'alignment'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = sortHeroes.sort((a,b) =>{
                if (a.biography[column] === null || a.biography[column] === "-" || a.biography[column] === "") {
                  return 1;
                }else if (b.biography[column] === null || b.biography[column] === "-" || b.biography[column] === "") {
                  return -1;
                }else if (a.biography[column] === b.biography[column]) {
                  return 0;
                }else{
                    return a.biography[column] < b.biography[column] ? 1 : -1;
            }});
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }
        
    }
}



renderHeroes();





function createTable(list, value) {

    var table = document.createElement("table"); 
    table.setAttribute("id", "heroesTable") //makes a table element for the page

    for (var i = 0; i < value; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = '<img src =' + list[i].images.xs + '>';
        row.insertCell(1).innerHTML = list[i].name;
        row.insertCell(2).innerHTML = list[i].biography.fullName;
        row.insertCell(3).innerHTML = list[i].powerstats.intelligence;
        row.insertCell(4).innerHTML = list[i].powerstats.strength;
        row.insertCell(5).innerHTML = list[i].powerstats.speed;
        row.insertCell(6).innerHTML = list[i].powerstats.durability;
        row.insertCell(7).innerHTML = list[i].powerstats.power;
        row.insertCell(8).innerHTML = list[i].powerstats.combat;
        row.insertCell(9).innerHTML = list[i].appearance.race;
        row.insertCell(10).innerHTML = list[i].appearance.gender;
        row.insertCell(11).innerHTML = list[i].appearance.height[1];
        row.insertCell(12).innerHTML = list[i].appearance.weight[1];
        row.insertCell(13).innerHTML = list[i].biography.placeOfBirth;
        row.insertCell(14).innerHTML = list[i].biography.alignment;
    }

    
    // var headers = ["Icon", "name", "fullName", "intelligence", "strength", "speed", "durability", "power", "combat", "race", "gender", "height", "weight", "placeOfBirth", "alignment"];

    // var header = table.createTHead();
    // var headerRow = header.insertRow(0);
    // for (var i = 0; i < headers.length; i++) {
    //     headerRow.insertCell(i).outerHTML =`<th data-column=\"${headers[i]}\" data-order=desc>${headers[i]}</th>`;
    // }
    document.body.append(table)
    //  document.querySelector('table').appendChild(table)
}
let heroes
let sHeroes

function createSortedTable(list, value) {

    var table = document.createElement("tbody"); 
    table.setAttribute("id", "heroesTable") //makes a table element for the page

    for (var i = 0; i < value; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = '<img src =' + list[i].images.xs + '>';
        row.insertCell(1).innerHTML = list[i].name;
        row.insertCell(2).innerHTML = list[i].biography.fullName;
        row.insertCell(3).innerHTML = list[i].powerstats.intelligence;
        row.insertCell(4).innerHTML = list[i].powerstats.strength;
        row.insertCell(5).innerHTML = list[i].powerstats.speed;
        row.insertCell(6).innerHTML = list[i].powerstats.durability;
        row.insertCell(7).innerHTML = list[i].powerstats.power;
        row.insertCell(8).innerHTML = list[i].powerstats.combat;
        row.insertCell(9).innerHTML = list[i].appearance.race;
        row.insertCell(10).innerHTML = list[i].appearance.gender;
        row.insertCell(11).innerHTML = list[i].appearance.height[1];
        row.insertCell(12).innerHTML = list[i].appearance.weight[1];
        row.insertCell(13).innerHTML = list[i].biography.placeOfBirth;
        row.insertCell(14).innerHTML = list[i].biography.alignment;
    }

    
    // var headers = ["Icon", "name", "fullName", "intelligence", "strength", "speed", "durability", "power", "combat", "race", "gender", "height", "weight", "placeOfBirth", "alignment"];

    // var header = table.createTHead();
    // var headerRow = header.insertRow(0);
    // for (var i = 0; i < headers.length; i++) {
    //     headerRow.insertCell(i).outerHTML =`<th data-column=\"${headers[i]}\" data-order=asc>${headers[i]}</th>`;
    // }
    document.querySelector('table').appendChild(table)
    
}


function sortedAsc(arr, a,b){


arr.sort((a, b) => {
        if (a === null || a === "-") {
          return 1;
        }
      
        if (b === null || b === "-") {
          return -1;
        }
      
        if (a === b) {
          return 0;
        }
      
        return a < b ? -1 : 1;
      });
}

function sortedDesc (arr, a, b){
    arr.sort((a, b) => {
    if (a === null || a === "-") {
      return 1;
    }
  
    if (b === null || b === "-") {
      return -1;
    }
  
    if (a === b) {
      return 0;
    }
  
    return a < b ? 1 : -1;
  });
}

function heightConverter(a){
    
    if (a.includes("cm")){
        console.log(parseInt(a));
       return parseInt(a)
    }else if (a.includes("meters")){
        console.log((parseInt(a))*100);
    return (parseInt(a))*100
   }
}
  
heightConverter("123 meters")

function weightConverter(a){
    if (a.includes("kg")){
console.log(a);
        return parseInt(a)
    }else if (a.includes("tons")){
        if (a.includes(",")){
            return (parseInt(a)*(1000*1000))
        }else{

        
        console.log((parseInt(a)*1000));
        return (parseInt(a)*1000)
    }
}
}

weightConverter("9,000 tons")
  