const PreviousBtn = document.getElementById("peoplePrevious");
const NextBtn = document.getElementById("peopleNext");
const starships = document.getElementById("starships");
const person = document.getElementById("person");

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
    console.log(memory.currentData) 
};

async function getInfo(url, flow) {
    if (flow === memory.peopleUrl){
        const data = await getData(url);
        storeMemory(data, flow);
        console.log(memory);
        document.querySelector("#Titles").innerHTML = "";
        document.querySelector("#Data").innerHTML = "";
        displayData(memory.currentData, flow);
    }
    if(flow === memory.starshipsUrl){
        const data = await getData(url);
        storeMemory(data, flow);
        console.log(memory);
        document.querySelector("#Titles").innerHTML = "";
        document.querySelector("#Data").innerHTML = "";
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
    if(flow === memory.peopleUrl){
    const titleKey = Object.keys(data[0]).filter(key => key);
    console.log(titleKey)
    const trH = document.createElement("tr");
    trH.innerHTML = titleKey.reduce((str, key) => str += `<th>${key}<th/>`,"");
    document.querySelector("#Titles").appendChild(trH);
    console.log(trH)    
        data.forEach(e => {            
            const trB = document.createElement("tr");
            trB.innerHTML = titleKey.reduce((str, key) => str += `<td>${e[key]}<td/>`, "")
            trB.innerHTML +=  `<td><button class="Details">Details</button><td/>`;
            trB.querySelector(".Details").addEventListener("click", e => {}); //${e.Homeworld}
            document.querySelector("#Data").appendChild(trB);
        })
    }
    if(flow === memory.starshipsUrl){
        const titleKey = Object.keys(data[0]).filter(key => key);
        console.log(titleKey)
        const trH = document.createElement("tr");
        trH.innerHTML = titleKey.reduce((str, key) => str += `<th>${key}<th/>`,"");
        document.querySelector("#Titles").appendChild(trH);
        console.log(trH)    
            data.forEach(e => {            
                const trB = document.createElement("tr");
                trB.innerHTML = titleKey.reduce((str, key) => str += `<td>${e[key]}<td/>`, "")
                trB.innerHTML +=  `<td><button class="Details">Details</button><td/>`;
                document.querySelector("#Data").appendChild(trB);
            })
        }
              
};
