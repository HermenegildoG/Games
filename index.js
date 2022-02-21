const express = require('express');


const app = express();
const fs = require('fs');

app.use(express.static('assets'));

app.get('/games.json',(req,res)=>{
    res.sendFile(__dirname + '/games.json');
})

app.get('/games/filter',(req,res)=>{
    let rawdata= fs.readFileSync('games.json', 'utf8');
    let g=JSON.parse(rawdata);
    let n = g.filter(e => e.Platform == req.query.platform );
    let names=[];
    let scores= [];
    for(let i=0; i<n.length; i++){
        names.push(n[i].name);
        scores.push(n[i].Score);
    }
    res.json({
        "labels":names,
        "series": [
            scores
        ]
    })
})

app.get('/games/scores.json',(req,res)=>{
let rawdata = fs.readFileSync('games.json', 'utf8');
let games = JSON.parse(rawdata);
let names = [];
let scores = [];
for(let i = 0; i < games.length; i++){
    names.push(games[i].name);
    scores.push(games[i].Score);
}
res.json({
    
        "labels": names,
        "series": [
            scores
        ]
})
})

app.get('/days.json',(req,res)=>{
    res.sendFile(__dirname + '/days.json');
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
} )

app.listen(3001,()=>{
    console.log('server on port 3001');
});
