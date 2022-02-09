const memory = {
    peopleUrl:"https://swapi.dev/api/people/",
    starshipsUrl:"https://swapi.dev/api/starships/",
    
    peopleData: [],
    starshipsData: [],

    peoplePrevious: null,
    peopleNext: null,

    starshipsPrevious: null,
    starshipsNext: null,
};

function getData(url) {
    return fetch(url)
    .then(r => r.json())
    .then(r => r);
};

function peopleMemory(r) {
    memory.peoplePrevious = r.previous;
    memory.peopleNext = r.next;
    memory.peopleData = r.results;
    console.log(memory)
}

function starshipsMemory(r) {
    memory.starshipsPrevious = r.previous;
    memory.starshipsNext = r.next;
    memory.starshipsData = r.results;
    console.log(memory)
}

function showData(data){

    if(data === memory.peopleData){
        const pTitle = Object.keys(data[0]).filter(key => {
            if(typeof data[0][key] === "string"){
                return key
            }
        });
        const tr = createElem("tr");
        $(tr).html(pTitle.reduce((str, key) => {
            return str += `<th>${key}</th>`
        },""));
        $("#peopleTitles").html(tr);
        console.log(tr)
        $("#peopleData").html(data.reduce((str, char)=>{
            const columns = pTitle.reduce((str, key) => {
                return str += `<td>${char[key]}</td>`;
            }, "");
            return str += `<tr>${columns}</tr>`
        },""));
    };

    if(data === memory.starshipsData) {
        const shTitle = Object.keys(data[0]).filter(key => {
            if(typeof data[0][key] === "string"){
                return key
            }
        });
        const tr = createElem("tr");
        $(tr).html(shTitle.reduce((str, key) => {
            return str += `<th>${key}</th>`
        },""));
        $("#starshipsTitles").html(tr);
        console.log(tr)
        $("#starshipsData").html(data.reduce((str, char)=>{
            const columns =shTitle.reduce((str, key) => {
                return str += `<td>${char[key]}</td>`;
            }, "");
            return str += `<tr>${columns}</tr>`
        },""));
    };
};


function createElem(e){
    return document.createElement(e)
};



$(document).ready(function() {
    const peoplePreviousBtn = $("#peoplePrevious").hide();
    const peopleNextBtn = $("#peopleNext").hide();
    const starshipsPreviousBtn = $("#starshipsPrevious").hide();
    const starshipsNextBtn = $("#starshipsNext").hide();
    const starships = $("#starships");
    const person = $("#person");
    
    
    person.click(e => memory.peopleUrl && getData(memory.peopleUrl)
    .then(r => peopleMemory(r))
    .then(r => showData(memory.peopleData))
    .then(peopleNextBtn.show())
    .then(person.hide())
    );

    starships.click(e => memory.starshipsUrl && getData(memory.starshipsUrl)
    .then(r => starshipsMemory(r))
    .then(r => showData(memory.starshipsData))
    .then(starshipsNextBtn.show())
    .then(starships.hide())
    );
    
    peoplePreviousBtn.click(e => memory.peoplePrevious && getData(memory.peoplePrevious)
    .then(r => peopleMemory(r))
    .then(r => showData(memory.peopleData))
    .then(peopleNextBtn.show())
    .then(peoplePreviousBtn.hide())
    );

    peopleNextBtn.click(e => memory.peopleNext && getData(memory.peopleNext)
    .then(r => peopleMemory(r))
    .then(r => showData(memory.peopleData))
    .then(peoplePreviousBtn.show())
    .then(peopleNextBtn.hide())    
    );
   
    starshipsPreviousBtn.click(e => memory.starshipsPrevious && getData(memory.starshipsPrevious)
    .then(r => starshipsMemory(r))
    .then(r => showData(memory.starshipsData))
    .then(starshipsNextBtn.show())
    .then(starshipsPreviousBtn.hide())
    );

    starshipsNextBtn.click(e => memory.starshipsNext && getData(memory.starshipsNext)
    .then(r => starshipsMemory(r))
    .then(r => showData(memory.starshipsData))
    .then(starshipsPreviousBtn.show())
    .then(starshipsNextBtn.hide())
    );
}); 