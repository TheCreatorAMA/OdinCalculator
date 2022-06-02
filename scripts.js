const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const displayEquation = document.querySelector('.display-equation');
const displayResult = document.querySelector('.display-result');

displayResult.textContent = 'READY';
displayEquation.textContent = '';
let firstOperand = '';
let secondOperand = '';
let operation = null;
let result = null;

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (displayResult.textContent == 'READY' || displayResult.textContent == 'Naughty Naughty') displayResult.textContent = '';
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
      default:
        operate(button.textContent);
    }
  });
});

function clearMemory() {
  displayEquation.textContent = '';
  displayResult.textContent = '';
  firstOperand = '';
  secondOperand = '';
  operation = null;
  result = null;
}

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
