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

async function renderHeroes() {
    let heroes = await getHeroes();

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
        var oldHeader = document.querySelector('thead')
        oldHeader.remove()
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
        var oldHeader = document.querySelector('thead')
            oldHeader.remove()
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
        var oldHeader = document.querySelector('thead')
            oldHeader.remove()
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
            var oldHeader = document.querySelector('thead')
            oldHeader.remove()
        value = fHeroes.length
        
        if (characters === '') {
            curPage = 1
            value = 20
            document.querySelector('#size-options').value = '20'
        }
            createTable(fHeroes, value)
            document.querySelectorAll('#heroesTable thead tr th')
    .forEach(e => e.addEventListener("click", sortTable));

            
        
    })
    value = pageSize
    createTable(heroes, value)
   
    document.querySelectorAll('#heroesTable thead tr th')
    .forEach(e => e.addEventListener("click", sortTable));

    function sortTable(x){
   

        var column =x.target.getAttribute('data-column');
        var order = x.target.getAttribute('data-order')
        console.log(column);
       
        if (order == 'desc' && column === 'fullName'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.biography[column] > b.biography[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
          
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'fullName'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.biography[column] < b.biography[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'intelligence'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'intelligence'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'strength'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'strength'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'speed'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'speed'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'durability'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'durability'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'power'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'power'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'combat'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.powerstats[column] > b.powerstats[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'combat'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.powerstats[column] < b.powerstats[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'race'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.appearance[column] > b.appearance[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'race'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.appearance[column] < b.appearance[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'gender'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.appearance[column] > b.appearance[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'gender'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.appearance[column] < b.appearance[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'height'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.appearance[column] > b.appearance[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'height'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.appearance[column] < b.appearance[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'weight'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.appearance[column] > b.appearance[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'weight'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.appearance[column] < b.appearance[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'placeOfBirth'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.biography[column] > b.biography[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'placeOfBirth'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.biography[column] < b.biography[column] ? 1 : -1)
            var oldTable = document.querySelector('tbody')
            if(oldTable != null) oldTable.remove()
            
            createSortedTable(sHeroes,value)
        }else if (order == 'desc' && column === 'alignment'){
            x.target.setAttribute('data-order', 'asc')
           sHeroes = heroes.sort((a,b) => a.biography[column] > b.biography[column] ? 1 : -1)
           var oldTable = document.querySelector('tbody')
           if(oldTable != null) oldTable.remove()
           
           createSortedTable(sHeroes,value)
        }else if (order == 'asc' && column === 'alignment'){
            x.target.setAttribute('data-order', 'desc')
            sHeroes = heroes.sort((a,b) => a.biography[column] < b.biography[column] ? 1 : -1)
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

    
    var headers = ["Icon", "name", "fullName", "intelligence", "strength", "speed", "durability", "power", "combat", "race", "gender", "height", "weight", "placeOfBirth", "alignment"];

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for (var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).outerHTML =`<th data-column=\"${headers[i]}\" data-order=asc>${headers[i]}</th>`;
    }
    document.body.append(table)
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