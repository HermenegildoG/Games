function fectchGamesScores(platform){
let url 
  if(platform==undefined && platform==null){
    url='/games/scores.json';
  }else{
    url=`/games/filter?platform=${platform}`;
  }
  fetch(url)
.then((x) => x.json())
.then((data) =>{
    console.log(data) 
    new Chartist.Line('.ct-chart', data);
})
}
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object.
function chooseConsole(){
  let console = document.getElementById('console');
  let c=console.value;
  document.getElementById('lblConsole').innerText=`Selecciono ${c}`;
  fectchGamesScores(c);
  returnGames(c);
}

function returnGames(c){
  fetch("/games.json")
  .then((y) => y.json())
  .then((datos) =>{
    let newjasonDataTable = datos.filter(e => e.Platform == `${c}`);
    //console.log(newjasonDataTable);
    let tableGames = document.querySelector('#tableGames');
    tableGames.innerHTML='';
    for(let item of newjasonDataTable){
              tableGames.innerHTML+= 
              `
              <tr>
              <td class = "tdCover"><img class="cover" src="${item.UrlGame}"></img></td>
              <td style='text-align:center' width="60%"><b>GAME: <br> </b> ${item.name}</td>
              <td style='text-align:left'><h1><span class="blue">${item.Score}</span></h1></td>
              </tr>
              `
          }
  })
}

fectchGamesScores();

