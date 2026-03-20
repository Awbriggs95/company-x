'use client';

import { useState } from 'react';

interface TimeCalculatorProps {
  onBack: () => void;
}

type Period = 'AM' | 'PM';

interface TimeState {
  hour: number;
  minute: number;
  period: Period;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function toMinutes(time: TimeState): number {
  const h24 =
    time.period === 'AM'
      ? time.hour === 12 ? 0 : time.hour
      : time.hour === 12 ? 12 : time.hour + 12;
  return h24 * 60 + time.minute;
}

function formatDiff(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

const SELECT_CLASS =
  'bg-gray-700 text-white rounded-lg px-2 py-1 text-xl text-center appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500';

interface PeriodToggleProps {
  value: Period;
  onChange: (p: Period) => void;
}

const PeriodToggle = ({ value, onChange }: PeriodToggleProps) => (
  <button
    onClick={() => onChange(value === 'AM' ? 'PM' : 'AM')}
    className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-3 py-1 text-base font-medium transition-opacity active:opacity-70 cursor-pointer w-14"
    aria-label={`Toggle period, currently ${value}`}
  >
    {value}
  </button>
);

interface TimeInputRowProps {
  label: string;
  value: TimeState;
  onChange: (t: TimeState) => void;
}

const TimeInputRow = ({ label, value, onChange }: TimeInputRowProps) => (
  <div className="flex items-center gap-2 px-4 py-2">
    <span className="text-gray-400 text-sm w-10 shrink-0">{label}</span>
    <select
      value={value.hour}
      onChange={(e) => onChange({ ...value, hour: parseInt(e.target.value) })}
      className={SELECT_CLASS}
      aria-label={`${label} hour`}
    >
      {HOURS.map((h) => (
        <option key={h} value={h}>
          {h}
        </option>
      ))}
    </select>
    <span className="text-white text-xl font-light">:</span>
    <select
      value={value.minute}
      onChange={(e) => onChange({ ...value, minute: parseInt(e.target.value) })}
      className={SELECT_CLASS}
      aria-label={`${label} minute`}
    >
      {MINUTES.map((m) => (
        <option key={m} value={m}>
          {m.toString().padStart(2, '0')}
        </option>
      ))}
    </select>
    <PeriodToggle value={value.period} onChange={(p) => onChange({ ...value, period: p })} />
  </div>
);

const TimeCalculator = ({ onBack }: TimeCalculatorProps) => {
  const [start, setStart] = useState<TimeState>({ hour: 8, minute: 0, period: 'AM' });
  const [end, setEnd] = useState<TimeState>({ hour: 3, minute: 0, period: 'PM' });
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const diff = Math.abs(toMinutes(end) - toMinutes(start));
    setResult(formatDiff(diff));
  };

  return (
    <div className="flex flex-col">
      {/* Result display */}
      <div className="flex flex-col items-end justify-end px-6 py-4 min-h-32 overflow-hidden">
        <p className="text-gray-400 text-sm h-5">time difference</p>
        <p
          className={`font-light leading-none mt-2 text-right transition-all ${
            result ? 'text-white text-5xl' : 'text-gray-600 text-2xl'
          }`}
        >
          {result ?? '—'}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 mx-3 mb-2" />

      {/* Time inputs */}
      <TimeInputRow label="Start" value={start} onChange={setStart} />
      <TimeInputRow label="End" value={end} onChange={setEnd} />

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 px-3 pb-3 pt-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-full text-xl font-light select-none cursor-pointer transition-opacity active:opacity-70 h-16 sm:h-20 bg-gray-500 hover:bg-gray-400 text-white"
          aria-label="Back to calculator"
        >
          ← Back
        </button>
        <button
          onClick={calculate}
          className="flex items-center justify-center rounded-full text-xl font-light select-none cursor-pointer transition-opacity active:opacity-70 h-16 sm:h-20 bg-orange-500 hover:bg-orange-400 text-white"
          aria-label="Calculate time difference"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default TimeCalculator;
