const NUMBERS = document.body.getElementsByClassName('number');
const OPERATORS = document.body.getElementsByClassName('operator');
const AC = document.getElementById('ac');
const DEL = document.getElementById('del');
const ENTER = document.getElementById('enter-btn');
const PERCENTAGE = document.getElementById('percentage');
const lastOp = document.getElementById('lastOperation');
const actualOp = document.getElementById('currentOperation');

let firstNum;
let secondNum;
let operator;

AC.addEventListener('click', restartCalculator);
DEL.addEventListener('click', deleteOneChar);
ENTER.addEventListener('click', displayResult);
PERCENTAGE.addEventListener('click', (e) => percentageBtn(e.target));
window.addEventListener('keydown', keyboardSupport);

for (let button of NUMBERS) {
    button.addEventListener('click', (e) => displayNumber(e.target));
}

for (let button of OPERATORS) {
    button.addEventListener('click', (e) => operatorBtn(e.target));
}


function displayResult() {
    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        lastOp.textContent = `${firstNum} ${operator} ${secondNum} =`;
        actualOp.textContent = operate(operator, +firstNum, +secondNum);

        operator = '';
        firstNum = 0;
        secondNum = 0;
    }
}

function operatorBtn(e) {
    console.log(e);
    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        if (+secondNum) {
            firstNum = operate(operator, +firstNum, +secondNum);
        }

        operator = e.textContent;
        lastOp.textContent = `${firstNum} ${e.textContent}`;
        secondNum = 0;
    } else {
        lastOp.textContent = `${actualOp.textContent} ${e.textContent}`;
        firstNum = actualOp.textContent;
        operator = e.textContent;
    }
    actualOp.textContent = '0';
}

function percentageBtn(e) {
    secondNum = actualOp.textContent;

    // If there is an expression behind the actual calculation...
    if (firstNum) {
        lastOp.textContent = `${firstNum} ${operator} ${secondNum}% =`;
        secondNum = percentage(+firstNum, +secondNum);
        secondNum = operate(operator, +firstNum, +secondNum);
        actualOp.textContent = `${secondNum}`;

        firstNum = '';
    } else {
        lastOp.textContent = `${actualOp.textContent}${e.textContent}`;
        secondNum = percentage(+secondNum);
        actualOp.textContent = secondNum;
    }
    operator = '';
}

function displayNumber(e) {
    (actualOp.textContent === '0') ? actualOp.textContent = e.textContent :
        actualOp.textContent += `${e.textContent}`; 
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

function keyboardSupport(e) {
    const button = document.querySelector(`button[data-key=\"${e.key}\"]`);
    if (button.classList.contains('number')) {
        displayNumber(button);
    } else if (button.classList.contains('operator')) {
        operatorBtn(button);
    } else if (button.dataset.key === 'Backspace') {
        deleteOneChar();
    } else if (button.dataset.key === '%') {
        percentageBtn(button);
    } else if (button.dataset.key === 'Enter') {
        displayResult();
    } else if (button.dataset.key === 'Escape') {
        restartCalculator();
    }
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

function percentage(a, b) {
    if (b) {
        b /= 100;
        return a * b;
    }
    return a / 100;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}