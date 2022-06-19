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
        
    })
    value = pageSize
    createTable(heroes, value)
}

renderHeroes();


function createTable(list, value) {

    var table = document.createElement("table");  //makes a table element for the page

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

    var headers = ["Icon", "Name", "Full Name", "Intelligence", "Strength", "Speed", "Durability", "Power", "Combat", "Race", "Gender", "Height", "Weight", "Place of Birth", "Alignment"];

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for (var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
    }
    document.body.append(table)
}