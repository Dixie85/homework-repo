const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const watchListPath = path.join(__dirname, "data", "watchList.json");

const POST = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).send("<h1>Welcome to our Movie page!</h1>")
});

app.get("/watch_list", (req,res)=>{
    const allMovies = JSON.parse(fs.readFileSync(watchListPath, {encoding:"utf-8"}));
    res.send(allMovies);
});

app.post("/add_to_watch_list", (req,res)=>{
    const movieData = req.body;
    console.log(movieData);
    const allMovies = JSON.parse(fs.readFileSync(watchListPath, {encoding:"utf-8"}));
    const updatedMoviesData = [...allMovies, movieData];
    fs.writeFileSync(watchListPath, JSON.stringify(updatedMoviesData, 0 ,2));
    res.status(201).send({message: "Movies added"});
});


app.listen(POST, HOST, ()=>{
    console.log("Working server")
});