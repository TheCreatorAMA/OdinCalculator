const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const displayEquation = document.querySelector('.display-equation');
const displayResult = document.querySelector('.display-result');

displayResult.textContent = 'READY';
displayEquation.textContent = '';

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
        console.log('±');
        break;
      case '%':
        console.log('%');
        break;
      case '÷':
        console.log('÷');
        break;
      case '×':
        console.log('×');
        break;
      case '-':
        console.log('-');
        break;
      case '+':
        console.log('+');
        break;
      case '=':
        console.log('=');
        break;
      default:
        console.log('operator button pressed');
    }
  });
});

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

function operate() {}

function clearMemory() {
  displayEquation.textContent = '';
  displayResult.textContent = '';
}
