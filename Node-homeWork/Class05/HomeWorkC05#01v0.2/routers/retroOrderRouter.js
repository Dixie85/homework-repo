const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const emitter = require("./../datalogger/logger");

const infoStoragePath = path.join(__dirname, ".." ,"datalogger" ,"infoStorage.json");
console.log(infoStoragePath);

router.get("/", (req,res)=>{
    res.send(`
    <h1>~ReTro~</h1>\n
    <h2>Welcome to the world of Vinyl!<h2/>\n
    <p>Here you can find your most favorite Retro music on vinyl records</p>\n
    <p>Finding your loved record is so easy, just click on the button below</p>
        <a href="http://localhost:3000/order_vinyl"><button>ORDER</button></a>    
    </form>\n
    <p>Check out to the TOP 10 most wanted Retro HITs this week</p>
        <a href="http://localhost:3000/week_hits"><button>HITS</button></a>        
    </form>\n     
    `);
});

router.get("/order_vinyl", (req,res)=>{
    res.send(`
    <form action="/your_order" method="post">
        <h2>Order your favorite record is just few steps away,
         fill up the information below and you can listen it at home ;)</h2>
        <p>Choose the artist and album you want to enjoy</p>
        <label for="/your_order">Artist:</label>
        <input type="text" name="Artist"/><br><br>
        <label for="/your_order">Album:</label>
        <input type="text" name="Album"/><br><br>
        <p>Enter the delivery information and we are done!</p>
        <label for="/your_order">Delivery method:</label>
        <input type="radio" name="Delivery" value="Fast"/> 
        <label for="rock">FAST</label>
        <input type="radio" name="Delivery" value="Normal"/>
        <label for="pop">NORMAL</label><br><br>
        <label for="/your_order">Delivery addres:</label>
        <input type="text" name="Addres"/><br><br>
        <label for="/your_order">Telefon number:</label>
        <input type="text" name="Telnumber"/><br><br>
        <input type="submit" value="Submit" />
    </form>    
    `);
});

router.get("/your_order_red", (req,res)=>{
    const parseedOrder = JSON.parse(fs.readFileSync(infoStoragePath, {encoding:"utf-8"}));
    console.log(`This part of the code is a BUG ${parseedOrder}`);
    res.send(`
    <h1>ORDER CONFIRMATION</h1>\n
    <h2>You have successfully managed to order:<h2/>\n
    <p>${parseedOrder.Artist}'s ${parseedOrder.Album} Album</p>\n
    <p>The delivery method you have chosen is ${parseedOrder.Delivery} and we'll deliver at ${parseedOrder.Addres}</p>\n
    <p>If additional information is needed we can reach you on Tel. Number: ${parseedOrder.Telnumber}</p>
    <h3>Thank you for your order, sit tight your vinyl is on its way ;)></h3>
    `);
});

router.post("/your_order", (req,res)=>{
    const bodyData = req.body;
    console.log(bodyData);
    const stringifyOrder = JSON.stringify(bodyData);
    emitter.emit("orders-placed", bodyData);
    emitter.emit("info-Storage", stringifyOrder);
    res.redirect("/your_order_red");
});

module.exports = router;