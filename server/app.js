const express = require("express");
const beasts = require("./beasts");
const cors = require("cors");
// Make a basic server 
const app = express();

//Allow requests from other origins 

app.use(cors());

// Tell express to always read the body of POST requests
app.use(express.json())

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
});

app.post("/beasts", (req, res) => {

    // Grab the beast data
    const newBeast = req.body;

    //Selcet id for the beast
    newBeast["id"] = beasts.length;

    // Add it to the list of beasts 
    beasts.push(newBeast)

    // Return a message saying it worked 
    res.status(201).send(newBeast);
})

module.exports = app;
