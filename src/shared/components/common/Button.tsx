import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  fromColor?: string;
  toColor?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  fromColor,
  toColor,
  className = ''
}) => {
  const baseStyles = fromColor && toColor
    ? `bg-gradient-to-r from-${fromColor}-600 to-${toColor}-600 text-white hover:from-${fromColor}-700 hover:to-${toColor}-700`
    : variant === 'primary'
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
    : variant === 'secondary'
    ? 'bg-gray-600 text-white hover:bg-gray-700'
    : variant === 'danger'
    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} px-6 py-3 rounded-lg transition-all font-bold disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

