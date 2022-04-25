const router = require("express").Router();
const path = require("path");
const watchListPath = path.join(__dirname, "data", "watchList.json");
const { readData, writeData } = require("./services/data.services");

router.get("/", (req, res)=>{
    res.status(200).send("<h1>Welcome to our Movie page!</h1>")
});

router.get("/watch_list", (req,res)=>{
    const allMovies = readData(watchListPath);
    res.send(allMovies);
});

router.post("/add_to_watch_list", (req,res)=>{
    const movieData = req.body;
    console.log(movieData);
    const allMovies = readData(watchListPath);
    const updatedMoviesData = [...allMovies, movieData];
    writeData(watchListPath, updatedMoviesData);
    res.status(201).send({message: "Movies added"});
});

module.exports = router;