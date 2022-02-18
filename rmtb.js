var io = require("socket.io-client");
var socket = io("https://rmtrollbox.eu-gb.mybluemix.net/",{forceNew: true});
var devs = ["d8O0w74Iw7AjfA7DgigDMcOwG1VWw5/CocKswprDmGYkUm7DgUjDtlElwow="]
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});
const pref  = "%"
rl.on('line', (content) => {
  socket.send(content);
});
socket.emit("user joined","Nightwing [%]","#4169E1","bot","");
socket.on("message", function(data){
  if (data.msg == pref+"pkm"){
    var pokemon = require('./pokemon.json')
    function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
    }
    socket.send("You found and caught a level " + Math.floor(Math.random() * 30) + " "+ pokemon.pokemon[randomInteger(0, pokemon.pokemon.length - 1)]+"!")
    }
    if (data.msg == pref+"help"){
    socket.send('🌊 Nightwing v4.9.3.905 Legends 🌙\n\n'+pref+'help - Shows this\n'+pref+'pkm - Generates a random pokemon to catch\n'+pref+'myinfo - Shows info about yourself\n'+pref+'say [something] - Say something\n'+pref+'about - About the bot\n'+pref+'disc - discord server\n\n© 2021-2022 rmtb port made by Art-Studio 2');
    }
    if (data.msg == pref+"disc"){
      socket.send('discord server: https://discord.gg/Ebdx8PK');
      }
    if (data.msg == pref+"about"){
        socket.send('🌊 Nightwing 🌙\nVersion v4.9.3.905 Legends\n\n🌟 A general purpose bot for trollbox.\nSome old code has been taken from Lifranny.\n\n© 2021-2022 rmtb port made by Art-Studio 2');
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
    if(arg.length > 150) {
      socket.send("It is spammy!")
      return;
      }
    socket.send(arg);
  }
});