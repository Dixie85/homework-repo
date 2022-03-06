const PreviousBtn = document.getElementById("Previous");
const NextBtn = document.getElementById("Next");
const starships = document.getElementById("starships");
const person = document.getElementById("person");

class Person{
    constructor({name, height, mass, gender, birth_year, homeworld, films}) {
        this.name = name;
        this.height = `${height}cm`;
        this.mass = `${mass}kg`;
        this.gender = gender;
        this.birthYear = birth_year;
        this.homeworld = homeworld;
        this.appearances = Array.isArray(films) && films.length || null;
    }

    static async getHomeworld(obj) {                
            if (obj instanceof Person){
                const planet = await getData(obj.homeworld); 
                storeHomeworldMemory(planet);
                cleanDetailesTables();
                displayInfoPersonAndPlanet(obj, memory.personHomeworld);                
            } else {
                console.log("The data is not a Person object")
            }        
    } 
};

class ShipDetails{
    constructor({cost_in_credits, cargo_capacity, passengers, starship_class }) {
        this.cost = String(cost_in_credits).replace(/(.)(?=(\d{3})+$)/g,'$1,') + `credits`;
        this.cargoCapacity = (Math.round(cargo_capacity * 100)/100).toLocaleString();
        this.peopleCapacity = passengers;
        this.class = starship_class;
    }
};

class Ship extends ShipDetails{
    constructor({name, model, manufacturer, cost_in_credits, cargo_capacity, passengers, starship_class}){
        super({cost_in_credits, cargo_capacity, passengers, starship_class});
        this.name = name;
        this.model = model;
        this.manufacturer = manufacturer;
    }

};

class Planet{
    constructor({name, climate, diameter, gravity, orbital_period, population, rotation_period, surface_water, terrain}){
        this.name = name;
        this.rotationPeriod = `${rotation_period}h`;
        this.orbitalPeriod = `${orbital_period} d`;
        this.diameter = `${diameter}km`;
        this.climate = climate;
        this.gravity= gravity;
        this.terrain = terrain;
        this.surfaceWater = `${surface_water}%`;
        this.population = String(population).replace(/(.)(?=(\d{3})+$)/g,'$1,');                 

    }
};

const memory = {
    url:"https://swapi.dev/api/",
    peopleUrl:"people",
    starshipsUrl:"starships",
    workingFlow: "",
    currentData: [],
    personHomeworld: [],
    Previous: null,
    Next: null,
};
    
async function getData(url) {
    const data = await (await fetch(url)).json();
    return data;
};

function storeHomeworldMemory(d){
    memory.personHomeworld = new Planet(d);
    console.log(memory.personHomeworld)
};

function storeMemory(r, flow) {
    memory.workingFlow = flow;
    memory.Previous = r.previous;
    memory.Next = r.next;
    memory.currentData = r.results.map(e => 
       { if (flow === memory.peopleUrl){
            return new Person(e);
        }
        if(flow === memory.starshipsUrl){
            return new Ship(e);
        }
    });
    console.log(memory.currentData) 
};

async function getInfo(url, flow) {
    if(flow === memory.peopleUrl) {    
        const data = await getData(url);
        storeMemory(data, flow);
        console.log(memory);
        cleanTables();
        cleanDetailesTables()
        displayData(memory.currentData, flow);
    }
    if(flow === memory.starshipsUrl){
        const data = await getData(url);
        storeMemory(data, flow);
        console.log(memory);
        cleanTables();
        cleanDetailesTables()
        displayData(memory.currentData, flow);
    }
};

person.addEventListener("click", async () => {
    console.log(`Person butoon clicked`)
    getInfo(`${memory.url}${memory.peopleUrl}`, memory.peopleUrl);
    
});

starships.addEventListener("click", async () => {
    console.log(`Ship butoon clicked`)
    getInfo(`${memory.url}${memory.starshipsUrl}`, memory.starshipsUrl)
});

NextBtn.addEventListener("click", async () => {
    console.log(`Next is clicked, wait a few seconds`);
    return memory.Next && getInfo(memory.Next, memory.workingFlow)
});

PreviousBtn.addEventListener("click", async () => {
    console.log(`Previouse is clicked, wait a few seconds`);
    return memory.Previous && getInfo(memory.Previous, memory.workingFlow)
});


function displayData(data, flow){
    const titleKey = Object.keys(data[0]);
    console.log(titleKey)
    const trH = document.createElement("tr");
    trH.innerHTML = titleKey.map(e => capitalizeAndSeparate(e))
    .reduce((str, key) => str += `<th>${key}<th/>`,``);
    document.querySelector("#Titles").appendChild(trH);
    console.log(trH)
    if(flow === memory.peopleUrl){
        displayDataInTbodyForPeople(data, titleKey);
    }
    if(flow === memory.starshipsUrl){
        displayDataInTbodyForShips (data, titleKey)
    }
};

function displayDataInTbodyForPeople(data, titleKey){
    data.map(e => {            
        const trB = document.createElement("tr");
        trB.innerHTML = titleKey.reduce((str, key) => str += `<td>${e[key]}<td/>`, "")
        // trB.innerHTML +=  `<td><a target=""><button class="Details" value="${e.name}">Details</button></a><td/>`;
        document.querySelector("#Data").appendChild(trB);
        // let button = trB.querySelector(".Details"); 
        // button.addEventListener("click", () => {Person.getHomeworld(e, data)});
        trB.addEventListener("click", () => Person.getHomeworld(e));           
    })
};

function displayDataInTbodyForShips(data, titleKey){
    data.map(e => {            
        const trB = document.createElement("tr");
        trB.innerHTML = titleKey.reduce((str, key) => str += `<td>${e[key]}<td/>`, "")
        document.querySelector("#Data").appendChild(trB);
        trB.addEventListener("click", () => {
            cleanDetailesTables()
            displayInfoShip(e)});
    })
};

function cleanTables(){
    document.querySelector("#Titles").innerHTML = "";
    document.querySelector("#Data").innerHTML = "";
};

function cleanDetailesTables(){
    document.querySelector("#peopleShipTitles").innerHTML = "";
    document.querySelector("#peopleShipData").innerHTML = "";
    document.querySelector("#planetTitles").innerHTML = "";
    document.querySelector("#planetData").innerHTML = "";
};

function capitalizeAndSeparate(word) {
    return word.split(/(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .map( e => e[0].toUpperCase() + e.slice(1))
    .reduce((str, word) => str += `${word} ` ,"");
};

function creatingTableRowHeadings(data){
    return Object.keys(data).map(e => capitalizeAndSeparate(e))
    .reduce((str, key) => str += `<th>${key}<th/>`,``)
};

function creatingTableRowData(data){
    return Object.values(data)
    .reduce((str, key) => str += `<td>${key}<td/>`,``)
};

function displayInfoPersonAndPlanet(person, planet){
    
    const trHPeople = document.createElement("tr");
    trHPeople.innerHTML = creatingTableRowHeadings(person);
    document.querySelector("#peopleShipTitles").appendChild(trHPeople);
    
    const trDPeople = document.createElement("tr");
    trDPeople.innerHTML = creatingTableRowData(person);
    document.querySelector("#peopleShipData").appendChild(trDPeople);
    
    const trHPlanet = document.createElement("tr");
    trHPlanet.innerHTML = creatingTableRowHeadings(planet);
    document.querySelector("#planetTitles").appendChild(trHPlanet);
    
    const  trDPlanet = document.createElement("tr");
    trDPlanet.innerHTML = creatingTableRowData(planet);
    document.querySelector("#planetData").appendChild( trDPlanet);
};

function displayInfoShip(ship){
    const trHShip = document.createElement("tr");
    trHShip.innerHTML = creatingTableRowHeadings(ship);
    document.querySelector("#peopleShipTitles").appendChild(trHShip);
    
    const trDShip = document.createElement("tr");
    trDShip.innerHTML = creatingTableRowData(ship);
    document.querySelector("#peopleShipData").appendChild(trDShip);
};