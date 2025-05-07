'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import FormInput from './FormInput';
import FormButton from './FormButton';
import Alert from '../UI/Alert';
import { subscribeEmail } from '@/lib/subscription';
import { isValidEmail } from '@/lib/validation';
import { FormStatus } from '@/lib/types';

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('loading');
    
    try {
      const response = await subscribeEmail(email);
      
      if (response.success) {
        setFormStatus('success');
        setStatusMessage(response.message);
        setEmail('');
      } else {
        setFormStatus('error');
        setStatusMessage(response.message);
      }
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Failed to subscribe. Please try again later.');
      console.error('Subscription error:', error);
    }
  };

  const resetForm = () => {
    setFormStatus('idle');
    setStatusMessage('');
  };

  return (
    <div className="w-full max-w-md">
      {(formStatus === 'success' || formStatus === 'error') && (
        <Alert 
          type={formStatus === 'success' ? 'success' : 'error'} 
          message={statusMessage}
          onDismiss={resetForm}
        />
      )}
      
      <form 
        onSubmit={handleSubmit} 
        className="w-full"
        noValidate
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <FormInput
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (emailError) validateForm();
              }}
              error={emailError}
              disabled={formStatus === 'loading'}
              required
              ariaLabel="Email address"
            />
          </div>
          
          <FormButton
            type="submit"
            disabled={formStatus === 'loading'}
            isLoading={formStatus === 'loading'}
            className="sm:self-start"
          >
            <span className="flex items-center">
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </span>
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;