/** @type {string} Current number being entered */
let currentInput = "0";

/** @type {string | null} Stored operand for binary operation */
let previousInput = null;

/** @type {string | null} Pending operator */
let operator = null;

/** @type {boolean} Whether the next digit press starts a new number */
let shouldResetInput = false;

const resultEl = document.getElementById("result");
const expressionEl = document.getElementById("expression");

/** Updates the display elements. */
function updateDisplay() {
  resultEl.textContent = currentInput;
  resultEl.classList.toggle("small", currentInput.length > 9);
}

/** Appends a digit to the current input. */
function appendDigit(digit) {
  if (shouldResetInput) {
    currentInput = digit;
    shouldResetInput = false;
  } else {
    currentInput =
      currentInput === "0" ? digit : currentInput + digit;
  }
  updateDisplay();
}

/** Appends a decimal point if not already present. */
function appendDecimal() {
  if (shouldResetInput) {
    currentInput = "0.";
    shouldResetInput = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

/** Resets the calculator to its initial state. */
function clear() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  shouldResetInput = false;
  expressionEl.textContent = "";
  document.querySelectorAll(".btn-operator").forEach((b) =>
    b.classList.remove("active")
  );
  updateDisplay();
}

/** Toggles the sign of the current number. */
function toggleSign() {
  if (currentInput !== "0") {
    currentInput = currentInput.startsWith("-")
      ? currentInput.slice(1)
      : "-" + currentInput;
    updateDisplay();
  }
}

/** Converts the current number to a percentage. */
function applyPercent() {
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay();
}

/**
 * Stores the operator and first operand.
 * @param {string} op - The operator symbol
 */
function setOperator(op) {
  if (operator && !shouldResetInput) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetInput = true;
  expressionEl.textContent = `${previousInput} ${op}`;

  document.querySelectorAll(".btn-operator").forEach((b) =>
    b.classList.remove("active")
  );
  const activeBtn = [...document.querySelectorAll(".btn-operator")].find(
    (b) => b.dataset.value === op
  );
  if (activeBtn) activeBtn.classList.add("active");
}

/** Performs the pending calculation and updates the display. */
function calculate() {
  if (operator === null || previousInput === null) return;

  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "−":
      result = a - b;
      break;
    case "×":
      result = a * b;
      break;
    case "÷":
      result = b !== 0 ? a / b : "Error";
      break;
    default:
      return;
  }

  expressionEl.textContent = `${previousInput} ${operator} ${currentInput} =`;
  currentInput =
    result === "Error" ? "Error" : String(parseFloat(result.toFixed(10)));
  operator = null;
  previousInput = null;
  shouldResetInput = true;

  document.querySelectorAll(".btn-operator").forEach((b) =>
    b.classList.remove("active")
  );
  updateDisplay();
}

/** Routes button clicks to the appropriate handler. */
document.querySelector(".buttons").addEventListener("click", (event) => {
  const btn = event.target.closest(".btn");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  switch (action) {
    case "digit":
      appendDigit(value);
      break;
    case "decimal":
      appendDecimal();
      break;
    case "clear":
      clear();
      break;
    case "toggle-sign":
      toggleSign();
      break;
    case "percent":
      applyPercent();
      break;
    case "operator":
      setOperator(value);
      break;
    case "equals":
      calculate();
      break;
  }
});

/** Handles keyboard input. */
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") appendDigit(key);
  else if (key === ".") appendDecimal();
  else if (key === "+") setOperator("+");
  else if (key === "-") setOperator("−");
  else if (key === "*") setOperator("×");
  else if (key === "/") { event.preventDefault(); setOperator("÷"); }
  else if (key === "Enter" || key === "=") calculate();
  else if (key === "Escape") clear();
  else if (key === "%") applyPercent();
  else if (key === "Backspace") {
    if (!shouldResetInput && currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = "0";
    }
    updateDisplay();
  }
});

updateDisplay();
