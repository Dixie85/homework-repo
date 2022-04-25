const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const watchListPath = path.join(__dirname, "data", "watchList.json");

router.get("/", (req, res)=>{
    res.status(200).send("<h1>Welcome to our Movie page!</h1>")
});

router.get("/watch_list", (req,res)=>{
    const allMovies = JSON.parse(fs.readFileSync(watchListPath, {encoding:"utf-8"}));
    res.send(allMovies);
});

router.post("/add_to_watch_list", (req,res)=>{
    const movieData = req.body;
    console.log(movieData);
    const allMovies = JSON.parse(fs.readFileSync(watchListPath, {encoding:"utf-8"}));
    const updatedMoviesData = [...allMovies, movieData];
    fs.writeFileSync(watchListPath, JSON.stringify(updatedMoviesData, 0 ,2));
    res.status(201).send({message: "Movie added"});
});

module.exports = router;