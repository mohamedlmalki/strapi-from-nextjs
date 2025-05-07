'use client';

import React from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  className = '',
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative py-3 px-6 font-medium rounded-md transition-all duration-300 transform 
        ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
        }
        ${className}
      `}
    >
      <span className={`flex items-center justify-center ${isLoading ? 'opacity-0' : ''}`}>
        {children}
      </span>
      
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default FormButton;