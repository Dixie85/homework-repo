const PreviousBtn = document.getElementById("peoplePrevious");
const NextBtn = document.getElementById("peopleNext");
const starships = document.getElementById("starships");
const person = document.getElementById("person");
const tables = document.getElementById("table");

class Person{
    constructor({name, height, mass, gender, birth_year, homeworld, films}) {
        this.Name = name;
        this.Height = `${height}cm`;
        this.Mass = `${mass}kg`;
        this.Gender = gender;
        this.BirthYear = birth_year;
        this.Homeworld = homeworld;
        this.Appearances = Array.isArray(films) && films.lengt || null;
    }
    static async getHomeworld(obj) {        
            if (obj instanceof Person){
                const data = await getData(obj.Homeworld); 
                return data
            } else {
                console.log("The data is not a Person object")
            }        
    } 
};

class ShipDetails{
    constructor({cost_in_credits, cargo_capacity, passengers, starship_class }) {
        this.Cost = `${cost_in_credits}credits`;
        this.CargoCapacity = cargo_capacity;
        this.PeopleCapacity = passengers;
        this.Class = starship_class;
    }
};

class Ship extends ShipDetails{
    constructor({name, model, manufacturer, cost_in_credits, cargo_capacity, passengers, starship_class}){
        super({cost_in_credits, cargo_capacity, passengers, starship_class});
        this.Name = name;
        this.Model = model;
        this.Manufacturer = manufacturer;
    }

};

class Planet{
    constructor({name, climate, diameter, gravity, orbital_period, population, rotation_period, surface_water, terrain}){
        this.name = name;
        this.rotationPeriod = `${rotation_period}h`;
        this.orbitalPeriod = `${orbital_period}d`;
        this.diameter = `${diameter}km`;
        this.climate = climate;
        this.gravity= gravity;
        this.terrain = terrain;
        this.surfaceWater = `${surface_water}%`;
        this.population = population;                   //(should be formated in a more readable way i.e 1.000.000 instead of 1000000);

    }
};

const memory = {
    url:"https://swapi.dev/api/",
    peopleUrl:"people",
    starshipsUrl:"starships",
    workingFlow: "",
    currentData: [],
    Previous: null,
    Next: null,
};
    

async function getData(url) {
    const data = await (await fetch(url)).json();
    return data;
};

function storeMemory(r, flow) {
    memory.workingFlow = flow;
    memory.Previous = r.previous;
    memory.Next = r.next;
    memory.currentData = r.results.map(e => //flow === memory.peopleUrl ? new Person(e) : new Ship(e));
       { if (flow === memory.peopleUrl){
            return new Person(e);
        }
        if(flow === memory.starshipsUrl){
            return new Ship(e);
        }
    });
    // console.log(memory.currentData) 
};

async function getInfo(url, flow) {
    if (flow === memory.peopleUrl){
        const data = await getData(url);
        storeMemory(data, flow);
        console.log(memory)
    }
    if(flow === memory.starshipsUrl){
        const data = await getData(url);
        storeMemory(data, flow);
        console.log(memory)
    }
 };

person.addEventListener("click", async () => {
    console.log(`Person butoon clicked`)
    getInfo(`${memory.url}${memory.peopleUrl}`, memory.peopleUrl)
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


let me = new Person({
    Appearances: null,
    birth_year: "19BBY",
    gender: "male",
    height: "172cm",
    homeworld: "https://swapi.dev/api/planets/1/",
    mass: "77kg",
    name: "Luke Skywalker"
});

console.log(Person.getHomeworld(me));
console.log(me);

async function getHome(){
    let data = await fetch("https://swapi.dev/api/planets/1/");
    console.log(data)
};

// (async () => {
//     console.log(await getData(`${memory.url}${memory.starshipsUrl}`));
//     // await getPeople(`${memory.url}${memory.peopleUrl}`)
// })();


// async function getPeople(url) {
//    const data = await getData(url);
//    storeMemory(data);
//    console.log(memory)
// };

// async function getShip(url) {
//     const data = await getData(url);
//     storeMemory(data);
//     console.log(memory)
//  };




// function starshipsMemory(r) {
    //     memory.starshipsPrevious = r.previous;
    //     memory.starshipsNext = r.next;
    //     memory.starshipsData = r.results;
    //     console.log(memory)
    // }

// function showData(data){
//    const people = ["name", "height", "mass", "birth_year", "gender", "films"];
//    const ships = [ "name", "model", "manufacturer", "cost_in_credits", "passengers", "starship_class"];

//     if(data === memory.peopleData){
//         const pTitle = Object.keys(data[0]).filter(key => {
//             for(let pip of people){
//                 if(key === pip){
//                    return key
//                 }
//                 continue
//             }
//         });
//         const tr = createElem("tr");
//         $(tr).html(pTitle.reduce((str, key) => str += `<th>${key}</th>`,""));
//         $("#peopleTitles").html(tr);
//         console.log(tr)
//         $("#peopleData").html(data.reduce((str, char)=>{
//             const columns = pTitle.reduce((str, key) => {
//                 if(key === "films"){
//                     return str += `<td>${char[key].length}</td>`
//                 };
//                 return str += `<td>${char[key]}</td>`;
//             }, "");
//             return str += `<tr>${columns}</tr>`
//         },""));
//     };

//     if(data === memory.starshipsData) {
//         const shTitle = Object.keys(data[0]).filter(key => {
//             for(let ship of ships){
//                 if(key === ship){
//                    return key
//                 }
//                 continue
//             }
//         });
//         const tr = createElem("tr");
//         $(tr).html(shTitle.reduce((str, key) => str += `<th>${key}</th>`,""));
//         $("#starshipsTitles").html(tr);
//         console.log(tr)
//         $("#starshipsData").html(data.reduce((str, char)=>{
//             const columns =shTitle.reduce((str, key) => {
//                 if(key === "passengers"){
//                     if (isNaN(parseInt(char[key]))){
//                         return str +=`<td>No Info</td>`
//                     };
//                     return str += `<td>${parseInt(char[key])}</td>`
//                 };
//                 return str += `<td>${char[key]}</td>`;
//             }, "");
//             return str += `<tr>${columns}</tr>`
//         },""));
//     };
// };


// function createElem(e){
//     return document.createElement(e)
// };



// $(document).ready(function() {
//     const peoplePreviousBtn = $("#peoplePrevious").hide();
//     const peopleNextBtn = $("#peopleNext").hide();
//     const starshipsPreviousBtn = $("#starshipsPrevious").hide();
//     const starshipsNextBtn = $("#starshipsNext").hide();
//     const starships = $("#starships");
//     const person = $("#person");
//     const tables = $("table").hide();
    
//     person.click(e => memory.peopleUrl && getData(memory.peopleUrl)
//     .then(r => peopleMemory(r))
//     .then(r => showData(memory.peopleData))
//     .then(peopleNextBtn.show())
//     .then(person.hide())
//     .then(tables.show())
//     );

//     starships.click(e => memory.starshipsUrl && getData(memory.starshipsUrl)
//     .then(r => starshipsMemory(r))
//     .then(r => showData(memory.starshipsData))
//     .then(starshipsNextBtn.show())
//     .then(starships.hide())
//     .then(tables.show())
//     );
    
//     peoplePreviousBtn.click(e => memory.peoplePrevious && getData(memory.peoplePrevious)
//     .then(r => peopleMemory(r))
//     .then(r => showData(memory.peopleData))
//     .then(peopleNextBtn.show())
//     .then(peoplePreviousBtn.hide())
//     );

//     peopleNextBtn.click(e => memory.peopleNext && getData(memory.peopleNext)
//     .then(r => peopleMemory(r))
//     .then(r => showData(memory.peopleData))
//     .then(peoplePreviousBtn.show())
//     .then(peopleNextBtn.hide())    
//     );
   
//     starshipsPreviousBtn.click(e => memory.starshipsPrevious && getData(memory.starshipsPrevious)
//     .then(r => starshipsMemory(r))
//     .then(r => showData(memory.starshipsData))
//     .then(starshipsNextBtn.show())
//     .then(starshipsPreviousBtn.hide())
//     );

//     starshipsNextBtn.click(e => memory.starshipsNext && getData(memory.starshipsNext)
//     .then(r => starshipsMemory(r))
//     .then(r => showData(memory.starshipsData))
//     .then(starshipsPreviousBtn.show())
//     .then(starshipsNextBtn.hide())
//     );
// }); 