const path = require("path");
const express = require("express");
const movieRouter = require("./routers.movies");
const app = express();

const POST = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
app.use(express.json());

app.use(movieRouter);


app.listen(POST, HOST, ()=>{
    console.log("Working server")
});