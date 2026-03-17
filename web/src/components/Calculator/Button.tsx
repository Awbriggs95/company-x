'use client';

export type ButtonVariant = 'default' | 'operator' | 'function' | 'equals';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  wide?: boolean;
  active?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: 'bg-gray-700 hover:bg-gray-600 text-white',
  function: 'bg-gray-500 hover:bg-gray-400 text-white',
  operator: 'bg-orange-500 hover:bg-orange-400 text-white',
  equals: 'bg-orange-500 hover:bg-orange-400 text-white',
};

const Button = ({ label, onClick, variant = 'default', wide = false, active = false }: ButtonProps) => {
  const baseClasses =
    'flex items-center justify-center rounded-full text-2xl font-light select-none cursor-pointer transition-opacity active:opacity-70 h-16 sm:h-20';
  const variantClasses = active
    ? 'bg-white text-orange-500 hover:bg-gray-100'
    : VARIANT_CLASSES[variant];
  const widthClasses = wide ? 'col-span-2 justify-start pl-7' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${widthClasses}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
