import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'cyan' | 'yellow';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue',
  message,
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 border-b-2',
    md: 'h-12 w-12 border-b-2',
    lg: 'h-16 w-16 border-b-4'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600',
    orange: 'border-orange-600',
    cyan: 'border-cyan-600',
    yellow: 'border-yellow-600'
  };

  const containerClass = fullScreen 
    ? 'min-h-screen flex items-center justify-center' 
    : 'flex items-center justify-center';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
