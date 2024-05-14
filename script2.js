let prevInput = '';
let currInput = '0';
let op = '';
let floatOp = false;

const display = document.querySelector('.display');
const keys = document.querySelectorAll('.keys');

function isOperator(operator) {
    return ((operator === '+') || (operator === '-') || 
    (operator === '*') || (operator === '/'));
}

function resetInputs() {
    prevInput = '';
    currInput = '0';
    op = '';
}

function flipSigns(input) {
    return (-1 * input).toString();
}

function operate(operator, a, b) {
    switch (operator) {
        case "/": return a / b;
        case "*": return a * b;
        case "-": return a - b;
        case "+": return a + b;
    }
}

function updateDisplay(value) {
    const maxLength = 8;
    let displayText = value.toString();

    // Handle floating point precision and large numbers
    if (displayText.includes('.') && displayText.length > maxLength) {
        displayText = Number(value).toPrecision(maxLength);
    } else if (displayText.length > maxLength) {
        displayText = Number(value).toExponential(maxLength - 4);
    }

    display.textContent = displayText;
}

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (!isNaN(parseFloat(keyValue))) {
            if (currInput === '0') {
                currInput = keyValue;
            } else {
                currInput += keyValue;
            }
        } else if (isOperator(keyValue)) {
            prevInput = currInput;
            currInput = '0';
            op = keyValue;
            floatOp = false;
        } else if (keyValue === '=') {
            const result = operate(op, parseFloat(prevInput),
                                   parseFloat(currInput));
            updateDisplay(result);
        } else if (keyValue === 'AC') {
            resetInputs();
            updateDisplay('0');
            floatOp = false;
        } else if (keyValue === '+/-') {
            currInput = flipSigns(parseFloat(currInput));
        } else if (keyValue === '%') {
            currInput =  (parseFloat(currInput) / 100).toString();
        } else if (keyValue === '.' && !floatOp) {
            floatOp = true;
            currInput += '.';
        }

        if (!isOperator(keyValue) || keyValue === '.') {
            updateDisplay(currInput);
            resetInputs(); 
        }
    })
})