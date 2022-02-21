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

  const xhttp = new XMLHttpRequest();
  xhttp.open('Get', 'games.json',true);
  xhttp.send();
  xhttp.onreadystatechange= function(){
    if(this.readyState==4 && this.status==200){
      let jsonDataTable = JSON.parse(this.responseText);
      let newjasonDataTable = jsonDataTable.filter(e => e.Platform == `${c}`);
      let tableGames = document.querySelector('#tableGames');
      tableGames.innerHTML='';
      for(let item of newjasonDataTable){
          tableGames.innerHTML+= 
          `
          <tr>
            <td style='text-align:center'><b>GAME: </b> ${item.name}</td>
            <td style='text-align:left'><b>Score: </b> ${item.Score}</td>
          </tr>
          <br>
          <tr>
          <td colspan="2">
            <img class="cover" src="${item.UrlGame}"></img>
            </td>
          </tr>
          `
      }
    }
  }
}

fectchGamesScores();
