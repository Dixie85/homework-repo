// const calculator = (a, b, operand) => {
//     if(operand === "+"){
//         return a + b
//     }else if(operand === "-") {
//         return a - b
//     }else if(operand === "*") {
//         return a * b
//     }else if(operand === "/") {
//         return a / b
//     }else{
//         throw new Error ("No valid operand was passed")
//     }

// }; 

// export default {
//     calculator,
// };


export const calculator = (a, b, operand) => {
    switch(operand){
        case "+":
        return a + b;
        case "-" :
        return a - b;
        case "*":
        return a * b;
        case "/":
        return a / b;
        default:
        throw new Error ("No valid operand was passed")                
    }
}; 

