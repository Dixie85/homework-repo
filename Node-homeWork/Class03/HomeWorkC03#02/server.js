const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((request, response) => {
const url = request.url;
const method = request.method;
const studentTexFile = path.join(__dirname, "data", "students.txt");

if(url === "/" && method === "GET"){
    console.log(`/ is executed`);
    response.setHeader("Content-Type", "text/html");
    response.write(`<h1>Welcome to the home-page of exercise#2 !<h1/>`);
    return response.end();
};

if(url === "/add_student" && method === "GET") {
    console.log(`add student is executed`)   
    response.setHeader("Content-type", "text/html");
    response.write(`
    <form action="/all_students" method="POST">
        <label for="studentNam">Enter student's name:</label><br>
        <input type="text" name="studentName"/>
        <input type="submit" value="Submit" />
    </form>    
    `);
    return response.end();
};

if(url === "/all_students" && method === "POST") {
    const collectStudents = [];
    request.on("data", (chunk) => {
        collectStudents.push(chunk)
    });
    request.on("end", () => {
        const parsedStudentCollectionData = Buffer.concat(collectStudents).toString()
        const arrData = parsedStudentCollectionData.split('=');
        console.log(arrData[1]);
        const studentName = arrData[1];
        console.log(studentName)
        console.log(typeof(studentName));
        console.log(studentName.length);
        if(studentName.length > 3){
        fs.appendFileSync(studentTexFile, `${studentName}\n`);
        }        
    });
    return response.end();
};

});

server.listen(3000, "localhost", () => {
    console.log("Server is ON! What is next?")
});


