const express = require("express");
const beasts = require("./beasts");
// Make a basic server 
const app = express();

// Set up server routes 
app.get("/", (request, response) => {
    response.send("Welcome to the Bestiary!");
});

app.get("/beasts", (request, response) => {
    response.send(beasts);
});

app.get("/beasts/random", (req, res) => {
    //get random key 
    const random = Math.floor(Math.random() * Object.keys(beasts).length);
    // match random key to beast id
    const filtered = beasts.filter((beast) => beast.id == random )
    res.send(filtered[0])
});
app.get("/beasts/:id", (req, res) => {

   const filtered = beasts.filter((beast) => beast.id == req.params.id )
   res.send(filtered[0])
})
module.exports = app;
