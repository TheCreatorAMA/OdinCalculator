const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const displayEquation = document.querySelector('.display-equation');
const displayResult = document.querySelector('.display-result');

// Variables to track operands, display values and result.
displayResult.textContent = 'READY';
displayEquation.textContent = '';
let firstOperand = '';
let secondOperand = '';
let operation = null;
let result = null;

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Handles clearing the screen is text that are not numbers are there.
    if (displayResult.textContent == 'READY' || displayResult.textContent == 'Naughty Naughty') {
      displayResult.textContent = '';
      clearMemory();
    }

    // This handles keeping the previous value on the screen when waiting for the second
    // operand to be inputted
    if (firstOperand === '') {
      displayResult.textContent += button.textContent;
    } else if (firstOperand == displayResult.textContent) {
      displayResult.textContent = '';
      displayResult.textContent += button.textContent;
    } else {
      displayResult.textContent += button.textContent;
    }
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    switch (button.textContent) {
      case 'A/C':
        clearMemory();
        break;
      case '±':
        if (!isNaN(displayResult.textContent)) {
          displayResult.textContent = Number(displayResult.textContent) * -1;

          if (result) {
            result *= -1;
          }
        }
        break;
      case '%':
        if (!isNaN(displayResult.textContent)) {
          displayResult.textContent = Number(displayResult.textContent) / 100;
        }
        break;
      case '.':
        if (checkForDecimal()) {
          displayResult.textContent += '.';
        }
        break;
      default:
        operate(button.textContent);
    }
  });
});

// Clearing memory
function clearMemory() {
  displayEquation.textContent = '';
  displayResult.textContent = '';
  firstOperand = '';
  secondOperand = '';
  operation = null;
  result = null;
}

// Basically if the first operand has yet to be recorded log the first input
// Then once second input has been recorded (after the user hits an operator button)
// solve the current equation and make the result the first operand to let the user
// do more calculations.
function operate(input) {
  if (firstOperand === '' && input !== '=') {
    firstOperand = +displayResult.textContent;
    operation = convertOperation(input);
    updateDisplay(input);
  } else if (firstOperand !== '') {
    secondOperand = +displayResult.textContent;
    solveEquation();
    firstOperand = result;
    updateDisplay(input);
    secondOperand = '';
    operation = convertOperation(input);
  }
}

// Handles updating the equation display
function updateDisplay(operator) {
  if (secondOperand === '') {
    displayEquation.textContent = firstOperand + ' ' + operator;
  } else {
    if (operator === '=') {
      displayEquation.textContent += ' ' + secondOperand + ' = ';
      displayResult.textContent = result;
    } else {
      displayEquation.textContent = firstOperand + ' ' + operator;
      displayResult.textContent = result;
    }
  }
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
  if (b === 0) {
    return 'Naughty Naughty';
  } else {
    return a / b;
  }
}

function checkForDecimal() {
  for (let i = 0; i < displayResult.textContent.length; i++) {
    curChar = displayResult.textContent[i];
    if (curChar === '.') {
      return false;
    }
  }

  return true;
}

function solveEquation() {
  switch (operation) {
    case '/':
      result = divide(firstOperand, secondOperand);
      break;
    case '*':
      result = multiply(firstOperand, secondOperand);
      break;
    case '-':
      result = subtract(firstOperand, secondOperand);
      break;
    case '+':
      result = add(firstOperand, secondOperand);
      break;
  }

  if (result !== 'Naughty Naughty' && String(result).length > 12) {
    result = Number(result).toFixed(11);
  }
}

function convertOperation(operator) {
  let returnOperator;

  switch (operator) {
    case '÷':
      returnOperator = '/';
      break;
    case '×':
      returnOperator = '*';
      break;
    case '-':
      returnOperator = '-';
      break;
    case '+':
      returnOperator = '+';
      break;
    case '=':
      returnOperator = '=';
      break;
    default:
      returnOperator = operator;
  }

  return returnOperator;
}
