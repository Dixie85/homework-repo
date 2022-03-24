const bodyParser = require("body-parser")
const express = require("express");
const path = require("path");
const app = express();

const emitter = require("./datalogger/logger");
const orderRouter = require("./routers/retroOrderRouter");
const hitsRouter = require("./routers/retroHitsRouter");

const infoStoragePath = path.join(__dirname, "datalogger" ,"infoStorage.json");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use(orderRouter);
app.use(hitsRouter);
   
app.get("*", (req,res)=>{
    res.status(404).send({err:"Page Not Found!"})
});


app.listen(3000, "localhost", () => {
    emitter.emit("server-started");
});
      