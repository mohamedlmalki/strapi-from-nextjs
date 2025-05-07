'use client';

import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onDismiss?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onDismiss }) => {
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div
      className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-4 rounded-md mb-4 flex items-start justify-between animate-fadeIn`}
      role="alert"
    >
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircle className={`${iconColor} mr-3 h-5 w-5`} />
        ) : (
          <AlertCircle className={`${iconColor} mr-3 h-5 w-5`} />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;