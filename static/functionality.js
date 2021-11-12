const NUMBERS = document.body.getElementsByClassName('number');
const OPERATORS = document.body.getElementsByClassName('operator');

const ac = document.getElementById('ac');
const del = document.getElementById('del');
const enter = document.getElementById('enter-btn');
const percentageBtn = document.getElementById('percentage');
const lastOp = document.getElementById('lastOperation');
const actualOp = document.getElementById('currentOperation');

let firstNum;
let secondNum;
let operator;
let dotAvailable = true;
let firstDigit = true;
let newOperation = false;

ac.addEventListener('click', restartCalculator);
del.addEventListener('click', deleteOneChar);
enter.addEventListener('click', getResult);
percentageBtn.addEventListener('click', (e) => getPercentage(e.target));
window.addEventListener('keydown', keyboardSupport);

for (let button of NUMBERS) {
    button.addEventListener('click', (e) => displayNumber(e.target));
}

for (let button of OPERATORS) {
    button.addEventListener('click', (e) => operatorBtn(e.target));
}


function getResult() {
    if (checkMathError()) return;

    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        lastOp.textContent = `${firstNum} ${operator} ${secondNum} =`;
        firstNum = operate(operator, +firstNum, +secondNum);
        actualOp.textContent = firstNum;
        trimDecimals(actualOp.textContent);

        operator = '';
        secondNum = 0;
        firstDigit = true;
        newOperation = true;
    }
}

function operatorBtn(e) {
    if (checkMathError()) return;

    if (e.dataset.key === '.') {
        checkForDot();
        if (newOperation) return showAnswer();
        else if (dotAvailable) {
            actualOp.textContent += '.';
            firstDigit = false;
        }
        return;
    }
    
    (newOperation) ? newOperation = false : false;

    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        if (!firstDigit) {
            firstNum = operate(operator, +firstNum, +secondNum);
        }
        
        operator = e.textContent;
        (firstNum === 'Math Error') ? lastOp.textContent = '' :
            lastOp.textContent = `${firstNum} ${operator}`;
        secondNum = 0;
    } else {
        firstNum = actualOp.textContent;
        operator = e.textContent;
        lastOp.textContent = `${firstNum} ${operator}`;
    }
    actualOp.textContent = '0';
    trimDecimals(actualOp.textContent);
    firstDigit = true;
}

function getPercentage(e) {
    (newOperation) ? newOperation = false : false;
    if (checkMathError()) return;

    // If there is an expression behind the actual calculation...
    if (firstNum && operator) {
        secondNum = actualOp.textContent;
        lastOp.textContent = `${firstNum} ${operator} ${secondNum}% =`;

        if (operator === '+' || operator === '-') {
            secondNum = percentage(+firstNum, +secondNum);
            firstNum = operate(operator, +firstNum, +secondNum);
        } else {
            secondNum = percentage(+secondNum);
            firstNum = operate(operator, +firstNum, +secondNum);
        }
        newOperation = true;
    } else {
        lastOp.textContent = `${actualOp.textContent}${e.textContent}`;
        firstNum = percentage(+actualOp.textContent);
        newOperation = true;
    }
    
    actualOp.textContent = firstNum;
    trimDecimals(actualOp.textContent);
    operator = '';
    firstDigit = true;
}

function trimDecimals(str) {
    (str.length > 13) ? actualOp.textContent = firstNum.toPrecision(8) : false;
}

function displayNumber(e) {
    if (firstDigit) {
        if (newOperation) showAnswer();
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
    newOperation = false;

    lastOp.textContent = '';
    actualOp.textContent = '0';
}

function deleteOneChar(e) {
    if (newOperation) showAnswer();

    if (firstDigit) {
        checkMathError();
        actualOp.textContent = '0';
        // firstDigit = false;
        return;
    }
    actualOp.textContent = actualOp.textContent.slice(0, actualOp.textContent.length - 1);
}

function showAnswer() {
    if (actualOp.textContent !== 'Math Error' && actualOp.textContent !== NaN) {
        lastOp.textContent = `Ans = ${actualOp.textContent}`;

        actualOp.textContent = '0';
        firstNum = undefined;
        newOperation = false;
    }
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
            return getPercentage(button);
        } else if (button.dataset.key === 'Enter') {
            e.preventDefault();
            return getResult();
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
    if (a === 0) return 0;
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