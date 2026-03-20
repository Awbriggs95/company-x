'use client';

import Button from './Button';
import type { ButtonVariant } from './Button';
import { useCalculatorStore } from '@/store/calculatorStore';

const ButtonGrid = () => {
  const { operator, waitingForOperand, inputDigit, inputDecimal, inputOperator, calculate, clear, toggleSign, percentage } =
    useCalculatorStore();

  const isOperatorActive = (op: string) => operator === op && waitingForOperand;

  type ButtonDef = {
    label: string;
    onClick: () => void;
    variant?: ButtonVariant;
    wide?: boolean;
    active?: boolean;
  };

  const buttons: ButtonDef[] = [
    { label: 'AC', onClick: clear, variant: 'function' },
    { label: '+/-', onClick: toggleSign, variant: 'function' },
    { label: '%', onClick: percentage, variant: 'function' },
    { label: '÷', onClick: () => inputOperator('/'), variant: 'operator', active: isOperatorActive('/') },

    { label: '7', onClick: () => inputDigit('7') },
    { label: '8', onClick: () => inputDigit('8') },
    { label: '9', onClick: () => inputDigit('9') },
    { label: '×', onClick: () => inputOperator('*'), variant: 'operator', active: isOperatorActive('*') },

    { label: '4', onClick: () => inputDigit('4') },
    { label: '5', onClick: () => inputDigit('5') },
    { label: '6', onClick: () => inputDigit('6') },
    { label: '−', onClick: () => inputOperator('-'), variant: 'operator', active: isOperatorActive('-') },

    { label: '1', onClick: () => inputDigit('1') },
    { label: '2', onClick: () => inputDigit('2') },
    { label: '3', onClick: () => inputDigit('3') },
    { label: '+', onClick: () => inputOperator('+'), variant: 'operator', active: isOperatorActive('+') },

    { label: '0', onClick: () => inputDigit('0'), wide: true },
    { label: '.', onClick: inputDecimal },
    { label: '=', onClick: calculate, variant: 'equals' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 px-3 pb-3">
      {buttons.map((btn, index) => (
        <Button
          key={index}
          label={btn.label}
          onClick={btn.onClick}
          variant={btn.variant}
          wide={btn.wide}
          active={btn.active}
        />
      ))}
      <Button
        label="Δt  time difference (HHMM)"
        onClick={() => inputOperator('timeDiff')}
        variant="function"
        active={isOperatorActive('timeDiff')}
        className="col-span-4 text-base"
      />
    </div>
  );
};

export default ButtonGrid;
