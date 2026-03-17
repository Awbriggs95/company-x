'use client';

import { useEffect } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import { useCalculatorStore } from '@/store/calculatorStore';

const Calculator = () => {
  const { displayValue, expression, inputDigit, inputDecimal, inputOperator, calculate, clear } =
    useCalculatorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+') {
        inputOperator('+');
      } else if (e.key === '-') {
        inputOperator('-');
      } else if (e.key === '*') {
        inputOperator('*');
      } else if (e.key === '/') {
        e.preventDefault();
        inputOperator('/');
      } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === 'Backspace') {
        const { displayValue: current } = useCalculatorStore.getState();
        if (current === 'Error' || current.length <= 1) {
          useCalculatorStore.setState({ displayValue: '0' });
        } else {
          useCalculatorStore.setState({ displayValue: current.slice(0, -1) });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, inputOperator, calculate, clear]);

  return (
    <div className="w-full max-w-xs sm:max-w-sm bg-black rounded-3xl overflow-hidden shadow-2xl">
      <Display expression={expression} displayValue={displayValue} />
      <ButtonGrid />
    </div>
  );
};

export default Calculator;
