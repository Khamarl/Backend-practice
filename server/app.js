const express = require("express");
const beasts = require("./beasts");
const cors = require("cors");
const logRoute = require("./route-logger")
// Make a basic server 
const app = express();

//Allow requests from other origins 

app.use(cors());

// Tell express to always read the body of POST requests
app.use(express.json())

//add middleware to log routes

app.use(logRoute);

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

    try { //Attempt to do something, stops at error if there is one
        // convert id into an int
        const id =parseInt(req.params.id)

        // if id is nan, exit try and throw error 
        if(!id && id !== 0) {
            throw "Invalid input"
        } else if(id < 0 || id >= beasts.length) {
            throw "No such beast"
        }
        // if(0 <= req.params.id && req.params.id < beasts.length){
            const filtered = beasts.filter((beast) => beast.id == req.params.id )
            res.send(filtered[0])
        // if there was a problem anywhere in the try, take error information 
    } catch (e) {
        // send a response explaining the issue 
        res.status(400).send({error: e})
    }

});

app.post("/beasts", (req, res) => {

    // Grab the beast data
    const newBeast = req.body;
    console.log(newBeast);

    //Select id for the beast
    newBeast["id"] = beasts.length;

    // Add it to the list of beasts 
    beasts.push(newBeast)

    // Return a message saying it worked 
    res.status(201).send(newBeast);
})

module.exports = app;
