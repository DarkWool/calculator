function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    // FUnction to know which operand the user is using and then calling the appropiate function to return the result.
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

console.log(operate('+', 33, 17));
console.log(operate('-', 33, 17));
console.log(operate('*', 33, 17));
console.log(operate('/', 33, 17));