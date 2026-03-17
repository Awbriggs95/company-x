import { create } from 'zustand';

type Operator = '+' | '-' | '*' | '/';

interface CalculatorState {
  displayValue: string;
  expression: string;
  operator: Operator | null;
  previousValue: string | null;
  waitingForOperand: boolean;
  justCalculated: boolean;
}

interface CalculatorActions {
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  inputOperator: (op: Operator) => void;
  calculate: () => void;
  clear: () => void;
  toggleSign: () => void;
  percentage: () => void;
}

const INITIAL_STATE: CalculatorState = {
  displayValue: '0',
  expression: '',
  operator: null,
  previousValue: null,
  waitingForOperand: false,
  justCalculated: false,
};

const OP_SYMBOLS: Record<Operator, string> = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
};

/** Performs arithmetic. Returns 'Error' on division by zero. */
function compute(a: number, op: Operator, b: number): number | 'Error' {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'Error' : a / b;
  }
}

/** Formats a number result, stripping floating-point noise. */
function formatResult(value: number): string {
  return parseFloat(value.toPrecision(12)).toString();
}

export const useCalculatorStore = create<CalculatorState & CalculatorActions>((set, get) => ({
  ...INITIAL_STATE,

  inputDigit: (digit) => {
    const { displayValue, waitingForOperand, justCalculated } = get();
    if (waitingForOperand || justCalculated || displayValue === 'Error') {
      set({ displayValue: digit, waitingForOperand: false, justCalculated: false });
    } else {
      set({ displayValue: displayValue === '0' ? digit : displayValue + digit });
    }
  },

  inputDecimal: () => {
    const { displayValue, waitingForOperand } = get();
    if (waitingForOperand) {
      set({ displayValue: '0.', waitingForOperand: false });
      return;
    }
    if (displayValue === 'Error') {
      set({ displayValue: '0.' });
      return;
    }
    if (!displayValue.includes('.')) {
      set({ displayValue: displayValue + '.' });
    }
  },

  inputOperator: (op) => {
    const { displayValue, operator, previousValue, waitingForOperand, justCalculated } = get();

    if (operator && !waitingForOperand && !justCalculated && previousValue !== null) {
      const result = compute(parseFloat(previousValue), operator, parseFloat(displayValue));
      if (result === 'Error') {
        set({ ...INITIAL_STATE, displayValue: 'Error', expression: '' });
        return;
      }
      const formatted = formatResult(result);
      set({
        displayValue: formatted,
        previousValue: formatted,
        operator: op,
        expression: `${formatted} ${OP_SYMBOLS[op]}`,
        waitingForOperand: true,
        justCalculated: false,
      });
    } else {
      const base = displayValue === 'Error' ? '0' : displayValue;
      set({
        previousValue: base,
        operator: op,
        expression: `${base} ${OP_SYMBOLS[op]}`,
        waitingForOperand: true,
        justCalculated: false,
      });
    }
  },

  calculate: () => {
    const { displayValue, operator, previousValue, expression } = get();
    if (!operator || previousValue === null) return;

    const result = compute(parseFloat(previousValue), operator, parseFloat(displayValue));
    if (result === 'Error') {
      set({
        ...INITIAL_STATE,
        displayValue: 'Error',
        expression: `${expression} ${displayValue} =`,
      });
      return;
    }

    set({
      displayValue: formatResult(result),
      expression: `${expression} ${displayValue} =`,
      operator: null,
      previousValue: null,
      waitingForOperand: false,
      justCalculated: true,
    });
  },

  clear: () => set(INITIAL_STATE),

  toggleSign: () => {
    const { displayValue } = get();
    if (displayValue === 'Error' || displayValue === '0') return;
    set({ displayValue: formatResult(parseFloat(displayValue) * -1) });
  },

  percentage: () => {
    const { displayValue } = get();
    if (displayValue === 'Error') return;
    set({ displayValue: formatResult(parseFloat(displayValue) / 100) });
  },
}));
