let arrNum = [2,31,434,53,6,765,45,62,23,4,312];


function main(res, callback) {
    console.log(callback(res))
}

main(arrNum, showMeResult);
main(arrNum, singleInteger);
main(arrNum, increaseBy2);



// //forEach
function showMeResult(arr) {
    for(let a of arr){
        if(a > 100){
            console.log(a)            
        }
    };
};

// //filter
function singleInteger(arr) {
    let res = [];
    for(let a of arr){
        if(a < 10){
            res.push(a)            
        }
    };
    return res
};

// //map
function increaseBy2(arr) {
    let res = [];
    for(let a of arr){
        res.push(a + 2)
    };
    return res
};




//forEach
Array.prototype.showMeResult = function () {
    for(let i = 0; i < this.length; i++){
        if(this[i] > 100){
            console.log(this[i])            
        }
    };
};

//filter
Array.prototype.singleInteger = function() {
    let res = [];
    for(let i = 0; i < this.length; i++){
        if(this[i] < 10){
            res.push(this[i])            
        }
    };
    return res
};

//map
Array.prototype.increaseBy2 = function() {
    let res = [];
    for(let i = 0; i < this.length; i++){
        res.push(this[i] + 2)
    };
    return res
};


console.log(arrNum.showMeResult());
console.log(arrNum.singleInteger());
console.log(arrNum.increaseBy2());