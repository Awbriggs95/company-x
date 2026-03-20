'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import TimeCalculator from '@/components/TimeCalculator';
import { useCalculatorStore } from '@/store/calculatorStore';

/** Lazy-loaded — 3D libraries only download when the easter egg fires. */
const EasterEggModal = dynamic(
  () => import('@/components/EasterEggModal'),
  { ssr: false }
);

type Mode = 'arithmetic' | 'time';

const Calculator = () => {
  const [mode, setMode] = useState<Mode>('arithmetic');
  const {
    displayValue,
    expression,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clear,
    showEasterEgg,
    dismissEasterEgg,
  } = useCalculatorStore();

  useEffect(() => {
    if (mode !== 'arithmetic') return;

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
  }, [mode, inputDigit, inputDecimal, inputOperator, calculate, clear]);

  return (
    <>
      {showEasterEgg && <EasterEggModal onClose={dismissEasterEgg} />}
      <div className="w-full max-w-xs sm:max-w-sm bg-black rounded-3xl overflow-hidden shadow-2xl">
        {mode === 'arithmetic' ? (
          <>
            <Display expression={expression} displayValue={displayValue} />
            <ButtonGrid onSwitchMode={() => setMode('time')} />
          </>
        ) : (
          <TimeCalculator onBack={() => setMode('arithmetic')} />
        )}
      </div>
    </>
  );
};

export default Calculator;
