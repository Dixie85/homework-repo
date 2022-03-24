const http = require("http"); 


const server = http.createServer((request, response) => {
const url = request.url;
const method = request.method;

if(url === "/" && method === "GET"){
console.log(`this is executed`)
response.setHeader("Content-Type", "text/html");
response.write(`<h1>Welcome to our official home-page!<h1/>`);
return response.end();
};

if(url === "/student" && method === "GET") {
    console.log(`student this is executed`)
    const student = {
        Name: "Dimitar", 
        Lastname: "Eftimov", 
        Academy: "SEDC",
        Subject: "Node-JS"
    };
response.setHeader("Content-type", "text/html");
response.write(`
<p>
<h3>This webpage was made by:</h3>
<ul>
    <li>Name: ${student.Name}</li>
    <li>Lastname: ${student.Lastname}</li>
    <li>Academy: ${student.Academy}</li>
    <li>Subject: ${student.Subject}</li>
</ul>
</p>`);
return response.end();
};

// if(url === "/student" && method === "GET") {
//     response.setHeader("Content-type", "application/json");
//     const student = {
//         Name: "Dimitar", 
//         Lastname: "Eftimov", 
//         Academy: "SEDC",
//         Subject: "Node-JS"
//     }
//     const showingStudent = JSON.stringify(student);
//     console.log(showingStudent);
//     return response.end(showingStudent);
// };

});

server.listen(3000, "localhost", () => {
    console.log("Server is ON! What is next?")
});


