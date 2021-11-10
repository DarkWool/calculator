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
let dotAvailable = true;
let firstDigit = true;

AC.addEventListener('click', restartCalculator);
DEL.addEventListener('click', deleteOneChar);
ENTER.addEventListener('click', enterBtn);
PERCENTAGE.addEventListener('click', (e) => percentageBtn(e.target));
window.addEventListener('keydown', keyboardSupport);

for (let button of NUMBERS) {
    button.addEventListener('click', (e) => displayNumber(e.target));
}

for (let button of OPERATORS) {
    button.addEventListener('click', (e) => operatorBtn(e.target));
}


function enterBtn() {
    if (checkMathError()) return;

    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        lastOp.textContent = `${firstNum} ${operator} ${secondNum} =`;
        firstNum = operate(operator, +firstNum, +secondNum);
        actualOp.textContent = firstNum;

        operator = '';
        secondNum = 0;
        firstDigit = true;
    }
}

function operatorBtn(e) {
    if (checkMathError()) return;

    if (e.dataset.key === '.') {
        checkForDot();
        if (dotAvailable) actualOp.textContent += '.';
        return;
    } else if (firstNum && operator) {
        secondNum = actualOp.textContent;
        if (!firstDigit) {
            firstNum = operate(operator, +firstNum, +secondNum);
        }
        
        operator = e.textContent;
        (firstNum === 'Math Error') ? lastOp.textContent = '' :
            lastOp.textContent = `${firstNum} ${operator}`;
        secondNum = 0;
    } else {
        lastOp.textContent = `${actualOp.textContent} ${e.textContent}`;
        firstNum = actualOp.textContent;
        operator = e.textContent;
    }
    actualOp.textContent = firstNum;
    firstDigit = true;
}

function percentageBtn(e) {
    if (checkMathError()) return;

    // If there is an expression behind the actual calculation...
    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        lastOp.textContent = `${firstNum} ${operator} ${secondNum}% =`;

        secondNum = percentage(+firstNum, +secondNum);
        firstNum = operate(operator, +firstNum, +secondNum);

        actualOp.textContent = `${firstNum}`;
    } else {
        lastOp.textContent = `${actualOp.textContent}${e.textContent}`;
        firstNum = percentage(+actualOp.textContent);
        actualOp.textContent = firstNum;
    }

    operator = '';
    firstDigit = true;
}

function displayNumber(e) {
    if (firstDigit) {
        checkMathError();
        actualOp.textContent = e.textContent;
        firstDigit = false;
    } else {
        actualOp.textContent += `${e.textContent}`;
    }
}

function restartCalculator() {
    firstNum = 0;
    secondNum = 0;
    operator = '';
    dotAvailable = true;
    firstDigit = true;

    lastOp.textContent = '';
    actualOp.textContent = '0';
}

function deleteOneChar() {
    if (checkMathError()) return;
    actualOp.textContent = actualOp.textContent.slice(0, actualOp.textContent.length - 1);
}

function checkForDot() {
    dotAvailable = (actualOp.textContent.match(/\.{1}/)) ? false : true;
}

function keyboardSupport(e) {
    const button = document.querySelector(`button[data-key=\"${e.key}\"]`);

    if (button) {
        if (button.classList.contains('number')) {
            return displayNumber(button);
        } else if (button.classList.contains('operator')) {
            return operatorBtn(button);
        } else if (button.dataset.key === 'Backspace') {
            return deleteOneChar();
        } else if (button.dataset.key === '%') {
            return percentageBtn(button);
        } else if (button.dataset.key === 'Enter') {
            e.preventDefault();
            return enterBtn();
        } else if (button.dataset.key === 'Escape') {
            return restartCalculator();
        }
    }
}

function checkMathError() {
    if (firstNum === 'Math Error' || secondNum === 'Math Error') {
        restartCalculator();
        firstDigit = true;
        return true;
    }
    return false;
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
    if (b === 0) return 'Math Error';
    return a / b;
}

function percentage(a, b) {
    if (b || b === 0) return a * (b / 100);
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