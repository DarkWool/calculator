const NUMBERS = document.body.getElementsByClassName('number');
const OPERATORS = document.body.getElementsByClassName('operator');

const ac = document.getElementById('ac');
const del = document.getElementById('del');
const enter = document.getElementById('enter-btn');
const dotOperator = document.getElementById('dot');
const lastOperation = document.getElementById('lastOperation');
const currOperation = document.getElementById('currentOperation');

let firstOperand;
let secondOperand;
let operator;
let dotAvailable = true;
let firstDigit = true;
let newOperation = false;

ac.addEventListener('click', restartCalculator);
del.addEventListener('click', deleteOneChar);
enter.addEventListener('click', (e) => getResult(e.target));
dotOperator.addEventListener('click', dot);
window.addEventListener('keydown', keyboardSupport);

for (let button of NUMBERS) {
    button.addEventListener('click', (e) => displayNumber(e.target));
}

for (let button of OPERATORS) {
    button.addEventListener('click', (e) => displayOperator(e.target));
}

function displayOperator(e) {
    if (checkMathError()) return;

    getResult(e);

    if (e.dataset.key === '%') return;

    newOperation = false;
    operator = e.textContent;

    if (firstOperand === 'Math Error') {
        lastOperation.textContent = '';
        currOperation.textContent = `${firstOperand}`;
        return;
    }
    lastOperation.textContent = `${firstOperand} ${operator}`;
    currOperation.textContent = '0';
}

function getResult(e) {
    if (firstOperand && operator) {
        secondOperand = currOperation.textContent;

        if (e.dataset.key === '%') getPercentage('two');
        else lastOperation.textContent = `${firstOperand} ${operator} ${secondOperand} =`;

        firstOperand = operate(operator, +firstOperand, +secondOperand);

        if (e.dataset.key === 'Enter' || e.dataset.key === '%') {
            operator = undefined;
            newOperation = true;
            currOperation.textContent = trimDecimals(String(firstOperand));
        }
    } else {
        (e.dataset.key === '%') ? getPercentage('one') : false;
        if (!firstOperand) firstOperand = currOperation.textContent;
    }

    firstDigit = true;
}

function getPercentage(operandsQuantity) {
    if (operandsQuantity === 'two') {
        lastOperation.textContent = `${firstOperand} ${operator} ${secondOperand}% =`;
        (operator === '+' || operator === '-') ?
            secondOperand = percentage(+firstOperand, +secondOperand) :
            secondOperand = percentage(+secondOperand);
    } else {
        firstOperand = percentage(+currOperation.textContent);
        lastOperation.textContent = `${currOperation.textContent}% =`;
        currOperation.textContent = trimDecimals(String(firstOperand));
    }

    newOperation = true;
}

function dot() {
    if (newOperation) showAnswer();

    dotAvailable = (currOperation.textContent.match(/\.{1}/)) ? false : true;
    if (dotAvailable) {
        currOperation.textContent += '.';
        firstDigit = false;
    }
    return;
}

function trimDecimals(str) {
    return (str.length > 12) ? Number(str).toPrecision(8) : str;
}

function displayNumber(e) {
    if (firstDigit) {
        if (newOperation) showAnswer();
        checkMathError();
        currOperation.textContent = e.textContent;
        firstDigit = false;
    } else {
        currOperation.textContent += `${e.textContent}`;
    }
}

function restartCalculator() {
    firstOperand = 0;
    secondOperand = 0;
    operator = '';
    dotAvailable = true;
    firstDigit = true;
    newOperation = false;

    lastOperation.textContent = '';
    currOperation.textContent = '0';
}

function deleteOneChar() {
    if (newOperation) return showAnswer();

    if (firstDigit) {
        checkMathError();
        currOperation.textContent = '0';
        return;
    }
    currOperation.textContent = currOperation.textContent.slice(0, currOperation.textContent.length - 1);
}

function showAnswer() {
    if (!checkMathError()) {
        lastOperation.textContent = `Ans = ${currOperation.textContent}`;
        currOperation.textContent = '0';
        firstOperand = undefined;
        newOperation = false;
    }
}

function keyboardSupport(e) {
    const button = document.querySelector(`button[data-key=\"${e.key}\"]`);

    if (button) {
        if (button.classList.contains('number')) {
            return displayNumber(button);
        } else if (button.classList.contains('operator')) {
            return displayOperator(button);
        } else if (button.dataset.key === 'Backspace') {
            return deleteOneChar();
        } else if (button.dataset.key === '.') {
            return dot();
        } else if (button.dataset.key === 'Enter') {
            e.preventDefault();
            return getResult(button);
        } else if (button.dataset.key === 'Escape') {
            return restartCalculator();
        }
    }
}

function checkMathError() {
    if (firstOperand === 'Math Error' || secondOperand === 'Math Error') {
        restartCalculator();
        firstDigit = true;
        return true;
    }
    return false;
}

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

function percentage(a, b = 1) {
    if (a === 0) return 0;
    else if (b || b === 0) return a * (b / 100);
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


// Display the calculator full screen on mobile (avoiding the browser interface)
let vh = window.innerHeight * 0.01;
document.getElementById('flex-container').style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', resizeScreen);

function resizeScreen() {
    vh = window.innerHeight * 0.01;
    document.getElementById('flex-container').style.setProperty('--vh', `${vh}px`);
}
