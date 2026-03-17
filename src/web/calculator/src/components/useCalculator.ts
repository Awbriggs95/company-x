import { useCallback, useEffect, useReducer } from 'react'

type Operator = '+' | '-' | '×' | '÷'

interface State {
  display: string
  expression: string
  operand: number | null
  operator: Operator | null
  waitingForOperand: boolean
  error: boolean
}

type Action =
  | { type: 'DIGIT'; digit: string }
  | { type: 'DECIMAL' }
  | { type: 'OPERATOR'; operator: Operator }
  | { type: 'EQUALS' }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERCENT' }
  | { type: 'BACKSPACE' }

const INITIAL_STATE: State = {
  display: '0',
  expression: '',
  operand: null,
  operator: null,
  waitingForOperand: false,
  error: false,
}

function calculate(a: number, op: Operator, b: number): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '×': return a * b
    case '÷': return a / b
  }
}

function formatDisplay(value: number): string {
  if (!isFinite(value)) return 'Error'
  const str = String(value)
  // Avoid very long floating point noise
  if (str.includes('.') && str.length > 12) {
    return parseFloat(value.toPrecision(10)).toString()
  }
  return str
}

function reducer(state: State, action: Action): State {
  if (state.error && action.type !== 'CLEAR') return state

  switch (action.type) {
    case 'DIGIT': {
      if (state.waitingForOperand) {
        return { ...state, display: action.digit, waitingForOperand: false }
      }
      const newDisplay =
        state.display === '0' ? action.digit : state.display + action.digit
      // Cap display length
      if (newDisplay.replace('-', '').replace('.', '').length > 12) return state
      return { ...state, display: newDisplay }
    }

    case 'DECIMAL': {
      if (state.waitingForOperand) {
        return { ...state, display: '0.', waitingForOperand: false }
      }
      if (state.display.includes('.')) return state
      return { ...state, display: state.display + '.' }
    }

    case 'OPERATOR': {
      const current = parseFloat(state.display)
      if (state.operand !== null && state.operator && !state.waitingForOperand) {
        const result = calculate(state.operand, state.operator, current)
        if (!isFinite(result)) {
          return { ...INITIAL_STATE, display: 'Error', error: true }
        }
        const formatted = formatDisplay(result)
        return {
          ...state,
          display: formatted,
          expression: `${formatted} ${action.operator}`,
          operand: result,
          operator: action.operator,
          waitingForOperand: true,
        }
      }
      return {
        ...state,
        expression: `${state.display} ${action.operator}`,
        operand: current,
        operator: action.operator,
        waitingForOperand: true,
      }
    }

    case 'EQUALS': {
      if (state.operand === null || state.operator === null) return state
      const current = parseFloat(state.display)
      const result = calculate(state.operand, state.operator, current)
      if (!isFinite(result)) {
        return { ...INITIAL_STATE, display: 'Error', error: true }
      }
      const formatted = formatDisplay(result)
      return {
        ...INITIAL_STATE,
        display: formatted,
        expression: `${state.expression} ${state.display} =`,
      }
    }

    case 'CLEAR':
      return INITIAL_STATE

    case 'TOGGLE_SIGN': {
      const toggled = parseFloat(state.display) * -1
      return { ...state, display: formatDisplay(toggled) }
    }

    case 'PERCENT': {
      const pct = parseFloat(state.display) / 100
      return { ...state, display: formatDisplay(pct) }
    }

    case 'BACKSPACE': {
      if (state.waitingForOperand) return state
      if (state.display.length === 1 || (state.display.length === 2 && state.display.startsWith('-'))) {
        return { ...state, display: '0' }
      }
      return { ...state, display: state.display.slice(0, -1) }
    }

    default:
      return state
  }
}

const KEY_MAP: Record<string, Action> = {
  '0': { type: 'DIGIT', digit: '0' },
  '1': { type: 'DIGIT', digit: '1' },
  '2': { type: 'DIGIT', digit: '2' },
  '3': { type: 'DIGIT', digit: '3' },
  '4': { type: 'DIGIT', digit: '4' },
  '5': { type: 'DIGIT', digit: '5' },
  '6': { type: 'DIGIT', digit: '6' },
  '7': { type: 'DIGIT', digit: '7' },
  '8': { type: 'DIGIT', digit: '8' },
  '9': { type: 'DIGIT', digit: '9' },
  '.': { type: 'DECIMAL' },
  '+': { type: 'OPERATOR', operator: '+' },
  '-': { type: 'OPERATOR', operator: '-' },
  '*': { type: 'OPERATOR', operator: '×' },
  '/': { type: 'OPERATOR', operator: '÷' },
  'Enter': { type: 'EQUALS' },
  '=': { type: 'EQUALS' },
  'Escape': { type: 'CLEAR' },
  'Backspace': { type: 'BACKSPACE' },
  '%': { type: 'PERCENT' },
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = KEY_MAP[e.key]
    if (action) {
      e.preventDefault()
      dispatch(action)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { state, dispatch }
}
