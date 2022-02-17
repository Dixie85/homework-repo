//The Following code chunks are Memory, storage functions and fetch fuc.

let memory = {
    url: "https://rickandmortyapi.com/api/episode",    
    data: [],
    next: null,
    prev: null,
    details: [],
    pic: []
}

function getData(url){
return fetch(url)
.then(result => result.json())
.then(result => result)
};

function storeInfo(result){
    memory.data = result.results;
    memory.next = result.info.next;
    memory.prev = result.info.prev;
    console.log(memory)
    console.log(result)
};

function storeD(result){
    memory.details = result;
       console.log(memory);
    // console.log(result)
};

function storeImage(img){
    memory.pic.push(img);
    // console.log(memory)
};

//From this line the actual code starts.
// There are some canceled console.log lines, they used like check points.

// Applying data and creating the main table of all episodes.
function presentData(data){
    let arrayObjData = data[0];
    let keyTitles = getKeys(arrayObjData);
    // console.log(keyTitles);


// Applying data to the main table head.
    const tr = createElem("tr");
    $(tr).html(keyTitles.reduce((str, t) => {
        return str += `<th>${t}</th>`;
    },"" ))
    $("#mainH").html(tr)

    
// Applying data to the main table body.
    $("#mainB").html(data.reduce((str, obj) => {
            let columns = keyTitles.reduce((str, key) => {
                return str += `<td>${obj[key]}</td>`;
            },"");
            // Applying extra buttons to the table with value of episode url.
            columns += `<td><button id=${obj["id"]} class="Details" value=${obj["url"]}">Details</button></td>` ; 
            return str += `<tr>${columns}</tr>`;
    },""));

// Applying onclick attribute with function which receives the value of the button - episode url.
    let but = $(".Details").attr("onclick",  "getUrlClick(value)",);
    // console.log(but)
};

function createElem(e){
    return document.createElement(e);
};

function getKeys(data){
   let keys = Object.keys(data).filter(key => {
        if(key !== "characters" && key !== "created"){
            return key
        };
    }); 
    return keys
};

// Function for the extra buttons in the table.
function getUrlClick(value){
    let details = value.slice(0, value.length -1);
    // console.log(details);
   $("#episodeH").text(value);
// Fetching the data of the specified episode whose button was clicked and activating a function for showing the episode details.
    let result = getData(details).then(d => storeD(d)).then(d=>presentEpisode(memory.details));
};

// Episode details function.
function presentEpisode(data) {
    // console.log(data);
    let keyTitles = getKeys(data);
    // console.log(keyTitles);
    let charactersArray = data["characters"];
    // console.log(charactersArray);

    $("#episodeH").html(keyTitles.reduce((str, t) => {
        return str += `<th>${t}</th>`;
    },"" ));

    $("#episodeB").html(keyTitles.reduce((str, key) => {
        return str += `<td>${data[key]}</td>`;
    },""));

// Fetching the data for all the character images included in the specified episode.    
    charactersArray.map(e => {getData(e)
        .then(e=> storeImage(e["image"]))
        .then(e=> getPictures(memory.pic))
    });
    // console.log(charactersArray);  

//The following chunks of code are several versions of the "trying to solve the problem".
//The code does its purpose but it has a bug.
//The bug is represented in continuously adding image elements whenever a button is clicked.
//I have tried many ways to clear the HTML before applying the new data, no luck. 

    // $(".wrapper").last().html(getPictures(memory.pic))

    function getPictures(pic) {
        $(".wrapper").last().html(pic.reduce((str, char) => {
              return str += `<a><img src=${char} alt=""></a>`},"<h3>Characters</h3>"));
    };
 
    
    // $(".wrapper").last().html(getPictures(memory.pic))
    

    // function getPictures(pic) {
    //     let res = ""
    //     if ($(".wrapper").last().html() !== ""){
    //         $(".wrapper").last().html("")
    //     }
    //     for (let i = 0; i < pic.length; i++){
    //         res += `<a><img src=${pic[i]} alt=""></a>`


    //     }
    //     $(".wrapper").last().html(res)
    // };


    // function getPictures(pic) {
    //     (function(){
    //         return $(".wrapper").last().html("<p>proba</p>")
    //      })();
    //     $(".wrapper").last().html(pic.reduce((str, char) => {
    //           return str += `<img src=${char} alt="">`},""));
    // };
    
};



$(document).ready(function(){
    (function(){
       return console.log(getData(memory.url)); 
    })();

    const startBtn = $("#input");
    startBtn.click(element => memory.url && getData(memory.url)
    .then(result => storeInfo(result))
    .then(r => presentData(memory.data)));

    $("#next").click(element => memory.next && getData(memory.next)
    .then(result => storeInfo(result))
    .then(r => presentData(memory.data)));
    
    $("#previous").click(element => memory.prev && getData(memory.prev)
    .then(result => storeInfo(result))
    .then(r => presentData(memory.data)));

    
});








