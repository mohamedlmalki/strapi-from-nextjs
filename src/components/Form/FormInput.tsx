'use client';

import React, { useState } from 'react';

interface FormInputProps {
  type: 'text' | 'email';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  ariaLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const borderColor = error 
    ? 'border-red-500' 
    : isFocused 
      ? 'border-blue-500' 
      : 'border-gray-300';
  
  return (
    <div className="w-full">
      <div className={`relative transition-all duration-300 ${disabled ? 'opacity-70' : ''}`}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-label={ariaLabel || placeholder}
          aria-invalid={!!error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 rounded-md bg-white border ${borderColor} focus:outline-none transition-all duration-300 placeholder-gray-400`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 animate-fadeIn" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;