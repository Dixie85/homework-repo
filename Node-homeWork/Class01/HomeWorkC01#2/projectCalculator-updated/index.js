// // Syntax 1 
// // 1.1 Exporting with "export default {}" object from module X
// // 1.2 Importing with a "variable" from the module X
// // ex. import myVariable from "./someModuleX.js"

// import formCalc from "./calculatorModule.js";

// const calcSum = formCalc.calculator(15,5,"+");
// console.log(calcSum);
// const calcSub = formCalc.calculator(15,5,"-");
// console.log(calcSub);
// const calcMul = formCalc.calculator(15,5,"*");
// console.log(calcMul);
// const calcDev = formCalc.calculator(15,5,"/");
// console.log(calcDev);
// // const calcError = formCalc.calculator(15,5,"");
// // console.log(calcError);



// // Syntax 2
// // 1.1 Exporting with using single "export" key word 
// // infront of every function or variable we want to export from module Y
// // 1.2 Importing with "{}" object which holds every exported 
// // function or variable from a certain module Y 
// // ex. import {fun, let, const} from "./someModuleY.js"


import {calculator} from "./calculatorModule.js";

const calcSum = calculator(15,5,"+");
console.log(calcSum);
const calcSub = calculator(15,5,"-");
console.log(calcSub);
const calcMul = calculator(15,5,"*");
console.log(calcMul);
const calcDev = calculator(15,5,"/");
console.log(calcDev);
// const calcError = calculator(15,5,"");
// console.log(calcError);