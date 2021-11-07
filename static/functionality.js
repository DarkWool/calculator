const NUMBERS = document.body.getElementsByClassName('number');
const OPERATORS = document.body.getElementsByClassName('operator');
const AC = document.getElementById('ac');
const DEL = document.getElementById('del');
const ENTER = document.getElementById('enter-btn');
const lastOp = document.getElementById('lastOperation');
const actualOp = document.getElementById('currentOperation');

let firstNum;
let secondNum;
let operator;

AC.addEventListener('click', restartCalculator);
DEL.addEventListener('click', deleteOneChar);

for (let button of NUMBERS) {
    button.addEventListener('click', displayNumber);
}

for (let button of OPERATORS) {
    button.addEventListener('click', operatorBtn);
}


function operatorBtn(e) {
    lastOp.textContent = `${actualOp.textContent} ${e.target.textContent}`;
    
    if (firstNum) {
        secondNum = actualOp.textContent;
        firstNum = operate(operator, +firstNum, +secondNum);

        operator = e.target.dataset.key;
        lastOp.textContent = `${firstNum} ${operator}`;
    } else {
        firstNum = actualOp.textContent;
        operator = e.target.dataset.key;
    }
    actualOp.textContent = '0';
}

function displayNumber(e) {
    (actualOp.textContent === '0') ? actualOp.textContent = e.target.textContent :
        actualOp.textContent += `${e.target.textContent}`; 
}

function restartCalculator() {
    firstNum = 0;
    secondNum = 0;
    operator = '';

    lastOp.textContent = '';
    actualOp.textContent = '0';
}

function deleteOneChar() {
    actualOp.textContent = actualOp.textContent.slice(0, actualOp.textContent.length - 1);
}






// Calculator functions.
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