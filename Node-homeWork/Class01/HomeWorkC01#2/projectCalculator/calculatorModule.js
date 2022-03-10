// const calculator = (op1, op2, operand) => {
//     return operand(op1,op2)
// }; 

// const sum = (a,b) => a + b;
// const subtract = (a,b) => a - b;
// const multiply = (a,b) => a * b;
// const devide = (a,b) => a / b;


// export default {
//     calculator,
//     sum,
//     subtract,
//     multiply,
//     devide,
// };


export const calculator = (op1, op2, operand) => {
    return operand(op1,op2)
}; 

export const sum = (a,b) => a + b;
export const subtract = (a,b) => a - b;
export const multiply = (a,b) => a * b;
export const devide = (a,b) => a / b;