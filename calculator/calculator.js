let currentInput = '';
let expression = '';
let shouldResetDisplay = false;
let lastOperator = null;

const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');

function updateDisplay(value) {
  resultEl.textContent = value;
  resultEl.classList.toggle('small', value.toString().length > 9);
}

function appendDigit(digit) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  if (currentInput === '0' && digit !== '.') {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay(currentInput);
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
  }
  if (!currentInput.includes('.')) {
    currentInput = (currentInput || '0') + '.';
    updateDisplay(currentInput);
  }
}

function appendOperator(op) {
  const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

  if (currentInput !== '') {
    if (expression !== '' && !shouldResetDisplay) {
      calculate(true);
    } else {
      expression = currentInput;
    }
  } else if (expression !== '') {
    // Replace last operator
    expression = expression.slice(0, -1) + op;
    expressionEl.textContent = expression.replace(/\*/g, '×').replace(/\//g, '÷') + ' ' + opSymbols[op];
    lastOperator = op;
    return;
  }

  lastOperator = op;
  expression = (resultEl.textContent !== '0' || expression === '' ? expression || resultEl.textContent : expression) + op;
  expressionEl.textContent = expression.replace(/\*/g, '×').replace(/\//g, '÷');
  shouldResetDisplay = true;
  currentInput = '';

  // Highlight active operator button
  document.querySelectorAll('.btn-operator').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function calculate(partial = false) {
  document.querySelectorAll('.btn-operator').forEach(btn => btn.classList.remove('active'));

  if (currentInput === '' && !partial) return;

  const fullExpression = expression + (currentInput || resultEl.textContent);
  expressionEl.textContent = fullExpression.replace(/\*/g, '×').replace(/\//g, '÷') + (partial ? '' : ' =');

  try {
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + fullExpression + ')')();
    if (!isFinite(result)) {
      updateDisplay('Error');
      expression = '';
      currentInput = '';
      return;
    }
    const formatted = parseFloat(result.toPrecision(12)).toString();
    updateDisplay(formatted);
    expression = formatted;
    currentInput = '';
    if (!partial) shouldResetDisplay = true;
  } catch {
    updateDisplay('Error');
    expression = '';
    currentInput = '';
  }
}

function clearAll() {
  currentInput = '';
  expression = '';
  shouldResetDisplay = false;
  lastOperator = null;
  updateDisplay('0');
  expressionEl.textContent = '';
  document.querySelectorAll('.btn-operator').forEach(btn => btn.classList.remove('active'));
}

function toggleSign() {
  if (currentInput !== '') {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay(currentInput);
  } else {
    const val = parseFloat(resultEl.textContent) * -1;
    updateDisplay(val.toString());
    expression = val.toString();
  }
}

function percentage() {
  const val = parseFloat(currentInput || resultEl.textContent) / 100;
  currentInput = val.toString();
  updateDisplay(currentInput);
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendDigit(e.key);
  else if (e.key === '.') appendDecimal();
  else if (e.key === '+') appendOperator('+');
  else if (e.key === '-') appendOperator('-');
  else if (e.key === '*') appendOperator('*');
  else if (e.key === '/') { e.preventDefault(); appendOperator('/'); }
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === 'Backspace') {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1) || '';
      updateDisplay(currentInput || '0');
    }
  }
});
