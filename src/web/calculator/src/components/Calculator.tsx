import styles from './Calculator.module.css'
import { useCalculator } from './useCalculator'

type ButtonConfig = {
  label: string
  className: string
  action: () => void
  wide?: boolean
}

export default function Calculator() {
  const { state, dispatch } = useCalculator()

  const buttons: ButtonConfig[] = [
    {
      label: state.error ? 'AC' : state.display !== '0' ? 'C' : 'AC',
      className: styles.fn,
      action: () => dispatch({ type: 'CLEAR' }),
    },
    {
      label: '+/-',
      className: styles.fn,
      action: () => dispatch({ type: 'TOGGLE_SIGN' }),
    },
    {
      label: '%',
      className: styles.fn,
      action: () => dispatch({ type: 'PERCENT' }),
    },
    {
      label: '÷',
      className: `${styles.operator}${state.operator === '÷' && state.waitingForOperand ? ` ${styles.active}` : ''}`,
      action: () => dispatch({ type: 'OPERATOR', operator: '÷' }),
    },
    {
      label: '7',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '7' }),
    },
    {
      label: '8',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '8' }),
    },
    {
      label: '9',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '9' }),
    },
    {
      label: '×',
      className: `${styles.operator}${state.operator === '×' && state.waitingForOperand ? ` ${styles.active}` : ''}`,
      action: () => dispatch({ type: 'OPERATOR', operator: '×' }),
    },
    {
      label: '4',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '4' }),
    },
    {
      label: '5',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '5' }),
    },
    {
      label: '6',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '6' }),
    },
    {
      label: '−',
      className: `${styles.operator}${state.operator === '-' && state.waitingForOperand ? ` ${styles.active}` : ''}`,
      action: () => dispatch({ type: 'OPERATOR', operator: '-' }),
    },
    {
      label: '1',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '1' }),
    },
    {
      label: '2',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '2' }),
    },
    {
      label: '3',
      className: styles.digit,
      action: () => dispatch({ type: 'DIGIT', digit: '3' }),
    },
    {
      label: '+',
      className: `${styles.operator}${state.operator === '+' && state.waitingForOperand ? ` ${styles.active}` : ''}`,
      action: () => dispatch({ type: 'OPERATOR', operator: '+' }),
    },
    {
      label: '0',
      className: `${styles.digit} ${styles.zero}`,
      action: () => dispatch({ type: 'DIGIT', digit: '0' }),
      wide: true,
    },
    {
      label: '.',
      className: styles.digit,
      action: () => dispatch({ type: 'DECIMAL' }),
    },
    {
      label: '=',
      className: styles.equals,
      action: () => dispatch({ type: 'EQUALS' }),
    },
  ]

  return (
    <div className={styles.calculator} role="application" aria-label="Calculator">
      <div className={styles.display} aria-live="polite">
        <div className={styles.expression}>{state.expression}</div>
        <div className={`${styles.value}${state.error ? ` ${styles.error}` : ''}`}>
          {state.display}
        </div>
      </div>
      <div className={styles.buttons}>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            className={`${styles.btn} ${btn.className}`}
            onClick={btn.action}
            aria-label={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
