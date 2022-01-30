var io = require('tbparty');
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});
var devs = ["MHJGC4HJCFJ4DS3CASFHGCIAHDSIA1JC", "1C1DS411HIAF37GDSE1C31FF2FAS87C2"]
const { pref } = require("./config.json");
var sec = 0
setInterval(function(){
    sec++
},1000)
var socket = io();
rl.on('line', (content) => {
socket.send(content);
});
socket.emit("user joined", "🌙 Nightwing [+]", "#4169E1", "", "")
var users = [];
socket.on("update users",function(data){users = data;});
socket.on("message", function(data){
console.log(data);

var id="";
for (var i in users){
if (users[i].nick == data.nick && users[i].home == data.home){
id = i;
}
}
if (id == socket.id){return;}
socket.on("_privKey", function(data){key=data;});

if (data.msg == pref+"pkm"){
var pokemon = require('./pokemon.json')
function randomInteger(min, max) {
let rand = min - 0.5 + Math.random() * (max - min + 1);
return Math.round(rand);
}
socket.send("You found and caught a level " + Math.floor(Math.random() * 30) + " "+ pokemon.pokemon[randomInteger(0, pokemon.pokemon.length - 1)]+"!")
}
if (data.msg == pref+"help"){
socket.send('🌊 Nightwing v4.9.3.905 Legends 🌙\n\n'+pref+'help - Shows this\n'+pref+'pkm - Generates a random pokemon to catch\n'+pref+'myinfo - Shows info about yourself\n'+pref+'say [something] - Say something\n'+pref+'about - About the bot\n'+pref+'randuck - A random duck\n'+pref+'runtime - Shows how many time bot has runned\n\n© 2021-2022 Made by LinkAdventure');
}
if (data.msg == pref+"about"){
    socket.send('🌊 Nightwing 🌙\nVersion v4.9.3.905 Legends\n\n🌟 A general purpose bot for trollbox.\nSome old code has been taken from Lifranny.\n\n© 2021-2022 Made by LinkAdventure');
    }
if (data.msg == pref+"myinfo"){
socket.send('Your name: '+data.nick+'\nYour home: '+data.home+'\nYour color: '+data.color+'');
}
if (data.msg.startsWith(pref+"evaljs") || data.msg == pref+"evaljs") {
var duck = data.msg.replace("+evaljs ","") //grab args
if (devs.includes(data.home)){
if (duck == "+evaljs" || duck == ""){
socket.send("Nope! Type js!")
return
}
if (duck==pref+"evaljs "){
socket.send("Missing argument! ");
return "missing arg";
}
try{
if (duck.toLowerCase().includes('child_process')){
socket.send("ERROR: Illegal access to computer detected!")
return "illegal";
}
socket.send("Returned: " + eval(duck))
}catch (err){
    socket.send("An error has occurred!\n" + err.toString())
    } 
} else {
socket.send("Access denied!")
}
}
if (data.msg.startsWith(pref+"say") || data.msg == pref+"say"){
var arg = data.msg.replace(pref+"say ","");
if (arg == pref+"say" || arg == ""){
socket.send("Missing input");
return;
}
if (arg.startsWith("#")){
socket.send("Wait, that's illegal! Request ducked.");
return
}
if (arg.startsWith("|")){
socket.send("lol no");
return
}
if (arg.startsWith("/")){
socket.send("The \"/\" commands not work.");
return
}
socket.send(arg);
}
if (data.msg == pref+"randuck"){
    var fs = require("fs");
    var FormData = require("form-data");
    var fetch = require("node-fetch");
    fetch("https://random-d.uk/api/randomimg").then(d => d.arrayBuffer()).then(function(response){
      var fd = new FormData();
      fd.append('file', Buffer.from(response));
      fd.append('type', "image/jpg");
      fd.append('name', "duck.jpg");
      fd.append('id', socket.id);
      fd.append('key', key.toString());
      fd.append('comment', "Here's your duck");
      fetch("https://trollbox.party/api/v0/upload", {method: 'POST', body: fd, headers: {'Content-Type': "multipart/form-data; boundary="+fd._boundary}});
    });
  }
  if (data.msg == (pref+"runtime")) {
    var min = Math.floor(sec/60)%60
    var secs = sec%60
    var hour = Math.floor(sec/3600)%24
    var day = Math.floor(sec/86400)
    socket.send(`Runtime: ${day}d, ${hour}hr, ${min}min, ${secs}sec.`)
}
});
