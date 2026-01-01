// Basic math functions
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (array) {
  return array.reduce((total, current) => total + current, 0);
};

const multiply = function (array) {
  return array.reduce((product, current) => product * current);
};

const power = function (a, b) {
  return a ** b;
};


// Storage variables
let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

// Get display element
const display = document.querySelector('input[name="display"]');

// Append number to display
function appendNumber(num) {
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }
  display.value += num;
}

// Set operator and store first number
function setOperator(op) {
  // If user presses operator twice without entering a number
  if (operator !== "" && shouldResetDisplay === true) {
    operator = op;  // Just update the operator
    return;
  }
  
  // If there's a pending calculation, do it first
  if (firstNumber !== "" && operator !== "" && display.value !== "") {
    calculate();
  }
  
  firstNumber = display.value;
  operator = op;
  shouldResetDisplay = true;
}
// Calculate the result
function calculate() {
  if (firstNumber === "" || operator === "" || display.value === "") {
    return;
  }
    secondNumber = display.value;

  
  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);
  let result;

  switch(operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply([num1, num2]);
      break;
    case '/':
      if (num2 === 0) {
        display.value = "Error";
        clearCalculator();
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }
  
  display.value = Math.round(result * 100000000) / 100000000; // Round to avoid floating point issues
  firstNumber = display.value;
  secondNumber = "";
  operator = "";
  shouldResetDisplay = true;
}

// Clear everything
function clearCalculator() {
  display.value = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
}

// Delete last character
function deleteLast() {
  display.value = display.value.toString().slice(0, -1);
}