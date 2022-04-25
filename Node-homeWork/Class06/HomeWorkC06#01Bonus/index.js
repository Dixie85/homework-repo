const express = require("express");
const trainerRouter = require("./routes/trainers.routes");
const path = require("path");

const staticFolderPath = path.join(__dirname, "public")
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.use("/api", trainerRouter);
app.use("/home", express.static(staticFolderPath));

app.listen(PORT, HOST, ()=>{
    console.log(`Server is runing on ${PORT} `);
})