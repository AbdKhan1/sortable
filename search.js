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
var table = document.createElement("table");  //makes a table element for the page

async function renderHeroes() {
  let heroes = await getHeroes();
  var headers = ["Icon", "Name", "Full Name", "Intelligence", "Strength", "Speed", "Durability", "Power", "Combat", "Race", "Gender", "Height", "Weight", "Place of Birth", "Alignment"];  

  for (var i = 0; i < heroes.length; i++) {
    var row = table.insertRow(i);
    row.insertCell(0).innerHTML = '<img src =' + heroes[i].images.xs + '>';
    row.insertCell(1).innerHTML = heroes[i].name;
    row.insertCell(2).innerHTML = heroes[i].biography.fullName;
    row.insertCell(3).innerHTML = heroes[i].powerstats.intelligence;
    row.insertCell(4).innerHTML = heroes[i].powerstats.strength;
    row.insertCell(5).innerHTML = heroes[i].powerstats.speed;
    row.insertCell(6).innerHTML = heroes[i].powerstats.durability;
    row.insertCell(7).innerHTML = heroes[i].powerstats.power;
    row.insertCell(8).innerHTML = heroes[i].powerstats.combat;
    row.insertCell(9).innerHTML = heroes[i].appearance.race;
    row.insertCell(10).innerHTML = heroes[i].appearance.gender;
    row.insertCell(11).innerHTML = heroes[i].appearance.height[1];
    row.insertCell(12).innerHTML = heroes[i].appearance.weight[1];
    row.insertCell(13).innerHTML = heroes[i].biography.placeofBirth;
    row.insertCell(14).innerHTML = heroes[i].biography.alignment;
  }

  var header = table.createTHead();
  var headerRow = header.insertRow(0);
  for (var i = 0; i < headers.length; i++) {
    headerRow.insertCell(i).innerHTML = headers[i];
  }

  document.body.append(table);
}

// const items = document.querySelector("table");
// const searchUser = document.querySelector('#search');
// let names = []

// const fetchName = () => {
//   fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
//     .then(res => {
//       res.json()
//         .then(heroes => {
//           for (let i = 0; i < heroes.length; i++) {
//             names[i] = heroes[i].name;
//           }
//           showNames(names)
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// };

// const showNames = (arr) => {
//   let output = "";
//   arr.forEach((name) => {
//   output += `${name}`});
//   items.innerHTML = output;
// }
// document.addEventListener("DOMContentLoaded", fetchName);

// searchUser.addEventListener('input', e => {
//   const element = e.target.value.toLowerCase()
//   const nameSearch = names.filter(searchNames => searchNames.toLowerCase().includes(element))
//   showNames(nameSearch)
// })