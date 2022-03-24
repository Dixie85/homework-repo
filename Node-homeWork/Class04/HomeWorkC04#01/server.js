const http = require("http");
const fs = require("fs");
const path = require("path");
const emitter = require("./datalogger/logger")


const server = http.createServer((request, response) => {
const url = request.url;
const method = request.method;
const infoStoragePath = path.join(__dirname, "datalogger" ,"infoStorage.json");


if(url === "/" && method === "GET"){
    console.log(`/ is executed`);
    response.setHeader("Content-Type", "text/html");
    response.write(`
    <h1>~ReTro~</h1>\n
    <h2>Welcome to the world of Vinyl!<h2/>\n
    <p>Here you can find your most favorite Retro music on vinyl records</p>\n
    <p>Finding your loved record is so easy, just click on the button below</p>
    <form action="/order_vinyl" method="POST">
    <input type="hidden" name="order"/>
        <button>ORDER</button>    
    </form>\n
    <p>Check out to the TOP 10 most wanted Retro HITs this week</p>
    <form action="/week_hits" method="POST">
    <input type="hidden" name="hits"/>
        <button>HITS</button>    
    </form>\n     
    `);
    return response.end();
};

if(url === "/order_vinyl" && method === "POST") {
    console.log(`Order is executed`);
    response.setHeader("Content-type", "text/html");
    response.write(`
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
    return response.end();
};

if(url === "/week_hits" && method === "POST") {
    console.log("Someone is looking at the Hits");
    emitter.emit("hits-visites");
    response.setHeader("Content-type", "text/html");
    response.write(`
        <p>
        <h1>------This week Retro Hits------</h1>
        <ul>
            <li>Wake Me Up Before You Go-GoWham!</li>
            <li>Girls Just Want to Have FunCyndi Lauper.</li>
            <li>Never Gonna Give You UpRick Astley.</li>
            <li>Eye of the TigerSurvivor.</li>
            <li>GhostbustersRay Parker Jr.</li>
            <li>Party All the TimeEddie Murphy.</li>
            <li>Walk Like an EgyptianThe Bangles.</li>
            <li>Livin' on a Prayer.</li>
            <li>how deep is your love.</li>
        </ul>
        </p>        
    `);
    return response.end();
};

if(url === "/your_order" && method === "POST") {
    const collectStudents = [];
    request.on("data", (chunk) => {
        collectStudents.push(chunk)
    });
    request.on("end", () => {
        const parsedStudentCollectionData = Buffer.concat(collectStudents).toString()
        const arrData = parsedStudentCollectionData.split("+").join("").split("&");
        const data = arrData.map(e => e.split("="));
        console.log(parsedStudentCollectionData);
        console.log(arrData);
        console.log(data);
        const order = data.reduce((obj, info) => {
            let property = info[0];
            if (!obj[property]) {             
                obj[property] = ""
              }
              obj[property] = info[1]
              return obj
        }, {});
        console.log(order);
        const stringifyOrder = JSON.stringify(order);
        emitter.emit("orders-placed", order);
        emitter.emit("info-Storage", stringifyOrder);
    });
    //
    //  THIS PART OF THE CODE IS A BUG
    //
    // response.setHeader("Content-type", "text/html");
    // const parseedOrder = JSON.parse(fs.readFileSync(infoStoragePath, {encoding:"utf-8"}));
    // console.log(`This part of the code is a BUG ${parseedOrder}`);
    // response.write(`
    // <h1>ORDER CONFIRMATION</h1>\n
    // <h2>You have successfully managed to order:<h2/>\n
    // <p>${parseedOrder.Artist}'s ${parseedOrder.Album} Album</p>\n
    // <p>The delivery method you have chosen is ${parseedOrder.Delivery} and we'll deliver at ${parseedOrder.Addres}</p>\n
    // <p>If additional information is needed we can reach you on Tel. Number: ${parseedOrder.Telnumber}</p>
    // <h3>Thank you for your order, sit tight your vinyl is on its way ;)></h3>
    // `);    
    return response.end();
} else {
    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
}

});

server.listen(3000, "localhost", () => {
    emitter.emit("server-started");
});


