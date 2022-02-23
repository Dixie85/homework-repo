let arrNum = [2,31,434,53,6,765,45,62,23,4,312];


// function main(res, callback) {
//     console.log(callback(res))
// }

// main(arrNum, showMeResult);
// main(arrNum, singleInteger);
// main(arrNum, increaseBy2);



// // //forEach
// function showMeResult(arr) {
//     for(let a of arr){
//         if(a > 100){
//             console.log(a)            
//         }
//     };
// };

// // //filter
// function singleInteger(arr) {
//     let res = [];
//     for(let a of arr){
//         if(a < 10){
//             res.push(a)            
//         }
//     };
//     return res
// };

// // //map
// function increaseBy2(arr) {
//     let res = [];
//     for(let a of arr){
//         res.push(a + 2)
//     };
//     return res
// };




// //forEach
// Array.prototype.showMeResult = function () {
//     for(let i = 0; i < this.length; i++){
//         if(this[i] > 100){
//             console.log(this[i])            
//         }
//     };
// };

// //filter
// Array.prototype.singleInteger = function() {
//     let res = [];
//     for(let i = 0; i < this.length; i++){
//         if(this[i] < 10){
//             res.push(this[i])            
//         }
//     };
//     return res
// };

// //map
// Array.prototype.increaseBy2 = function() {
//     let res = [];
//     for(let i = 0; i < this.length; i++){
//         res.push(this[i] + 2)
//     };
//     return res
// };


// console.log(arrNum.showMeResult());
// console.log(arrNum.singleInteger());
// console.log(arrNum.increaseBy2());






// Recreating the original use in VJS of the HOF


//forEach
function forEachIt (arr, callback) {
    for(let i = 0; i < arr.length; i++){       
        console.log(callback(arr[i]));         
    };
};

function showMeResult (e) {
    return e%10;   
};

forEachIt(arrNum, showMeResult);
//OR
forEachIt(arrNum, e => e%10);




//filter
function filterIt (arr,callback) {
    let res = [];
    for(let i = 0; i < arr.length; i++){
        if (callback(arr[i])){
            res.push(arr[i]); 
        }                   
    };
    return res
};

function singleInteger(e){ 
    if(e < 10){
        return e
    }
};

console.log(filterIt(arrNum, singleInteger));
//OR
console.log(filterIt(arrNum, e => {if(e < 10){return e}}));




//map
function mapIt(arr, callback) {
    let res = [];
    for(let i = 0; i < arr.length; i++){
        res.push(callback(arr[i]))
    };
    return res
};

function increaseBy2 (e) {
    return e + 2;
};

console.log(mapIt(arrNum, increaseBy2));
//OR
console.log(mapIt(arrNum, e => e + 2));







//Building the function into an Array.prototype Method

//forEach
Array.prototype.myForEach = function (callback) {
    for(let i = 0; i < this.length; i++){       
        console.log(callback(this[i]));         
    };
};

//filter
Array.prototype.myFilter = function (callback) {
        let res = [];
        for(let i = 0; i < this.length; i++){
            if (callback(this[i])){
                res.push(this[i]); 
            }                   
        };
        return res
    };

//map
Array.prototype.myMap = function (callback){
        let res = [];
        for(let i = 0; i < this.length; i++){
            res.push(callback(this[i]))
        };
        return res
    };


arrNum.myForEach(showMeResult);
console.log(arrNum.myFilter(singleInteger));
console.log(arrNum.myMap(increaseBy2));
