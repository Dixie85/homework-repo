const fs = require("fs");
const path = require("path");

const EventEmitter = require("events");
class myEmittet extends EventEmitter {}
const emitter = new myEmittet;

const logsPath = path.join(__dirname, "logs.txt");
const statisticPath = path.join(__dirname, "statistic.json");
const statisticData = JSON.parse(fs.readFileSync(statisticPath, { encoding: "utf-8" }));
console.log(statisticData);
const infoStoragePath = path.join(__dirname, "infoStorage.json");
const infoStorageData = JSON.parse(fs.readFileSync(infoStoragePath, {encoding:"utf-8"}));

const logProduct = orderInfo => {
    fs.appendFileSync(logsPath,`
      Order Delivery Method: ${orderInfo.Delivery}\n
      Addres: ${orderInfo.Addres}\n
      Telefon: ${orderInfo.Telnumber}\n
      Date Added: ${new Date()}\n${"^".repeat(85)}\n`
    );
    console.log("Order Logged");
  };

emitter
.on("log-order", logProduct)
.on("server-started", () => console.log("Brmmmm....bm bm bm..."))
.on("hits-visites", () => {
    statisticData.hitsVisites += 1;
    fs.writeFileSync(statisticPath, JSON.stringify(statisticData));
    console.log("U hit the hits");
})
.on("orders-placed", orderData => {
    statisticData.ordersPlaced += 1;
    fs.writeFileSync(statisticPath, JSON.stringify(statisticData));
    console.log("Order is coming");
    emitter.emit("log-order", orderData);
})
.on("info-Storage", orderJson => {
    fs.writeFileSync(infoStoragePath, orderJson);
    console.log("Order info is stored");
    

});

module.exports = emitter;