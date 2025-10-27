import React from 'react';

interface StatusBadgeProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type = 'success', message }) => {
  const styles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700'
  };

  return (
    <div className={`${styles[type]} border-l-4 p-4 rounded-lg inline-block mb-6`}>
      <p className="font-bold">{message}</p>
    </div>
  );
};

export default StatusBadge;

