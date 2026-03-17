'use client';

interface DisplayProps {
  expression: string;
  displayValue: string;
}

const Display = ({ expression, displayValue }: DisplayProps) => {
  const isLong = displayValue.length > 9;
  const isError = displayValue === 'Error';

  return (
    <div className="flex flex-col items-end justify-end px-6 py-4 min-h-32 overflow-hidden">
      <p className="text-gray-400 text-sm h-5 truncate max-w-full text-right">
        {expression}
      </p>
      <p
        className={`text-white font-light leading-none mt-2 break-all text-right transition-all ${
          isError ? 'text-red-400 text-4xl' : isLong ? 'text-4xl' : 'text-6xl'
        }`}
      >
        {displayValue}
      </p>
    </div>
  );
};

export default Display;
