const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const displayEquation = document.querySelector('.display-equation');
const displayResult = document.querySelector('.display-result');

displayResult.textContent = 'READY';
displayEquation.textContent = '';
let firstOperand = '';
let secondOperand = '';
let operation = null;
let firstInput = true;
let result = null;

// track numbers being pressed until operator is pressed
// once operator is pressed record first number
// wait for user to enter second number until another operator is pressed
// if another operator is pressed do the steps below
//    - evaluate equation
//    - update display value with result and update equation display
//    - clear the operator and secondOperand variables
//    - store result in the firstOperand Variable
// Now if another operator is pressed keep result and do math off of it. But if a number is pressed
// reset the calculator

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (displayResult.textContent == 'READY') displayResult.textContent = '';
    displayResult.textContent += button.textContent;
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
        }
        break;
      case '%':
        if (!isNaN(displayResult.textContent)) {
          displayResult.textContent = Number(displayResult.textContent) / 100;
        }
        break;
      default:
        if (firstInput) {
          recordFirstInput(button.textContent);
        } else {
          recordSecondInput(button.textContent);
        }
    }
  });
});

function updateDisplay(input) {
  if (firstInput) {
    displayEquation.textContent = '';
    displayEquation.textContent += firstOperand + ' ' + input + ' ';
  } else {
    if (!result) {
      displayEquation.textContent += secondOperand + ' = ' + result;
    } else {
      displayEquation.textContent = result + ' ' + input;
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
  return a / b;
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

  return result;
}

function clearMemory() {
  displayEquation.textContent = '';
  displayResult.textContent = '';
  firstOperand = '';
  secondOperand = '';
  operation = null;
  firstInput = true;
  result = null;
}

function recordFirstInput(operatorInput) {
  firstOperand = +displayResult.textContent;
  updateDisplay(operatorInput);
  operation = convertOperation(operatorInput);
  displayResult.textContent = '';
  firstInput = false;
}

function recordSecondInput(operatorInput) {
  secondOperand = +displayResult.textContent;
  solveEquation();
  displayResult.textContent = result;
  updateDisplay(operatorInput);
  firstOperand = result;
  operation = convertOperation(operatorInput);
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
      updateDisplay(operator);
      returnOperator = operator;
  }

  return returnOperator;
}
